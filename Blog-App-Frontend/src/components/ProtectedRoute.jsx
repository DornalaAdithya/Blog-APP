import { useAuth } from "../stores/authStore";
import { loadingClass } from "../styles/common";
import { Navigate } from "react-router";

function ProtectedRoute({ children, allowedRoles }) {
  //get user login status from store
  const { currentUser, isAuthenticated, loading } = useAuth();

  //loading state
  if (loading) {
    return <p className={loadingClass}>Loading...</p>;
  }

  //if user not loggedin
  if (!isAuthenticated) {
    //redirect to navigate --- naviagte() is used to navigate programatically like button click or some event
    //use Navigate component for this.
    return <Navigate to="/login" replace />;
  }

  //check role
  if (allowedRoles && (!currentUser || !allowedRoles.includes(currentUser.role))) {
    return <Navigate to="/register" replace />;
  }

  return children;
}

export default ProtectedRoute;
