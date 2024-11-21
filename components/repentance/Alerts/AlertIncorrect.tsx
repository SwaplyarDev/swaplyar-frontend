import React from 'react';
import Swal from 'sweetalert2';

const AlertIncorrect = () => {
    Swal.fire({
        title: "Datos incorrectos",
        text: "los datos que se indicaron son incorrectos verifiquelos",
        icon: "question",
        preConfirm: () => {
            return 'AlertIncorrect';
          },
      });
};

export default AlertIncorrect;