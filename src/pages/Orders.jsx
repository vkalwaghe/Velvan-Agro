import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import "./Orders.css";
import { useNavigate } from "react-router-dom";



export default function Orders() {

  const [orders, setOrders] = useState([]);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {

      const interval = setInterval(() => {
        const savedOrders =
          JSON.parse(localStorage.getItem("orders")) || [];

        const now = Date.now();

        const updatedOrders = savedOrders.map((order) => {
          const diff = now - order.id;

          let status = "placed";

          if (diff > 10000) status = "shipped";
          if (diff > 20000) status = "out";
          if (diff > 30000) status = "delivered";

          return { ...order, status };
        });

        setOrders(updatedOrders.reverse());

      }, 3000); // update every 3 sec

      return () => clearInterval(interval);

    }, []);

  // 🔁 Reorder
  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addItem(item, item.qty);
    });

    alert("Items added to cart 🛒");
  };

  // 🎯 Status UI
  const getStatusClass = (status) => {
    if (status === "delivered") return "status delivered";
    if (status === "out") return "status out";
    if (status === "shipped") return "status shipped";
    return "status placed";
  };

  const getStatusLabel = (status) => {
    if (status === "delivered") return "Delivered";
    if (status === "out") return "Out for Delivery 🚚";
    if (status === "shipped") return "Shipped";
    return "Order Placed";
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

              <div className={getStatusClass(order.status)}>
                {getStatusLabel(order.status)}
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="order-progress">

              <div className={`step ${order.status !== "placed" ? "active" : ""}`}>
                Placed
              </div>

              <div className={`step ${["shipped","out","delivered"].includes(order.status) ? "active" : ""}`}>
                Shipped
              </div>

              <div className={`step ${["out","delivered"].includes(order.status) ? "active" : ""}`}>
                Out for Delivery
              </div>

              <div className={`step ${order.status === "delivered" ? "active" : ""}`}>
                Delivered
              </div>

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

            <div className="order-timeline">

              <div className={`timeline-step ${order.status !== "placed" ? "done" : "active"}`}>
                <div className="circle">✓</div>
                <p>Order Placed</p>
                <span>{order.date}</span>
              </div>

              <div className={`timeline-step ${["shipped","out","delivered"].includes(order.status) ? "done" : ""}`}>
                <div className="circle">📦</div>
                <p>Shipped</p>
              </div>

              <div className={`timeline-step ${["out","delivered"].includes(order.status) ? "done" : ""}`}>
                <div className="circle">🚚</div>
                <p>Out for Delivery</p>
              </div>

              <div className={`timeline-step ${order.status === "delivered" ? "done" : ""}`}>
                <div className="circle">🏠</div>
                <p>Delivered</p>
              </div>

            </div>

            {/* FOOTER */}
            <div className="order-footer">

              <div>
                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paymentMethod.toUpperCase()}
                </p>
                <p>
                  <strong>Status:</strong> {order.paymentStatus}
                </p>
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