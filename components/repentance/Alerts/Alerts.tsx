import { createRegret } from '@/actions/repentance/action.repentanceForm';
import { AlertsProps, FormData } from '@/types/repentance/repentance';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import AlertDuplication from './AlertDuplication';
import AlertSuccess from './AlertSuccess';
import AlertError from './AlertError';
import AlertProcess from './AlertProcess';
import AlertIncorrect from './AlertIncorrect';

const Alerts: React.FC<AlertsProps> = ({ status }) => {
  const renderAlert = async () => {
    switch (status) {
      case 'PROCESS':
        await AlertProcess();
        console.log('PROCESS: dale quiero terminar 1');
        break;
      case 'SUCCESS':
        await AlertSuccess();
        console.log('SUCCESS: dale quiero terminar 2');
        break;
      case 'DUPLICATE':
        await AlertDuplication();
        console.log('DUPLICATE: dale quiero terminar 3');
        break;
      case 'INCORRECT_DATA':
        await AlertIncorrect();
        console.log('INCORRECT_DATA: dale quiero terminar 4');
        break;
      case 'ERROR':
        await AlertError();
        console.log('ERROR: dale quiero terminar 5');
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    renderAlert();
  }, [status]);

  return null; // Este componente solo se encarga de mostrar las alertas
};

export default Alerts;
