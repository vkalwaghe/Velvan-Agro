import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";

export default function CheckoutPage() {

  const { items, total } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // 🔐 LOGIN CHECK
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/auth");
    }
  }, [navigate]);

  // 🧾 Charges
  const gst = total * 0.05;
  const delivery = total > 1000 ? 0 : 50;
  const finalTotal = total + gst + delivery;

  // 🔄 Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Place Order
  const handleOrder = async () => {

      if (!form.name || !form.phone || !form.address) {
        setError("Please fill all fields");
        return;
      }

      // 🟢 UPI Simulation
      if (paymentMethod === "upi") {
        alert("Opening UPI app... 📱");
      }

      // 🟢 Razorpay Simulation
      if (paymentMethod === "razorpay") {
        alert("Redirecting to Razorpay... 💳");
      }

      // 🧾 Create Order
      const order = {
        id: Date.now(),
        items,
        total: finalTotal,
        paymentMethod,
        paymentStatus:
          paymentMethod === "cod" ? "Pending" : "Paid",
        date: new Date().toLocaleString(),
      };

      const oldOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      localStorage.setItem(
        "orders",
        JSON.stringify([...oldOrders, order])
      );

      alert("Order placed successfully ✅");

      navigate("/orders");
    };

  return (
    <div className="checkouts">

      {/* LEFT */}
      <div className="left">

        <h2>Delivery Details</h2>

        {error && <p className="error">{error}</p>}

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          onChange={handleChange}
        />

        {/* 💳 PAYMENT */}
        <div className="payment-box">

          <h3>Select Payment Method</h3>

          {/* COD */}
          <label className="payment-option">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💵 Cash on Delivery
          </label>

          {/* UPI */}
          <label className="payment-option">
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            📱 UPI (GPay / PhonePe)
          </label>

          {/* Razorpay */}
          <label className="payment-option">
            <input
              type="radio"
              value="razorpay"
              checked={paymentMethod === "razorpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Razorpay (Card / Netbanking)
          </label>

        </div>

        {/* 🚀 BUTTON */}
        <button className="place" onClick={handleOrder}>
          Place Order
        </button>

      </div>

      {/* RIGHT */}
      <div className="right">

        <h3>Order Summary</h3>

        {items.map((i) => (
          <div key={i.id} className="summary-item">
            <span>{i.name} x {i.qty}</span>
            <span>₹{i.price * i.qty}</span>
          </div>
        ))}

        <hr />

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>

        <div className="summary-row">
          <span>GST (5%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <span>₹{delivery}</span>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <span>₹{finalTotal.toFixed(2)}</span>
        </div>

      </div>

    </div>
  );
}