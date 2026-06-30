import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyGigs,
  deleteGig,
} from "../services/gigService";

function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadGigs = async () => {
      try {
        const data = await getMyGigs();

        if (active) {
          setGigs(data.gigs || data);
        }
      } catch (error) {
        console.log(error);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gig?"
    );

    if (!confirmDelete) return;

    try {
      await deleteGig(id);

      setGigs((prev) =>
        prev.filter((gig) => gig._id !== id)
      );

      alert("Gig deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete gig.");
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Loading My Gigs...
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        My Gigs
      </h1>

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
          <h2 className="text-center text-2xl">
            No Gigs Found
          </h2>
        )}
      </div>
    </div>
  );
}

export default MyGigs;