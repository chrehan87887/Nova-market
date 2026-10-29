import { Link } from "react-router-dom";
import ProductImage from "./ProductImage.jsx";
import Stars from "./Stars.jsx";
import { discountPercent } from "../Utils/Pricing.js";

export default function ProductCard({ product, liked, onToggleWish, onAdd, rating }) {
  const off = discountPercent(product);
  const stat = rating || { avg: 0, count: 0 };

  return (
    <article className="card">
      <div className="thumb">
        {off > 0 && <span className="sale-badge">-{off}%</span>}
        <Link to={`/product/${product.id}`} className="thumb-link" aria-label={`View ${product.name}`}>
          <ProductImage product={product} />
        </Link>
        <button
          className={"heart" + (liked ? " on" : "")}
          onClick={() => onToggleWish(product.id)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>

      <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
      <p className="meta">{product.category}</p>
      <p className="rating-row">
        {stat.count > 0 ? (
          <>
            <Stars value={stat.avg} />
            <span>{stat.avg.toFixed(1)} ({stat.count})</span>
          </>
        ) : (
          <span>No reviews yet</span>
        )}
      </p>

      <div className="row">
        <div className="price-box">
          <strong>${product.price}</strong>
          {off > 0 && <span className="old">${product.oldPrice}</span>}
        </div>
        <button className="add" onClick={() => onAdd(product)}>Add to cart</button>
      </div>
    </article>
  );
}