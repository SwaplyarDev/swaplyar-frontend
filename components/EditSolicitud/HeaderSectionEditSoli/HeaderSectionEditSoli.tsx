import React from 'react';
import ImageSectionEditSoli from '../ImageSectionEditSoli/ImageSectionEditSoli';

const HeaderSectionEditSoli = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row lg2:w-0">
      <div className="mx-auto flex w-full flex-col flex-wrap content-center px-0 md:max-w-[506px] lg:px-0 lg2:absolute lg2:-left-6 lg2:top-0 lg2:-z-10 lg2:h-[424px] lg2:w-[384px]">
        <ImageSectionEditSoli />
      </div>
    </div>
  );
};

export default HeaderSectionEditSoli;
