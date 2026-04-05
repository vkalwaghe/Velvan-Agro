import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function CartDrawer({ open, onClose }) {
  const { items, totalAmount, updateQuantity, removeItem } = useCart()

  const formattedTotal = useMemo(
    () => totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
    [totalAmount],
  )

  return (
    <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <header className="cart-drawer__header">
        <h2>Your Cart</h2>
        <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
          ×
        </button>
      </header>

      <div className="cart-drawer__body">
        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/" onClick={onClose} className="button button--secondary">
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <div className="cart-item__title">{item.name}</div>
                    <div className="cart-item__meta">
                      {item.quantity} × ₹{item.price} / {item.unit}
                    </div>
                  </div>
                  <div className="cart-item__actions">
                    <button
                      type="button"
                      className="cart-item__qty"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="cart-item__qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="cart-item__qty"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Total</span>
                <strong>{formattedTotal}</strong>
              </div>
              <Link to="/order" className="button" onClick={onClose}>
                Checkout
              </Link>
            </footer>
          </>
        )}
      </div>
    </aside>
  )
}
