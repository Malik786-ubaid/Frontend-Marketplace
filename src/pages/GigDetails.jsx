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

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const gigData = await getSingleGig(id);
        setGig(gigData.gig);

        const reviewData = await getGigReviews(id);
        setReviews(reviewData.reviews || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview(id, {
        rating,
        comment,
      });

      alert("Review submitted successfully!");

      const reviewData = await getGigReviews(id);
      setReviews(reviewData.reviews || []);

      setRating(5);
      setComment("");
    } catch (error) {
      console.log(error);
      alert("Failed to submit review.");
    }
  };

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

      {/* Reviews */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Reviews
        </h2>

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
          <p className="text-gray-500">
            No reviews yet.
          </p>
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