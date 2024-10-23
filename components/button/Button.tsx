import React from "react";

const Button = () => {
  return (
    <button className="relative flex items-center justify-center gap-2 px-5 py-2 text-white bg-blue-600 rounded-full border-2 border-transparent shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out hover:border-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400">
      Apply Now
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
      >
        <path
          clipRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
          fillRule="evenodd"
        />
      </svg>
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-60 -translate-x-full group-hover:translate-x-full transition-all duration-500 ease-out"></span>
    </button>
  );
};

export default Button;
