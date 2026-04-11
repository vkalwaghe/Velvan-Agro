import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";

import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/CheckoutPage";

import Home from "./components/Home";
import Category from "./components/Category";
import Products from "./components/Products";
import Divisions from "./components/Divisions";
import DivisionPage from "./components/DivisionPage";
import Dealerships from "./components/Dealerships";

import Landing from "./components/Landing";
import Auth from "./components/Auth";
import AdminLogin from "./components/AdminLogin";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

import Orders from "./pages/Orders";
import OrderTracking from "./pages/OrderTracking";




export default function App() {
  return (
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Layout Wrapper */}
        <Route element={<Layout />}>

          <Route path="/home" element={<Home />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/divisions" element={<Divisions />} />
          <Route path="/division/:division" element={<DivisionPage />} />
          <Route path="/dealerships" element={<Dealerships />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<Orders/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutPage />} />

           {/* ✅ ADD THIS */}
            <Route path="/track/:id" element={<OrderTracking />} />

            {/* OPTIONAL */}
            <Route path="/orders" element={<Orders />} />

        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
  );
  
}