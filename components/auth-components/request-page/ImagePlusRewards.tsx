'use client';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Image from 'next/image';
import { plusRewardsDark, plusRewardsLight } from '@/utils/assets/imgDatabaseCloudinary';

export const ImagePlusRewards = () => {
  const { isDark } = useDarkTheme();
  return (
    <>
      {isDark ? (
        <Image
          src={plusRewardsDark}
          alt="Plus Rewards"
          width={187.5}
          height={96}
          className="object-cover xs-mini-phone:w-[220px] md-phone:w-[260px]"
        />
      ) : (
        <Image
          src={plusRewardsLight}
          alt="Plus Rewards"
            width={187.5}
          height={96}
          className="object-cover xs-mini-phone:w-[220px] md-phone:w-[260px]"
        />
      )}
    </>
  );
};
