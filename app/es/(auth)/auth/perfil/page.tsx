import React from 'react';
import Profile from '@/components/profile/Profile';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';

const ProfilePage = () => {
  return (
    <>
      <AnimatedBlurredCircles tope="top-[124px] z-10 "></AnimatedBlurredCircles>
      <Profile />
    </>
  );
};

export default ProfilePage;
