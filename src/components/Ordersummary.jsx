import { money, FREE_SHIPPING_OVER } from "../Utils/Pricing.js";

export default function OrderSummary({ subtotal, totals, coupon }) {
  return (
    <div className="summary">
      <div>
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      {totals.discount > 0 && (
        <div className="green">
          <span>Discount ({coupon})</span>
          <span>−{money(totals.discount)}</span>
        </div>
      )}
      <div>
        <span>Shipping</span>
        <span>{totals.shipping === 0 ? "Free" : money(totals.shipping)}</span>
      </div>
      <div className="grand">
        <span>Total</span>
        <strong>{money(totals.total)}</strong>
      </div>
      {totals.shipping > 0 && (
        <p className="hint">Free shipping on orders over ${FREE_SHIPPING_OVER}.</p>
      )}
    </div>
  );
}