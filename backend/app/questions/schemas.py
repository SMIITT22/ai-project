from pydantic import BaseModel
from enum import Enum

class QuestionFormat(str, Enum):
    ONLY_MCQS = "Only MCQs"
    ONLY_TRUE_FALSE = "Only True/False"
    BOTH = "Both MCQs and True/False"

# Schema for prompt-based question requests
class QuestionRequestSchema(BaseModel):
    num_questions: int
    prompt: str
    question_format: str
    question_set_name: str

class TextQuestionRequestSchema(BaseModel):
    num_questions: int = 15
    text: str
    question_format: QuestionFormat = QuestionFormat.BOTH
    question_set_name: str

    class Config:
        schema_extra = {
            "example": {
                "num_questions": 15,
                "text": "This is an example text for generating questions.",
                "question_format": "Both MCQs and True/False",
                "question_set_name": "Sample Quiz on Basic Concepts"
            }
        }
