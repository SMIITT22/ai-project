# In db/models.py
from sqlalchemy import Column, Integer, String
from app.db import Base  # Ensure this is importing Base from the correct module

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
