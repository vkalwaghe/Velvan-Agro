import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQty,
    decreaseQty,
    total,
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  // GST & Delivery
  const gst = Math.round(total * 0.05); // 5% GST
  const delivery = total > 500 ? 0 : 50;

  const finalTotal = total + gst + delivery - discount;

  const { user } = useAuth();
  const navigate = useNavigate();

  function applyCoupon() {
    if (coupon === "SAVE10") {
      setDiscount(100);
      setMessage("✅ Coupon applied! ₹100 off");
    } else if (coupon === "FARM20") {
      setDiscount(200);
      setMessage("✅ Coupon applied! ₹200 off");
    } else {
      setDiscount(0);
      setMessage("❌ Invalid coupon");
    }
  }

  return (
    <div className="cart-page">

      {/* LEFT */}
      <div className="cart-left">
        <h2>Your Cart</h2>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty 🛒</p>
            <Link to="/products" className="button">
              Browse Products
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="cart-item">

              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h3>{item.name}</h3>

                <p className="price">₹{item.price}</p>

                <div className="qty">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button
                  className="remove"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* RIGHT */}
      <div className="cart-right">

        <h3>Order Summary</h3>

        <div className="summary-line">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>

        <div className="summary-line">
          <span>GST (5%)</span>
          <span>₹{gst}</span>
        </div>

        <div className="summary-line">
          <span>Delivery</span>
          <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
        </div>

        {discount > 0 && (
          <div className="summary-line discount">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>
        )}

        <hr />

        <div className="summary-line total">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>

        {/* COUPON */}
        <div className="coupon">
          <input
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button onClick={applyCoupon}>
            Apply
          </button>
        </div>

        {message && <p className="coupon-msg">{message}</p>}
      
        <button
          className="checkout"
          onClick={() => {
            const user = localStorage.getItem("user");

            if (!user) {
              localStorage.setItem("redirectAfterLogin", "/checkout");
              window.location.href = "/auth";
            } else {
              window.location.href = "/checkout";
            }
          }}
        >
          Checkout
        </button>


      </div>

    </div>
  );
}