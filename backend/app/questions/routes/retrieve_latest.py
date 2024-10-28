from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from typing import List
from app.db import get_db
from app.db.models import User, QuestionRequest, GeneratedQuestion
from app.core.security import verify_access_token
import logging
import json
import uuid

logger = logging.getLogger("uvicorn.error")
retrieve_latest_router = APIRouter()

@retrieve_latest_router.get("/latest", response_model=dict)
async def get_latest_generated_questions(
    request: Request,
    db: Session = Depends(get_db)
):
    request_uuid = uuid.uuid4()
    logging.info(f"Request ID {request_uuid}: Received request to retrieve latest questions.")
    
    access_token = request.cookies.get("accessToken")
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token_data = verify_access_token(access_token)
    user_email = token_data.get("sub")
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        # Fetch the latest QuestionRequest based on request_time or id
        latest_request = db.query(QuestionRequest).filter(
            QuestionRequest.user_id == user.id
        ).order_by(QuestionRequest.request_time.desc()).first()
        
        if not latest_request:
            logging.info(f"No question requests found for user ID: {user.id}")
            return {"request_time": None, "questions": []}
        
        # Fetch generated questions for the latest request
        generated_questions = db.query(GeneratedQuestion).filter(
            GeneratedQuestion.request_id == latest_request.id
        ).all()
        
        if not generated_questions:
            raise HTTPException(status_code=404, detail="Generated questions not found")
        
        questions_response = [
            {
                "question_text": question.question_text,
                "question_type": question.question_type,
                "options": json.loads(question.options) if question.options else [],
                "correct_answer": question.correct_answer
            }
            for question in generated_questions
        ]
        
        response_data = {
            "request_time": latest_request.request_time,  # Include request time
            "questions": questions_response
        }
        
        logging.info(f"Returning {len(questions_response)} latest questions for user ID: {user.id}")
        return response_data
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
