import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Auth({ mode, onSignup, onLogin }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignup && form.name.trim().length < 2) {
      return setError("Please enter your name.");
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      return setError("Please enter a valid email address.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (isSignup && form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }

    const result = isSignup ? onSignup(form) : onLogin(form);
    if (result) return setError(result); // error message from App
    navigate("/");
  };

  return (
    <main className="page auth">
      <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
      <p className="auth-sub">
        {isSignup ? "Sign up to place orders on ShopSphere." : "Log in to place your orders."}
      </p>

      <form className="auth-form" onSubmit={submit} noValidate>
        {isSignup && (
          <label>
            Full name
            <input name="name" value={form.name} onChange={update} autoComplete="name" />
          </label>
        )}
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={update}
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
        </label>
        {isSignup && (
          <label>
            Confirm password
            <input
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={update}
              autoComplete="new-password"
            />
          </label>
        )}

        {error && <p className="form-error" role="alert">{error}</p>}

        <button className="cta full" type="submit">
          {isSignup ? "Sign up" : "Log in"}
        </button>
      </form>

      <p className="auth-switch">
        {isSignup ? (
          <>Already have an account? <Link to="/login">Log in</Link></>
        ) : (
          <>New here? <Link to="/signup">Create an account</Link></>
        )}
      </p>
    </main>
  );
}