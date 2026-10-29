// Dummy data (database ki jagah). oldPrice wale products "on sale" hain.
export const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 59, emoji: "🎧", image: "/images/products/1.jpg" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 89, oldPrice: 119, emoji: "⌚", image: "/images/products/2.jpg" },
  { id: 3, name: "Bluetooth Speaker", category: "Electronics", price: 35, emoji: "🔊", image: "/images/products/3.jpg" },
  { id: 4, name: "Running Shoes", category: "Fashion", price: 72, emoji: "👟", image: "/images/products/4.jpg" },
  { id: 5, name: "Denim Jacket", category: "Fashion", price: 64, oldPrice: 80, emoji: "🧥", image: "/images/products/5.jpg" },
  { id: 6, name: "Sunglasses", category: "Fashion", price: 28, emoji: "🕶️", image: "/images/products/6.jpg" },
  { id: 7, name: "Ceramic Mug Set", category: "Home", price: 22, oldPrice: 28, emoji: "☕", image: "/images/products/7.jpg" },
  { id: 8, name: "Desk Lamp", category: "Home", price: 31, emoji: "💡", image: "/images/products/8.jpg" },
  { id: 9, name: "Backpack", category: "Accessories", price: 45, oldPrice: 60, emoji: "🎒", image: "/images/products/9.jpg" },
  { id: 10, name: "Leather Wallet", category: "Accessories", price: 26, emoji: "👛", image: "/images/products/10.jpg" },
  { id: 11, name: "Notebook Pack", category: "Home", price: 12, emoji: "📓", image: "/images/products/11.jpg" },
  { id: 12, name: "Phone Case", category: "Accessories", price: 15, oldPrice: 20, emoji: "📱", image: "/images/products/12.jpg" },
];

export const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Accessories"];

// Highest price rounded up to the next 10 (used by the price slider)
export const MAX_PRICE = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 10) * 10;