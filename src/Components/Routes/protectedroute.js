import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const ProtectedRoute = ({ redirectPath = "/signup", children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
