from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from app.db import get_db
from app.db.models import User, QuestionRequest, GeneratedQuestion
from app.core.security import verify_access_token
import logging
import json
import uuid
from typing import List

logger = logging.getLogger("uvicorn.error")
retrieve_router = APIRouter()

@retrieve_router.get("/", response_model=List[dict])
async def get_generated_questions(
    request: Request,
    request_id: int = None,
    db: Session = Depends(get_db)
):
    request_uuid = uuid.uuid4()
    logging.info(f"Request ID {request_uuid}: Received request to retrieve questions.")
    access_token = request.cookies.get("accessToken")
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token_data = verify_access_token(access_token)
    user_email = token_data.get("sub")
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    try:
        if request_id:
            question_request = db.query(QuestionRequest).filter(
                QuestionRequest.id == request_id,
                QuestionRequest.user_id == user.id
            ).first()
            if not question_request:
                raise HTTPException(status_code=404, detail="Question request not found")
            generated_questions = db.query(GeneratedQuestion).filter(
                GeneratedQuestion.request_id == request_id
            ).all()
            if not generated_questions:
                raise HTTPException(status_code=404, detail="Generated questions not found")
        else:
            generated_questions = db.query(GeneratedQuestion).join(QuestionRequest).filter(
                QuestionRequest.user_id == user.id
            ).all()
            if not generated_questions:
                return []
        questions_response = [
            {
                "question_text": question.question_text,
                "question_type": question.question_type,
                "options": json.loads(question.options) if question.options else [],
                "correct_answer": question.correct_answer
            }
            for question in generated_questions
        ]
        logging.info(f"Returning {len(questions_response)} questions for user ID: {user.id}")
        return questions_response
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
