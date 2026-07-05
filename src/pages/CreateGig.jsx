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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-linear-to-r from-emerald-50 via-white to-teal-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Create a new gig</h2>
              <p className="text-sm text-slate-500">Showcase your work and attract the right clients.</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {message && (
            <div className={`mb-6 rounded-2xl border p-3 text-sm ${message.toLowerCase().includes("success") ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Gig title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Modern landing page design"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                placeholder="Describe what you will deliver"
                value={formData.description}
                onChange={handleChange}
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Web Design"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="React, Node, MongoDB"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="Paste image link"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              className="btn-primary flex w-full items-center justify-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
              Create Gig
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGig;