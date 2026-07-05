import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getRecentOrders,
  getRecentReviews,
  getRevenue,
} from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      setLoading(true);
      setError("");

      // Quick local token check: avoid calling protected endpoints when not logged in
      const token = localStorage.getItem("token");
      if (!token) {
        if (isMounted) {
          setLoading(false);
          setError("Please log in to view the dashboard.");
        }
        return;
      }

      try {
        const [statsData, revenueData, ordersData, reviewsData] = await Promise.all([
          getDashboardStats(),
          getRevenue(),
          getRecentOrders(),
          getRecentReviews(),
        ]);

        if (isMounted) {
          setStats(statsData.stats || null);
          setRevenue(revenueData.revenue || 0);
          setOrders(ordersData.orders || []);
          setReviews(reviewsData.reviews || []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          // If backend returns 401, show explicit login hint
          const status = err?.response?.status;
          if (status === 401) {
            setError("Session expired or not authenticated. Please log in.");
            // optionally clear token
            // localStorage.removeItem('token');
          } else if (status === 404) {
            setError("Dashboard data not available (missing API route).");
          } else {
            setError("We couldn't load your dashboard data right now. Please try again.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetry = async () => {
    setLoading(true);
    setError("");

    try {
      const [statsData, revenueData, ordersData, reviewsData] = await Promise.all([
        getDashboardStats(),
        getRevenue(),
        getRecentOrders(),
        getRecentReviews(),
      ]);

      setStats(statsData.stats || null);
      setRevenue(revenueData.revenue || 0);
      setOrders(ordersData.orders || []);
      setReviews(reviewsData.reviews || []);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setError("Session expired or not authenticated. Please log in.");
        setLoading(false);
        return;
      }
      console.error(err);
      setError("We couldn't load your dashboard data right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading dashboard...</h2>
          <p className="mt-2 text-sm text-gray-500">Please wait while we gather your latest insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-gray-50 min-h-screen">
      <div className="rounded-2xl border border-green-100 bg-linear-to-r from-green-50 via-white to-emerald-50 p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Track your activity, orders, revenue, and client feedback in one place.</p>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-red-700">Unable to load dashboard</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => void handleRetry()}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
            {(error.toLowerCase().includes("log in") || error.toLowerCase().includes("not authenticated") || error.toLowerCase().includes("session expired")) && (
              <button
                onClick={() => {
                  const next = encodeURIComponent(window.location.pathname + window.location.search);
                  window.location.href = `/login?next=${next}`;
                }}
                className="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 bg-white hover:bg-red-50"
              >
                Go to Login
              </button>
            )}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalUsers ?? 0}</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold">Total Freelancers</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalFreelancers ?? 0}</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold">Total Clients</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalClients ?? 0}</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold">Total Gigs</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalGigs ?? 0}</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalOrders ?? 0}</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold">Total Reviews</h2>
          <p className="text-3xl font-bold text-green-600 mt-3">{stats?.totalReviews ?? 0}</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100 mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Revenue</h2>
        <p className="text-3xl sm:text-4xl font-bold text-green-600">${revenue}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Recent Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="border-b border-gray-100 py-3 last:border-b-0">
                <p className="font-semibold">{order.gig?.title || order.projectTitle}</p>
                <p className="text-sm text-gray-600">{order.client?.name || order.clientName}</p>
                <p className="text-green-600 font-bold">${order.price || order.budget}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent orders yet.</p>
          )}
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Recent Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-100 py-3 last:border-b-0">
                <p className="font-semibold">{review.client?.name}</p>
                <p className="text-yellow-500">⭐ {review.rating}/5</p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500">Gig: {review.gig?.title}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
