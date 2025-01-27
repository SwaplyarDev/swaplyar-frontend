import Swal from 'sweetalert2';

export const showStatusAlert = (statuses: { text: string; icon: string }[], isDark: boolean) => {
  Swal.fire({
    html: `
    <div class="flex flex-col items-center justify-center w-full h-full pt-[50px] pb-[50px]">
      <div>
        <ul>
          ${statuses
            .map(
              (message, index) => `
              <div class="w-[325px] flex items-center flex-col">
                <li class="flex gap-[17px] h-[50px] w-full items-center">
                  <div class="w-[25px] flex justify-start relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" class="icon-svg">
                      <path d="M10.75 15.25L8.0625 12.5625C7.83333 12.3333 7.54167 12.2188 7.1875 12.2188C6.83333 12.2188 6.54167 12.3333 6.3125 12.5625C6.08334 12.7917 5.96875 13.0833 5.96875 13.4375C5.96875 13.7917 6.08334 14.0833 6.3125 14.3125L9.875 17.875C10.125 18.125 10.4167 18.25 10.75 18.25C11.0833 18.25 11.375 18.125 11.625 17.875L18.6875 10.8125C18.9167 10.5833 19.0313 10.2917 19.0313 9.9375C19.0313 9.58333 18.9167 9.29167 18.6875 9.0625C18.4583 8.83333 18.1667 8.71875 17.8125 8.71875C17.4583 8.71875 17.1667 8.83333 16.9375 9.0625L10.75 15.25ZM12.5 25.5C10.7708 25.5 9.14584 25.1717 7.625 24.515C6.10417 23.8583 4.78125 22.9679 3.65625 21.8438C2.53125 20.7196 1.64084 19.3967 0.985002 17.875C0.329168 16.3533 0.000834916 14.7283 1.58228e-06 13C-0.000831751 11.2717 0.327502 9.64667 0.985002 8.125C1.6425 6.60333 2.53292 5.28042 3.65625 4.15625C4.77958 3.03208 6.1025 2.14167 7.625 1.485C9.1475 0.828333 10.7725 0.5 12.5 0.5C14.2275 0.5 15.8525 0.828333 17.375 1.485C18.8975 2.14167 20.2204 3.03208 21.3438 4.15625C22.4671 5.28042 23.3579 6.60333 24.0163 8.125C24.6746 9.64667 25.0025 11.2717 25 13C24.9975 14.7283 24.6692 16.3533 24.015 17.875C23.3608 19.3967 22.4704 20.7196 21.3438 21.8438C20.2171 22.9679 18.8942 23.8587 17.375 24.5162C15.8558 25.1737 14.2308 25.5017 12.5 25.5Z" 
                      ${isDark ? ` fill="#EBE7E0"` : `fill="#012A8E" `}/>
                    </svg>
                    <!-- Línea debajo del primer icono -->
                    ${
                      index < statuses.length - 1
                        ? `
                      <div class="w-[6px] h-[30px] ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} absolute bottom-[-30px] left-1/2 transform -translate-x-1/2"></div>
                    `
                        : ''
                    }
                  </div>
                  <div class="flex-1 text-start">
                    <p>${message.text}</p>
                  </div>
                  <div class="w-[25px] flex justify-end">
                    ${message.icon.replace(/(fill|stroke)="#[a-zA-Z0-9]+"/g, (match, property) => `${property}="${isDark ? '#EBE7E0' : '#000'}"`)}</div>
                </li>
              </div>
              `,
            )
            .join('')}
        </ul>
      </div>
      <button class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full border ${isDark ? 'border-white text-white' : 'border-[#012A8E] text-[#012A8E]'}">
        <span>←</span> Volver
      </button>
      <button class="absolute top-2 right-2 text-white text-xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M30 10L10 30M10 10L30 30" 
            ${isDark ? `stroke="#EBE7E0" ` : `stroke="#252526" `} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `,

    showConfirmButton: false,
    showCancelButton: false,
    background: isDark
      ? 'var(--Colores-Modo-Oscuro-Atracita, #252526)'
      : 'var(--Colores-Institucionales-Modo-Oscuro-010-Ant, #FAFAFA)',
    color: isDark ? 'var(--Colores-Modo-Oscuro-Marfil-Suave, #EBE7E0)' : '#000000',
    customClass: {
      popup: 'w-[400px] rounded-lg',
    },
  });
};

/**
 *q3nd0ujspwh
 * Gasly
 */
