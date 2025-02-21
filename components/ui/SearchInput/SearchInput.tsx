import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import { Blog } from '@/types/blogs/blog';
import Link from 'next/link';
import slugify from 'slugify';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  results: Blog[];
}

export default function SearchInput({ searchTerm, onSearchChange, results }: SearchInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDark } = useDarkTheme();

  const handleFocus = () => setIsExpanded(true);
  const handleClose = () => {
    setIsExpanded(false);
    onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0 && results.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, results]);

  return (
    <div className="mt-12 flex flex-col justify-start dark:bg-lightText">
      <div className="h-[50px] w-[150px]"></div>
      <div
        className={`absolute z-10 max-w-[250px] rounded-2xl border-[1px] ${
          isDark
            ? 'border-darkText bg-lightText text-darkText focus-within:ring-gray-500'
            : 'border-inputLight bg-white text-black focus-within:ring-gray-400'
        }`}
      >
        <div className={`relative rounded-2xl transition-all duration-300 ${isExpanded ? 'w-[250px]' : 'w-[150px]'}`}>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-inputLight dark:text-darkText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke={'currentColor'}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 2a9 9 0 100 18 9 9 0 000-18zM21 21l-6-6"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full rounded-2xl border-none bg-transparent p-3 pl-10 pr-10 text-sm text-black focus:border-none focus:outline-none focus:ring-0 dark:text-darkText sm:text-base"
            value={searchTerm}
            onFocus={handleFocus}
            onChange={onSearchChange}
          />
          {isExpanded && (
            <button
              onClick={handleClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-inputLight dark:text-darkText"
            >
              <X size={25} />
            </button>
          )}
        </div>
        <div
          className={`z-50 transform overflow-hidden rounded-b-2xl bg-transparent shadow-lg transition-all duration-300 ease-in-out ${
            showResults
              ? 'mt-1 max-h-[300px] w-full translate-y-0 opacity-100'
              : 'm-0 max-h-0 w-0 translate-y-[-20px] opacity-0'
          }`}
        >
          {results.slice(0, 4).map((post) => {
            const slug = slugify(post.title, { lower: true, strict: true });
            return (
              <>
                <div className="mx-5 h-[1px] w-full max-w-[200px] bg-custom-grayD-500"></div>
                <Link
                  href={`blog/blogDetail?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(post.blog_id)}`}
                  onClick={handleClose}
                >
                  <div
                    key={post.blog_id}
                    className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {post.title}
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
