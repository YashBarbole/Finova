import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
      <h1 className="text-4xl font-bold mb-4 text-accent">Welcome to Finova 💳</h1>
      <p className="max-w-xl text-center mb-8 text-lg text-gray-300">
        PaySmart is your all-in-one digital wallet for fast, secure, and easy money transfers. Send money to friends, split group expenses, and track your transaction history—all in one place!
      </p>
      <div className="flex gap-6 mb-8">
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded text-lg shadow border-2 border-white">
            Sign In
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded text-lg shadow">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
} 