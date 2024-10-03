import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  const role = document.cookie
    .split("; ")
    .find((row) => row.startsWith("role="));

  if (!token) {
    return <Navigate to="/" />;
  }

  const userRole = role ? role.split("=")[1] : null;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
