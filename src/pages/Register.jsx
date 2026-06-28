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
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Register
      </h2>

      {message && (
        <p className="mb-4 text-center text-green-600">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

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
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;