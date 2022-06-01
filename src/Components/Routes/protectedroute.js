import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/authcontext";

const ProtectedRoute = ({ redirectPath = "/signup", children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
