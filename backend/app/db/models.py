# In db/models.py
from sqlalchemy import Column, Integer, String, Boolean
from app.db import Base  # Ensure this is importing Base from the correct module

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_subscribed = Column(Boolean, default=False)  #column to track subscription status
