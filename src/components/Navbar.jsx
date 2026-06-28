import { Link } from "react-router-dom";

function Navbar() {
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;