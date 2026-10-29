import { PRODUCTS } from "../data/products.js";

export default function Hero({ ordered }) {
  return (
    <section className="hero">
      <h1>Everyday things, picked with care.</h1>
      <p>
        Browse {PRODUCTS.length} products, save favourites and fill your cart.
        Everything runs in your browser.
      </p>
      <a className="cta" href="#shop">Start shopping</a>
      {ordered && <p className="thanks">Thanks! Your demo order was placed.</p>}
    </section>
  );
}