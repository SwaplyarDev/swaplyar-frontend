import React from 'react';
import ImageSectionEditSoli from '../ImageSectionEditSoli/ImageSectionEditSoli';

const HeaderSectionEditSoli = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="flex w-full flex-col flex-wrap content-center px-0 md:px-10 lg:px-0">
        <ImageSectionEditSoli />
      </div>
    </div>
  );
};

export default HeaderSectionEditSoli;
