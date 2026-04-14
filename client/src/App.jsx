import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./components/layout/Header.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./styles/index.css";

function App() {
    return (
      <>
        <Header />
        <AppRoutes />
        
      </>
    );
}

export default App
