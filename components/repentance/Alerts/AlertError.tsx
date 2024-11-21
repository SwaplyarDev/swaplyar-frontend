
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AlertError = () => {
    const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el spinner
    setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: 'Hubo un problema al enviar su solicitud. Intente nuevamente.',
        preConfirm: () => {
            return 'AlertError';
          },
      });
};

export default AlertError;