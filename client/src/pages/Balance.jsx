import { useEffect, useState } from "react";
import axios from "axios";

export default function Balance() {
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
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-[#23272f] rounded-xl shadow-lg p-8 flex flex-col items-center w-80">
        <h2 className="text-2xl font-bold mb-4 text-accent">Your Balance</h2>
        {loading ? (
          <div className="text-gray-300 text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-lg">{error}</div>
        ) : (
          <div className="text-3xl font-bold text-green-400 mb-2">₹ {balance}</div>
        )}
        <p className="text-gray-400 mt-2">This is your current wallet balance.</p>
      </div>
    </div>
  );
} 