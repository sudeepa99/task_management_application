const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };
const colors = {
  white: "border-white border-t-transparent",
  gray: "border-gray-400 border-t-transparent",
  blue: "border-blue-600 border-t-transparent",
};

export default function Spinner({ size = "md", color = "blue" }) {
  return (
    <div
      className={`${sizes[size]} ${colors[color]} rounded-full border-2 animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
}
