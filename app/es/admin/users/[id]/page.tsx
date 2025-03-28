'use client';

import { useParams } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import {
  X,
  CheckCircle,
  CreditCard,
  User,
  FileText,
  Clock,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Search,
  Trash2,
  Plus,
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Image from 'next/image';

const MySwal = withReactContent(Swal);

const UserDetailPage = () => {
  const params = useParams();
  const userId = Number.parseInt(params.id as string);
  const [activeTab, setActiveTab] = useState('frente');
  const [note, setNote] = useState('');
  const [activeTab2, setActiveTab2] = useState<'wallets' | 'history'>('wallets');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

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

  const handleSelectWallet = (wallet: any) => {
    setSelectedWallet(wallet);
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
                <li>
                  <button
                    onClick={() => {
                      setActiveTab2('wallets');
                      setSelectedWallet(null);
                      setIsOpen(true);
                    }}
                    className="flex w-full items-center space-x-2 rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">Billeteras Agregadas</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab2('history');
                      setSelectedWallet(null);
                      setIsOpen(true);
                    }}
                    className="flex w-full items-center space-x-2 rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Historial de Transacciones</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
              className="animate-in fade-in zoom-in w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl duration-300"
              style={{ height: '600px' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <ChevronLeft
                    className="h-5 w-5 cursor-pointer text-gray-500"
                    onClick={() => (selectedWallet ? setSelectedWallet(null) : setIsOpen(false))}
                  />
                  <h2 className="text-lg font-semibold">
                    {selectedWallet ? `Detalles de ${selectedWallet.name}` : 'Plus Rewards'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 transition-colors hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {!selectedWallet ? (
                <>
                  {/* Tabs */}
                  <div className="flex border-b">
                    <button
                      className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 transition-colors ${
                        activeTab2 === 'wallets' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab2('wallets')}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Billeteras Agregadas</span>
                    </button>
                    <button
                      className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 transition-colors ${
                        activeTab2 === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab2('history')}
                    >
                      <Clock className="h-4 w-4" />
                      <span>Historial</span>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="border-b p-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar billetera o transacción"
                        className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="overflow-y-auto" style={{ height: 'calc(600px - 170px)' }}>
                    {activeTab2 === 'wallets' ? (
                      <WalletsList onSelectWallet={handleSelectWallet} />
                    ) : (
                      <TransactionHistory />
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t p-4">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white transition-colors hover:bg-blue-700">
                      <Plus className="h-4 w-4" />
                      <span>{activeTab2 === 'wallets' ? 'Agregar nueva billetera' : 'Ver más transacciones'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <WalletDetail wallet={selectedWallet} />
              )}
            </div>
          </div>
        )}
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

// Update the WalletsList component to handle wallet selection (replace the entire function):
function WalletsList({ onSelectWallet }: { onSelectWallet: (wallet: any) => void }) {
  const wallets = [
    {
      id: 1,
      name: 'Mastercard',
      number: '0180539262018029334',
      status: 'active',
      isPrimary: true,
      country: 'ES',
    },
    {
      id: 2,
      name: 'BBVA',
      number: 'usuario0879',
      status: 'inactive',
      isPrimary: false,
    },
    {
      id: 3,
      name: 'PayPal',
      number: 'ejemplo@ejemplo.com',
      status: 'active',
      isPrimary: false,
    },
    {
      id: 4,
      name: 'Wire',
      number: 'ejemplo@ejemplo.com',
      status: 'active',
      isPrimary: false,
      country: 'ES',
    },
  ];

  return (
    <div className="divide-y">
      {wallets.map((wallet) => (
        <div
          key={wallet.id}
          className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
          onClick={() => onSelectWallet(wallet)}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-50">
                <div className="relative h-6 w-6">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt={wallet.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{wallet.name}</p>
                  {wallet.isPrimary && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Principal</span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-gray-600">{wallet.number}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${wallet.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                  <span className="text-xs text-gray-500">{wallet.status === 'active' ? 'Activa' : 'Inactiva'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="rounded-full bg-red-50 p-1.5 transition-colors hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle delete logic here
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
              {wallet.country && (
                <div className="flex items-center justify-center rounded-full bg-blue-50 p-1.5">
                  <span className="text-xs font-medium text-blue-600">{wallet.country}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TransactionHistory() {
  return (
    <div className="divide-y">
      {/* Today */}
      <div className="bg-gray-50 p-3">
        <h3 className="text-sm font-medium text-gray-500">Hoy</h3>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Depósito recibido</p>
              <p className="mt-0.5 text-sm text-gray-600">Mastercard •••• 9334</p>
              <p className="mt-1 text-xs text-gray-500">10:45 AM</p>
            </div>
          </div>
          <p className="font-semibold text-green-600">+$250.00</p>
        </div>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Pago de servicio</p>
              <p className="mt-0.5 text-sm text-gray-600">PayPal</p>
              <p className="mt-1 text-xs text-gray-500">08:30 AM</p>
            </div>
          </div>
          <p className="font-semibold text-red-600">-$45.99</p>
        </div>
      </div>

      {/* Yesterday */}
      <div className="bg-gray-50 p-3">
        <h3 className="text-sm font-medium text-gray-500">Ayer</h3>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
              <CreditCard className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Transferencia enviada</p>
              <p className="mt-0.5 text-sm text-gray-600">Wire Transfer</p>
              <p className="mt-1 text-xs text-gray-500">15:22 PM</p>
            </div>
          </div>
          <p className="font-semibold text-red-600">-$120.50</p>
        </div>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Reembolso</p>
              <p className="mt-0.5 text-sm text-gray-600">Mastercard •••• 9334</p>
              <p className="mt-1 text-xs text-gray-500">11:15 AM</p>
            </div>
          </div>
          <p className="font-semibold text-green-600">+$35.00</p>
        </div>
      </div>

      {/* Last Week */}
      <div className="bg-gray-50 p-3">
        <h3 className="text-sm font-medium text-gray-500">Semana pasada</h3>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Suscripción mensual</p>
              <p className="mt-0.5 text-sm text-gray-600">PayPal</p>
              <p className="mt-1 text-xs text-gray-500">Mar 20, 2025</p>
            </div>
          </div>
          <p className="font-semibold text-red-600">-$15.99</p>
        </div>
      </div>
    </div>
  );
}

// Add the WalletDetail component at the end of the file (before the export default):
function WalletDetail({ wallet }: { wallet: any }) {
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      title: 'Depósito recibido',
      amount: '+$250.00',
      date: '27 Mar 2025',
      time: '10:45 AM',
    },
    {
      id: 2,
      type: 'payment',
      title: 'Pago de servicio',
      amount: '-$45.99',
      date: '25 Mar 2025',
      time: '08:30 AM',
    },
    {
      id: 3,
      type: 'transfer',
      title: 'Transferencia enviada',
      amount: '-$120.50',
      date: '20 Mar 2025',
      time: '15:22 PM',
    },
    {
      id: 4,
      type: 'refund',
      title: 'Reembolso',
      amount: '+$35.00',
      date: '18 Mar 2025',
      time: '11:15 AM',
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Wallet Info */}
      <div className="border-b p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-blue-50">
            <div className="relative h-8 w-8">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt={wallet.name}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{wallet.name}</h3>
              {wallet.isPrimary && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Principal</span>
              )}
            </div>
            <p className="text-gray-600">{wallet.number}</p>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 rounded-full ${wallet.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
              ></span>
              <span className="text-sm text-gray-500">{wallet.status === 'active' ? 'Activa' : 'Inactiva'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-2 gap-4 border-b p-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="mb-1 text-xs text-gray-500">Balance disponible</p>
          <p className="text-lg font-semibold text-green-600">$1,250.00</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="mb-1 text-xs text-gray-500">Transacciones</p>
          <p className="text-lg font-semibold">24</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="border-b p-4">
        <h4 className="mb-2 font-medium">Transacciones recientes</h4>
      </div>

      {/* Transactions List */}
      <div className="flex-1 divide-y overflow-y-auto">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 transition-colors hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === 'deposit' || transaction.type === 'refund'
                      ? 'bg-green-50'
                      : transaction.type === 'transfer'
                        ? 'bg-purple-50'
                        : 'bg-blue-50'
                  }`}
                >
                  <CreditCard
                    className={`h-5 w-5 ${
                      transaction.type === 'deposit' || transaction.type === 'refund'
                        ? 'text-green-600'
                        : transaction.type === 'transfer'
                          ? 'text-purple-600'
                          : 'text-blue-600'
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="mt-0.5 text-sm text-gray-600">{transaction.date}</p>
                  <p className="mt-1 text-xs text-gray-500">{transaction.time}</p>
                </div>
              </div>
              <p className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t p-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2.5 text-gray-800 transition-colors hover:bg-gray-200">
            <Trash2 className="h-4 w-4" />
            <span>Eliminar</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white transition-colors hover:bg-blue-700">
            <CreditCard className="h-4 w-4" />
            <span>Editar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
