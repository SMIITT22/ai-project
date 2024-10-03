from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db import get_db  # Ensure this function returns a DB session
from app.db.models import User  # Ensure this imports your User model
from app.auth.schemas import SignupRequest
from app.core.security import create_access_token, hash_password

# Create a router instance
auth_router = APIRouter()

@auth_router.post("/signup")
async def signup(user_data: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=user_data.email,
        hashed_password=hash_password(user_data.password)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate JWT token for the new user
    access_token = create_access_token(data={"sub": new_user.email})

    return {
        "message": "User created successfully",
        "user_id": new_user.id,
        "access_token": access_token  # Include the JWT token in the response
    }