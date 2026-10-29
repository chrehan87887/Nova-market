import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductImage from "../components/ProductImage.jsx";
import OrderSummary from "../components/Ordersummary.jsx";

export default function CartPage({
  items, cart, subtotal, totals, coupon, user,
  onChangeQty, onApplyCoupon, onRemoveCoupon,
}) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const apply = () => {
    const err = onApplyCoupon(code);
    setError(err || "");
    if (!err) setCode("");
  };

  const goCheckout = () => navigate(user ? "/checkout" : "/login");

  return (
    <main className="page cart-page">
      <h1>Your cart</h1>

      {items.length === 0 ? (
        <p className="empty">
          Your cart is empty. <Link to="/">Go to the shop</Link> and add something.
        </p>
      ) : (
        <>
          <ul className="lines">
            {items.map((p) => (
              <li key={p.id}>
                <ProductImage key={p.id} product={p} className="ico-img" />
                <div className="info">
                  <b>{p.name}</b>
                  <small>${p.price} each</small>
                </div>
                <div className="qty">
                  <button onClick={() => onChangeQty(p.id, -1)} aria-label="Decrease">−</button>
                  <span>{cart[p.id]}</span>
                  <button onClick={() => onChangeQty(p.id, 1)} aria-label="Increase">+</button>
                </div>
              </li>
            ))}
          </ul>

          {coupon ? (
            <p className="coupon-msg ok">
              Coupon <b>{coupon}</b> applied.{" "}
              <button className="link-btn" onClick={onRemoveCoupon}>Remove</button>
            </p>
          ) : (
            <>
              <div className="coupon">
                <input
                  placeholder="Coupon code (try SAVE10)"
                  aria-label="Coupon code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={apply}>Apply</button>
              </div>
              {error && <p className="coupon-msg err">{error}</p>}
            </>
          )}

          <OrderSummary subtotal={subtotal} totals={totals} coupon={coupon} />

          <button className="cta full" onClick={goCheckout}>
            {user ? "Proceed to checkout" : "Log in to checkout"}
          </button>
        </>
      )}
    </main>
  );
}