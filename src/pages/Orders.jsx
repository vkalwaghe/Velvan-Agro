import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import "./Orders.css";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // 🔥 Status flow
  const statusOrder = ["placed", "shipped", "out", "delivered"];

  // 🔥 Step class logic (correct)
  const getStepClass = (currentStatus, step) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(step);

    if (stepIndex < currentIndex) return "done";
    if (stepIndex === currentIndex) return "active";
    return "";
  };

  // 🔥 Progress line animation
  const getProgressWidth = (status) => {
    switch (status) {
      case "placed":
        return "0%";
      case "shipped":
        return "33%";
      case "out":
        return "66%";
      case "delivered":
        return "100%";
      default:
        return "0%";
    }
  };

  // ✅ FIXED: Stable status update (NO RESET ISSUE)
  useEffect(() => {
    const interval = setInterval(() => {
      const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      const now = Date.now();

      const updatedOrders = savedOrders.map((order) => {
        const diff = now - order.id;

        let newStatus = order.status || "placed";

        if (diff >= 30000) newStatus = "delivered";
        else if (diff >= 20000 && newStatus !== "delivered")
          newStatus = "out";
        else if (
          diff >= 10000 &&
          !["out", "delivered"].includes(newStatus)
        )
          newStatus = "shipped";

        return { ...order, status: newStatus };
      });

      // ✅ persist status
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      setOrders(updatedOrders.reverse());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 🔁 Reorder
  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addItem(item, item.qty);
    });
    alert("Items added to cart 🛒");
  };

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <p className="empty">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">

            {/* HEADER */}
            <div className="order-header">
              <div>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {order.date}</p>
              </div>

              <div className={`status ${order.status}`}>
                {order.status.toUpperCase()}
              </div>
            </div>

            {/* 🔥 TIMELINE */}
            <div className="order-timeline">

              {/* PROGRESS LINE */}
              <div className="progress-line">
                <div
                  className="progress-fill"
                  style={{ width: getProgressWidth(order.status) }}
                ></div>
              </div>

              {statusOrder.map((step, index) => (
                <div
                  key={step}
                  className={`timeline-step ${getStepClass(order.status, step)}`}
                >
                  <div className="circle">
                    {index === 0 ? "✓" : index === 1 ? "📦" : index === 2 ? "🚚" : "🏠"}
                  </div>

                  <p>
                    {step === "placed" && "Order Placed"}
                    {step === "shipped" && "Shipped"}
                    {step === "out" && "Out for Delivery"}
                    {step === "delivered" && "Delivered"}
                  </p>
                </div>
              ))}

            </div>

            {/* ITEMS */}
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.qty}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="order-footer">
              <div>
                <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</p>
                <p><strong>Status:</strong> {order.paymentStatus}</p>
              </div>

              <div className="order-actions">
                <button
                  className="track-btn"
                  onClick={() => navigate(`/track/${order.id}`)}
                >
                  Track Order
                </button>

                <button
                  className="reorder-btn"
                  onClick={() => handleReorder(order)}
                >
                  Reorder
                </button>

                <span className="order-total">
                  ₹{order.total.toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
}