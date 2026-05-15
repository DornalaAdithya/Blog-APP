# AI-Powered Resume Analyzer

A comprehensive, full-stack application designed to analyze resumes using advanced Artificial Intelligence. This tool provides job seekers with automated parsing, skill matching, keyword optimization suggestions, and comprehensive score generation to help them land their dream jobs.

## Overview

The application is split into a separated Frontend and Backend architecture:

- **[Frontend (React + Vite)](./FRONTEND/README.md)**: A modern, responsive user interface allowing users to upload resumes and interact with their generated reports.
- **[Backend (Node.js + Express)](./BACKEND/README.md)**: A robust REST API responsible for handling file uploads, extracting text from PDFs, communicating with AI models (OpenAI, Groq, Google GenAI), and securely storing user data in MongoDB.

## Features

- 🧠 **AI-based Resume Parsing:** Extracts structured data and text from PDF resumes.
- 🎯 **Skill Matching & Analysis:** Compares user skills against industry standards or specific job descriptions.
- 📈 **Keyword Optimization:** Suggests relevant keywords to improve ATS (Applicant Tracking System) pass rates.
- 📊 **Score Generation:** Provides a comprehensive resume score with actionable feedback.
- 🔐 **Secure User Accounts:** JWT-based authentication for saving and tracking multiple resume versions.
- ☁️ **Cloud Storage:** Integration with Cloudinary for seamless document management.

## Implementation Details (System Architecture)

The project leverages a decoupled Client-Server architecture to ensure scalability and clear separation of concerns:

- **Data Flow:** 
  1. The user interacts with the React frontend to submit a PDF resume via a multipart/form-data request.
  2. The Vite-powered frontend sends this data to the Express backend, attaching a JWT for authenticated sessions.
  3. The backend validates the token, temporarily saves the file using `multer`, and utilizes `pdf-parse` to extract the raw text.
  4. The extracted text is sent to an external Large Language Model (via Google GenAI, Groq, or OpenAI SDKs) with a carefully engineered prompt to analyze the content.
  5. Concurrently, the file is uploaded to Cloudinary for persistent storage.
  6. The structured AI response and file metadata are saved into MongoDB via Mongoose.
  7. Finally, the backend responds to the client with the JSON analysis, which is then mapped to global state (Zustand) and rendered by the frontend components.
- **Security:** Passwords are fully hashed with `bcryptjs` before entering the database. API routes are protected by custom JWT middleware, ensuring that users can only access and modify their own analysis records.

## Project Structure

```text
AI-Powered-Resume-Analyzer/
├── FRONTEND/       # React frontend application (Vite, TailwindCSS, Zustand)
├── BACKEND/        # Node.js backend application (Express, MongoDB, AI Services)
└── README.md       # Project overview
```

## Getting Started

To run this project locally, you will need to set up both the backend and frontend. 

1. **Setup Backend:** Navigate to the `BACKEND` directory, install dependencies, configure your `.env` variables (MongoDB, AI API keys, Cloudinary), and start the server. 
2. **Setup Frontend:** Navigate to the `FRONTEND` directory, install dependencies, set up your `.env` to point to the local backend, and start the Vite development server.

For detailed setup instructions, please refer to the individual README files located in the `FRONTEND` and `BACKEND` directories.
