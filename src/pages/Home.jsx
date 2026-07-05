import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGigs } from "../services/gigService";

function Home() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadGigs = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getAllGigs(search, category, sort);
        if (isMounted) {
          setGigs(data.gigs || []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("We couldn't load gigs right now. Please refresh and try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadGigs();

    return () => {
      isMounted = false;
    };
  }, [search, category, sort]);

  const handleRetry = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAllGigs(search, category, sort);
      setGigs(data.gigs || []);
    } catch (err) {
      console.error(err);
      setError("We couldn't load gigs right now. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="rounded-2xl border border-green-100 bg-linear-to-r from-green-50 via-white to-emerald-50 p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Freelance Marketplace</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Discover talented freelancers and find the perfect gig for your next project.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search gigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="UI/UX">UI/UX</option>
          <option value="SEO">SEO</option>
          <option value="Writing">Writing</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 px-6 text-center shadow-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading gigs...</h2>
          <p className="mt-2 text-sm text-gray-500">Please wait while we fetch the latest opportunities.</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-red-700">Unable to load gigs</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <button
            onClick={() => void handleRetry()}
            className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {gigs.length > 0 ? (
            gigs.map((gig) => (
              <div key={gig._id} className="bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-xl p-5 border border-gray-100">
                <img
                  src={gig.image || "https://picsum.photos/400/250"}
                  alt={gig.title}
                  className="w-full h-48 sm:h-52 object-cover rounded-lg"
                />

                <h2 className="text-xl sm:text-2xl font-semibold mt-4">{gig.title}</h2>

                <p className="text-gray-600 mt-2 line-clamp-3">{gig.description}</p>

                <p className="mt-3 font-bold text-green-600">${gig.price}</p>
                <p className="text-sm text-gray-500 mt-2">{gig.category}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {gig.tags?.map((tag, index) => (
                    <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/gig/${gig._id}`}
                  className="block mt-5 w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 text-center cursor-pointer shadow-sm"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
              <h2 className="text-xl font-semibold text-gray-800">No gigs available right now</h2>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters to discover more opportunities.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;