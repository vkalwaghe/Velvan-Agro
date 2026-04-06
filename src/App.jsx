import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/CheckoutPage";

import Home from "./components/Home";
import Products from "./components/Products";
import Divisions from "./components/Divisions";
import DivisionPage from "./components/DivisionPage";
import Dealerships from "./components/Dealerships";

import Landing from "./components/Landing";
import Auth from "./components/Auth";
import AdminLogin from "./components/AdminLogin";
import Order from "./components/Order";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

import { CartProvider } from "./contexts/CartContext";
import "./App.css";

import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* ✅ Landing page */}
          <Route path="/" element={<Landing />} />
          {/* ✅ Auth page */}
          <Route path="/auth" element={<Auth />} />
          {/* ✅ Admin Login */}
          <Route path="/admin-login" element={<AdminLogin />} />  

          {/* ✅ Main app */}
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="divisions" element={<Divisions />} />
            <Route path="division/:division" element={<DivisionPage />} />
            <Route path="dealerships" element={<Dealerships />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<Order />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<CheckoutPage />} />

             {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* ✅ 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}