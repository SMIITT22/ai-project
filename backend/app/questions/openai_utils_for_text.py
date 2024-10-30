import openai
import logging
import time
import re
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')
if not openai.api_key:
    raise ValueError("OpenAI API key not set. Please ensure OPENAI_API_KEY is in your environment.")

# Constants
MAX_QUESTIONS = 15
VALID_QUESTION_TYPES = ["Only MCQs", "Only True/False", "Both MCQs and True/False"]
MIN_WORDS = 50  # Minimum word count for input text
MAX_WORDS = 500  # Maximum word count for input text

# Function to ensure four unique options for MCQs
def ensure_four_options(options, question_text):
    while len(options) < 4:
        option_label = chr(65 + len(options))  # ASCII A, B, C, D
        options.append(f"Option {option_label} for: {question_text[:30]}...")
    return options[:4]

# Function to parse generated text into structured questions
def parse_generated_text(generated_text):
    questions = generated_text.split("\n\n")
    structured_questions = []

    for question in questions:
        lines = [line.strip() for line in question.strip().split("\n") if line.strip()]
        if not lines:
            continue

        try:
            # Remove numbering from the start
            question_line = re.sub(r'^\d+[\.\)]?\s*', '', lines[0])

            # Handle MCQs
            if question_line.startswith("MCQ:"):
                question_type = "MCQ"
                question_text = question_line.replace("MCQ:", "").strip()
                options = [line.split(")", 1)[1].strip() for line in lines[1:] if ")" in line]
                options = ensure_four_options(list(dict.fromkeys(options)), question_text)  # Ensure four unique options

                # Extract answer
                answer_line = next((line for line in lines if line.lower().startswith("answer:")), None)
                answer = (
                    options[ord(answer_line.split(":")[1].strip().upper()) - 65]
                    if answer_line and answer_line.split(":")[1].strip().upper() in ["A", "B", "C", "D"]
                    else "Answer not provided"
                )

                structured_questions.append({
                    "type": question_type,
                    "question": question_text,
                    "options": options,
                    "answer": answer
                })

            # Handle True/False questions
            elif question_line.startswith("True or False:") or question_line.startswith("True/False:"):
                question_type = "True/False"
                question_text = question_line.replace("True or False:", "").replace("True/False:", "").strip()

                # Extract answer
                answer_line = next((line for line in lines[1:] if line.lower().startswith("answer:")), None)
                answer = (
                    answer_line.split(":", 1)[1].strip().capitalize()
                    if answer_line and answer_line.split(":", 1)[1].strip().capitalize() in ["True", "False"]
                    else "Answer not provided"
                )

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

# Function to generate questions based on text content
def generate_questions_from_text(test_pattern, num_questions, text, retries=3, delay=5):
    if not isinstance(num_questions, int) or not (1 <= num_questions <= MAX_QUESTIONS):
        return "Invalid number of questions. Must be between 1 and 15."
    if not isinstance(test_pattern, str) or not isinstance(text, str):
        return "Invalid input type for test pattern or text."

    # Check word count
    word_count = len(text.split())
    if word_count < MIN_WORDS:
        return f"Input text is too short. Minimum word count is {MIN_WORDS}."
    elif word_count > MAX_WORDS:
        return f"Input text is too long. Maximum word count is {MAX_WORDS}."

    # Construct OpenAI prompt for text-based question generation
    gpt_prompt = (
        f"Generate up to {num_questions} questions from the following text.\n\n"
        f"Text Content: {text[:2000]}\n\n"  # Truncate to 2000 chars for context limit
        f"Instructions:\n"
        "- Generate a mix of MCQs and True/False questions based on the key ideas.\n"
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

    attempt = 0
    questions = []
    while attempt < retries and not questions:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for generating exam questions."},
                    {"role": "user", "content": gpt_prompt}
                ],
                max_tokens=1500,
                n=1,
                stop=None,
                temperature=0.7,
            )

            generated_text = response.choices[0].message['content'].strip()
            questions = parse_generated_text(generated_text)
            logging.info(f"Generated {len(questions)} questions from text.")

        except openai.error.OpenAIError as e:
            logging.warning(f"OpenAI API error: {e}. Retrying in {delay} seconds...")
            time.sleep(delay)
            attempt += 1
            delay *= 2

    if len(questions) < num_questions:
        logging.warning(f"Expected {num_questions} questions, but generated {len(questions)}.")
    return questions[:num_questions] if questions else "Failed to generate questions."
