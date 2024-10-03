from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth.routes import auth_router
from app.db import Base, engine

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (you can specify your frontend URL instead)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],   # Allows all headers
)

# Include the auth router
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Create the tables (including the users table)
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI backend!"}
