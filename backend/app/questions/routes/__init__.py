from fastapi import APIRouter
from .generate import generate_router
from .retrieve import retrieve_router
from .retrieve_latest import retrieve_latest_router
from .retrieve_metadata import retrieve_metadata_router

# Create a new APIRouter instance for questions
questions_router = APIRouter()

# Include the generate and retrieve routers
questions_router.include_router(generate_router, prefix="/generate", tags=["questions"])
questions_router.include_router(retrieve_router, prefix="/retrieve", tags=["questions"])
questions_router.include_router(retrieve_latest_router, prefix="/retrieve_latest", tags=["Retrieve Latest Questions"])
questions_router.include_router(retrieve_metadata_router, prefix="/retrieve_metadata", tags=["Retrieve Metadata"])
