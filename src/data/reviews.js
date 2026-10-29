import { PRODUCTS } from "./products.js";

const NAMES = ["Ayesha K.", "Hamza R.", "Sara M.", "Bilal A.", "Fatima Z.", "Usman T."];

const COMMENTS = [
  { rating: 5, title: "Excellent quality", text: "Exactly as described and feels very well made. Delivery was quick." },
  { rating: 4, title: "Good value", text: "Good product for the price. The packaging was neat and safe." },
  { rating: 5, title: "Highly recommend", text: "Better than I expected. I would happily order from this store again." },
  { rating: 3, title: "Decent", text: "It does the job, though I expected a slightly better finish." },
  { rating: 4, title: "Happy with it", text: "Works well and looks great. The store answered my question quickly." },
  { rating: 5, title: "Perfect gift", text: "Bought it as a gift and they loved it." },
];

// 3 demo reviews per product, picked in a fixed pattern so they never change
export const SEED_REVIEWS = PRODUCTS.flatMap((p) =>
  [0, 1, 2].map((k) => ({
    id: `seed-${p.id}-${k}`,
    productId: p.id,
    name: NAMES[(p.id + k) % NAMES.length],
    date: "2026-09-15",
    ...COMMENTS[(p.id + k * 2) % COMMENTS.length],
  }))
);

// { productId: { avg, count } } calculated from a list of reviews
export function buildRatings(reviews) {
  const sums = {};
  reviews.forEach((r) => {
    const s = sums[r.productId] || { total: 0, count: 0 };
    s.total += r.rating;
    s.count += 1;
    sums[r.productId] = s;
  });
  const out = {};
  Object.keys(sums).forEach((id) => {
    out[id] = { avg: sums[id].total / sums[id].count, count: sums[id].count };
  });
  return out;
}