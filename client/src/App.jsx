import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendMoney from "./pages/SendMoney";
import GroupPay from "./pages/GroupPay";
import History from "./pages/History";
import Navbar from "./components/Navbar";



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-sans p-4">
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/group-pay" element={<GroupPay />} />
          <Route path="/history" element={<History />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
