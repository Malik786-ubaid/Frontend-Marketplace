import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateGig from "../pages/CreateGig";
import Dashboard from "../pages/Dashboard";
import MyGigs from "../pages/MyGigs";
import EditGig from "../pages/EditGig";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

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
    </Routes>
  );
}

export default AppRoutes;