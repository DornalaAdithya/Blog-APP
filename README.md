# Blog Platform

A full-stack blog application built with the MERN (MongoDB, Express.js, React, Node.js) stack. This platform allows users to read, create, and manage blog posts with role-based access control (User, Author, Admin).

### Project Link
https://blog-app-flax-three.vercel.app/

## Tech Stack

### Frontend (`Blog-App-Frontend`)
*   **Framework:** React 19 (via Vite)
*   **Styling:** Tailwind CSS v4
*   **State Management:** Zustand
*   **Routing:** React Router v7
*   **Form Handling:** React Hook Form
*   **HTTP Client:** Axios
*   **Notifications:** React Hot Toast

### Backend (`Blog-App-Backend`)
*   **Framework:** Node.js with Express.js
*   **Database:** MongoDB with Mongoose
*   **Authentication:** JSON Web Tokens (JWT) & bcryptjs (password hashing)
*   **File Uploads:** Multer & Cloudinary
*   **Other Tools:** CORS, Cookie Parser, Dotenv

## Features (Inferred)

*   **Role-Based Access:** Distinct routes and functionalities for Users, Authors, and Admins.
*   **Authentication:** Secure login and registration using JWT and HTTP-only cookies.
*   **Article Management:** Authors can create and manage their blog posts.
*   **Image Uploads:** Support for uploading cover images for blogs using Cloudinary.
*   **Responsive UI:** Built with Tailwind CSS for a seamless experience across devices.

## Getting Started

### Prerequisites
*   Node.js installed on your machine
*   MongoDB database (local or Atlas)
*   Cloudinary account for image hosting

### Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd Blog-App-Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `Blog-App-Backend` directory and add your environment variables (e.g., `PORT`, `DB_URL`, `SECRET_KEY`, Cloudinary credentials).
4.  Start the server:
    ```bash
    npm start # or node server.js
    ```

### Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd Blog-App-Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

*   `Blog-App-Backend/`: Contains the Express.js server, API routes, Mongoose models, controllers, and middleware.
*   `Blog-App-Frontend/`: Contains the React application, components, pages, Zustand stores, and assets.