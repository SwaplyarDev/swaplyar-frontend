import { Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const GestionGroup = ({ collapsed, pathname }: { collapsed: boolean; pathname: string }) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Gestión
        </h3>
      )}
      <ul className="space-y-1.5">
        <li>
          <Link
            href="/admin/users"
            className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
              pathname === '/admin/users' || pathname?.startsWith('/admin/users')
                ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <Users size={20} className={collapsed ? '' : 'mr-3'} />
            {!collapsed && <span>Gestión de Usuarios</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GestionGroup;
