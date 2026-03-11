export default function Input({
  label,
  error,
  className = "",
  type = "text",
  required = false,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xl font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-5 py-4 text-lg rounded-xl border-2 bg-gray-50 text-gray-900
          placeholder:text-gray-400 transition-all duration-200
          focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white
          hover:border-gray-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-400 bg-red-50 focus:ring-red-100 focus:border-red-500"
              : "border-gray-200"
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm font-medium text-red-500 flex items-center gap-1.5">
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
