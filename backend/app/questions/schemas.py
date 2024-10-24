from pydantic import BaseModel
from enum import Enum

class QuestionFormat(str, Enum):
    ONLY_MCQS = "Only MCQs"
    ONLY_TRUE_FALSE = "Only True/False"
    BOTH = "Both MCQs and True/False"

class QuestionRequestSchema(BaseModel):
    num_questions: int
    prompt: str
    question_format: QuestionFormat
