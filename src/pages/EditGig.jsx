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
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchGig = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getSingleGig(id);
        const gig = data.gig || data;

        if (isMounted) {
          setFormData({
            title: gig.title || "",
            description: gig.description || "",
            price: gig.price || "",
            category: gig.category || "",
            tags: Array.isArray(gig.tags) ? gig.tags.join(", ") : "",
            image: gig.image || "",
          });
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("We couldn't load this gig right now. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchGig();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };

      await updateGig(id, updatedData);
      setSuccessMessage("Gig updated successfully.");
      setTimeout(() => navigate("/my-gigs"), 600);
    } catch (err) {
      console.error(err);
      setError("We couldn't update this gig. Please try again.");
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getSingleGig(id);
      const gig = data.gig || data;
      setFormData({
        title: gig.title || "",
        description: gig.description || "",
        price: gig.price || "",
        category: gig.category || "",
        tags: Array.isArray(gig.tags) ? gig.tags.join(", ") : "",
        image: gig.image || "",
      });
    } catch (err) {
      console.error(err);
      setError("We couldn't load this gig right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading gig details...</h2>
          <p className="mt-2 text-sm text-gray-500">Please wait while we prepare the form.</p>
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-red-700">Unable to load gig</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <button
            onClick={() => void handleRetry()}
            className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Gig
      </h1>

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {successMessage}
        </div>
      ) : null}

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