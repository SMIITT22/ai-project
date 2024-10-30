from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from app.db import get_db
from app.db.models import User, QuestionRequest, TextQuestionRequest
from app.core.security import verify_access_token
import logging

logger = logging.getLogger("uvicorn.error")
retrieve_metadata_router = APIRouter()

@retrieve_metadata_router.get("/")
async def get_question_request_metadata(
    req: Request,
    db: Session = Depends(get_db),
    limit: int = None
):
    try:
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
        
        # Query prompt-based requests
        prompt_requests = db.query(QuestionRequest).filter(
            QuestionRequest.user_id == user.id
        ).order_by(QuestionRequest.request_time.desc()).all()

        # Query text-based requests
        text_requests = db.query(TextQuestionRequest).filter(
            TextQuestionRequest.user_id == user.id
        ).order_by(TextQuestionRequest.request_time.desc()).all()

        # Prepare metadata from both prompt and text requests
        metadata_response = []

        for request in prompt_requests:
            metadata_response.append({
                "id": request.id,
                "type": "prompt",
                "heading": f"Prompt Request {request.id}",
                "date": request.request_time.strftime("%Y-%m-%d"),
                "time": request.request_time.strftime("%H:%M:%S"),
                "numberOfQuestions": request.num_questions,
                "content": request.prompt,  # use 'content' for flexibility
                "question_format": request.question_format
            })

        for request in text_requests:
            metadata_response.append({
                "id": request.id,
                "type": "text",
                "heading": f"Text Request {request.id}",
                "date": request.request_time.strftime("%Y-%m-%d"),
                "time": request.request_time.strftime("%H:%M:%S"),
                "numberOfQuestions": request.num_questions,
                "content": request.text_content,  # use 'content' for flexibility
                "question_format": "Both MCQs and True/False"  # Default format for text-based requests
            })

        # Sort by request_time in descending order
        metadata_response.sort(key=lambda x: x["date"] + x["time"], reverse=True)

        # Apply limit if specified
        if limit is not None:
            metadata_response = metadata_response[:limit]

        return metadata_response

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")
