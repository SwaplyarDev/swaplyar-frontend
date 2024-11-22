
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AlertError = () => {

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