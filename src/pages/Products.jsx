import products from "../data/products";
import ProductCard from "../components/ProductCard";

function groupBy(arr, key) {
  return arr.reduce((acc, it) => {
    (acc[it[key]] ||= []).push(it);
    return acc;
  }, {});
}

export default function Products() {
  const grouped = groupBy(products, "category");

  return (
    <main className="products-page">
      <h2>Plant Shop</h2>
      {Object.entries(grouped).map(([cat, items]) => (
        <section key={cat} className="category">
          <h3>{cat}</h3>
          <div className="grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
