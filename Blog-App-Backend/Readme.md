# AI-Powered Resume Analyzer - Backend

This is the backend service for the AI-Powered Resume Analyzer. It is built with Node.js and Express, handling user authentication, resume uploads, PDF parsing, and interactions with various AI providers to generate insights and scores.

## Technologies Used

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (Mongoose)
*   **Authentication:** JSON Web Tokens (JWT) & bcryptjs
*   **File Handling:** Multer
*   **Cloud Storage:** Cloudinary (for storing uploaded resumes/assets)
*   **PDF Parsing:** pdf-parse, pdfjs-dist
*   **AI Integrations:** Google GenAI, Groq SDK, OpenAI

## Implementation Details

*   **API Architecture:** The backend exposes a RESTful API organized into modular route handlers (`APIs/UserAPI.js`, `APIs/CommonAPI.js`). 
*   **Authentication Flow:** User registration and login are secured using `bcryptjs` for password hashing. Successful authentication generates a JSON Web Token (JWT), which is then verified by custom middleware (`middlewares/`) for protected routes.
*   **Resume Processing Pipeline:**
    1.  **Upload:** Resumes are uploaded via HTTP multipart/form-data and temporarily stored using `multer` in an `uploads/` directory.
    2.  **Parsing:** The PDF files are processed using `pdf-parse` or `pdfjs-dist` to extract raw textual data.
    3.  **AI Analysis:** The extracted text, along with targeted prompts, is sent to an external AI service (Google GenAI, Groq, or OpenAI) managed within the `services/` layer. The AI evaluates the resume against standard metrics, extracting skills, suggesting keywords, and generating a score.
    4.  **Storage:** The original file is securely uploaded to Cloudinary. The generated analysis report, along with the file's Cloudinary URL, is saved to MongoDB using Mongoose schemas defined in the `models/` directory.
*   **Database Schema:** Mongoose models strictly define the schema for Users and their linked Resume analyses, enforcing data integrity and relationships.

## Prerequisites

*   Node.js (v18 or higher recommended)
*   MongoDB (local instance or MongoDB Atlas)
*   API keys for Google Gemini / Groq / OpenAI
*   Cloudinary account credentials

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root of the backend directory and configure the following variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    OPENAI_API_KEY=your_openai_api_key
    GROQ_API_KEY=your_groq_api_key
    GOOGLE_GENAI_API_KEY=your_google_genai_api_key
    ```

3.  **Run the server:**
    ```bash
    node server.js
    ```
    The server will typically start on `http://localhost:5000`.

## Project Structure

*   `server.js`: Entry point of the application.
*   `config/`: Configuration files (e.g., database connection, third-party services).
*   `models/`: Mongoose database schemas.
*   `APIs/`: Route handlers and controllers.
*   `middlewares/`: Express middlewares (e.g., authentication, file upload).
*   `services/`: Business logic and external AI integrations.
*   `uploads/`: Temporary directory for local file uploads before processing.
