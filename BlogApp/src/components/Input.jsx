import React, { useId } from "react";

const Input = React.forwardRef(function Input({ label, type = "text", className = "",...props },ref) {
  const id=useId()
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-2 pl-1 text-sm font-medium text-gray-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 
            border border-gray-300 
            focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30
            outline-none transition-all duration-200 ease-in-out
            placeholder:text-gray-400
            ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
})

export default Input;
