import { useState } from "react";
import axios from "axios";

export default function SendMoney() {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/send",
        { receiverEmail, amount, pin },
        { headers: { Authorization: token } }
      );
      setSuccessMsg(res.data.msg || "Money sent successfully!");
      setReceiverEmail("");
      setAmount("");
      setPin("");
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || "Failed to send money");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#1e1e1e] p-8 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-accent">💸 Send Money</h2>
      {errorMsg && <p className="text-red-400 mb-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-400 mb-4">{successMsg}</p>}
      <form onSubmit={handleSend} className="space-y-5">
        <div>
          <label className="block mb-1">Recipient Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            required
            placeholder="Enter recipient's email"
          />
        </div>
        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={1}
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block mb-1">Your PIN</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            minLength={4}
            maxLength={4}
            pattern="\d*"
            placeholder="Enter your 4-digit PIN"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded text-lg shadow border-2 border-white"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
  