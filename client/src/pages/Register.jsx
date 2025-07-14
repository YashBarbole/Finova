import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
        pin,
      });

      setSuccessMsg("✅ Registered successfully! You can now log in.");
      setName("");
      setEmail("");
      setPassword("");
      setPin("");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#1e1e1e] p-8 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6">📝 Register</h2>

      {errorMsg && <p className="text-red-400 mb-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-400 mb-4">{successMsg}</p>}

      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            minLength={6}
          />
        </div>

        <div>
          <label className="block mb-1">4-Digit PIN</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            minLength={4}
            maxLength={4}
            pattern="\d*"
            placeholder="e.g. 1234"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent hover:bg-cyan-400 text-black font-semibold py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
