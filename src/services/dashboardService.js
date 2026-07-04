import API from "../api/axios";

const token = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboardStats = async () => {
  const response = await API.get("/dashboard", token());
  return response.data;
};

export const getRevenue = async () => {
  const response = await API.get("/dashboard/revenue", token());
  return response.data;
};

export const getRecentOrders = async () => {
  const response = await API.get(
    "/dashboard/recent-orders",
    token()
  );

  return response.data;
};

export const getRecentReviews = async () => {
  const response = await API.get(
    "/dashboard/recent-reviews",
    token()
  );

  return response.data;
};