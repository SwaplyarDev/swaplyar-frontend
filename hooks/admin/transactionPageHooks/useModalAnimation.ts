'use client';

import { useState, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);

/**
 * Hook para manejar la animación de entrada/salida del modal
 */
export function useModalAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  // Handle modal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Close the modal
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => MySwal.close(), 300);
  };

  return { isVisible, handleClose };
}
