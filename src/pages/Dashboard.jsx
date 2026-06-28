function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">
            Total Orders
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            0
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">
            Revenue
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            $0
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">
            Recent Activity
          </h2>
          <p className="text-gray-500 mt-2">
            No activity yet
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;