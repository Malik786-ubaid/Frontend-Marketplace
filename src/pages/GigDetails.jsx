import {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { getSingleGig } from "../services/gigService";
import {
  getGigReviews,
  createReview,
} from "../services/reviewService";

function GigDetails() {
  const { id } = useParams();

  const [gig, setGig] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchGig = async () => {
      setLoading(true);
      setError("");

      try {
        const gigData = await getSingleGig(id);
        const reviewData = await getGigReviews(id);

        if (isMounted) {
          setGig(gigData.gig);
          setReviews(reviewData.reviews || []);
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess("");

    try {
      await createReview(id, {
        rating,
        comment,
      });

      const reviewData = await getGigReviews(id);
      setReviews(reviewData.reviews || []);
      setReviewSuccess("Your review was submitted successfully.");
      setRating(5);
      setComment("");
    } catch (err) {
      console.error(err);
      setReviewError("We couldn't submit your review. Please try again.");
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    setError("");

    try {
      const gigData = await getSingleGig(id);
      const reviewData = await getGigReviews(id);
      setGig(gigData.gig);
      setReviews(reviewData.reviews || []);
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
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading gig details...</h2>
          <p className="mt-2 text-sm text-gray-500">Please wait while we fetch this listing and its reviews.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
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

  if (!gig) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Gig not found</h2>
          <p className="mt-2 text-sm text-gray-500">This gig may no longer be available.</p>
        </div>
      </div>
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

      {/* Reviews */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Reviews
        </h2>

        {reviewError ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {reviewError}
          </div>
        ) : null}

        {reviewSuccess ? (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {reviewSuccess}
          </div>
        ) : null}

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-5 mb-4 shadow-sm"
            >
              <h3 className="font-bold text-lg">
                {review.client?.name}
              </h3>

              <p className="text-yellow-500 mt-1">
                ⭐ {review.rating} / 5
              </p>

              <p className="text-gray-700 mt-2">
                {review.comment}
              </p>

            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500">
            No reviews yet. Be the first to share feedback.
          </div>
        )}

      </div>

      {/* Leave Review */}

      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Leave a Review
        </h2>

        <form
          onSubmit={handleReviewSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-semibold">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
              className="w-full border p-3 rounded-lg"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Comment
            </label>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              rows="4"
              required
              className="w-full border p-3 rounded-lg"
              placeholder="Write your review..."
            />

          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            Submit Review
          </button>

        </form>

      </div>

    </div>
  );
}

export default GigDetails;