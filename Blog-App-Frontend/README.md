# Blog App Frontend

This directory contains the frontend client for the Blog Platform. It is a React Single Page Application (SPA) designed to provide a dynamic, role-based user experience for reading, authoring, and managing blog content.

## Technologies and Definitions

*   **React (v19)**: The core library used to build the interactive user interface.
*   **Vite**: The build tool utilized for a fast, optimized development environment.
*   **Tailwind CSS**: A utility-first CSS framework used for rapid, responsive UI styling directly within the JSX components.
*   **Zustand**: A small, fast, and scalable bearbones state management solution. Used here to manage global application state.
*   **React Router (`react-router-dom`)**: A standard library for routing in React. It enables the navigation among views of various components in the application, keeps the UI in sync with the URL, and handles complex nested layouts.
*   **Axios**: A promise-based HTTP client for the browser. It is used to make requests to the backend REST API.
*   **React Hook Form**: A library for flexible and extensible forms with easy-to-use validation.

## Architectural Deep Dive

### 1. State Management (`Zustand`)
The application utilizes Zustand to manage authentication state globally. 
*   **`authStore.js`**: Contains the `useAuth` hook. It holds the current user's login status and role, allowing any component in the application to instantly verify if a user is authenticated or authorized without complex prop drilling.

### 2. Routing and Protection
Routing is managed centrally in `App.jsx` using `createBrowserRouter`.
*   **Role-Based Access Control (RBAC)**: The application features a `<ProtectedRoute>` wrapper component. This component intercepts route transitions (like navigating to `/user-profile` or `/author-profile`) and checks the `authStore`. If the user does not have the required role (e.g., `["USER"]` or `["AUTHOR"]`), they are redirected, ensuring secure access to dashboards.
*   **Nested Routes**: The `AuthorDashboard` utilizes nested routes to render specific child components (like `AuthorArticles` or `WriteArticle`) within a persistent parent layout.

### 3. API Communication
*   **Axios Configuration**: In `App.jsx`, Axios is globally configured with a `baseURL` pointing to the deployed Render backend API. 
*   **Credentials**: Critically, `axios.defaults.withCredentials = true;` is set. This configuration is necessary for the browser to automatically include the HTTP-only JWT cookie in every request sent to the backend, enabling secure, stateless session management.

## Setup Instructions

1.  Navigate into this directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
