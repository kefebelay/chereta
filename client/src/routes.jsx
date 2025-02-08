/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "./hooks/Users_Hook";
import "./styles/Auth.css";

// General routes
import MainPage from "./pages/shared/MainPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Categories from "./pages/shared/Category/Categories";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryItems from "./pages/shared/Category/CategoryItems";
import Products from "./pages/shared/Category/Products";
import ProductDetail from "./pages/shared/Category/ProductDetail";
import Notification from "./pages/shared/Notification";
import SearchResults from "./pages/SearchResults";
import FavoriteListings from "./pages/Buyer/Favorite";
import About from "./components/common/About";
import How_It_Works from "./components/common/How_It_Works";
import Why_choose_us from "./components/common/Why_choose_us";
// Buyer routes
import MyBids from "./pages/Buyer/MyBids";
import BidPage from "./pages/Buyer/BidPage";
import BuyerDashboardPage from "./pages/Buyer/BuyerDashboard";
import WinningBids from "./pages/Buyer/WinningBids";
import Favorites from "./pages/Buyer/Favorite";
import DeliveryTracking from "./pages/Buyer/DeliveryTracking";
import OngoingBids from "./pages/Buyer/OngoingBids";
import DeliveryPage from "./pages/Buyer/DeliveryPage";

// Seller routes
import SellerInfo from "./pages/Seller/SellerInfo";
import SellerDashboard from "./pages/Seller/SellerDashboardPage";
import SellerAnalytics from "./pages/Seller/Analytics";
import SellerProducts from "./pages/Seller/Products";
import Orders from "./pages/Seller/Orders";
import Comments from "./pages/Seller/Comments";
import CompanyProfile from "./pages/Seller/CompanyProfile";
import IndividualProfile from "./pages/Seller/IndividualProfile";

// Admin routes
import AdminDashboard from "./pages/Admin/AdminDashboardPage";
import UserManagement from "./pages/Admin/UserManagement";
import Analytics from "./pages/Admin/Analytics";
import Reports from "./pages/Admin/Reports";
import DeliveryPersonnel from "./pages/Admin/DeliveryPersonnel";
import Profile from "./pages/Buyer/Profile";
import Category from "./pages/Admin/Categories";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import CreateProduct from "./pages/Seller/CreateProduct";
import OrderList from "./pages/Buyer/OrdersList";

// Delivery person routes
import DeliveryPersonnelDashboardPage from "./pages/DeliveryPersonnel/DeliveryPersonnelDashboardPage";
import DeliveryAnalytics from "./pages/DeliveryPersonnel/Analytics";
import DeliveryHistory from "./pages/DeliveryPersonnel/History";
import DeliveryOrders from "./pages/DeliveryPersonnel/Orders";
import ResetPassword from "./pages/Auth/ResetPassword";
import Loading from "./components/common/Loading";
import SignUp from "./components/Buyer/SignUp";

