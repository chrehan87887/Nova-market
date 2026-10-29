import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SEED_REVIEWS, buildRatings } from "./data/reviews.js";
import "./App.css";
import { PRODUCTS } from "./data/products.js";
import { COUPONS, calcTotals } from "./Utils/Pricing.js";
import useStoredState from "./hooks/useStoredState.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CartPage from "./pages/Cartpage.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Orders from "./pages/Orders.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Auth from "./pages/Auth.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [cart, setCart] = useStoredState("cart", {}); // { productId: quantity }
  const [wishlist, setWishlist] = useStoredState("wishlist", []);
  const [users, setUsers] = useStoredState("users", []); // registered users (demo only)
  const [user, setUser] = useStoredState("currentUser", null); // logged-in user
  const [orders, setOrders] = useStoredState("orders", []);
  const [coupon, setCoupon] = useStoredState("coupon", null);
  const [userReviews, setUserReviews] = useStoredState("reviews", []);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  // Cart numbers
  const cartItems = PRODUCTS.filter((p) => cart[p.id]);
  const count = cartItems.reduce((n, p) => n + cart[p.id], 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const totals = calcTotals(subtotal, coupon);
  // Reviews: user reviews first, then demo reviews
const allReviews = useMemo(() => [...userReviews, ...SEED_REVIEWS], [userReviews]);
const ratings = useMemo(() => buildRatings(allReviews), [allReviews]);

  const addToCart = (p) => {
    setCart({ ...cart, [p.id]: (cart[p.id] || 0) + 1 });
    showToast(`${p.name} added to cart`);
  };

  const changeQty = (id, delta) => {
    const next = { ...cart };
    next[id] = (next[id] || 0) + delta;
    if (next[id] <= 0) delete next[id];
    setCart(next);
  };

  const toggleWish = (id) =>
    setWishlist(wishlist.includes(id) ? wishlist.filter((w) => w !== id) : [...wishlist, id]);

  // Coupons: return an error message, or null when it worked
  const applyCoupon = (code) => {
    const c = code.trim().toUpperCase();
    if (!COUPONS[c]) return "Invalid coupon code.";
    setCoupon(c);
    showToast(`Coupon ${c} applied`);
    return null;
  };
  const removeCoupon = () => setCoupon(null);

  // Place an order: save it, empty the cart, return the new order id
  const placeOrder = (details) => {
    const id = "SS" + Date.now().toString().slice(-6);
    const order = {
      id,
      email: user.email,
      date: new Date().toISOString(),
      items: cartItems.map((p) => ({
        id: p.id, name: p.name, emoji: p.emoji, price: p.price, qty: cart[p.id],
      })),
      subtotal,
      coupon,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      name: details.name.trim(),
      phone: details.phone.trim(),
      city: details.city.trim(),
      address: details.address.trim(),
      payment: details.payment,
    };
    setOrders([order, ...orders]);
    setCart({});
    setCoupon(null);
    showToast("Order placed!");
    return id;
  };
// Add a review: return an error message, or null when it worked
const addReview = ({ productId, rating, text }) => {
  if (userReviews.some((r) => r.productId === productId && r.email === user.email)) {
    return "You have already reviewed this product.";
  }
  setUserReviews([
    {
      id: "u-" + Date.now(),
      productId,
      email: user.email,
      name: user.name,
      rating,
      title: "",
      text: text.trim(),
      date: new Date().toISOString(),
    },
    ...userReviews,
  ]);
  showToast("Thanks for your review!");
  return null;
};
  // Signup / Login / Logout: return an error message, or null when it worked
  const signup = ({ name, email, password }) => {
    const mail = email.trim().toLowerCase();
    if (users.some((u) => u.email === mail)) {
      return "This email is already registered. Please log in.";
    }
    const cleanName = name.trim();
    setUsers([...users, { name: cleanName, email: mail, password }]);
    setUser({ name: cleanName, email: mail });
    showToast(`Welcome, ${cleanName}!`);
    return null;
  };

  const login = ({ email, password }) => {
    const mail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === mail && u.password === password);
    if (!found) return "Wrong email or password.";
    setUser({ name: found.name, email: found.email });
    showToast(`Welcome back, ${found.name}!`);
    return null;
  };

  const logout = () => {
    setUser(null);
    showToast("Logged out");
  };

  const shared = { wishlist, onToggleWish: toggleWish, onAdd: addToCart, ratings };

  return (
    <div className="app">
      <Header count={count} wishCount={wishlist.length} user={user} onLogout={logout} />

      <Routes>
        <Route path="/" element={<Home {...shared} />} />
        
<Route
  path="/product/:id"
  element={<ProductDetails {...shared} user={user} reviews={allReviews} onAddReview={addReview} />}
/>

        <Route path="/wishlist" element={<Wishlist {...shared} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/cart"
          element={
            <CartPage
              items={cartItems}
              cart={cart}
              subtotal={subtotal}
              totals={totals}
              coupon={coupon}
              user={user}
              onChangeQty={changeQty}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              user={user}
              items={cartItems}
              cart={cart}
              subtotal={subtotal}
              totals={totals}
              coupon={coupon}
              onPlaceOrder={placeOrder}
            />
          }
        />
        <Route path="/order-success/:id" element={<OrderSuccess orders={orders} />} />
        <Route path="/orders" element={<Orders user={user} orders={orders} />} />
        <Route path="/login" element={<Auth key="login" mode="login" onLogin={login} />} />
        <Route path="/signup" element={<Auth key="signup" mode="signup" onSignup={signup} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}