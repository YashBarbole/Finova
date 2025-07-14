import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import axios from "axios";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/balance", {
          headers: { Authorization: token },
        });
        setBalance(res.data.balance);
      } catch (err) {
        setError("Could not fetch balance");
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full">
      <h1 className="text-3xl font-bold text-accent mt-8 mb-10">Your digital vault for everyday payments.</h1>
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch justify-center">
          <Card
            title="Balance"
            description="Check your current wallet balance."
            buttonText="View Balance"
            to="/balance"
            info={loading ? "Loading..." : error ? error : `\u20b9 ${balance}`}
          />
          <Card
            title="Send Money"
            description="Quickly transfer money to friends and family with just a few clicks. Secure and instant!"
            buttonText="Send Money"
            to="/send"
          />
          <Card
            title="Group Pay"
            description="Easily split bills and group expenses. No more calculation headaches—PaySmart does it for you!"
            buttonText="Group Pay"
            to="/group-pay"
          />
          <Card
            title="History"
            description="View your complete transaction history. Stay on top of your spending and transfers."
            buttonText="View History"
            to="/history"
          />
        </div>
      </div>
    </div>
  );
} 