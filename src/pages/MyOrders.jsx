import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data.orders || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
        My Orders
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

              <p className="mt-4 font-bold text-green-600">
                Budget: ${order.budget}
              </p>

              <p className="mt-2">
                <span className="font-bold">
                  Gig Price:
                </span>{" "}
                ${order.price}
              </p>

              <p className="mt-2">
                <span className="font-bold">
                  Freelancer:
                </span>{" "}
                {order.freelancer?.name}
              </p>

              <p className="mt-2">
                <span className="font-bold">
                  Deadline:
                </span>{" "}
                {new Date(order.deadline).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
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
                Ordered on{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

            </div>
          ))
        ) : (
          <h2 className="text-xl">
            No Orders Found
          </h2>
        )}

      </div>

    </div>
  );
}

export default MyOrders;