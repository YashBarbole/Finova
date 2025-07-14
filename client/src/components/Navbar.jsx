import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" text-white py-3 px-3 px- w-full">
      <div className="flex items-center justify-between w-full  mx-auto">
        {/* Left: Logo */}
        <h1 className="text-2xl font-bold text-accent whitespace-nowrap">💳 PaySmart</h1>

        {/* Right: Navigation Links */}
        <div className="flex gap-6 text-xl font-medium whitespace-nowrap">
          <Link to="/" className="hover:text-accent">Login</Link>
          <Link to="/register" className="hover:text-accent">Register</Link>
          <Link to="/send" className="hover:text-accent">Send</Link>
          <Link to="/group-pay" className="hover:text-accent">Group Pay</Link>
          <Link to="/history" className="hover:text-accent">History</Link>
        </div>
      </div>
    </nav>
  );
}
