import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MainLayout({ children }) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <div className="w-[260px] bg-blue-700 text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          MediStock
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            to="/dashboard"
            className="hover:bg-blue-800 p-3 rounded-lg transition"
          >
            Dashboard
          </Link>

          <Link
            to="/medicines"
            className="hover:bg-blue-800 p-3 rounded-lg transition"
          >
            Medicines
          </Link>

          <Link
            to="/alerts"
            className="hover:bg-blue-800 p-3 rounded-lg transition"
          >
            Alerts
          </Link>

          <Link
            to="/sales"
            className="hover:bg-blue-800 p-3 rounded-lg transition"
          >
            Sales
          </Link>

          <Link
            to="/ai-insights"
            className="hover:bg-blue-800 p-3 rounded-lg transition"
          >
            AI Insights
          </Link>

        </nav>

        {/* LOGOUT BUTTON */}

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 hover:bg-red-600 w-full p-3 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* PAGE CONTENT */}

      <div className="flex-1 p-6 overflow-y-auto">

        {children}

      </div>

    </div>
  );
}

export default MainLayout;