import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getMyOrders();
        if (isMounted) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(
            "We couldn't load your orders right now. Please try again shortly.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetry = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMyOrders();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      setError(
        "We couldn't load your orders right now. Please try again shortly.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Loading your orders...
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please wait while we fetch your recent activity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="rounded-2xl border border-green-100 bg-linear-to-r from-green-50 via-white to-emerald-50 p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          My Orders
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Keep track of your current and completed project requests.
        </p>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load orders
          </h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <button
            onClick={() => void handleRetry()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-xl p-5 sm:p-6 border border-gray-100"
            >
              <h2 className="text-xl sm:text-2xl font-semibold">
                {order.projectTitle}
              </h2>

              <p className="text-gray-600 mt-3">{order.description}</p>

              <p className="mt-4 font-bold text-green-600">
                Budget: ${order.budget}
              </p>

              <p className="mt-2">
                <span className="font-bold">Gig Price:</span> ${order.price}
              </p>

              <p className="mt-2">
                <span className="font-bold">Freelancer:</span>{" "}
                {order.freelancer?.name}
              </p>

              <p className="mt-2">
                <span className="font-bold">Deadline:</span>{" "}
                {new Date(order.deadline).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-white text-sm ${
                    order.status === "pending"
                      ? "bg-yellow-500"
                      : order.status === "in_progress"
                        ? "bg-blue-500"
                        : order.status === "completed"
                          ? "bg-green-600"
                          : "bg-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-5">
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No orders found
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              You don’t have any orders yet. Once a request is placed, it will
              appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
