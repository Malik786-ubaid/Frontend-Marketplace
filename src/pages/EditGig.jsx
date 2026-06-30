import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleGig,
  updateGig,
} from "../services/gigService";

function EditGig() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const data = await getSingleGig(id);

        const gig = data.gig || data;

        setFormData({
          title: gig.title || "",
          description: gig.description || "",
          price: gig.price || "",
          category: gig.category || "",
          tags: Array.isArray(gig.tags)
            ? gig.tags.join(", ")
            : "",
          image: gig.image || "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim()),
      };

      await updateGig(id, updatedData);

      alert("Gig updated successfully!");

      navigate("/my-gigs");
    } catch (error) {
      console.log(error);
      alert("Failed to update gig.");
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Gig
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
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
          rows="4"
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
          placeholder="Tags (comma separated)"
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
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 cursor-pointer"
        >
          Update Gig
        </button>
      </form>
    </div>
  );
}

export default EditGig;