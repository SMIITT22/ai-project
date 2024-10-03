from fastapi import FastAPI
from app.auth.routes import auth_router
from app.db import Base, engine  # Ensure this import is correct

app = FastAPI()

# Include the auth router
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Create the tables (including the users table)
Base.metadata.create_all(bind=engine)  # This line should create the tables in your database

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI backend!"}
