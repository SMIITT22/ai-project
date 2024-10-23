from pydantic import BaseModel

class QuestionRequestSchema(BaseModel):
    num_questions: int
    prompt: str
    question_type: str