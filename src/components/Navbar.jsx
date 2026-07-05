import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    closeMenu();
    navigate("/login");
  };

  const linkClass = "text-gray-700 hover:text-green-600 transition-colors font-medium";

  const renderLinks = (className = linkClass) => (
    <>
      <Link to="/" className={className} onClick={closeMenu}>
        Home
      </Link>

      {token && role === "freelancer" && (
        <>
          <Link to="/create-gig" className={className} onClick={closeMenu}>
            Create Gig
          </Link>
          <Link to="/my-gigs" className={className} onClick={closeMenu}>
            My Gigs
          </Link>
          <Link to="/received-orders" className={className} onClick={closeMenu}>
            Received Orders
          </Link>
          <Link to="/dashboard" className={className} onClick={closeMenu}>
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer text-left shadow-sm"
          >
            Logout
          </button>
        </>
      )}

      {token && role === "client" && (
        <>
          <Link to="/my-orders" className={className} onClick={closeMenu}>
            My Orders
          </Link>
          <Link to="/dashboard" className={className} onClick={closeMenu}>
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer text-left"
          >
            Logout
          </button>
        </>
      )}

      {!token && (
        <>
          <Link to="/login" className={className} onClick={closeMenu}>
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center shadow-sm"
            onClick={closeMenu}
          >
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-green-600 tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l9 5-9 5-9-5 9-5z" />
              </svg>
            </span>
            <span>Freelancers</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {renderLinks()}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-3 pt-4 px-1">
              {renderLinks("text-gray-700 hover:text-green-600 py-1")}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;