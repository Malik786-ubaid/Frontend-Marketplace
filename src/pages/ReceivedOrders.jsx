import { useEffect, useState } from "react";
import { getReceivedOrders, updateOrderStatus } from "../services/orderService";

function ReceivedOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getReceivedOrders();
      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
      setError("We couldn't load received orders right now. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        const data = await getReceivedOrders();
        if (isMounted) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      await loadOrders();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading received orders...</h2>
          <p className="mt-2 text-sm text-gray-500">Please wait while we retrieve your incoming requests.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="rounded-2xl border border-green-100 bg-linear-to-r from-green-50 via-white to-emerald-50 p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Received Orders</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Review incoming requests and manage them from one place.</p>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-red-700">Unable to load received orders</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <button
            onClick={() => void loadOrders()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-xl p-5 sm:p-6 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-semibold">{order.projectTitle}</h2>

              <p className="text-gray-600 mt-3">{order.description}</p>

              <p className="mt-3">
                <span className="font-bold">Client:</span> {order.client?.name}
              </p>

              <p className="mt-2">
                <span className="font-bold">Budget:</span> ${order.budget}
              </p>

              <p className="mt-2">
                <span className="font-bold">Gig Price:</span> ${order.price}
              </p>

              <p className="mt-2">
                <span className="font-bold">Deadline:</span> {new Date(order.deadline).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-white text-sm ${
                    order.status === "pending"
                      ? "bg-yellow-500"
                      : order.status === "in_progress"
                      ? "bg-blue-600"
                      : order.status === "completed"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {order.status === "pending" && (
                <button
                  onClick={() => handleStatus(order._id, "in_progress")}
                  className="mt-5 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 cursor-pointer shadow-sm"
                >
                  Accept Order
                </button>
              )}

              {order.status === "in_progress" && (
                <button
                  onClick={() => handleStatus(order._id, "completed")}
                  className="mt-5 w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 cursor-pointer shadow-sm"
                >
                  Complete Order
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-800">No orders received yet</h2>
            <p className="mt-2 text-sm text-gray-500">New client requests will appear here as soon as they arrive.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceivedOrders;