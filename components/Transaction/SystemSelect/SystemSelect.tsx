// /SystemSelect

'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface System {
  id: string;
  name: string;
  logo: string;
}

interface SystemSelectProps {
  systems: System[];
  selectedSystem: System | null;
  onSystemSelect: (system: System) => void;
  label: string;
  inputId: string;
  isSending: boolean;
}

export default function SystemSelect({
  systems,
  selectedSystem,
  onSystemSelect,
  label,
  inputId,
  isSending,
}: SystemSelectProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOptionClick = (system: System) => {
    onSystemSelect(system);
    setShowOptions(false);
  };

  return (
    <div className="relative mt-4">
      <button
        className={`system-input-select flex w-full items-center justify-between rounded border p-2 ${isSending ? 'animation-system-send' : 'animation-system-receive'} ${darkMode ? 'dark' : ''}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedSystem ? (
          <>
            <Image
              src={selectedSystem.logo}
              alt={selectedSystem.name}
              width={32}
              height={32}
            />
            <span>{selectedSystem.name}</span>
          </>
        ) : (
          <span>
            Selecciona un sistema {isSending ? 'de envío' : 'de recepción'}
          </span>
        )}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {showOptions && (
        <ul className="absolute z-10 w-full rounded border bg-white shadow-md dark:bg-gray-800">
          {systems.map((system) => (
            <li
              key={system.id}
              onClick={() => handleOptionClick(system)}
              className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image
                src={system.logo}
                alt={system.name}
                width={32}
                height={32}
              />
              <span>{system.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
