import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();
  const disabled = !!items[product.id];
  const [clicked, setClicked] = useState(disabled);

  function handleAdd() {
    addToCart(product);
    setClicked(true);
  }

  return (
    <div className="product-card">
      <img src={product.thumb} alt={product.name} className="thumb" />
      <div className="meta">
        <div className="name">{product.name}</div>
        <div className="price">${product.price}</div>
      </div>
      <button onClick={handleAdd} disabled={clicked} className="add-btn">
        {clicked ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}
