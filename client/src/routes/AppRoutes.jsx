import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Features from "../pages/Features.jsx";
import About from "../pages/About.jsx";
import Signup from "../pages/Signup.jsx";
import DashBoard from "../pages/DashBoard.jsx";

import ProtectedRoutes from "../routes/ProtectedRoutes.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <DashBoard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
