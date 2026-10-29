import { NavLink } from "react-router-dom";

export default function Header({ count, wishCount, user, onLogout }) {
  return (
    <header className="top">
      <NavLink className="brand" to="/">ShopSphere</NavLink>
      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/wishlist">
          Wishlist <span className="badge">{wishCount}</span>
        </NavLink>
        {user && <NavLink to="/orders">Orders</NavLink>}
        <NavLink to="/cart">
          Cart <span className="badge">{count}</span>
        </NavLink>

        {user ? (
          <>
            <span className="hello">Hi, {user.name.split(" ")[0]}</span>
            <button className="logout" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}