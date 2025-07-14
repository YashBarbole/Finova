import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  if (!isAuth) return null;
  return (
    <div className="w-full flex justify-end p-4">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded shadow"
      >
        Logout
      </button>
    </div>
  );
}
