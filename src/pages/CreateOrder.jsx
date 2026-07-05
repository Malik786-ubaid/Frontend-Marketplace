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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-linear-to-r from-emerald-50 via-white to-teal-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Contact freelancer</h1>
              <p className="text-sm text-slate-500">Send a clear project brief and get started quickly.</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Your name</label>
              <input
                type="text"
                name="clientName"
                placeholder="Enter your name"
                value={formData.clientName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Project title</label>
              <input
                type="text"
                name="projectTitle"
                placeholder="What do you need built?"
                value={formData.projectTitle}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Project description</label>
              <textarea
                name="description"
                placeholder="Share the details of your project"
                value={formData.description}
                onChange={handleChange}
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                rows="5"
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Budget ($)</label>
                <input
                  type="number"
                  name="budget"
                  placeholder="Enter budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary flex w-full items-center justify-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l7 7-7 7" />
              </svg>
              Place order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;