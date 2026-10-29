export default function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${value.toFixed(1)} out of 5`}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}