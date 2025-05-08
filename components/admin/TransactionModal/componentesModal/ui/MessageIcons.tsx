export const CancelIcon = () => {
  return (
    <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#CE1818]">
      <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#530000] pb-1">
        <svg xmlns="http://www.w3.org/2000/svg" width={31} height={27} fill="none">
          <path
            stroke="#EBE7E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M15.428 20.2h.013m-.013-9.943v4.971M13.066 2.331 1.37 21.857A2.762 2.762 0 0 0 3.73 26h23.393a2.761 2.761 0 0 0 2.361-4.143L17.791 2.331a2.761 2.761 0 0 0-4.723 0"
          />
        </svg>
      </div>
    </div>
  );
};

export const EditIcon = () => {
  return (
    <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#FF6200]">
      <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#642600] pl-1">
        <svg xmlns="http://www.w3.org/2000/svg" width={31} height={31} fill="none">
          <path
            stroke="#EBE7E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.74 2.521H4.053A3.053 3.053 0 0 0 1 5.574v21.373A3.053 3.053 0 0 0 4.053 30h21.373a3.053 3.053 0 0 0 3.053-3.053V16.26"
          />
          <path
            stroke="#EBE7E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M24.472 1.949a3.238 3.238 0 1 1 4.58 4.58l-13.76 13.76c-.362.362-.81.627-1.302.771l-4.386 1.283a.763.763 0 0 1-.947-.947L9.94 17.01c.144-.492.41-.939.772-1.3l13.76-13.761Z"
          />
        </svg>
      </div>
    </div>
  );
};
