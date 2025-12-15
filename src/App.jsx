// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import PhonesPage from "./pages/PhonesPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import SalePage from "./pages/SalePage";
import TrendingPage from "./pages/TrendingPage";
import BestSellingPage from "./pages/BestSellingPage";
import TopRatedPage from "./pages/TopRatedPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./Route/ProtectedRoute";
import AdminRoute from "./Route/AdminRoute";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
