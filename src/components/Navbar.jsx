import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          <Link
            to="/"
            className="text-2xl font-bold text-green-600"
          >
            Freelancers
          </Link>

          <div className="flex items-center gap-6">

            <Link
              to="/"
              className="text-gray-700 hover:text-green-600"
            >
              Home
            </Link>

            {token && role === "freelancer" && (
              <>
                <Link
                  to="/create-gig"
                  className="text-gray-700 hover:text-green-600"
                >
                  Create Gig
                </Link>

                <Link
                  to="/my-gigs"
                  className="text-gray-700 hover:text-green-600"
                >
                  My Gigs
                </Link>

                <Link
                  to="/received-orders"
                  className="text-gray-700 hover:text-green-600"
                >
                  Received Orders
                </Link>

                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}

            {token && role === "client" && (
              <>
                <Link
                  to="/my-orders"
                  className="text-gray-700 hover:text-green-600"
                >
                  My Orders
                </Link>

                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}

            {!token && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;