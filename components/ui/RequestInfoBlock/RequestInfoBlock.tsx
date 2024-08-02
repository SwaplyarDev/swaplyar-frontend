// components/ui/InfoBlock.tsx 

import React from 'react';

interface InfoBlockProps {
    title: string; 
    content: string | React.ReactNode;
    className?: string;
}

const RequestInfoBlock: React.FC<InfoBlockProps> = ({ title, content, className }) => {
    return (
        <div className={`my-8 w-full max-w-3xl px-4 ${className}`}> 
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                <div className="p-6 rounded-lg shadow-md bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
                    <h2 className="text-2xl font-semibold mb-4">
                        {title}
                    </h2>
                    {content} 
                </div>
            </div>
        </div>
    );
};

export default RequestInfoBlock;
