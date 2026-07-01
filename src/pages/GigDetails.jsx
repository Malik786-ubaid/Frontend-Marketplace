import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleGig } from "../services/gigService";

function GigDetails() {
  const { id } = useParams();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const data = await getSingleGig(id);
        setGig(data.gig);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  if (loading) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Loading Gig...
      </h2>
    );
  }

  if (!gig) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Gig Not Found
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={gig.image}
            alt={gig.title}
            className="w-full h-105 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {gig.title}
          </h1>

          <p className="text-gray-600 mt-5 leading-8">
            {gig.description}
          </p>

          <div className="mt-6 space-y-3">

            <h2 className="text-3xl font-bold text-green-600">
              ${gig.price}
            </h2>

            <p>
              <span className="font-bold">
                Category:
              </span>{" "}
              {gig.category}
            </p>

            <p>
              <span className="font-bold">
                Freelancer:
              </span>{" "}
              {gig.freelancer?.name}
            </p>

            <p>
              <span className="font-bold">
                Email:
              </span>{" "}
              {gig.freelancer?.email}
            </p>

          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {gig.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            to={`/order/${gig._id}`}
            className="block mt-8 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-center cursor-pointer"
          >
            Contact Freelancer
          </Link>

        </div>

      </div>
    </div>
  );
}

export default GigDetails;