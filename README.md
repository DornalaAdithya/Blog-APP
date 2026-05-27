# Full-Stack Blog Platform

This repository houses the complete source code for a comprehensive, full-stack blogging platform. The project is divided into two distinct, decoupled environments: a React-based frontend client and an Express-based Node.js backend API.

## High-Level Architecture

The application follows a standard MERN (MongoDB, Express, React, Node.js) stack architecture.
*   **Client Interface (`Blog-App-Frontend`)**: A Single Page Application (SPA) built with React 19 and Vite. It handles the presentation layer, complex state management, and role-based routing (Admin, Author, User).
*   **Server API (`Blog-App-Backend`)**: A RESTful API built with Express.js. It manages database interactions with MongoDB, enforces business logic, handles secure password hashing, and issues JSON Web Tokens (JWT) for stateless authentication.

## Directory Structure

*   `Blog-App-Frontend/`: Contains the React application code. Detailed documentation for the frontend architecture can be found in `Blog-App-Frontend/README.md`.
*   `Blog-App-Backend/`: Contains the Node.js/Express server code. Detailed documentation for the backend architecture and API routes can be found in `Blog-App-Backend/README.md`.

## Quick Start Guide

To run this full-stack application locally, you will need to run both the frontend and backend development servers concurrently.

### 1. Start the Backend Server
1.  Navigate to the backend directory: `cd Blog-App-Backend`
2.  Install dependencies: `npm install`
3.  Configure your environment variables (see `Blog-App-Backend/README.md` for specific keys like `DB_URL`).
4.  Start the server: `npm start`

### 2. Start the Frontend Client
1.  Open a new terminal window.
2.  Navigate to the frontend directory: `cd Blog-App-Frontend`
3.  Install dependencies: `npm install`
4.  Start the development server: `npm run dev`

The frontend application is pre-configured via Axios to communicate with the backend. 

## Deployment
The backend API is currently configured for deployment on Render. The frontend Axios configuration (`axios.defaults.baseURL`) points to `https://blog-app-z7aa.onrender.com` by default.