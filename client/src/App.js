import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import GuruDashboard from "./pages/GuruDashboard";
import KepsekDashboard from "./pages/KepsekDashboard";
import ProtectedRoute from "./ProtectedRoute";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/create-user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-user/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guru-dashboard"
          element={
            <ProtectedRoute allowedRoles={["guru"]}>
              <GuruDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kepsek-dashboard"
          element={
            <ProtectedRoute allowedRoles={["kepsek"]}>
              <KepsekDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
