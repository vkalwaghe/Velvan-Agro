import { useCart } from "../contexts/CartContext";
import "./Checkout.css";

export default function CheckoutPage() {

  const { items, total } = useCart();

  return (
    <div className="checkout">

      <div className="left">

        <h2>Delivery Details</h2>

        <input placeholder="Name" />
        <input placeholder="Phone" />
        <textarea placeholder="Address" />

        <button className="place">
          Place Order
        </button>

      </div>

      <div className="right">

        <h3>Summary</h3>

        {items.map(i => (
          <p key={i.id}>
            {i.name} x {i.qty}
          </p>
        ))}

        <h2>Total ₹{total}</h2>

      </div>

    </div>
  );
}