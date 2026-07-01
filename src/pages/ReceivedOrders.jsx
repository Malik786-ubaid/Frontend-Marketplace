import { useEffect, useState } from "react";
import {
  getReceivedOrders,
  updateOrderStatus,
} from "../services/orderService";

function ReceivedOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await getReceivedOrders();
      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
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
      <h2 className="text-center text-2xl mt-10">
        Loading Orders...
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Received Orders
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-5"
            >
              <h2 className="text-2xl font-semibold">
                {order.projectTitle}
              </h2>

              <p className="text-gray-600 mt-3">
                {order.description}
              </p>

              <p className="mt-3">
                <span className="font-bold">
                  Client:
                </span>{" "}
                {order.client?.name}
              </p>

              <p className="mt-2">
                <span className="font-bold">
                  Budget:
                </span>{" "}
                ${order.budget}
              </p>

              <p className="mt-2">
                <span className="font-bold">
                  Gig Price:
                </span>{" "}
                ${order.price}
              </p>

              <p className="mt-2">
                <span className="font-bold">
                  Deadline:
                </span>{" "}
                {new Date(
                  order.deadline
                ).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
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
                  onClick={() =>
                    handleStatus(
                      order._id,
                      "in_progress"
                    )
                  }
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Accept Order
                </button>
              )}

              {order.status ===
                "in_progress" && (
                <button
                  onClick={() =>
                    handleStatus(
                      order._id,
                      "completed"
                    )
                  }
                  className="mt-5 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                  Complete Order
                </button>
              )}
            </div>
          ))
        ) : (
          <h2 className="text-xl">
            No Orders Received
          </h2>
        )}
      </div>
    </div>
  );
}

export default ReceivedOrders;