import ListFooterAuth from './ListFooterAuth';
import { NavIcons } from './NavIcons';
import Link from 'next/link';
import Image from 'next/image';
import { SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';

export const FooterInternal = () => {
  return (
    <footer>
      {/* Footer Mobile */}
      <div className={`fixed bottom-0 left-0 flex h-16 w-full justify-center bg-nav-blue pb-4 dark:bg-white xs:hidden`}>
        <NavIcons isFooter={true} />
      </div>
      {/* Footer Desktop */}
      <div className="hidden w-full justify-center pb-4 xs:flex">
        <div className="flex w-full items-center justify-center px-4">
          <ul className="flex flex-col items-center justify-between gap-4">
            <ListFooterAuth />
            <li className=":hover:w-1/3 mb-4 flex justify-center filter dark:brightness-[0%] dark:invert sm:mb-0 sm:w-1/3 sm:justify-center">
              <Link href="/es/home">
                <Image src={SwaplyArLogoSolo} alt="Cambiar saldo online" width={65} height={70} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
