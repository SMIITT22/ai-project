from sqlalchemy import Column, Boolean, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_subscribed = Column(Boolean, default=False)
    free_generation_count = Column(Integer, default=0)

class QuestionRequest(Base):
    __tablename__ = "question_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    num_questions = Column(Integer)
    prompt = Column(String)
    request_time = Column(DateTime, default=datetime.utcnow)
    question_format = Column(String, default="Both MCQs and True/False")

    user = relationship("User", back_populates="question_requests")
    generated_questions = relationship("GeneratedQuestion", back_populates="request")

class GeneratedQuestion(Base):
    __tablename__ = "generated_questions"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(Integer, ForeignKey("question_requests.id"), nullable=False)
    question_text = Column(String)
    question_type = Column(String)
    options = Column(String)
    correct_answer = Column(String)

    request = relationship("QuestionRequest", back_populates="generated_questions")

# New tables for text-based question generation
class TextQuestionRequest(Base):
    __tablename__ = "text_question_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    num_questions = Column(Integer, default=15)
    text_content = Column(String, nullable=False)
    request_time = Column(DateTime, default=datetime.utcnow)
    question_format = Column(String, default="Both MCQs and True/False")

    user = relationship("User", back_populates="text_question_requests")
    generated_questions = relationship("GeneratedTextQuestion", back_populates="request")

class GeneratedTextQuestion(Base):
    __tablename__ = "generated_text_questions"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(Integer, ForeignKey("text_question_requests.id"), nullable=False)
    question_text = Column(String)
    question_type = Column(String)
    options = Column(String)
    correct_answer = Column(String)

    request = relationship("TextQuestionRequest", back_populates="generated_questions")

# Relationships for text-based question requests
User.question_requests = relationship("QuestionRequest", order_by=QuestionRequest.id, back_populates="user")
User.text_question_requests = relationship("TextQuestionRequest", order_by=TextQuestionRequest.id, back_populates="user")
