import { useState } from "react";

const fallbackStats = {
  totalUsers: 12,
  totalFreelancers: 5,
  totalClients: 7,
  totalGigs: 18,
  totalOrders: 9,
  totalReviews: 6,
};

const fallbackOrders = [
  { _id: 1, gig: { title: "Website" }, client: { name: "Ali" }, price: 200 },
  { _id: 2, gig: { title: "Logo" }, client: { name: "Sara" }, price: 150 },
  { _id: 3, gig: { title: "Mobile App" }, client: { name: "John" }, price: 300 },
];

const fallbackReviews = [
  { _id: 1, client: { name: "Ayesha" }, rating: 5, comment: "Great Work", gig: { title: "Website" } },
  { _id: 2, client: { name: "Bilal" }, rating: 4, comment: "Nice Design", gig: { title: "Logo" } },
  { _id: 3, client: { name: "Nadia" }, rating: 5, comment: "Excellent", gig: { title: "Mobile App" } },
];

export default function Dashboard() {
  const [stats] = useState(fallbackStats);
  const [revenue] = useState(1200);
  const [orders] = useState(fallbackOrders);
  const [reviews] = useState(fallbackReviews);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalUsers}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Total Freelancers</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalFreelancers}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Total Clients</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalClients}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Total Gigs</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalGigs}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalOrders}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Total Reviews</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalReviews}</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Revenue</h2>
        <p className="text-4xl font-bold text-green-600">${revenue}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="border-b py-3">
                <p className="font-semibold">{order.gig?.title}</p>
                <p className="text-sm text-gray-600">{order.client?.name}</p>
                <p className="text-green-600 font-bold">${order.price}</p>
              </div>
            ))
          ) : (
            <p>No Recent Orders</p>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="border-b py-3">
                <p className="font-semibold">{review.client?.name}</p>
                <p className="text-yellow-500">⭐ {review.rating}/5</p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500">Gig: {review.gig?.title}</p>
              </div>
            ))
          ) : (
            <p>No Reviews Yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
