export default function About() {
  return (
    <main className="page">
      <h1>About ShopSphere</h1>
      <p>
        ShopSphere is a Web Engineering course project: a small online store
        built with React.js. It has no database. Products are stored in a
        JavaScript file, and the cart and wishlist are saved in your browser.
      </p>
      <h2>What you can do</h2>
      <ul>
        <li>Search products and filter them by category</li>
        <li>Sort by price or rating</li>
        <li>Save favourites to a wishlist</li>
        <li>Add products to the cart and change quantities</li>
        <li>Place a demo order</li>
      </ul>
      <h2>Built with</h2>
      <p>React.js, React Router and Vite.</p>
    </main>
  );
}