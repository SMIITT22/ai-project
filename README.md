# AI Question Paper Generator

## Project Description
This is a web application that generates customized question paper sets based on user requirements, powered by the Open AI API. Built with a **React** frontend, **FastAPI** backend, and **PostgreSQL** database, it features secure, scratch-built authentication for user management.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview
The AI Question Paper Generator allows users to create tailored question papers by specifying parameters like difficulty, topic, or question type. It leverages the Open AI API for intelligent question generation, stores data in PostgreSQL, and provides a seamless experience with a React frontend and FastAPI backend. Authentication is built from scratch for secure user access.

## Features
- Generate custom question papers using AI
- User authentication (register, login, logout) built from scratch
- Responsive UI with Material Tailwind and Tailwind CSS
- Store and manage question sets in PostgreSQL
- Real-time state management with Redux

## Technologies Used
### Frontend:
- React.js
- Material Tailwind (`@material-tailwind/react`) for UI components
- Tailwind CSS for styling
- Redux (`@reduxjs/toolkit`, `react-redux`) for state management
- React Router (`react-router-dom`) for navigation
- Axios for API requests
- Framer Motion for animations

### Backend:
- Python with FastAPI
- PostgreSQL as the database
- Open AI API for question generation
- Custom authentication implementation

### Development Tools:
- Vite for frontend build and development
- ESLint for linting
- Uvicorn for running the FastAPI server

## Installation
Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-question-paper-generator
```

### 2. Set Up the Backend
Navigate to the backend directory:
```bash
cd backend
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

### 3. Configure PostgreSQL
Install PostgreSQL and create a database (e.g., `question_paper_db`). Add a `.env` file in the backend directory with your credentials:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=question_paper_db
DB_PORT=5432
OPENAI_API_KEY=your_openai_api_key
```

### 4. Run the Backend
```bash
uvicorn app.main:app --reload
```

### 5. Set Up the Frontend
Navigate to the frontend directory:
```bash
npm install
```

### 6. Start the Frontend
```bash
npm run dev
```

### 7. Open the Application
Open your browser and visit [http://localhost:5173](http://localhost:5173) (or the port Vite assigns) to access the app.

## Usage
1. Register or log in using the authentication system.
2. Specify your requirements (e.g., subject, difficulty, number of questions).
3. Generate a question paper set and review the results.
4. Download or save the generated set as needed.

## Contributing
Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature-branch
   ```
3. **Make your changes and commit them:**
   ```bash
   git commit -m "Add feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature-branch
   ```
5. **Open a pull request.**

---
Happy Coding! 🚀
