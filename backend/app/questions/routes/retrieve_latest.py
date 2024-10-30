from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from typing import List
from app.db import get_db
from app.db.models import User, QuestionRequest, TextQuestionRequest, GeneratedQuestion, GeneratedTextQuestion
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
        # Fetch the latest request from both QuestionRequest and TextQuestionRequest
        latest_prompt_request = db.query(QuestionRequest).filter(
            QuestionRequest.user_id == user.id
        ).order_by(QuestionRequest.request_time.desc()).first()
        
        latest_text_request = db.query(TextQuestionRequest).filter(
            TextQuestionRequest.user_id == user.id
        ).order_by(TextQuestionRequest.request_time.desc()).first()

        # Determine the most recent request
        if latest_prompt_request and latest_text_request:
            if latest_prompt_request.request_time >= latest_text_request.request_time:
                latest_request = latest_prompt_request
                request_type = "prompt"
            else:
                latest_request = latest_text_request
                request_type = "text"
        elif latest_prompt_request:
            latest_request = latest_prompt_request
            request_type = "prompt"
        elif latest_text_request:
            latest_request = latest_text_request
            request_type = "text"
        else:
            logging.info(f"No question requests found for user ID: {user.id}")
            return {"request_time": None, "questions": []}

        # Fetch generated questions based on the request type
        if request_type == "prompt":
            generated_questions = db.query(GeneratedQuestion).filter(
                GeneratedQuestion.request_id == latest_request.id
            ).all()
        else:
            generated_questions = db.query(GeneratedTextQuestion).filter(
                GeneratedTextQuestion.request_id == latest_request.id
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
            "request_time": latest_request.request_time,
            "questions": questions_response
        }
        
        logging.info(f"Returning {len(questions_response)} latest questions for user ID: {user.id}")
        return response_data
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
