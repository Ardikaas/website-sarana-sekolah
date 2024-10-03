import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import GuruDashboard from "./pages/GuruDashboard";
import KepsekDashboard from "./pages/KepsekDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/guru-dashboard" element={<GuruDashboard />} />
        <Route path="/kepsek-dashboard" element={<KepsekDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
