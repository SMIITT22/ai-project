from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from app.db import get_db
from app.db.models import User, QuestionRequest, GeneratedQuestion
from app.core.security import verify_access_token
from app.questions import openai_utils
from datetime import datetime
import json
import logging
from ..schemas import QuestionRequestSchema

logger = logging.getLogger("uvicorn.error")
generate_router = APIRouter()

@generate_router.post("/")
async def generate_questions_endpoint(
    request_data: QuestionRequestSchema,
    req: Request,
    db: Session = Depends(get_db)
):
    try:
        logging.info("Received request to generate questions.")
        access_token = req.cookies.get("accessToken")
        if not access_token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        token_data = verify_access_token(access_token)
        if not token_data:
            raise HTTPException(status_code=401, detail="Invalid token")
        user_email = token_data.get("sub")
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        num_questions = request_data.num_questions
        prompt = request_data.prompt
        question_type = request_data.question_type
        valid_question_types = ["Only MCQs", "Only True/False", "Both MCQs and True/False"]
        if question_type not in valid_question_types:
            raise HTTPException(status_code=400, detail="Invalid question type.")
        if not user.is_subscribed and user.free_generation_count >= 2:
            raise HTTPException(status_code=403, detail="Free generation limit reached.")
        if not user.is_subscribed and num_questions != 10:
            raise HTTPException(status_code=403, detail="Free users are limited to generating 10 questions.")
        questions = openai_utils.generate_questions(question_type, num_questions, prompt)
        if isinstance(questions, str):
            raise HTTPException(status_code=500, detail=questions)
        new_request = QuestionRequest(user_id=user.id, num_questions=num_questions, prompt=prompt, request_time=datetime.utcnow())
        db.add(new_request)
        db.commit()
        db.refresh(new_request)
        for question in questions:
            new_question = GeneratedQuestion(
                request_id=new_request.id,
                question_text=question['question'],
                question_type=question['type'],
                options=json.dumps(question.get('options', {})) if 'options' in question else None,
                correct_answer=question['answer']
            )
            db.add(new_question)
        db.commit()
        if not user.is_subscribed:
            user.free_generation_count += 1
            db.commit()
        return {
            "message": "Questions generated successfully",
            "request_id": new_request.id,
            "questions": questions
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")
