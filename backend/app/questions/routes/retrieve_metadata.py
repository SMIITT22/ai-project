from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from app.db import get_db
from app.db.models import User, QuestionRequest
from app.core.security import verify_access_token
import logging

logger = logging.getLogger("uvicorn.error")
retrieve_metadata_router = APIRouter()

@retrieve_metadata_router.get("/")
async def get_question_request_metadata(
    req: Request,
    db: Session = Depends(get_db),
    limit: int = None  # Set limit to None by default to indicate no limit
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
        
        # Query the question requests for the user
        query = db.query(QuestionRequest).filter(QuestionRequest.user_id == user.id).order_by(QuestionRequest.request_time.desc())
        
        # Apply limit if specified
        if limit is not None:
            query = query.limit(limit)
        
        question_requests = query.all()

        if not question_requests:
            return []

        # Format the response data
        metadata_response = [
            {
                "id": request.id,
                "heading": f"Request {request.id}",  # Using ID as a placeholder for heading
                "date": request.request_time.strftime("%Y-%m-%d"),
                "time": request.request_time.strftime("%H:%M:%S"),
                "numberOfQuestions": request.num_questions,
                "prompt": request.prompt,
                "question_format": request.question_format
            }
            for request in question_requests
        ]
        
        return metadata_response

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")
