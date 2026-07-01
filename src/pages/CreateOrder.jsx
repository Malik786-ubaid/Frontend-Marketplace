import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../services/orderService";

function CreateOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientName: "",
    projectTitle: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        projectTitle: formData.projectTitle,
        description: formData.description,
        budget: Number(formData.budget),
        deadline: formData.deadline,
      };

      const data = await createOrder(id, orderData);

      alert(data.message);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create order"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-4xl font-bold mb-8">
        Contact Freelancer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="text"
          name="clientName"
          placeholder="Your Name"
          value={formData.clientName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="projectTitle"
          placeholder="Project Title"
          value={formData.projectTitle}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="5"
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget ($)"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 cursor-pointer"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;