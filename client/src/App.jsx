import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SendMoney from "./pages/SendMoney.jsx";
import GroupPay from "./pages/GroupPay.jsx";
import History from "./pages/History.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Balance from "./pages/Balance.jsx";
import { useState } from "react";


function RequireAuth({ children }) {
  const isAuth = !!localStorage.getItem("token");
  return isAuth ? children : <Navigate to="/login" replace />;
}

function RequireGuest({ children }) {
  const isAuth = !!localStorage.getItem("token");
  return !isAuth ? children : <Navigate to="/dashboard" replace />;
}

function App() {
  const location = window.location.pathname;
  const hideNavbar = ["/", "/login", "/register"].includes(location);
  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-sans p-4">
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<RequireGuest><Home /></RequireGuest>} />
          <Route path="/login" element={<RequireGuest><Login /></RequireGuest>} />
          <Route path="/register" element={<RequireGuest><Register /></RequireGuest>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/send" element={<RequireAuth><SendMoney /></RequireAuth>} />
          <Route path="/group-pay" element={<RequireAuth><GroupPay /></RequireAuth>} />
          <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
          <Route path="/balance" element={<RequireAuth><Balance /></RequireAuth>} />
          <Route path="*" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
