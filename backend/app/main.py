from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth.routes import auth_router
from app.questions.routes import questions_router  # Updated import for modular routes
from app.db import Base, engine

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the auth router for authentication-related routes
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Include the modular questions router, which combines the generate and retrieve sub-routers
app.include_router(questions_router, prefix="/questions", tags=["questions"])

# Create the tables in the database (if they don't already exist)
Base.metadata.create_all(bind=engine)

# Define a simple root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI backend!"}
