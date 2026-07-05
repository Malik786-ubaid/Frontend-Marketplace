import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      setMessage(data.message || "Login Successful");

      if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.user) {
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("userName", data.user.name);
        }

        setFormData({
          email: "",
          password: "",
        });

        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
        <div
          className="hidden bg-emerald-600/95 p-8 text-white lg:flex lg:flex-col lg:justify-between"
          style={{ backgroundImage: "linear-gradient(135deg, #059669 0%, #10b981 45%, #14b8a6 100%)" }}
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l9 5-9 5-9-5 9-5z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-semibold">Welcome back</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-emerald-50">
              Sign in to manage your gigs, track orders, and keep your freelance work moving.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-emerald-50">
            <p className="font-medium">Fast, simple, secure access to your dashboard.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20a6 6 0 1112 0" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Login</h2>
              <p className="text-sm text-slate-500">Access your account in seconds</p>
            </div>
          </div>

          {message && (
            <div className={`mb-5 rounded-2xl border p-3 text-sm ${message.toLowerCase().includes("successful") ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary flex w-full items-center justify-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h.01" />
              </svg>
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New here?{' '}
            <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;