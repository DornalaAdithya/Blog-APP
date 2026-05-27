# Blog App Backend

This directory contains the backend server for the Blog Platform. Built with Node.js and Express, it provides a RESTful API architecture designed to handle content management, role-based authorization, and secure authentication.

## Technologies and Definitions

*   **Node.js**: The cross-platform JavaScript runtime environment used to execute the server-side code.
*   **Express.js**: A flexible Node.js web application framework that manages routing, HTTP requests, and middleware integration.
*   **MongoDB**: A NoSQL, document-oriented database used to store application data in flexible JSON-like formats.
*   **Mongoose**: An Object Data Modeling (ODM) library for MongoDB. It defines strict data schemas and manages relationships between data models.
*   **JSON Web Tokens (JWT)**: A standard for securely transmitting information between parties. Used here to maintain stateless user sessions via HTTP-only cookies.
*   **Bcrypt.js**: A cryptographic library used for irreversible password hashing.

## Architectural Deep Dive

### 1. APIs (Routing Logic)
The `APIs` directory contains distinct router files that separate concerns based on user roles:
*   **`AdminAPI.js`**: Endpoints for administrative tasks, including `PUT /users/block` and `PUT /users/unblock` to manage user access.
*   **`AuthorAPI.js`**: Endpoints for content creators. Includes `POST /users` (register), `POST /articles` (create), `GET /articles/:authorId` (read own articles), `PUT /articles` (edit), and `DELETE /articles` (soft delete).
*   **`UserAPI.js`**: Endpoints for standard users, including registration, retrieving published articles, and adding comments to articles.
*   **`Common-API.js`**: Shared endpoints for all roles, handling authentication (`POST /login`), session termination (`GET /logout`), and password updates (`PUT /change-password`).

### 2. Database Models
The `models` directory defines the Mongoose schemas used to interact with MongoDB:
*   **`ArticleModel.js`**: Defines the structure of blog posts, including title, content, author references, comments arrays, and an `isActiveArticle` boolean for soft deletion.
*   **`UserTypeModel.js`**: Defines the structure of the users, including credentials, email, and specific roles (`ADMIN`, `AUTHOR`, `USER`).

### 3. Middlewares
Custom middlewares in the `middlewares` directory intercept requests to enforce security policies:
*   **`verifyToken.js`**: Extracts the JWT from the incoming request's HTTP-only cookies, verifies its cryptographic signature using the secret key, and attaches the decoded user payload to the request. It blocks unauthorized access.
*   **`checkAuthor.js`**: A specific authorization middleware that ensures the verified user possesses the "AUTHOR" role before allowing access to article creation or modification endpoints.

## Setup Instructions

1.  Navigate into this directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Create a `.env` file in the root of the backend directory with the following keys:
    ```env
    PORT=5000
    DB_URL="your_mongodb_connection_string"
    SECRET_KEY="your_jwt_signing_secret"
    ```
4.  Start the server:
    ```bash
    npm start
    ```
