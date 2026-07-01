import API from "../api/axios";

export const createOrder = async (gigId, orderData) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    `/orders/${gigId}`,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/orders/my-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getReceivedOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/orders/received",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateOrderStatus = async (
  id,
  status
) => {
  const token = localStorage.getItem("token");

  const response = await API.patch(
    `/orders/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};