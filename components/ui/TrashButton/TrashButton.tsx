'use client';

export default function TrashButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Eliminar cuenta"
      className="group flex h-[44px] w-[44px] flex-col items-center justify-center rounded-full border-[2.5px] border-red-300 bg-red-500 transition duration-300 hover:bg-red-600 active:scale-90 sm:h-[48px] sm:w-[48px]"
    >
      <svg
        className="w-[12px] origin-right transition-transform duration-300 group-hover:rotate-45 sm:w-[14px]"
        viewBox="0 0 39 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4" />
        <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3" />
      </svg>

      <svg className="w-[11px] sm:w-[13px]" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="bin-mask" fill="white">
          <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
        </mask>
        <path
          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
          fill="white"
          mask="url(#bin-mask)"
        />
        <path d="M12 6L12 29" stroke="white" strokeWidth="4" />
        <path d="M21 6V29" stroke="white" strokeWidth="4" />
      </svg>
    </button>
  );
}
