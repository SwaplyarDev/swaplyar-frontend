const SearchBar: React.FC = () => {
    return (
      <div className="flex justify-end mt-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar en..."
            className="w-full pl-4 pr-10 p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-0"
            style={{ color: 'black', backgroundColor: 'white' }}
          />
          <span className="absolute right-3 top-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 2a9 9 0 100 18 9 9 0 000-18zM21 21l-6-6"
              />
            </svg>
          </span>
        </div>
      </div>
    );
  };
  
export default SearchBar;

