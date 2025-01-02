'use client';
import React from 'react';
import SeachRequest from './form/SeachRequest';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import HeaderSectionEditSoli from './HeaderSectionEditSoli/HeaderSectionEditSoli';

const EditSoli = () => {
  return (
    <>
      <AnimatedBlurredCircles tope="top-[124px]" />
      <div className="mx-10 flex w-full flex-col justify-center gap-5 lg:flex-row">
        <HeaderSectionEditSoli />
        <div className="mr-0 flex h-auto w-full flex-col border-0 lg:pt-32">
          <SeachRequest />
        </div>
      </div>
    </>
  );
};

export default EditSoli;
