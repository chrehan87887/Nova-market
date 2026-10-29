import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES, MAX_PRICE } from "../data/products.js";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Home({ wishlist, onToggleWish, onAdd, ratings }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [saleOnly, setSaleOnly] = useState(false);

  const filtersOn = category !== "All" || query !== "" || maxPrice < MAX_PRICE || saleOnly;

  const clearFilters = () => {
    setCategory("All");
    setQuery("");
    setMaxPrice(MAX_PRICE);
    setSaleOnly(false);
  };

  const visible = useMemo(() => {
    const avg = (p) => (ratings[p.id] ? ratings[p.id].avg : 0);
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase()) &&
        p.price <= maxPrice &&
        (!saleOnly || p.oldPrice > p.price)
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => avg(b) - avg(a));
    return list;
  }, [category, query, sort, maxPrice, saleOnly, ratings]);

  return (
    <>
      <Hero />
      <main id="shop" className="shop">
        <input
          className="search"
          type="search"
          placeholder="Search products"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="toolbar">
          <div className="chips">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={"chip" + (c === category ? " active" : "")}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="sort">
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        <div className="filters">
          <label className="price-filter">
            Max price: <b>${maxPrice}</b>
            <input
              type="range"
              min="0"
              max={MAX_PRICE}
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </label>
          <label className="check">
            <input type="checkbox" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)} />
            Sale items only
          </label>
          {filtersOn && (
            <button className="link-btn" onClick={clearFilters}>Clear filters</button>
          )}
          <span className="result-count">{visible.length} products</span>
        </div>

        {visible.length === 0 ? (
          <p className="empty">No products match your filters. Try a higher price or clear the filters.</p>
        ) : (
          <div className="grid">
            {visible.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                rating={ratings[p.id]}
                liked={wishlist.includes(p.id)}
                onToggleWish={onToggleWish}
                onAdd={onAdd}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}