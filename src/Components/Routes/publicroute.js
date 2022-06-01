import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/authcontext";

const PublicRoute = ({ redirectPath = "/timeline", children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};

export default PublicRoute;
