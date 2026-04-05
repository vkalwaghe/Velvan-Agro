import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Home from './components/Home'
import Products from './components/Products'
import Divisions from './components/Divisions'
import DivisionPage from './components/DivisionPage'
import Dealerships from './components/Dealerships'

import Order from './components/Order'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import { CartProvider } from './contexts/CartContext'
import './App.css'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="divisions" element={<Divisions />} />
            <Route path="division/:division" element={<DivisionPage />} />
            <Route path="dealerships" element={<Dealerships />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<Order />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
