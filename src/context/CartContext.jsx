import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("pitpot_cart");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pitpot_cart", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  function addToCart(product) {
    setItems((prev) => {
      if (prev[product.id]) return prev;
      return { ...prev, [product.id]: { ...product, qty: 1 } };
    });
  }

  function increase(id) {
    setItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], qty: prev[id].qty + 1 },
    }));
  }

  function decrease(id) {
    setItems((prev) => {
      const item = prev[id];
      if (!item) return prev;
      if (item.qty <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: { ...item, qty: item.qty - 1 } };
    });
  }

  function remove(id) {
    setItems((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  const totalItems = Object.values(items).reduce((s, it) => s + it.qty, 0);
  const totalPrice = Object.values(items).reduce(
    (s, it) => s + it.qty * it.price,
    0
  );

  const value = {
    items,
    addToCart,
    increase,
    decrease,
    remove,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
