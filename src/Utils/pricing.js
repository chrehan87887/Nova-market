
// Coupon codes: code -> discount rate (0.1 = 10%)
export const COUPONS = { SAVE10: 0.1, WELCOME20: 0.2 };

export const SHIPPING_FEE = 5;
export const FREE_SHIPPING_OVER = 100;

export const money = (n) => `$${n.toFixed(2)}`;

export function calcTotals(subtotal, couponCode) {
  const rate = COUPONS[couponCode] || 0;
  const discount = Math.round(subtotal * rate * 100) / 100;
  const afterDiscount = subtotal - discount;
  const shipping =
    subtotal === 0 || afterDiscount >= FREE_SHIPPING_OVER
      ? 0
      : SHIPPING_FEE;
  const total = Math.round((afterDiscount + shipping) * 100) / 100;

  return { discount, shipping, total };
}

// Sale percentage, e.g. $120 to $90 = 25%
export const discountPercent = (p) =>
  p.oldPrice && p.oldPrice > p.price
    ? Math.round((1 - p.price / p.oldPrice) * 100)
    : 0;
