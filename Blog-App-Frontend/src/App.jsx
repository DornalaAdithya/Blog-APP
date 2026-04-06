import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./stores/authStore";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AuthorDashboard from "./components/AuthorDashboard";
import AuthorArticles from "./components/AuthorArticles";
import WriteArticle from "./components/WriteArticle";
import ArticleByID from "./components/ArticleByID";
import EditArticle from "./components/EditArticle";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { loadingClass } from "./styles/common";
import ErrorBoundary from "./components/ErrorBoundary";
import axios from "axios";

axios.defaults.baseURL = "https://blog-app-z7aa.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  const { checkAuth, loading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <p className={loadingClass}>Loading...</p>;

  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "user-profile",
          element: (
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "author-profile",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <AuthorDashboard />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              path: "articles",
              element: <AuthorArticles />,
            },
            {
              path: "write-article",
              element: <WriteArticle />,
            },
          ],
        },
        {
          path: "article/:id",
          element: <ArticleByID />,
        },
        {
          path: "edit-article/:id",
          element: <EditArticle />,
        },
      ],
    },
  ]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;
