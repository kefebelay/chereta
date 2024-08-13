import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// General routes

import MainPage from "./pages/shared/MainPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Categories from "./pages/shared/Category/Categories";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryItems from "./pages/shared/Category/CategoryItems";
import Products from "./pages/shared/Category/Products";
import ProductDetail from "./pages/shared/Category/ProductDetail";

// Seller routes

import SellerInfo from "./pages/Seller/SellerInfo";
import SellerDashboard from "./pages/Seller/SellerDashboardPage";
import SellerAnalytics from "./pages/Seller/Analytics";
import SellerProducts from "./pages/Seller/Products";
import Orders from "./pages/Seller/Orders";
import Comments from "./pages/Seller/Comments";
// Admin routes

import AdminDashboard from "./pages/Admin/AdminDashboardPage";
import UserManagement from "./pages/Admin/UserManagement";
import Analytics from "./pages/Admin/Analytics";
import Reports from "./pages/Admin/Reports";
import DeliveryPersonnel from "./pages/Admin/DeliveryPersonnel";
import Profile from "./pages/shared/Profile";
import Category from "./pages/Admin/Categories";

//end of routes and pages imported

export default function routes() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Buyer routes */}

          <Route exact path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/categories/:id" element={<CategoryItems />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin routes */}

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/analytics" element={<Analytics />} />
          <Route
            path="/admin/dashboard/user-management"
            element={<UserManagement />}
          />
          <Route path="/admin/dashboard/reports" element={<Reports />} />
          <Route path="/admin/dashboard/category" element={<Category />} />
          <Route
            path="/admin/dashboard/delivery-personnel"
            element={<DeliveryPersonnel />}
          />

          {/* Seller routes */}

          <Route path="/seller/info/:id" element={<SellerInfo />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/dashboard/:id" element={<SellerInfo />} />
          <Route
            path="/seller/dashboard/analytics"
            element={<SellerAnalytics />}
          />
          <Route
            path="/seller/dashboard/products"
            element={<SellerProducts />}
          />
          <Route path="/seller/dashboard/orders" element={<Orders />} />
          <Route path="/seller/dashboard/comments" element={<Comments />} />

          {/* General routes */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}
