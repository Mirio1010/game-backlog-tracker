import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Features from "../pages/Features.jsx";
import About from "../pages/About.jsx";
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
