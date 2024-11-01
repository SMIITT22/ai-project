from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from app.db import get_db
from app.db.models import User, TextQuestionRequest, GeneratedTextQuestion
from app.core.security import verify_access_token
from app.questions import openai_utils_for_text
from datetime import datetime
import json
import logging
from ..schemas import TextQuestionRequestSchema

logger = logging.getLogger("uvicorn.error")
text_generate_router = APIRouter()

# Define minimum and maximum word limits
MIN_WORD_COUNT = 50
MAX_WORD_COUNT = 500

@text_generate_router.post("/")
async def generate_questions_from_text_endpoint(
    request_data: TextQuestionRequestSchema,
    req: Request,
    db: Session = Depends(get_db)
):
    try:
        logging.info("Received request to generate questions from text.")
        
        # Authenticate user
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

        # Validate word count in text_content
        text_content = request_data.text
        word_count = len(text_content.split())
        
        if word_count < MIN_WORD_COUNT:
            raise HTTPException(
                status_code=400, 
                detail=f"Text content is too short. Minimum word count is {MIN_WORD_COUNT}."
            )
        elif word_count > MAX_WORD_COUNT:
            raise HTTPException(
                status_code=400, 
                detail=f"Text content is too long. Maximum word count is {MAX_WORD_COUNT}."
            )

        # Validate user limits and prepare parameters
        num_questions = request_data.num_questions or 15
        question_format = "Both MCQs and True/False"
        question_set_name = request_data.question_set_name  # Get question set name

        if not user.is_subscribed and user.free_generation_count >= 2:
            raise HTTPException(status_code=403, detail="Free generation limit reached.")
        
        # Generate questions using OpenAI
        questions = openai_utils_for_text.generate_questions_from_text(question_format, num_questions, text_content)
        if isinstance(questions, str):
            raise HTTPException(status_code=500, detail=questions)

        # Record the text question request in the database
        new_request = TextQuestionRequest(
            user_id=user.id,
            num_questions=num_questions,
            text_content=text_content,
            request_time=datetime.utcnow(),
            question_format=question_format,
            question_set_name=question_set_name  # Save question set name
        )
        db.add(new_request)
        db.commit()
        db.refresh(new_request)

        # Store generated questions in GeneratedTextQuestion
        for question in questions:
            new_question = GeneratedTextQuestion(
                request_id=new_request.id,
                question_text=question['question'],
                question_type=question['type'],
                options=json.dumps(question.get('options', {})) if 'options' in question else None,
                correct_answer=question['answer']
            )
            db.add(new_question)

        db.commit()

        # Update free generation count if user is unsubscribed
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
