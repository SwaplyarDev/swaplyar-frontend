// components/ui/InfoBlock.tsx

import React from 'react';

interface InfoBlockProps {
  title: string;
  content: string | React.ReactNode;
  className?: string;
}

const RequestInfoBlock: React.FC<InfoBlockProps> = ({
  title,
  content,
  className,
}) => {
  return (
    <div className={`min-h-screen w-full max-w-3xl px-4 ${className}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
        <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-black dark:text-gray-100">
          <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
          {content}
        </div>
      </div>
    </div>
  );
};

export default RequestInfoBlock;
