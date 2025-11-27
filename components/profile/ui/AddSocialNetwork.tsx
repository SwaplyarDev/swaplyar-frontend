'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { ChevronDown } from 'lucide-react';
import CustomInput from '@/components/ui/Input/CustomInput';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { IconInstagram, IconFacebook, IconTwitterX, IconLinkedin } from '@/components/ui/IconsRed';
import { useRef, useState } from 'react';

type SocialOption = {
  value: string;
  label: string;
  image: React.ReactNode;
};

type AddSocialNetworkProps = {
  selectedRed: SocialOption | null;
  onSelectRed: (red: SocialOption) => void;
  username: string;
  onUsernameChange: (username: string) => void;
};

const options: SocialOption[] = [
  { value: 'instagram', label: 'Instagram', image: <IconInstagram className="w-7 h-7" /> },
  { value: 'facebook', label: 'Facebook', image: <IconFacebook className="w-7 h-7" /> },
  { value: 'twitterX', label: 'Twitter/X', image: <IconTwitterX className="w-7 h-7" /> },
  { value: 'Linkedin', label: 'Linkedin', image: <IconLinkedin className="w-7 h-7" /> },
];

const AddSocialNetwork = ({
  selectedRed,
  onSelectRed,
  username,
  onUsernameChange,
}: AddSocialNetworkProps) => {
  const { isDark } = useDarkTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={dropdownRef} className="relative w-full">
        <div
          className="relative w-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CustomInput
            label="Selecciona la red Social"
            value={selectedRed?.label ?? ''}
            readOnly
            isSelect={true}
            classNameInput='cursor-pointer'
          >
            <>
              {selectedRed?.image && (
                <span className="w-7 h-7 flex items-center justify-center">{selectedRed.image}</span>
              )}
              <ChevronDown
                className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </>
          </CustomInput>
        </div>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`scrollable-list relative top-full mt-1 z-10 w-full max-h-48 overflow-y-auto rounded-[32px] pl-2 ${isDark ? 'bg-custom-grayD-800' : 'bg-custom-whiteD'}`}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={clsx(
                  'scrollable-list flex cursor-pointer items-center gap-2 my-2 mx-2 rounded-full font-textFont',
                  isDark ? 'text-custom-whiteD  hover:bg-custom-grayD-700' : 'text-inputLight hover:bg-custom-whiteD-500',
                  {
                    [isDark ? 'bg-custom-grayD-700 text-custom-whiteD' : 'bg-custom-whiteD-500']:
                      selectedRed?.value === option.value,
                  },
                )}
                onClick={() => {
                  onSelectRed(option);
                  setIsOpen(false);
                }}
              >
                <span className="flex items-center justify-center w-8 h-8">{option.image}</span>
                <span>{option.label}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
      {selectedRed && (
        <CustomInput
          label="Nombre de usuario"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="Nombre de usuario"
          classNameInput='w-full'
        />
      )}
    </>
  );
};

export default AddSocialNetwork;
