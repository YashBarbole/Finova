import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/transactions", {
          headers: { Authorization: token },
        });
        setTransactions(res.data.transactions);
      } catch (err) {
        setError("Could not fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[#1e1e1e] p-8 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-accent">📜 Transaction History</h2>
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : transactions.length === 0 ? (
        <div className="text-gray-400">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-accent text-lg">
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Amount (₹)</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => {
                const isSent = txn.sender && txn.sender._id === JSON.parse(atob(localStorage.getItem("token").split(".")[1])).userId;
                return (
                  <tr key={txn._id} className="bg-[#23272f] rounded-lg">
                    <td className="px-4 py-2 text-gray-300">{new Date(txn.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2 font-semibold {isSent ? 'text-red-400' : 'text-green-400'}">
                      {isSent ? "Sent" : "Received"}
                    </td>
                    <td className="px-4 py-2">{txn.sender ? txn.sender.email : "-"}</td>
                    <td className="px-4 py-2">{txn.receiver ? txn.receiver.email : "-"}</td>
                    <td className="px-4 py-2">{txn.amount}</td>
                    <td className={`px-4 py-2 font-bold ${txn.status === "success" ? "text-green-400" : "text-red-400"}`}>{txn.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
  