import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSystemStore } from '@/store/useSystemStore';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { System } from '@/types/data';

interface SystemSelectProps {
  systems: System[];
  selectedSystem: System | null;
  onSystemSelect: (system: System) => void;
  inputId: string;
  isSending: boolean;
  showOptions: boolean;
  toggleSelect: () => void;
}

export default function SystemSelect({ systems, selectedSystem, onSystemSelect, isSending }: SystemSelectProps) {
  const { isDark } = useDarkTheme();
  const [showOptionsInternal, setShowOptionsInternal] = useState(false);

  const { selectedSendingSystem, selectedReceivingSystem, activeSelect, setActiveSelect } = useSystemStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (activeSelect === (isSending ? 'send' : 'receive')) {
      setShowOptionsInternal((prev) => !prev);
    } else {
      setActiveSelect(isSending ? 'send' : 'receive');
      setShowOptionsInternal(true);
    }
  };

  useEffect(() => {
    if (activeSelect !== (isSending ? 'send' : 'receive')) {
      setShowOptionsInternal(false);
    }
  }, [activeSelect, isSending]);

  // Detect clicks outside the dropdown to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOptionsInternal(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleOptionClick = (system: System) => {
    onSystemSelect(system);
    setShowOptionsInternal(false);
    setActiveSelect(null);
  };

  const updatedSystems = systems.map((system) => ({
    ...system,
    isDisabled: system.id === selectedSendingSystem?.id || system.id === selectedReceivingSystem?.id,
  }));

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      {showOptionsInternal && (
        <div
          className="fixed inset-0 z-[400] bg-black/40 sm:hidden"
          onClick={() => setShowOptionsInternal(false)}
        />
      )}
      <button
        className={`max-sm:h-[70px] sm:max-h-[80px] md:max-h-[100px] h-full system-input-select flex items-center justify-end sm:justify-between w-full ${ isSending ? 'animation-system-send' : 'animation-system-receive'} ${isDark ? 'dark' : ''}`}
        onClick={handleClick}
      >
        {selectedSystem ? (
          <div className="flex max-h-[70px] sm:max-h-[80px] md:max-h-[100px] max-sm:w-[80%] sm:w-full justify-start sm:justify-center">
            <Image
              src={isDark ? selectedSystem.logoDark : selectedSystem.logo}
              alt={selectedSystem.name}
              width={190}
              height={70}
              className="w-[150px] sm:w-[190px] h-[50px] sm:h-[70px] object-contain"
            />
          </div>
        ) : null}
        <div className="sm:pr-4">
          <FontAwesomeIcon icon={faChevronDown} className="w-6 h-4 md:w-8 md:h-5" />
        </div>
      </button>
      {showOptionsInternal && (
        <ul
          className={`
            scrollable-list absolute z-[500] max-h-80 w-full overflow-y-auto overflow-x-hidden rounded-2xl 
            pl-2 sm:top-full sm:mt-1 
            max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 
            max-sm:mx-4 max-sm:w-[calc(100%-2rem)] max-sm:rounded-t-2xl max-sm:h-[40vh]
            ${isDark ? 'bg-custom-grayD-800' : 'bg-custom-whiteD'}
          `}
        >
          <li className={`z-10 sticky ${isDark ? ' bg-custom-grayD-800' : 'bg-custom-whiteD'} top-0 min-[640px]:hidden text-center py-2 text-lg font-semibold border-b border-inputLight`}>Seleccione Billetera</li>
          {updatedSystems.map((system) => (
            <li
              key={system.id}
              onClick={() => !system.isDisabled && handleOptionClick(system)}
              className={`scrollable-list flex cursor-pointer items-center justify-center h-12 my-2 py-1 gap-2 rounded-full font-textFont
                ${system.isDisabled ? '!cursor-not-allowed opacity-50' : ''} 
                ${isDark ? 'text-custom-grayD hover:bg-custom-grayD-700' : 'text-inputLight hover:bg-custom-whiteD-500'}
                ${
                  selectedSystem?.id === system.id  
                    ? isDark
                      ? 'bg-custom-grayD-700'
                      : 'bg-custom-whiteD-500'
                    : ''
                }
              `}
            >
              <Image
                src={isDark ? system.logoDark : system.logo}
                alt={system.name}
                width={200}
                height={70}
                className="w-[150px] sm:w-[175px] h-[45px] sm:h-[45px] object-contain"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}