'use client';

import { useParams } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { X, CheckCircle, CreditCard, User, FileText, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UserDetailPage = () => {
  const params = useParams();
  const userId = Number.parseInt(params.id as string);
  const [activeTab, setActiveTab] = useState('frente');
  const [note, setNote] = useState('');

  const data = [
    {
      id: 1,
      code: '2448XPAR',
      name: 'John Doe',
      lastName: 'Smith',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      status: 'active',
      date_subscription: '2021-01-01',
      date_verification: '2021-01-01',
      document_number: '25252525',
      nationality: 'Estados Unidos',
      birth_date: '1985-03-15',
      phone_full: '+5493333333333',
      rewards: [
        {
          type: 'Cupón de Fidelización',
          amount: '$5 USD',
          emission_date: '02 de Enero de 2025',
          usage_date: '26 de Enero 2025',
          transaction: 'Crédito de $5 USD aplicado en la siguiente transacción',
        },
        {
          type: 'Cupón de Fidelización',
          amount: '$5 USD',
          emission_date: '31 de Octubre de 2024',
          usage_date: '1 de Noviembre 2024',
          transaction: 'Crédito de $5 USD aplicado en la siguiente transacción',
        },
        {
          type: 'Cupón de Bienvenida',
          amount: '$10 USD',
          emission_date: '26 de agosto de 2024',
          usage_date: '2 de Septiembre 2024',
          transaction: 'Crédito de $10 USD aplicado en la siguiente transacción',
        },
      ],
      rewards_count: 5,
      rewards_year: 8,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 2,
      code: '3559YQBR',
      name: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '+9876543210',
      status: 'pending',
      date_subscription: '2022-05-15',
      date_verification: '2022-05-20',
      document_number: '98765432',
      nationality: 'Canadá',
      birth_date: '1990-07-22',
      phone_full: '+5491122334455',
      rewards: [
        {
          type: 'Cupón de Fidelización',
          amount: '$5 USD',
          emission_date: '15 de Marzo de 2025',
          usage_date: '30 de Marzo 2025',
          transaction: 'Crédito de $5 USD aplicado en la siguiente transacción',
        },
        {
          type: 'Cupón de Bienvenida',
          amount: '$10 USD',
          emission_date: '10 de Diciembre de 2024',
          usage_date: '25 de Diciembre 2024',
          transaction: 'Crédito de $10 USD aplicado en la siguiente transacción',
        },
      ],
      rewards_count: 2,
      rewards_year: 4,
      createdAt: '2022-05-15',
      updatedAt: '2022-06-01',
    },
  ];

  // Buscar el usuario por ID
  const user = data.find((user) => user.id === userId);

  // Si no se encuentra el usuario
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-red-500">Usuario no encontrado</h1>
          <p className="text-gray-600">El usuario con ID {userId} no existe en nuestra base de datos.</p>
        </div>
      </div>
    );
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleVerifyDocumentation = () => {
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
        html: <VerificationModal user={user} onClose={() => MySwal.close()} />,
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

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between rounded-lg border bg-white p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Detalles del Usuario</h1>
              <p className="text-sm text-gray-500">ID: {user.id}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* User Code Section */}
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Código de Miembro</span>
                <span className="text-sm font-medium text-gray-600">Fecha de Solicitud</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-yellow-400"></div>
                  <span className="text-lg font-bold">{user.code}</span>
                </div>
                <span className="text-sm">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4 rounded-lg border bg-white p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Fecha de Inscripción</p>
                  <p className="font-medium">{user.date_subscription}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nombre</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Apellido</p>
                  <p className="font-medium">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Correo Electrónico</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Document Section */}
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-4 flex space-x-2 border-b">
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'frente' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => handleTabChange('frente')}
                >
                  FRENTE
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'dorso' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => handleTabChange('dorso')}
                >
                  DORSO
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'foto' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                  onClick={() => handleTabChange('foto')}
                >
                  FOTO
                </button>
              </div>
              <div className="flex justify-center p-4">
                {activeTab === 'frente' && (
                  <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 bg-white">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                )}
                {activeTab === 'dorso' && (
                  <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 bg-white">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                )}
                {activeTab === 'foto' && (
                  <div className="relative h-48 w-full max-w-xs overflow-hidden rounded-lg border bg-gray-100 bg-white">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  onClick={handleVerifyDocumentation}
                >
                  Verificar documentación
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 rounded-lg border bg-white p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Fecha de Inscripción</p>
                  <p className="font-medium">{user.date_subscription}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nombre</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Apellido</p>
                  <p className="font-medium">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nacionalidad</p>
                  <p className="font-medium">{user.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">N° de Documento</p>
                  <p className="font-medium">{user.document_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                  <p className="font-medium">{user.birth_date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">N° de Whatsapp</p>
                  <p className="font-medium">{user.phone_full}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="rounded-full bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-300">
                Rechazar
              </button>
              <button className="rounded-full bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700">
                Aprobar
              </button>
            </div>

            {/* Notes Section */}
            <div className="rounded-lg border bg-white p-4">
              <h3 className="mb-2 font-medium">Nota</h3>
              <p className="mb-2 text-sm text-gray-500">
                Si la solicitud de verificación es rechazada, se debe adjuntar una nota indicando los motivos del
                rechazo.
              </p>
              <textarea
                className="w-full rounded-lg border bg-white p-2 text-sm"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ingrese una nota aquí..."
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Rewards Summary */}
            <div className="rounded-lg border bg-white p-4">
              <h3 className="mb-4 text-lg font-semibold">Recompensas en Plus Rewards</h3>
              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha de inscripción:</span>
                  <span className="font-medium">{user.date_subscription}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Recompensas que obtuviste en 2024:</span>
                  <span className="font-medium">{user.rewards_year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Recompensas que obtuviste en total:</span>
                  <span className="font-medium">{user.rewards_count}</span>
                </div>
              </div>

              {/* Rewards List */}
              <div className="space-y-4">
                {user.rewards.map((reward, index) => (
                  <div key={index} className="rounded-lg border bg-white p-3">
                    <div className="mb-1 flex justify-between">
                      <span className="font-medium">{reward.type}:</span>
                      <span className="font-bold text-green-600">{reward.amount}</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fecha de Emisión:</span>
                        <span>{reward.emission_date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="text-xs">{reward.transaction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fecha de Uso:</span>
                        <span>{reward.usage_date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Rewards Options */}
            <div className="rounded-lg border bg-white p-4">
              <h3 className="mb-2 font-medium">Recompensas en Plus Rewards</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-blue-600">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm">Billeteras Agregadas</span>
                </li>
                <li className="flex items-center space-x-2 text-blue-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Historial de Transacciones</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para el modal de verificación
interface VerificationModalProps {
  user: any;
  onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ user, onClose }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: user.name || '',
    apellido: user.lastName || '',
    nacionalidad: user.nationality || '',
    documento: user.document_number || '',
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

  return (
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
            <img
              src="/placeholder.svg?height=128&width=200"
              alt="Frente del documento"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="relative h-32 w-[30%] overflow-hidden rounded-lg border bg-white">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <img
              src="/placeholder.svg?height=128&width=200"
              alt="Dorso del documento"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="relative h-32 w-[30%] overflow-hidden rounded-lg border bg-white">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="relative h-full w-full">
              <img
                src="/placeholder.svg?height=128&width=100"
                alt="Foto del usuario"
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
            La documentación proporcionada por el usuario (foto del documento de identidad emitido por el gobierno y
            selfie) debe cumplir con los requisitos para la aprobación. Que sean claros y legibles. Si no cumple con los
            requisitos, la solicitud de verificación será rechazada.
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
  );
};

export default UserDetailPage;