export default function App() {
  const { user } = useContext(UsersContext);

  const ProtectedRoute = ({ element, roles }) => {
    if (!user) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      );
    }
    if (roles && !roles.includes(user.roles[0].name)) {
      return (
        <div>
          <NotFoundPage />
        </div>
      );
    }
    return element;
  };

  const RedirectRoute = ({ element }) => {
    if (!user || user.roles[0].name === "buyer") {
      return element;
    }
    const userRole = user.roles[0].name;
    if (userRole === "buyer") {
      return <Navigate to="/buyer/dashboard" />;
    } else if (
      userRole === "individual_seller" ||
      userRole === "company_seller"
    ) {
      return <Navigate to="/seller/dashboard" />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (userRole === "delivery_person") {
      return <Navigate to="/delivery/dashboard" />;
    }
    return element;
  };

  return (
    <Router>
      <Routes>
        {/* General routes */}
        <Route
          exact
          path="/"
          element={<RedirectRoute element={<MainPage />} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/seller/register" element={<RegisterPage />} />
        <Route
          path="/categories"
          element={<RedirectRoute element={<Categories />} />}
        />
        <Route
          path="/category/:id/products"
          element={<RedirectRoute element={<CategoryItems />} />}
        />
        <Route
          path="/products"
          element={<RedirectRoute element={<Products />} />}
        />
        <Route
          path="/favorites"
          element={<RedirectRoute element={<FavoriteListings />} />}
        />
        <Route
          path="/product/:id"
          element={<RedirectRoute element={<ProductDetail />} />}
        />
        <Route
          path="/notifications"
          element={<RedirectRoute element={<Notification />} />}
        />
        <Route
          path="/seller/info/:id"
          element={<RedirectRoute element={<SellerInfo />} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/search"
          element={<RedirectRoute element={<SearchResults />} />}
        />
        <Route
          path="/about"
          element={<RedirectRoute element={<About />} />}
        />
        <Route
          path="/how-it-works"
          element={<RedirectRoute element={<How_It_Works />} />}
        />
        <Route
          path="/why-choose-us"
          element={<RedirectRoute element={<Why_choose_us />} />}
        />

        {/* Buyer routes */}
        <Route
          path="/my-bids"
          element={<ProtectedRoute element={<MyBids />} roles={["buyer"]} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} roles={["buyer"]} />}
        />
        <Route
          path="/bid-page"
          element={<ProtectedRoute element={<BidPage />} roles={["buyer"]} />}
        />
        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute
              element={<BuyerDashboardPage />}
              roles={["buyer"]}
            />
          }
        />
        <Route
          path="/ongoing-bids"
          element={
            <ProtectedRoute element={<OngoingBids />} roles={["buyer"]} />
          }
        />
        <Route
          path="/winning-bids"
          element={
            <ProtectedRoute element={<WinningBids />} roles={["buyer"]} />
          }
        />
        <Route
          path="/favorites"
          element={<ProtectedRoute element={<Favorites />} roles={["buyer"]} />}
        />
        <Route
          path="/delivery-tracking"
          element={
            <ProtectedRoute element={<DeliveryTracking />} roles={["buyer"]} />
          }
        />
        <Route
          path="/delivery-page/:id"
          element={
            <ProtectedRoute element={<DeliveryPage />} roles={["buyer"]} />
          }
        />
        <Route
          path="/orderlist"
          element={<ProtectedRoute element={<OrderList />} roles={["buyer"]} />}
        />

        {/* Seller routes */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute
              element={<SellerDashboard />}
              roles={["individual_seller", "company_seller"]}
            />
          }
        />
        <Route
          path="/seller/dashboard/analytics"
          element={
            <ProtectedRoute
              element={<SellerAnalytics />}
              roles={["individual_seller", "company_seller"]}
            />
          }
        />
        <Route
          path="/seller/dashboard/products"
          element={
            <ProtectedRoute
              element={<SellerProducts />}
              roles={["individual_seller", "company_seller"]}
            />
          }
        />
        <Route
          path="/seller/dashboard/create-products"
          element={
            <ProtectedRoute
              element={<CreateProduct />}
              roles={["individual_seller", "company_seller"]}
            />
          }
        />
        <Route
          path="/seller/dashboard/orders"
          element={
            <ProtectedRoute
              element={<Orders />}
              roles={["individual_seller", "company_seller"]}
            />
          }
        />
        <Route
          path="/seller/dashboard/comments"
          element={
            <ProtectedRoute
              element={<Comments />}
              roles={["individual_seller", "company_seller"]}
            />
          }
        />
        <Route
          path="/seller/company/profile"
          element={
            <ProtectedRoute
              element={<CompanyProfile />}
              roles={["company_seller"]}
            />
          }
        />
        <Route
          path="/seller/profile"
          element={
            <ProtectedRoute
              element={<IndividualProfile />}
              roles={["individual_seller"]}
            />
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute element={<AdminDashboard />} roles={["admin"]} />
          }
        />
        <Route
          path="/admin/dashboard/analytics"
          element={<ProtectedRoute element={<Analytics />} roles={["admin"]} />}
        />
        <Route
          path="/admin/dashboard/user-management"
          element={
            <ProtectedRoute element={<UserManagement />} roles={["admin"]} />
          }
        />
        <Route
          path="/admin/dashboard/reports"
          element={<ProtectedRoute element={<Reports />} roles={["admin"]} />}
        />
        <Route
          path="/admin/dashboard/category"
          element={<ProtectedRoute element={<Category />} roles={["admin"]} />}
        />
        <Route
          path="/admin/dashboard/delivery-personnel"
          element={
            <ProtectedRoute element={<DeliveryPersonnel />} roles={["admin"]} />
          }
        />

        {/* Delivery person routes */}
        <Route
          path="/delivery/dashboard"
          element={
            <ProtectedRoute
              element={<DeliveryPersonnelDashboardPage />}
              roles={["delivery_person"]}
            />
          }
        />
        <Route
          path="/delivery/dashboard/analytics"
          element={
            <ProtectedRoute
              element={<DeliveryAnalytics />}
              roles={["delivery_person"]}
            />
          }
        />
        <Route
          path="/delivery/dashboard/history"
          element={
            <ProtectedRoute
              element={<DeliveryHistory />}
              roles={["delivery_person"]}
            />
          }
        />
        <Route
          path="/delivery/dashboard/orders"
          element={
            <ProtectedRoute
              element={<DeliveryOrders />}
              roles={["delivery_person"]}
            />
          }
        />

        {/* Not found route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
