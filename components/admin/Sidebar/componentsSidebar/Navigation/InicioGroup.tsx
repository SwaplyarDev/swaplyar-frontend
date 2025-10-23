import { BarChart3, CreditCard } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const InicioGroup = ({ collapsed, pathname }: { collapsed: boolean; pathname: string }) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Inicio
        </h3>
      )}
      <ul className="space-y-1.5">
        <li>
          <Link
            href="/es/admin/transactions?page=1"
            className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
              pathname === '/es/admin/transactions?page=1' || pathname?.startsWith('/es/admin/transactions?page=1')
                ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <CreditCard size={20} className={collapsed ? '' : 'mr-3'} />
            {!collapsed && <span>Operación de Transacciones</span>}
          </Link>
        </li>
        {/* <li>
          <Link
            href="/es/admin/reports"
            className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
              pathname === '/admin/reports' || pathname?.startsWith('/admin/reports')
                ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <BarChart3 size={20} className={collapsed ? '' : 'mr-3'} />
            {!collapsed && <span>Reportes</span>}
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default InicioGroup;
