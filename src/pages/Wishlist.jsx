import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist({ wishlist, onToggleWish, onAdd, ratings }) {
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <main className="page wide">
      <h1>Your wishlist</h1>
      {items.length === 0 ? (
        <p className="empty">
          No saved products yet. Tap the heart on any product in the{" "}
          <Link to="/">shop</Link> to save it here.
        </p>
      ) : (
        <div className="grid">
          {items.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              rating={ratings[p.id]}
              liked
              onToggleWish={onToggleWish}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </main>
  );
}