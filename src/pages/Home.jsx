import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGigs } from "../services/gigService";

function Home() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const data = await getAllGigs(
          search,
          category,
          sort
        );

        setGigs(data.gigs || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [search, category, sort]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Freelance Marketplace
      </h1>

      {/* Search Filter Sort */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search gigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">All Categories</option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="Mobile Development">
            Mobile Development
          </option>

          <option value="Graphic Design">
            Graphic Design
          </option>

          <option value="UI/UX">
            UI/UX
          </option>

          <option value="SEO">
            SEO
          </option>

          <option value="Writing">
            Writing
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">Sort By</option>

          <option value="low">
            Price Low → High
          </option>

          <option value="high">
            Price High → Low
          </option>
        </select>

      </div>

      {loading ? (
        <h2 className="text-center text-2xl mt-10">
          Loading Gigs...
        </h2>
      ) : (
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

                <Link
                  to={`/gig/${gig._id}`}
                  className="block mt-5 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-center cursor-pointer"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <h2 className="text-center text-2xl">
              No Gigs Found
            </h2>
          )}

        </div>
      )}
    </div>
  );
}

export default Home;