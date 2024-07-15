import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainPage from './pages/shared/MainPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import AdminDashboard from './pages/Admin/AdminDashboardPage'
import SellerDashboard from './pages/Seller/SellerDashboardPage'
import NotFoundPage from './pages/NotFoundPage'

export default function routes() {
  return (
    <div>
      <Router>
        <Routes>
            <Route exact path="/" element={<MainPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/admin/dashboard" element={<AdminDashboard />}/>
            <Route path="/seller/dashboard" element={<SellerDashboard />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </div>
  )
}
