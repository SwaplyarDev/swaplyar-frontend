import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const LogoSidebar = ({ collapsed, toggleSidebar }: { collapsed: boolean; toggleSidebar: () => void }) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4 dark:border-gray-700">
      {!collapsed && (
        <>
          <img className="h-8" src="/images/logo.png" alt="" />
        </>
      )}

      <button
        onClick={toggleSidebar}
        className={`rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 ${
          collapsed ? 'mx-auto' : 'ml-auto'
        }`}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default LogoSidebar;
