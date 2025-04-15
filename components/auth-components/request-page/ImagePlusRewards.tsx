'use client';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Image from 'next/image';

export const ImagePlusRewards = () => {
  const { isDark } = useDarkTheme();
  return (
    <>
      {isDark ? (
        <Image
          src="/images/solicitud-plus-rewards-dark.png"
          alt="Plus Rewards"
          width={250}
          height={128}
          className="mb-2 object-cover xs-mini-phone:w-[220px] md-phone:w-[260px]"
        />
      ) : (
        <Image
          src="/images/solicitud-plus-rewards-light.png"
          alt="Plus Rewards"
          width={250}
          height={128}
          className="mb-2 object-cover xs-mini-phone:w-[220px] md-phone:w-[260px]"
        />
      )}
    </>
  );
};
