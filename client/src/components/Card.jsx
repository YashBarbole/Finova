import { Link } from "react-router-dom";

export default function Card({ title, description, buttonText, to, info }) {
  return (
    <div className="bg-[#23272f] rounded-xl shadow-lg p-6 flex flex-col items-center w-full h-full transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-2 text-accent">{title}</h2>
      <p className="text-gray-300 mb-2 text-center">{description}</p>
      {info && (
        <div className="mb-4 mt-2 text-lg font-semibold text-green-400 bg-[#1a1e23] px-4 py-2 rounded">
          {info}
        </div>
      )}
      <Link to={to} className="w-full mt-auto">
        <button className="bg-accent hover:bg-cyan-400 text-black font-semibold w-full py-2 rounded text-lg">
          {buttonText}
        </button>
      </Link>
    </div>
  );
} 