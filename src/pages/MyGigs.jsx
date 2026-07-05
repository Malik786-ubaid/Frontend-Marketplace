import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyGigs,
  deleteGig,
} from "../services/gigService";

function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let active = true;

    const loadGigs = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getMyGigs();

        if (active) {
          setGigs(data.gigs || data);
        }
      } catch (err) {
        console.error(err);
        if (active) {
          setError("We couldn't load your gigs right now. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadGigs();

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this gig?");

    if (!confirmDelete) return;

    setError("");
    setSuccessMessage("");

    try {
      await deleteGig(id);
      setGigs((prev) => prev.filter((gig) => gig._id !== id));
      setSuccessMessage("Gig deleted successfully.");
    } catch (err) {
      console.error(err);
      setError("We couldn't delete this gig. Please try again.");
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMyGigs();
      setGigs(data.gigs || data);
    } catch (err) {
      console.error(err);
      setError("We couldn't load your gigs right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading your gigs...</h2>
          <p className="mt-2 text-sm text-gray-500">Please wait while we fetch your published work.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        My Gigs
      </h1>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-red-700">Unable to load gigs</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <button
            onClick={() => void handleRetry()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : null}

      {successMessage ? (
        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {successMessage}
        </div>
      ) : null}

      <div className="grid md:grid-cols-3 gap-6">
        {gigs.length > 0 ? (
          gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white shadow-lg rounded-xl p-5"
            >
              <img
                src={gig.image}
                alt={gig.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h2 className="text-2xl font-semibold mt-4">
                {gig.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {gig.description}
              </p>

              <p className="font-bold text-green-600 mt-3">
                ${gig.price}
              </p>

              <Link
                to={`/edit-gig/${gig._id}`}
                className="block mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center cursor-pointer"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(gig._id)}
                className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-800">No gigs found</h2>
            <p className="mt-2 text-sm text-gray-500">Create your first gig to start showcasing your work.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyGigs;