import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQty,
    decreaseQty,
    total,
  } = useCart();

  return (
    <div className="cart-page">

      <div className="cart-left">

        <h2>Your Cart</h2>

        {items.map((item) => (
          <div key={item.id} className="cart-item">

            <img src={item.image} />

            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <div className="qty">

                <button
                  onClick={() =>
                    decreaseQty(item.id)
                  }
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() =>
                    increaseQty(item.id)
                  }
                >
                  +
                </button>

              </div>

              <button
                className="remove"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

      <div className="cart-right">

        <h3>Order Summary</h3>

        <p>Total: ₹{total}</p>

        <Link to="/checkout">
          <button className="checkout">
            Checkout
          </button>
        </Link>

      </div>

    </div>
  );
}