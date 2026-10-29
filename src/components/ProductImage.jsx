import { useState } from "react";

export default function ProductImage({ product, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !product.image) {
    return (
      <span className={"emoji-fallback " + className} role="img" aria-label={product.name}>
        {product.emoji}
      </span>
    );
  }

  return (
    <img
      className={className}
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}