# Full-Stack Blog Platform

This repository houses the complete source code for a comprehensive, full-stack blogging platform. Built on the MERN stack (MongoDB, Express.js, React, Node.js), the project is divided into two distinct, decoupled environments: a robust React-based frontend client and a secure Express-based Node.js backend API.

The application features comprehensive role-based access control (RBAC), allowing Administrators to manage users, Authors to draft and publish content, and regular Users to read and interact with articles.

---

## Part 1: The Backend API (`Blog-App-Backend`)

The server-side application is a RESTful API built with Node.js and Express. It manages all database interactions, enforces business logic, handles secure password hashing, and issues JSON Web Tokens (JWT) for stateless authentication.

### Core Technologies
*   **Node.js & Express.js**: Provides the scalable server runtime and flexible routing framework.
*   **MongoDB & Mongoose**: Utilized as a NoSQL document database, with Mongoose acting as the Object Data Modeling (ODM) library to enforce strict schemas.
*   **JSON Web Tokens (JWT) & Bcrypt.js**: Used for cryptographically signing authentication tokens and securely hashing passwords before database storage.

### API Architecture and Routing
The core logic is separated into distinct router files based on user roles:
*   **`AdminAPI.js`**: Endpoints for administrative tasks, including `PUT /users/block` and `PUT /users/unblock` to manage user platform access.
*   **`AuthorAPI.js`**: Endpoints for content creators. Includes `POST /users` (register), `POST /articles` (create), `GET /articles/:authorId` (read own articles), `PUT /articles` (edit), and `DELETE /articles` (soft delete).
*   **`UserAPI.js`**: Endpoints for standard users, including registration, retrieving published articles, and adding comments.
*   **`Common-API.js`**: Shared endpoints handling authentication (`POST /login`), session termination (`GET /logout`), and password updates (`PUT /change-password`).

### Database Models
*   **`ArticleModel.js`**: Defines the structure of blog posts (title, content, author references, comments arrays) and an `isActiveArticle` flag for soft deletion.
*   **`UserTypeModel.js`**: Defines user entities (credentials, email) and specific roles (`ADMIN`, `AUTHOR`, `USER`).

### Security and Middlewares
*   **`verifyToken.js`**: Extracts the JWT from HTTP-only cookies, verifies its signature, and attaches the decoded user payload to the request, blocking unauthorized access.
*   **`checkAuthor.js`**: Ensures the verified user possesses the "AUTHOR" role before allowing access to article creation endpoints.

---

## Part 2: The Frontend Client (`Blog-App-Frontend`)

The client-side application is a Single Page Application (SPA) designed to provide a dynamic, highly responsive user experience.

### Core Technologies
*   **React (v19) & Vite**: The core library for building the interactive UI, powered by Vite for an optimized build and development environment.
*   **Tailwind CSS**: A utility-first CSS framework used for rapid, responsive UI styling directly within the JSX components.
*   **React Router & React Hook Form**: Standard libraries for handling complex nested layouts, routing, and efficient form validation.

### State Management (`Zustand`)
The application utilizes Zustand to manage authentication state globally. The `authStore.js` file contains a `useAuth` hook that holds the current user's login status and role, allowing any component to instantly verify authorization without complex prop drilling.

### Routing and Protection
Routing is managed centrally in `App.jsx` using `createBrowserRouter`.
*   **Role-Based Access Control (RBAC)**: The application features a `<ProtectedRoute>` wrapper component. It intercepts route transitions and checks the `authStore`. If a user lacks the required role, they are redirected, ensuring secure access to dashboards.
*   **Nested Routes**: Dashboards (like `AuthorDashboard`) utilize nested routes to render specific child components (like `AuthorArticles` or `WriteArticle`) within a persistent parent layout.

### API Communication
In `App.jsx`, Axios is globally configured with a `baseURL` pointing to the deployed Render backend API (`https://blog-app-z7aa.onrender.com`). Critically, `axios.defaults.withCredentials = true;` is set so the browser automatically includes the HTTP-only JWT cookie in every request sent to the backend, enabling secure, stateless session management.

---

## Quick Start Guide

To run this full-stack application locally, you will need to run both the frontend and backend development servers concurrently.

### 1. Start the Backend Server
1.  Navigate to the backend directory: `cd Blog-App-Backend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the root of the backend directory with the following keys:
    ```env
    PORT=5000
    DB_URL="your_mongodb_connection_string"
    SECRET_KEY="your_jwt_signing_secret"
    ```
4.  Start the server: `npm start`

### 2. Start the Frontend Client
1.  Open a new terminal window.
2.  Navigate to the frontend directory: `cd Blog-App-Frontend`
3.  Install dependencies: `npm install`
4.  Start the development server: `npm run dev`