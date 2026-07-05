import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
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
      const data = await registerUser(formData);

      setMessage(data.message || "Registration Successful");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "client",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1.02fr_0.98fr]">
        <div
          className="hidden bg-slate-900 p-8 text-white lg:flex lg:flex-col lg:justify-between"
          style={{ backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1f2937 40%, #059669 100%)" }}
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-semibold">Join Freelancers</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-200">
              Create an account to hire top talent or showcase your services with a polished profile.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-slate-100">
            <p className="font-medium">Fast onboarding with a tailored experience for clients and freelancers.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                <circle cx="9.5" cy="7" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3a3 3 0 010 6" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Register</h2>
              <p className="text-sm text-slate-500">Create your account and get started</p>
            </div>
          </div>

          {message && (
            <div className={`mb-5 rounded-2xl border p-3 text-sm ${message.toLowerCase().includes("successful") ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

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
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Account type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              >
                <option value="client">Client</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary flex w-full items-center justify-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l7 7-7 7" />
              </svg>
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;