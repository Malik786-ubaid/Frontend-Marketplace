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

export const getAllGigs = async (
  search = "",
  category = "",
  sort = ""
) => {
  const response = await API.get("/gigs", {
    params: {
      search,
      category,
      sort,
    },
  });

  return response.data;
};

export const getSingleGig = async (id) => {
  const response = await API.get(`/gigs/${id}`);
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

export const deleteGig = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/gigs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateGig = async (id, gigData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(`/gigs/${id}`, gigData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};