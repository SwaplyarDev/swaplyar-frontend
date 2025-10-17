'use client';

import type React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { X, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface VerificationModalProps {
  onClose: () => void;
}

export function VerificationModal({ onClose }: VerificationModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nacionalidad: '',
    documento: '',
    fechaNacimiento: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos
    MySwal.fire({
      title: 'Datos guardados',
      text: 'La información ha sido guardada correctamente',
      icon: 'success',
      confirmButtonColor: '#3085d6',
    }).then(() => {
      onClose();
    });
  };

  const openVerificationModal = () => {
    // Primero mostramos un modal vacío para la transición
    MySwal.fire({
      html: <div className="display-hidden"></div>,
      showConfirmButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      width: '1000px',
      backdrop: true,
      customClass: {
        popup: 'bg-transparent shadow-none',
        container: 'bg-transparent',
      },
      hideClass: {
        popup: 'swal2-hide-custom',
      },
    });

    // Después de un breve retraso, actualizamos el contenido
    setTimeout(() => {
      MySwal.update({
        html: (
          <div className="relative max-h-[90vh] overflow-auto">
            {/* Botón de cierre */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Imágenes de documentos */}
            <div className="flex w-full justify-between p-4">
              <div className="relative h-32 w-[30%] overflow-hidden rounded-lg border bg-white">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <Image
                    src="/placeholder.svg?height=128&width=200"
                    alt="Frente del documento"
                    width={200}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="relative h-32 w-[30%] overflow-hidden rounded-lg border bg-white">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <Image
                    src="/placeholder.svg?height=128&width=200"
                    alt="Dorso del documento"
                    width={200}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="relative h-32 w-[30%] overflow-hidden rounded-lg border bg-white">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="relative h-full w-full">
                    <Image
                      src="/placeholder.svg?height=128&width=100"
                      alt="Foto del usuario"
                      width={100}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-green-500 text-white">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="p-6">
              <h2 className="mb-2 text-lg font-semibold">Completar datos del solicitante</h2>
              <p className="mb-4 text-sm text-gray-600">
                Es fundamental ingresar los datos del solicitante de forma correcta.
              </p>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellido"
                    className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="nacionalidad"
                    value={formData.nacionalidad}
                    onChange={handleInputChange}
                    placeholder="Nacionalidad"
                    className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleInputChange}
                    placeholder="N° de Documento"
                    className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <p className="mb-1 text-sm text-gray-600">Fecha de Nacimiento</p>
                  <input
                    type="text"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    placeholder="DD/MM/AAAA"
                    className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Navegación */}
              <div className="mb-4 flex justify-center space-x-2">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                  onClick={handlePrev}
                  disabled={activeStep === 1}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
                  onClick={handleNext}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Texto informativo */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                <p>
                  La documentación proporcionada por el usuario (foto del documento de identidad emitido por el gobierno
                  y selfie) debe cumplir con los requisitos para la aprobación. Que sean claros y legibles. Si no cumple
                  con los requisitos, la solicitud de verificación será rechazada.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between">
                <button
                  className="flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={onClose}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </button>
                <button
                  className="rounded-full bg-blue-100 px-6 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        ),
        showConfirmButton: false,
        showCloseButton: false,
        customClass: {
          popup: 'rounded-lg shadow-xl p-0',
          container: '',
        },
      });

      document.querySelector('.swal2-html-container')?.classList.remove('opacity-0');
    }, 300);
  };

  return null; // The actual modal is rendered by SweetAlert2
}
