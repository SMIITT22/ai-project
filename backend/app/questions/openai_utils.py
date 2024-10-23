# app/openai_utils.py
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

    # Construct GPT prompt based on test_pattern
    gpt_prompt = (
        f"Generate {num_questions} questions based on the following details:\n"
        f"Pattern: {test_pattern}\n"
        f"Subject & Topic: {prompt}\n\n"
        f"Instructions:\n"
    )

    if test_pattern == "Only MCQs":
        gpt_prompt += (
            f"- Only generate MCQs. Do not include any True/False or other types of questions.\n"
            f"- Do not number the questions. Start each question directly with 'MCQ:'.\n"
            f"- For MCQs, use the format:\n"
            f"  MCQ: [Question Text]\n"
            f"  a) Option A\n"
            f"  b) Option B\n"
            f"  c) Option C\n"
            f"  d) Option D\n"
            f"  Answer: [Correct Option Letter]\n\n"
            f"Ensure that:\n"
            f"- Each MCQ has four distinct options.\n"
            f"- Answers are clearly indicated.\n"
            f"- Follow the exact formatting as specified above for easy parsing."
        )
    elif test_pattern == "Only True/False":
        gpt_prompt += (
            f"- Only generate True/False questions. Do not include any MCQs or other types of questions.\n"
            f"- Do not number the questions. Start each question directly with 'True or False:'.\n"
            f"- For True/False questions, use the format:\n"
            f"  True or False: [Question Text]\n"
            f"  Answer: [True/False]\n\n"
            f"Ensure that:\n"
            f"- Answers are clearly indicated as 'True' or 'False'.\n"
            f"- Follow the exact formatting as specified above for easy parsing."
        )
    elif test_pattern == "Both MCQs and True/False":
        gpt_prompt += (
            f"- Generate a combination of MCQs and True/False questions. Do not include any other types of questions.\n"
            f"- Do not number the questions. Start each question directly with 'MCQ:' or 'True or False:'.\n"
            f"- For MCQs, use the format:\n"
            f"  MCQ: [Question Text]\n"
            f"  a) Option A\n"
            f"  b) Option B\n"
            f"  c) Option C\n"
            f"  d) Option D\n"
            f"  Answer: [Correct Option Letter]\n\n"
            f"- For True/False questions, use the format:\n"
            f"  True or False: [Question Text]\n"
            f"  Answer: [True/False]\n\n"
            f"Ensure that:\n"
            f"- Each MCQ has four distinct options.\n"
            f"- Answers are clearly indicated.\n"
            f"- Follow the exact formatting as specified above for easy parsing."
        )

    # Count tokens in the prompt
    input_tokens = count_tokens(gpt_prompt)
    logging.info(f"Input tokens: {input_tokens}")

    # Calculate max tokens for response (ensure total tokens < 4096 for gpt-3.5-turbo)
    # Here, we assume a safe buffer and set max_response_tokens accordingly
    max_response_tokens = 4096 - input_tokens - 500  # 500 tokens buffer
    max_response_tokens = max_response_tokens if max_response_tokens > 0 else 1500

    attempt = 0
    while attempt < retries:
        try:
            logging.info(f"Attempt {attempt + 1}: Sending request to OpenAI API...")
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for generating exam questions."},
                    {"role": "user", "content": gpt_prompt},
                ],
                max_tokens=min(max_response_tokens, 1500),  # Prevent excessively large responses
                n=1,
                stop=None,
                temperature=0.7,
            )

            generated_text = response.choices[0].message['content'].strip()
            logging.info("Successfully received response from OpenAI API.")
            logging.debug(f"Generated Text from OpenAI API:\n{generated_text}")

            structured_questions = parse_generated_text(generated_text)

            if not structured_questions:
                logging.error("Parsed questions are empty.")
                return "Failed to parse the questions correctly. Please try again."

            # Filter out any questions that are not of the specified types
            filtered_questions = [
                q for q in structured_questions 
                if q['type'] in ["MCQ", "True/False"]
            ]

            # Additional Enforcement: Ensure only desired types based on test_pattern
            if test_pattern == "Only MCQs":
                filtered_questions = [q for q in filtered_questions if q['type'] == "MCQ"]
            elif test_pattern == "Only True/False":
                filtered_questions = [q for q in filtered_questions if q['type'] == "True/False"]

            if len(filtered_questions) != num_questions:
                logging.warning(f"Expected {num_questions} questions, but parsed {len(filtered_questions)}.")
                # Optionally, you can decide to retry or proceed with available questions
                # Here, we'll proceed with available questions
            else:
                logging.info(f"Successfully parsed {len(filtered_questions)} questions.")

            return filtered_questions

        except openai.error.RateLimitError as e:
            logging.warning(f"Rate limit error: {str(e)}. Retrying in {delay} seconds...")
            time.sleep(delay)
            attempt += 1
            delay *= 2  # Exponential backoff
        except openai.error.AuthenticationError as e:
            logging.error(f"Authentication error: {str(e)}")
            return f"Authentication error: {str(e)}"
        except openai.error.OpenAIError as e:
            logging.error(f"OpenAI API error: {str(e)}")
            return f"An OpenAI API error occurred: {str(e)}"
        except Exception as e:
            logging.error(f"An unexpected error occurred: {str(e)}")
            return f"An unexpected error occurred: {str(e)}"

    logging.error("Failed to generate questions after multiple attempts.")
    return "Failed to generate questions after multiple attempts."
