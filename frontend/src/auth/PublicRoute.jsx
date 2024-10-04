import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectLoading } from "../auth/authSlice";
import LoadingScreen from "../common/LoadingScreen";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  if (loading) {
    return <LoadingScreen />;
  }
  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;
