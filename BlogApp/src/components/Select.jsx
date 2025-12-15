import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-2 pl-1 text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900
        border border-gray-300 
        focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30
        transition-all duration-200 ease-in-out cursor-pointer
        ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
export default React.forwardRef(Select);
