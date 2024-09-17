'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSystemStore } from '@/store/useSystemStore';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface System {
  id: string;
  name: string;
  logo: string;
  logoDark: string;
  isDisabled: boolean;
  coin: string;
}

interface SystemSelectProps {
  systems: System[];
  selectedSystem: System | null;
  onSystemSelect: (system: System) => void;
  label: string;
  inputId: string;
  isSending: boolean;
  showOptions: boolean;
  toggleSelect: () => void;
}

export default function SystemSelect({
  systems,
  selectedSystem,
  onSystemSelect,
  label,
  inputId,
  isSending,
  showOptions,
  toggleSelect,
}: SystemSelectProps) {
  const { isDark } = useDarkTheme();
  const [showOptionsInternal, setShowOptionsInternal] = useState(false);

  const {
    selectedSendingSystem,
    selectedReceivingSystem,
    activeSelect,
    setActiveSelect,
  } = useSystemStore();

  const handleClick = () => {
    if (activeSelect === (isSending ? 'send' : 'receive')) {
      setShowOptionsInternal((prev) => !prev);
    } else {
      // Cierra cualquier otro select abierto antes de abrir este
      setActiveSelect(isSending ? 'send' : 'receive');
      setShowOptionsInternal(true);
    }
  };

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   setDarkMode(mediaQuery.matches);
  //   const handleChange = (e: MediaQueryListEvent) => {
  //     setDarkMode(e.matches);
  //   };
  //   mediaQuery.addEventListener('change', handleChange);
  //   return () => mediaQuery.removeEventListener('change', handleChange);
  // }, []);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkMode]);

  useEffect(() => {
    // Si cambia `activeSelect`, asegúrate de cerrar el menú si este no es el select activo
    if (activeSelect !== (isSending ? 'send' : 'receive')) {
      setShowOptionsInternal(false);
    }
  }, [activeSelect, isSending]);

  const handleOptionClick = (system: System) => {
    onSystemSelect(system);
    setShowOptionsInternal(false);
    setActiveSelect(null); // Cierra el select después de seleccionar una opción
  };

  const updatedSystems = systems.map((system) => ({
    ...system,
    isDisabled:
      system.id === selectedSendingSystem?.id ||
      system.id === selectedReceivingSystem?.id,
  }));

  return (
    <div className="relative w-full sm:mt-4">
      <button
        className={`system-input-select flex h-16 xs:h-[7.4rem] w-full items-center justify-between rounded-2xl rounded-t-none border-2 border-t-0 border-[#012c8a] p-2 dark:border-gray-200 sm:w-64 sm:justify-start sm:rounded-bl-none sm:rounded-tl-none sm:rounded-tr-2xl sm:border-l-0 sm:border-t-2 ${
          isSending ? 'animation-system-send' : 'animation-system-receive'
        } ${isDark ? 'dark' : ''}`}
        onClick={handleClick}
      >
        {selectedSystem ? (
          <div className="flex w-full justify-center">
            <Image
              src={
                isDark == true ? selectedSystem.logoDark : selectedSystem.logo
              }
              alt={selectedSystem.name}
              width={200}
              height={70}
            />
          </div>
        ) : (
          <></>
        )}
        <FontAwesomeIcon icon={faChevronDown} width={32} height={16} />
      </button>
      {showOptionsInternal && (
        <ul className="scrollable-list absolute z-[500] max-h-64 w-full overflow-y-auto overflow-x-hidden rounded-2xl border border-[#012c8a] bg-white shadow-md dark:border-white dark:bg-gray-800 sm:w-64">
          {updatedSystems.map((system) => (
            <li
              key={system.id}
              onClick={() => !system.isDisabled && handleOptionClick(system)}
              className={`flex cursor-pointer items-center justify-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                system.isDisabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <Image
                src={isDark == true ? system.logoDark : system.logo}
                alt={system.name}
                width={200}
                height={70}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
