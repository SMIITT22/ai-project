# app/auth/routes.py

from fastapi import APIRouter, HTTPException, Depends, Request, Response
from sqlalchemy.orm import Session
from app.db import get_db
from app.db.models import User
from app.auth.schemas import SignupRequest, LoginRequest
from app.core.security import create_access_token, hash_password, verify_access_token, verify_password

# Create a router instance
auth_router = APIRouter()

@auth_router.post("/signup")
async def signup(user_data: SignupRequest, response: Response, db: Session = Depends(get_db)):
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

    # Set the access token in a cookie
    response.set_cookie(
        key="accessToken",  # Name of the cookie
        value=access_token,  # Value of the cookie (JWT token)
        httponly=True,  # Prevents JavaScript access to the cookie
        max_age=60*60*24,  # Expires in 1 day
        samesite='None',  # Adjust according to your needs ('None' if cross-origin)
        secure=True,  # Set to True if you are using HTTPS
    )

    return {
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "email": new_user.email
        }
    }

@auth_router.post("/login")
async def login(user_data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Generate JWT token for the logged-in user
    access_token = create_access_token(data={"sub": user.email})

    # Set the access token in a cookie
    response.set_cookie(
        key="accessToken",  # Name of the cookie
        value=access_token,  # Value of the cookie (JWT token)
        httponly=True,  # Prevents JavaScript access to the cookie
        max_age=60*60*24,  # Expires in 1 day
        samesite='None',  # Adjust according to your needs ('None' if cross-origin)
        secure=True,  # Set to True if you are using HTTPS
    )

    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "email": user.email
        }
    }

@auth_router.post("/logout")
async def logout(response: Response):
    # Properly clear the access token cookie by setting its value to an empty string and max_age to 0
    response.delete_cookie(
        key="accessToken",
        path="/",  # Make sure this matches the original path used
        samesite='None',
        secure=True,
    )
    return {"message": "Logout successful"}

@auth_router.get("/status")
async def get_user_status(request: Request):
    # Extract access token from cookie
    access_token = request.cookies.get("accessToken")
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    token_data = verify_access_token(access_token)
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_email = token_data.get("sub")
    if not user_email:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    return {
        "user": {
            "email": user_email
        }
    }