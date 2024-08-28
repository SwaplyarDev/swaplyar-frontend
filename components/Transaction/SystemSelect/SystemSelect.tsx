'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSystemStore } from '@/store/useSystemStore';

interface System {
  id: string;
  name: string;
  logo: string;
  isDisabled: boolean;
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

  // Zustand Store
  const {
    selectedSendingSystem,
    selectedReceivingSystem,
    setSelectedSendingSystem,
    setSelectedReceivingSystem,
  } = useSystemStore();

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
    if (isSending) {
      setSelectedSendingSystem(system);
    } else {
      setSelectedReceivingSystem(system);
    }
    onSystemSelect(system);
    setShowOptions(false);
  };

  const updatedSystems = systems.map((system) => ({
    ...system,
    isDisabled:
      system.id === selectedSendingSystem?.id ||
      system.id === selectedReceivingSystem?.id,
  }));

  return (
    <div className="relative mt-4">
      <button
        className={`system-input-select flex w-full items-center justify-between rounded border p-2 ${
          isSending ? 'animation-system-send' : 'animation-system-receive'
        } ${darkMode ? 'dark' : ''}`}
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
            <span className="w-full px-1 text-start">
              {selectedSystem.name}
            </span>
          </>
        ) : (
          <span>
            Selecciona un sistema {isSending ? 'de envío' : 'de recepción'}
          </span>
        )}
        <FontAwesomeIcon icon={faChevronDown} width={32} height={16} />
      </button>
      {showOptions && (
        <ul className="absolute z-10 w-full rounded border bg-white shadow-md dark:bg-gray-800">
          {updatedSystems.map((system) => (
            <li
              key={system.id}
              onClick={() => !system.isDisabled && handleOptionClick(system)}
              className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                system.isDisabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <Image
                src={system.logo}
                alt={system.name}
                width={32}
                height={32}
              />
              <span className="px-1">{system.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
