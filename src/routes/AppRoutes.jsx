import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateGig from "../pages/CreateGig";
import Dashboard from "../pages/Dashboard";
import MyGigs from "../pages/MyGigs";
import MyOrders from "../pages/MyOrders";
import ReceivedOrders from "../pages/ReceivedOrders";
import EditGig from "../pages/EditGig";
import GigDetails from "../pages/GigDetails";
import CreateOrder from "../pages/CreateOrder";
import Support from "../pages/Support";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/gig/:id" element={<GigDetails />} />

      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/create-gig"
        element={
          <ProtectedRoute>
            <CreateGig />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-gigs"
        element={
          <ProtectedRoute>
            <MyGigs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/received-orders"
        element={
          <ProtectedRoute>
            <ReceivedOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-gig/:id"
        element={
          <ProtectedRoute>
            <EditGig />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/support" element={<Support />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;