import { useState } from "react";
import { createGig } from "../services/gigService";

function CreateGig() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    image: "",
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
      const gigData = {
        ...formData,
        price: Number(formData.price),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      const data = await createGig(gigData);

      setMessage(data.message || "Gig Created Successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        tags: "",
        image: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create gig"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">
        Create Gig
      </h2>

      {message && (
        <p className="text-center mb-4 text-green-600">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Gig Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (React,Node,MongoDB)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 cursor-pointer"
        >
          Create Gig
        </button>

      </form>
    </div>
  );
}

export default CreateGig;