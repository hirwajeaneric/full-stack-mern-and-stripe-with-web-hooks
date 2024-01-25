import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Return from "./pages/user_restricted_pages/Return";
import Home from "./pages/public_pages/Home";
import Checkout from "./pages/user_restricted_pages/Checkout";
import Cart from "./pages/user_restricted_pages/Cart";
import MainUserPage from "./pages/public_pages/MainUserPage";
import Products from "./pages/public_pages/Products";
import ProductDetails from "./pages/public_pages/ProductDetails";
import SignIn from "./pages/public_pages/SignIn";
import SignUp from "./pages/public_pages/SignUp";
import ResetPassword from "./pages/public_pages/ResetPassword";
import ForgotPassword from "./pages/public_pages/ForgotPassword";
import UserPages from "./pages/user_restricted_pages/UserPages";
import Orders from "./pages/user_restricted_pages/orders";
import Profile from "./pages/user_restricted_pages/Profile";
import DashboardMainPage from "./pages/admin_pages/DashboardMainPage";
import OrderDetails from "./pages/user_restricted_pages/OrderDetails";
import DashBoardHome from "./pages/admin_pages/DashBoardHome";
import OrderDetailsDash from "./pages/admin_pages/OrderDetailsDash";
import OrdersDash from "./pages/admin_pages/OrdersDash";
import ClientsDash from "./pages/admin_pages/ClientsDash";
import ProfileDash from "./pages/admin_pages/ProfileDash";
import SignInAdmin from "./pages/admin_pages/authentication/SignInAdmin";
import SignUpAdmin from "./pages/admin_pages/authentication/SignUpAdmin";
import ResetPasswordAdmin from "./pages/admin_pages/authentication/ResetPasswordAdmin";
import ForgotPasswordAdmin from "./pages/admin_pages/authentication/ForgotPasswordAdmin";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" elements={<MainUserPage />}>
            {/* Public pages  */}
            <Route path="/" element={<Home />} />
            <Route path="/products" elements={<Products />} />
            <Route path="/product/:productId" elements={<ProductDetails />} />
            <Route path="/signin" elements={<SignIn />} />
            <Route path="/signup" elements={<SignUp />} />
            <Route path="/reset-password" elements={<ResetPassword />} />
            <Route path="/forgot-password" elements={<ForgotPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/return" element={<Return />} />

            {/* User-specific and restricted pages  */}
            <Route path="/account" element={<UserPages />}>
              <Route path="" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order/:orderId" element={<OrderDetails />} />
            </Route>
          </Route>

          {/* Dashboard Authenticaiton  */}
          <Route path="/admin/signin" elements={<SignInAdmin />} />
          <Route path="/admin/signup" elements={<SignUpAdmin />} />
          <Route path="/admin/reset-password" elements={<ResetPasswordAdmin />} />
          <Route path="/admin/forgot-password" elements={<ForgotPasswordAdmin />} />

          {/* Dashboard Pages  */}
          <Route path="/dashboard" element={<DashboardMainPage />}>
            <Route path="" element={<DashBoardHome />} />
            <Route path="clients" element={<ClientsDash />} />
            <Route path="orders" element={<OrdersDash />} />
            <Route path="order/:orderId" element={<OrderDetailsDash />} />
            <Route path="profile" element={<ProfileDash />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;