from fastapi import APIRouter
from .generate import generate_router
from .retrieve import retrieve_router

# Create a new APIRouter instance for questions
questions_router = APIRouter()

# Include the generate and retrieve routers
questions_router.include_router(generate_router, prefix="/generate", tags=["questions"])
questions_router.include_router(retrieve_router, prefix="/retrieve", tags=["questions"])
