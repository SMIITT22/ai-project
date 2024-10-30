# app/openai_utils.py
import time
import openai
import logging
import tiktoken
import re  # For regex
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Set up logging if not already set up
# (Assuming logging is configured in main.py or another central location)

# Ensure you have your OpenAI API key set in the environment variables
openai.api_key = os.getenv('OPENAI_API_KEY')
if not openai.api_key:
    raise ValueError("OpenAI API key not set. Please ensure OPENAI_API_KEY is in your environment.")

# Constants
VALID_QUESTION_TYPES = ["Only MCQs", "Only True/False", "Both MCQs and True/False"]
MAX_QUESTIONS = 50
MIN_QUESTIONS = 1

# Utility function for ensuring four options
def ensure_four_options(options, question_text):
    while len(options) < 4:
        option_label = chr(65 + len(options))  # ASCII A, B, C, D
        options.append(f"Option {option_label} for: {question_text[:30]}...")
    return options

# Utility function to validate and standardize MCQ options
def validate_mcq_options(options, question_text):
    distinct_options = list(dict.fromkeys(options))  # Remove duplicates while preserving order
    if len(distinct_options) < 4:
        distinct_options = ensure_four_options(distinct_options, question_text)
    return distinct_options[:4]

# Function to parse generated text into structured questions
def parse_generated_text(generated_text):
    questions = generated_text.split("\n\n")
    structured_questions = []

    for question in questions:
        lines = [line.strip() for line in question.strip().split("\n") if line.strip()]
        if not lines:
            continue

        try:
            # Use regex to remove numbering if present
            question_line = lines[0]
            # Pattern to match optional numbering like "1. " or "1)"
            question_line = re.sub(r'^\d+\.\s*', '', question_line)
            question_line = re.sub(r'^\d+\)\s*', '', question_line)

            # Handle MCQ type questions
            if question_line.startswith("MCQ:"):
                question_type = "MCQ"
                question_text = question_line.replace("MCQ:", "").strip()
                options = [line.split(")", 1)[1].strip() for line in lines[1:] if ")" in line]
                options = validate_mcq_options(options, question_text)

                # Extract answer
                answer_line = next((line for line in lines if line.lower().startswith("answer:")), None)
                if answer_line:
                    answer_letter = answer_line.split(":", 1)[1].strip().upper()
                    if answer_letter in ['A', 'B', 'C', 'D']:
                        answer = options[ord(answer_letter) - 65]  # Convert letter to option text
                    else:
                        answer = answer_line.split(":", 1)[1].strip()
                else:
                    answer = "Answer not provided."

                structured_questions.append({
                    "type": question_type,
                    "question": question_text,
                    "options": options,
                    "answer": answer
                })

            # Handle True/False type questions
            elif question_line.startswith("True or False:") or question_line.startswith("True/False:"):
                question_type = "True/False"
                if question_line.startswith("True or False:"):
                    question_text = question_line.replace("True or False:", "").strip()
                else:
                    question_text = question_line.replace("True/False:", "").strip()

                # Extract answer
                answer_line = next((line for line in lines[1:] if line.lower().startswith("answer:")), None)
                if answer_line:
                    answer = answer_line.split(":", 1)[1].strip().capitalize()
                    if answer not in ["True", "False"]:
                        answer = "Answer not clearly True or False."
                else:
                    answer = "Answer not provided."

                structured_questions.append({
                    "type": question_type,
                    "question": question_text,
                    "answer": answer
                })

            else:
                logging.warning(f"Unrecognized question format: {question}")
                continue

        except Exception as e:
            logging.error(f"Error parsing question block: {question}. Error: {e}")
            continue

    return structured_questions

# Function to count tokens using tiktoken
def count_tokens(text, model="gpt-3.5-turbo"):
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        encoding = tiktoken.get_encoding("cl100k_base")
    return len(encoding.encode(text))

# Function to generate questions using OpenAI's API
def generate_questions(test_pattern, num_questions, prompt, retries=3, delay=5):
    # Input validation
    if not isinstance(num_questions, int) or not (MIN_QUESTIONS <= num_questions <= MAX_QUESTIONS):
        return "Invalid number of questions. Must be between 1 and 50."
    if not isinstance(test_pattern, str) or not isinstance(prompt, str):
        return "Invalid input type for test pattern or prompt."
    if test_pattern not in VALID_QUESTION_TYPES:
        return f"Invalid test pattern. Must be one of {VALID_QUESTION_TYPES}."

    # Split request if large
    batch_size = 25  # Generate questions in batches to avoid exceeding token limits
    total_questions = []

    while len(total_questions) < num_questions:
        remaining_questions = num_questions - len(total_questions)
        current_batch_size = min(batch_size, remaining_questions)  # Request only the remaining questions if < batch size
        
        gpt_prompt = (
            f"Generate {current_batch_size} questions based on the following details:\n"
            f"Pattern: {test_pattern}\n"
            f"Subject & Topic: {prompt}\n\n"
            f"Instructions:\n"
        )

        # Add specific instructions based on question type
        if test_pattern == "Only MCQs":
            gpt_prompt += (
                "- Only generate MCQs. Do not include any True/False or other types of questions.\n"
                "Use the format:\n"
                "  MCQ: [Question Text]\n"
                "  a) Option A\n"
                "  b) Option B\n"
                "  c) Option C\n"
                "  d) Option D\n"
                "  Answer: [Correct Option Letter]\n"
            )
        elif test_pattern == "Only True/False":
            gpt_prompt += (
                "- Only generate True/False questions.\n"
                "Use the format:\n"
                "  True or False: [Question Text]\n"
                "  Answer: [True/False]\n"
            )
        elif test_pattern == "Both MCQs and True/False":
            gpt_prompt += (
                "- Generate both MCQs and True/False questions.\n"
                "For MCQs:\n"
                "  MCQ: [Question Text]\n"
                "  a) Option A\n"
                "  b) Option B\n"
                "  c) Option C\n"
                "  d) Option D\n"
                "  Answer: [Correct Option Letter]\n"
                "For True/False:\n"
                "  True or False: [Question Text]\n"
                "  Answer: [True/False]\n"
            )

        # Retry mechanism for each batch
        attempt = 0
        batch_questions = []
        while attempt < retries and not batch_questions:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "system", "content": "You are a helpful assistant for generating exam questions."},
                              {"role": "user", "content": gpt_prompt}],
                    max_tokens=1500,
                    n=1,
                    stop=None,
                    temperature=0.7,
                )

                generated_text = response.choices[0].message['content'].strip()
                batch_questions = parse_generated_text(generated_text)

                # Filter based on the test pattern
                if test_pattern == "Only MCQs":
                    batch_questions = [q for q in batch_questions if q['type'] == "MCQ"]
                elif test_pattern == "Only True/False":
                    batch_questions = [q for q in batch_questions if q['type'] == "True/False"]

                total_questions.extend(batch_questions)
                logging.info(f"Generated {len(batch_questions)} questions in this batch.")
            except openai.error.OpenAIError as e:
                logging.warning(f"OpenAI API error: {e}. Retrying in {delay} seconds...")
                time.sleep(delay)
                attempt += 1
                delay *= 2  # Exponential backoff for retry delay

    # Log if final count does not match requested number
    if len(total_questions) != num_questions:
        logging.warning(f"Expected {num_questions} questions, but generated {len(total_questions)}.")

    return total_questions[:num_questions]  # Ensure exactly num_questions in return
