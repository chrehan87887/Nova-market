import { Link, useParams } from "react-router-dom";
import { money } from "../Utils/Pricing.js";

export default function OrderSuccess({ orders }) {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <main className="page">
        <h1>Order not found</h1>
        <p><Link to="/">Back to the shop</Link></p>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="success-icon" aria-hidden="true">✓</div>
      <h1>Thank you, {order.name.split(" ")[0]}!</h1>
      <p>
        Your order <b>#{order.id}</b> is confirmed (demo). We will deliver it to{" "}
        {order.address}, {order.city}.
      </p>

      <ul className="mini-lines">
        {order.items.map((i) => (
          <li key={i.id}>
            <span>{i.emoji} {i.name} × {i.qty}</span>
            <span>{money(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <p>
        <b>Total paid:</b> {money(order.total)} ·{" "}
        <b>Payment:</b> {order.payment === "cod" ? "Cash on Delivery" : "Card (demo)"}
      </p>

      <div className="details-actions">
        <Link className="cta" to="/orders">View my orders</Link>
        <Link className="ghost" to="/">Continue shopping</Link>
      </div>
    </main>
  );
}