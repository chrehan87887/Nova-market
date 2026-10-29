import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import OrderSummary from "../components/Ordersummary.jsx";

export default function Checkout({ user, items, cart, subtotal, totals, coupon, onPlaceOrder }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user ? user.name : "",
    phone: "",
    city: "",
    address: "",
    payment: "cod",
  });
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" replace />;

  if (items.length === 0) {
    return (
      <main className="page">
        <h1>Checkout</h1>
        <p className="empty">Your cart is empty. <Link to="/">Go to the shop</Link></p>
      </main>
    );
  }

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return setError("Please enter your full name.");
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) {
      return setError("Please enter a valid phone number.");
    }
    if (form.city.trim().length < 2) return setError("Please enter your city.");
    if (form.address.trim().length < 8) return setError("Please enter your full address.");

    const id = onPlaceOrder(form);
    navigate(`/order-success/${id}`);
  };

  return (
    <main className="page checkout-page">
      <h1>Checkout</h1>
      <div className="checkout">
        <form className="auth-form" onSubmit={submit} noValidate>
          <h2>Delivery details</h2>
          <label>
            Full name
            <input name="name" value={form.name} onChange={update} autoComplete="name" />
          </label>
          <label>
            Phone number
            <input name="phone" value={form.phone} onChange={update} autoComplete="tel" />
          </label>
          <label>
            City
            <input name="city" value={form.city} onChange={update} autoComplete="address-level2" />
          </label>
          <label>
            Address
            <input name="address" value={form.address} onChange={update} autoComplete="street-address" />
          </label>

          <h2>Payment</h2>
          <label className="pay">
            <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={update} />
            Cash on Delivery
          </label>
          <label className="pay">
            <input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={update} />
            Card (demo, no card details are collected)
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="cta full" type="submit">Place order</button>
        </form>

        <aside>
          <h2>Order summary</h2>
          <ul className="mini-lines">
            {items.map((p) => (
              <li key={p.id}>
                <span>{p.emoji} {p.name} × {cart[p.id]}</span>
                <span>${(p.price * cart[p.id]).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <OrderSummary subtotal={subtotal} totals={totals} coupon={coupon} />
        </aside>
      </div>
    </main>
  );
}