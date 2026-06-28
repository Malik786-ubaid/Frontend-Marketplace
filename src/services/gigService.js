import API from "../api/axios";

export const createGig = async (gigData) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/gigs", gigData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllGigs = async () => {
  const response = await API.get("/gigs");
  return response.data;
};

export const getMyGigs = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/gigs/my-gigs/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};