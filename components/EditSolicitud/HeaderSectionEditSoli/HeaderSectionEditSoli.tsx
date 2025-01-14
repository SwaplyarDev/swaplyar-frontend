import React from 'react';
import ImageSectionEditSoli from '../ImageSectionEditSoli/ImageSectionEditSoli';

const HeaderSectionEditSoli = () => {
  return (
    <div className="flex w-auto flex-col lg:flex-row">
      <div className="flex flex-col flex-wrap content-center px-0 md:px-10 lg:px-0">
        <h1 className="w-full text-start text-4xl font-bold">Editar solicitud</h1>
        <p className="mt-2 hidden w-80 text-justify text-xl font-bold lg:block">
          Ingrese los datos tal cual aparece en el email enviado
        </p>
        <ImageSectionEditSoli />
      </div>
    </div>
  );
};

export default HeaderSectionEditSoli;
