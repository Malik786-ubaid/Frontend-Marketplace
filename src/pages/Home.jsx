import { useEffect, useState } from "react";
import { getAllGigs } from "../services/gigService";

function Home() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const data = await getAllGigs();

        setGigs(data.gigs || data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Loading Gigs...
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Freelance Marketplace
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {gigs.length > 0 ? (
          gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white shadow-lg rounded-xl p-5"
            >
              <img
                src={
                  gig.image ||
                  "https://picsum.photos/400/250"
                }
                alt={gig.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h2 className="text-2xl font-semibold mt-4">
                {gig.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {gig.description}
              </p>

              <p className="mt-3 font-bold text-green-600">
                ${gig.price}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {gig.category}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {gig.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-5 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                View Details
              </button>
            </div>
          ))
        ) : (
          <h2>No Gigs Found</h2>
        )}
      </div>
    </div>
  );
}

export default Home;