import Image from 'next/image';
import React from 'react';

const SearchRequest = () => {
  return (
    <div className="mx-auto min-h-screen w-full py-4 max-w-screen-lg flex flex-col gap-4">
      <div className='px-4'>
        <h1 className='text-4xl text-lightText dark:text-darkText'>Buscar Solicitud</h1>
        <p className='text-xl text-lightText dark:text-darkText'>Ingresa los datos tal cual aparece en el email enviado</p>
      </div>
      <section className='relative min-h-[700px] flex flex-col items-end justify-center'>
        <Image className='absolute top-0 left-0' src="/images/search-request-web.png" alt="SwaplyAr Search Request™" width={700} height={700}/>
        <form action="" className='flex flex-col gap-4 mb-60'>
          <label htmlFor="numberOfRequest">
            NUMERO DE SOLICITUD
          </label>
          <input type="text" placeholder='como figura en el recibo' />
          <label htmlFor="lastNameRequest">
            APELLIDO
          </label>
          <input type="text" placeholder='como figura en el recibo' />
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Buscar</button>
          <button type='button'>Salir</button>
        </form>
      </section>
    </div>
  );
};

export default SearchRequest;
