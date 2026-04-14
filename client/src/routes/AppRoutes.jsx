import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<h1>Login</h1>} />
    </Routes>
  );
}

export default AppRoutes;
