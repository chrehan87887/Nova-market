export default function CartDrawer({ open, items, cart, total, onClose, onChangeQty, onCheckout }) {
  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}
      <aside className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="empty">Your cart is empty. Add something from the shop.</p>
        ) : (
          <>
            <ul className="lines">
              {items.map((p) => (
                <li key={p.id}>
                  <span className="ico">{p.emoji}</span>
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
            <div className="total">
              <span>Total</span>
              <strong>${total}</strong>
            </div>
            <button className="cta full" onClick={onCheckout}>Place order</button>
          </>
        )}
      </aside>
    </>
  );
}