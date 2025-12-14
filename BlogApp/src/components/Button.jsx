import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-6 py-3 rounded-lg font-semibold shadow-md 
        transition-all duration-200 ease-in-out 
        hover:shadow-lg hover:opacity-90 
        active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
