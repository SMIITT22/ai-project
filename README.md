## Others
command to run backend : `uvicorn app.main:app --reload`

## Frontend 
WIP :)


## Backend
# API Documentation for Question Generation Service

## Overview

This API allows users to generate multiple-choice and true/false questions based on a given prompt. Users can generate new questions and retrieve previously generated question sets. Authentication is handled through access tokens stored in cookies.

---

## Routes

### 1. Generate Questions

- **Endpoint**: `POST /questions/generate`
- **Description**: Generates a new set of questions based on user-provided inputs.
- **Request Body**:
  ```json
  {
      "num_questions": <int>,        // Number of questions to generate (1-10)
      "prompt": "<string>",           // Topic or subject for the questions
      "question_type": "<string>"     // Type of questions: "Only MCQs", "Only True/False", "Both MCQs and True/False"
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
  ```json
  {
      "message": "Questions generated successfully",
      "request_id": <int>,            // Unique identifier for the generated question set
      "questions": [                   // Array of generated questions
          {
              "type": "<string>",       // Type of the question (e.g., "True/False")
              "question": "<string>",   // The question text
              "answer": "<string>"      // Correct answer ("True" or "False")
          }
          // ... more questions
      ]
  }
  ```
- **Errors**:
  - **401 Unauthorized**: If the access token is missing or invalid.
  - **403 Forbidden**: If the user exceeds their generation limits.
  - **400 Bad Request**: If the input parameters are invalid.

---

### 2. Retrieve Generated Questions

- **Endpoint**: `GET /questions/`
- **Description**: Retrieves previously generated questions. Optionally filters by `request_id` to fetch a specific set.
- **Query Parameters**:
  - `request_id` (optional): The unique identifier for a specific question request.
- **Response**:
  - **Status Code**: `200 OK`
  - **Body** (if `request_id` is provided):
  ```json
  {
    "questions": [
      // Array of retrieved questions
      {
        "question_text": "<string>", // The question text
        "question_type": "<string>", // Type of the question (e.g., "MCQ", "True/False")
        "options": [
          // List of options (if applicable)
          "<string>",
          "<string>",
          "<string>",
          "<string>"
        ],
        "correct_answer": "<string>" // Correct answer
      }
      // ... more questions
    ]
  }
  ```
  - **Body** (if no `request_id` is provided):
  ```json
  []
  ```
- **Errors**:
  - **401 Unauthorized**: If the access token is missing or invalid.
  - **404 Not Found**: If the user does not have any generated questions or if the specified `request_id` does not exist.

---

## Authentication

- **Access Token**: This API requires a valid access token to be stored in cookies. Each request must include the `accessToken` cookie for authentication.

---

## Notes

- Ensure the user has an active session with valid credentials to utilize these routes effectively.
- The question generation process is limited based on the user's subscription status, which can affect the number of questions they can generate in a given timeframe.
