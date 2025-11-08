import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalItems, totalPrice, increase, decrease, remove } =
    useCart();

  const list = Object.values(items);

  return (
    <main className="cart-page">
      <h2>Your Cart</h2>
      <div className="summary">
        <div>Total plants: {totalItems}</div>
        <div>Total cost: ${totalPrice.toFixed(2)}</div>
      </div>

      <div className="cart-list">
        {list.length === 0 && <p>Your cart is empty.</p>}
        {list.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumb} alt={item.name} />
            <div className="info">
              <div className="name">{item.name}</div>
              <div className="unit">Unit price: ${item.price}</div>
              <div className="qty">Quantity: {item.qty}</div>
              <div className="controls">
                <button onClick={() => increase(item.id)}>+</button>
                <button onClick={() => decrease(item.id)}>-</button>
                <button onClick={() => remove(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button onClick={() => alert("Coming Soon!")}>Checkout</button>
        <Link to="/products" className="continue">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
