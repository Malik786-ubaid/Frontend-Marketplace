import API from "../api/axios";

// Create Review
export const createReview = async (gigId, reviewData) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    `/reviews/${gigId}`,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get Reviews of a Gig
export const getGigReviews = async (gigId) => {
  const response = await API.get(
    `/reviews/gig/${gigId}`
  );

  return response.data;
};