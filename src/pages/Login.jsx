import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Login
      </h2>

      {message && (
        <p className="mb-4 text-center text-green-600">
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        autoComplete="off"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;