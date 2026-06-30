import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-600"
          >
            Freelancers
          </Link>

          <div className="flex items-center gap-6">
            {/* Home */}
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600"
            >
              Home
            </Link>

            {token ? (
              <>
                {/* Create Gig */}
                <Link
                  to="/create-gig"
                  className="text-gray-700 hover:text-green-600"
                >
                  Create Gig
                </Link>

                {/* My Gigs */}
                <Link
                  to="/my-gigs"
                  className="text-gray-700 hover:text-green-600"
                >
                  My Gigs
                </Link>

                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600"
                >
                  Dashboard
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600"
                >
                  Login
                </Link>

                {/* Register */}
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