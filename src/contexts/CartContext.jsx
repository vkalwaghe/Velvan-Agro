import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // ADD ITEM
  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === product.id);

      if (found) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, qty: p.qty + qty }
            : p
        );
      }

      return [...prev, { ...product, qty }];
    });
  };

  // REMOVE
  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  // INCREASE
  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  // DECREASE
  const decreaseQty = (id) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.qty > 1
          ? { ...p, qty: p.qty - 1 }
          : p
      )
    );
  };

  // CLEAR
  const clearCart = () => {
    setItems([]);
  };

  // TOTAL
  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);