import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import { discountPercent } from "../Utils/Pricing.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductImage from "../components/ProductImage.jsx";
import Stars from "../components/Stars.jsx";

function ReviewForm({ productId, user, onAddReview }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return <p className="empty">Please <Link to="/login">log in</Link> to write a review.</p>;
  }

  const submit = (e) => {
    e.preventDefault();
    if (text.trim().length < 10) return setError("Please write at least 10 characters.");
    const err = onAddReview({ productId, rating, text });
    if (err) return setError(err);
    setText("");
    setError("");
  };

  return (
    <form className="review-form" onSubmit={submit}>
      <h3>Write a review</h3>
      <div className="star-pick" role="group" aria-label="Your rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            className={n <= rating ? "on" : ""}
            aria-pressed={n === rating}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setRating(n)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        placeholder="Tell others what you think about this product"
        aria-label="Your review"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="cta" type="submit">Submit review</button>
    </form>
  );
}

export default function ProductDetails({
  wishlist, onToggleWish, onAdd, ratings, reviews, user, onAddReview,
}) {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="page">
        <h1>Product not found</h1>
        <p>This product does not exist. <Link to="/">Back to the shop</Link></p>
      </main>
    );
  }

  const liked = wishlist.includes(product.id);
  const off = discountPercent(product);
  const stat = ratings[product.id];
  const list = reviews.filter((r) => r.productId === product.id);
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <main className="page details-page">
      <Link to="/" className="back">← Back to shop</Link>

      <div className="details">
        <div className="details-img">
          {off > 0 && <span className="sale-badge big">-{off}%</span>}
          <ProductImage key={product.id} product={product} />
        </div>
        <div>
          <h1>{product.name}</h1>
          <p className="meta">{product.category}</p>
          <p className="rating-row">
            {stat ? (
              <>
                <Stars value={stat.avg} />
                <span>{stat.avg.toFixed(1)} ({stat.count} reviews)</span>
              </>
            ) : (
              <span>No reviews yet</span>
            )}
          </p>
          <p className="price">
            ${product.price}
            {off > 0 && <span className="old big">${product.oldPrice}</span>}
          </p>
          <p>
            A great pick from our {product.category.toLowerCase()} range.
            Add it to your cart now or save it to your wishlist for later.
          </p>
          <div className="details-actions">
            <button className="cta" onClick={() => onAdd(product)}>Add to cart</button>
            <button className="ghost" onClick={() => onToggleWish(product.id)}>
              {liked ? "♥ Remove from wishlist" : "♡ Add to wishlist"}
            </button>
          </div>
        </div>
      </div>

      <section className="reviews">
        <h2>Customer reviews</h2>
        {list.length === 0 && <p className="empty">No reviews yet. Be the first to write one.</p>}
        {list.map((r) => (
          <article className="review" key={r.id}>
            <div className="review-head">
              <b>{r.name}</b>
              <small>{new Date(r.date).toLocaleDateString()}</small>
            </div>
            <Stars value={r.rating} />
            {r.title && <p><b>{r.title}</b></p>}
            <p>{r.text}</p>
          </article>
        ))}
        <ReviewForm key={product.id} productId={product.id} user={user} onAddReview={onAddReview} />
      </section>

      {related.length > 0 && (
        <>
          <h2>More in {product.category}</h2>
          <div className="grid">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                rating={ratings[p.id]}
                liked={wishlist.includes(p.id)}
                onToggleWish={onToggleWish}
                onAdd={onAdd}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}