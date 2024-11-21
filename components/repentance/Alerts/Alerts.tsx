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
          break;
        case 'SUCCESS':
          await AlertSuccess();
          break;
        case 'DUPLICATE':
          await AlertDuplication();
          break;
        case 'INCORRECT_DATA':
          await AlertIncorrect();
          break;
        case 'ERROR':
          await AlertError();
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