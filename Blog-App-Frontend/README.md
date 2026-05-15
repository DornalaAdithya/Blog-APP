# AI-Powered Resume Analyzer - Frontend

This is the frontend application for the AI-Powered Resume Analyzer, built using React and Vite. It provides an intuitive and responsive user interface for users to upload their resumes, view analysis results, and get actionable feedback to improve their professional profiles.

## Technologies Used

*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS 4
*   **Routing:** React Router v7
*   **State Management:** Zustand
*   **Form Handling:** React Hook Form
*   **HTTP Client:** Axios
*   **Notifications:** React Hot Toast

## Implementation Details

*   **Component Architecture:** The application follows a modular structure separated into `pages/` (for route-level views like Dashboard, Login, Resume Upload) and `components/` (for reusable UI elements like buttons, cards, and navigation bars).
*   **State Management:** `Zustand` is utilized in the `stores/` directory to manage global application state. This includes handling the user's authentication session, managing uploaded resume data, and storing the AI-generated analysis results without prop drilling.
*   **API Integration:** An `api/` module leverages Axios to communicate with the backend. It includes interceptors to automatically attach JWT authorization headers to requests requiring authentication and seamlessly handles token expiry.
*   **Routing:** Client-side routing is managed by `React Router`, enabling smooth transitions between the landing page, authentication screens, and the core resume analysis dashboard.
*   **Styling Strategy:** `Tailwind CSS` provides utility-first classes, allowing for rapid, responsive UI development directly within the JSX components, ensuring a consistent design system.

## Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root of the frontend directory and add necessary environment variables (e.g., your backend API URL).
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will typically start on `http://localhost:5173`.

## Available Scripts

*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Builds the application for production.
*   `npm run lint`: Runs ESLint to check for code quality and formatting issues.
*   `npm run preview`: Locally previews the production build.

## Project Structure

*   `src/`: Contains the main source code, components, pages, stores, and API utilities.
*   `public/`: Contains static assets.
*   `vite.config.js`: Configuration file for Vite.
*   `eslint.config.js`: ESLint configuration.
