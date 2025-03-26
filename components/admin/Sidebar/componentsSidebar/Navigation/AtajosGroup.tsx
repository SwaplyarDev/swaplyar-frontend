import { Tag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AtajosGroup = ({
  collapsed,
  pathname,
  statusDropdownOpen,
  toggleStatusDropdown,
  statusShortcuts,
  createStatusUrl,
}: {
  collapsed: boolean;
  pathname: string;
  statusDropdownOpen: boolean;
  toggleStatusDropdown: () => void;
  statusShortcuts: any;
  createStatusUrl: (id: string) => string;
}) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Atajos
        </h3>
      )}

      {!collapsed ? (
        <div>
          {statusShortcuts.map((group: any, groupIndex: any) => (
            <div key={groupIndex} className="mb-3">
              <h4 className="mb-1.5 px-3 text-xs font-medium text-gray-600 dark:text-gray-300">{group.title}</h4>
              <ul className="space-y-1.5">
                {group.items.map((item: any) => (
                  <li key={item.id}>
                    <Link
                      href={createStatusUrl(item.id)}
                      className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${collapsed ? 'justify-center' : ''}`}
                    >
                      <item.icon size={20} className={`${item.color} ${collapsed ? '' : 'mr-3'}`} />
                      {!collapsed && <span className={item.color}>{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={toggleStatusDropdown}
            className={`flex w-full justify-center rounded-md px-3 py-2.5 text-sm transition-colors ${statusDropdownOpen ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'}`}
            aria-label="Mostrar atajos"
          >
            <Tag size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AtajosGroup;
