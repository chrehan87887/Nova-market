import { Link } from "react-router-dom";
import { money } from "../Utils/Pricing.js";

export default function Orders({ user, orders }) {
  if (!user) {
    return (
      <main className="page">
        <h1>My orders</h1>
        <p className="empty">Please <Link to="/login">log in</Link> to see your orders.</p>
      </main>
    );
  }

  const mine = orders.filter((o) => o.email === user.email);

  return (
    <main className="page">
      <h1>My orders</h1>
      {mine.length === 0 ? (
        <p className="empty">No orders yet. <Link to="/">Start shopping</Link></p>
      ) : (
        mine.map((o) => (
          <article className="order-card" key={o.id}>
            <div className="order-head">
              <div>
                <b>Order #{o.id}</b>
                <small>{new Date(o.date).toLocaleDateString()}</small>
              </div>
              <span className="status">Confirmed</span>
            </div>
            <ul className="mini-lines">
              {o.items.map((i) => (
                <li key={i.id}>
                  <span>{i.emoji} {i.name} × {i.qty}</span>
                  <span>{money(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="order-total">Total: <b>{money(o.total)}</b></p>
          </article>
        ))
      )}
    </main>
  );
}