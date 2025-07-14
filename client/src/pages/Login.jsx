import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { token } = res.data;

      // store token in localStorage
      localStorage.setItem("token", token);

      alert("✅ Login successful!");
      // redirect if needed
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#1e1e1e] p-8 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6">🔐 Login</h2>

      {errorMsg && <p className="text-red-400 mb-4">{errorMsg}</p>}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent hover:bg-cyan-400 text-black font-semibold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
