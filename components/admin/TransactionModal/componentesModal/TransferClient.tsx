'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  Upload,
  LinkIcon,
  Trash2,
  Edit,
  Loader2,
  Check,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import { TooltipContent, TooltipProvider, Tooltip, TooltipTrigger } from '@/components/ui/Tooltip';
import { updateTransactionStatus } from '@/actions/transactions/transaction-status.action';
import { useParams } from 'next/navigation';
import { uploadTransactionReceipt } from '@/actions/transactions/admin-transaction';
import { useSession } from 'next-auth/react';
import ModalEditReciever from './ModalEditReciever/ModalEditReciever';
import { useTransactionStore } from '@/store/transactionModalStorage';
import ServerErrorModal from '../../ModalErrorServidor/ModalErrorSevidor';
import { TransactionFlowState } from '../../utils/useTransactionHistoryState';

interface Form {
  transfer_id: string;
  amount: string;
  file: File | null;
}

interface RefundForm {
  transfer_id: string;
  amount: string;
  description: string;
  file: File | null;
}

interface TransferClientProps {
  onTransferStatusChange?: (status: boolean | null) => void;
  transactionFlow: TransactionFlowState & { refreshStatus: () => void };
}

const TransferClient = ({ onTransferStatusChange, transactionFlow }: TransferClientProps) => {
  const params = useParams();
  const transId = params.id as string;

  const { trans } = useTransactionStore();
  const session = useSession();
  const token = session.data?.accessToken || '';

  const [form, setForm] = useState<Form>({ transfer_id: '', amount: '', file: null });
  const [formRefund, setFormRefund] = useState<RefundForm>({
    transfer_id: '',
    amount: '',
    description: '',
    file: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalServer, setModalServer] = useState(false);
  const [showConfirmRefund, setShowConfirmRefund] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalResponse, setModalResponse] = useState(false);
  const [isInputTransferIdFocused, setIsInputTransferIdFocused] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  // Estado local para trackear si el usuario clickeó "No"
  const [hasClickedNo, setHasClickedNo] = useState(false);

  const {
    shouldEnableYesButton,
    shouldEnableNoButton,
    shouldEnableEditButton,
    isTransferInTransit,
    isRejected,
    isTransferCompleted,
    isTransferRefunded,
  } = transactionFlow;

  // Efecto para comunicar el estado "No" al componente padre
  useEffect(() => {
  if (hasClickedNo) {
    onTransferStatusChange?.(false);
    // Forzar una actualización del estado para asegurar que el padre reciba el cambio
  }
}, [hasClickedNo, onTransferStatusChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleRefundInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRefund((prev) => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, target: 'form' | 'formRefund') => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFile(e.dataTransfer.files, target);
  };

  const handleFile = (files: FileList, target: 'form' | 'formRefund') => {
    if (files.length > 0) {
      const file = files[0];
      const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;
      
      if (!isValidType) {
        alert('Formato no permitido. Solo se aceptan JPG, PNG y PDF.');
        return;
      }

      if (!isValidSize) {
        alert('El archivo supera el tamaño máximo permitido de 5MB.');
        return;
      }

      if (target === 'form') setForm((prev) => ({ ...prev, file }));
      else setFormRefund((prev) => ({ ...prev, file }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'form' | 'formRefund') => {
    if (e.target.files) handleFile(e.target.files, target);
  };

  const handleYesClick = async () => {
    if (!shouldEnableYesButton || isUpdatingStatus || hasClickedNo) return;
    try {
      setIsUpdatingStatus(true);
      const response = await updateTransactionStatus('in_transit', transId, {
        descripcion: 'La transferencia está en tránsito al cliente',
      });
      if (!response || !response.success) {
        setModalServer(true);
        return;
      }
      transactionFlow.refreshStatus();
      onTransferStatusChange?.(true);
    } catch (error) {
      setModalServer(true);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleNoClick = () => {
  if (!shouldEnableNoButton || isTransferCompleted) return;
  setHasClickedNo(true);
};

  const handleEditClick = () => setOpen(true);

  const handleAprove = async () => {
    try {
      setIsLoading(true);
      if (!form.file) {
        alert('Debe subir un comprobante.');
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('comprobante', form.file);
      formData.append('transactionId', transId);

      const response = await updateTransactionStatus('completed', transId, {
        descripcion: 'Proceso de transacción exitoso',
        additionalData: { codigo_transferencia: form.transfer_id },
        amount: Number(form.amount),
      });

      const responseFile = await uploadTransactionReceipt(formData);

      if (!response || !responseFile) {
        setModalServer(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setShowAlert(false);
        transactionFlow.refreshStatus();
      }
    } catch (error) {
      setIsLoading(false);
      setModalServer(true);
    }
  };

  const handleSendRefound = async () => {
    try {
      if (!formRefund.file) {
        alert('Debe subir un comprobante.');
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append('comprobante', formRefund.file);
      formData.append('transactionId', transId);

      const response = await updateTransactionStatus('refunded', transId, {
        descripcion: formRefund.description,
        additionalData: { codigo_transferencia: formRefund.transfer_id },
        amount: Number(formRefund.amount),
      });

      const responseFile = await uploadTransactionReceipt(formData);

      if (!response || !responseFile) {
        setModalServer(true);
      } else {
        setIsLoading(false);
        setShowConfirmRefund(false);
        transactionFlow.refreshStatus();
      }
    } catch (error) {
      setIsLoading(false);
      setModalServer(true);
    }
  };

  const handleDialogAprove = () => {
    if (!form.transfer_id || !form.amount) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
    setShowAlert(true);
  };

  const handleDialogRefund = () => {
    if (!formRefund.description || !formRefund.transfer_id || !formRefund.amount) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
    setShowConfirmRefund(true);
  };

  const confirmRejection = async () => {
    try {
      setIsLoading(true);
      const response = await updateTransactionStatus('canceled', transId, {
        descripcion: rejectionReason,
      });

      if (!response) {
        setModalServer(true);
      } else {
        setShowConfirmDialog(false);
        transactionFlow.refreshStatus();
      }
    } catch (error) {
      setModalServer(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const shouldDisableYesButton = !shouldEnableYesButton || isUpdatingStatus || isTransferCompleted || hasClickedNo;
  const shouldDisableNoButton = !shouldEnableNoButton || isTransferCompleted;
  const shouldDisableEditButton = (!shouldEnableEditButton && !hasClickedNo) || isTransferCompleted || isTransferRefunded;

  return (
    <div className="!mt-4">
      <h2 className="text-lg font-medium text-gray-800">Información de la Transferencia al Cliente</h2>
      <p className="text-sm text-gray-500">¿La transferencia fue realizada al cliente?</p>

      <div className="flex flex-col items-center gap-3">
        <div className="mb-4 mt-2 flex w-full gap-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleYesClick}
                  disabled={shouldDisableYesButton}
                  variant="outline"
                  className={`rounded-3xl ${
                    isTransferInTransit || isTransferCompleted
                      ? 'bg-green-600 text-white'
                      : shouldDisableYesButton
                      ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                      : 'border border-gray-300 bg-white text-gray-700 hover:border-green-500 hover:text-green-600'
                  }`}
                >
                  {isUpdatingStatus ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-gray-400" />
                  ) : (
                    <CheckCircle className={`mr-2 h-5 w-5 ${isTransferInTransit || isTransferCompleted ? 'text-white' : hasClickedNo ? 'text-gray-400' : 'text-green-500'}`} />
                  )}
                  <span>{isUpdatingStatus ? 'Procesando...' : 'Sí'}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="border-green-600 bg-green-600 text-white">
                <p>
                  {isTransferCompleted 
                    ? 'Transacción finalizada' 
                    : isTransferInTransit 
                    ? 'Transferencia confirmada' 
                    : hasClickedNo
                    ? 'Deshabilitado - Se seleccionó "No"'
                    : 'La transferencia fue realizada al cliente'
                  }
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleNoClick}
                  disabled={shouldDisableNoButton}
                  variant="outline"
                  className={`rounded-3xl ${
                    isRejected || isTransferRefunded || hasClickedNo
                      ? 'bg-red-600 text-white'
                      : shouldDisableNoButton
                      ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                      : 'border border-gray-300 bg-white text-gray-700 hover:border-red-500 hover:text-red-600'
                  }`}
                >
                  <XCircle className={`mr-2 h-5 w-5 ${isRejected || isTransferRefunded || hasClickedNo ? 'text-white' : 'text-red-500'}`} />
                  <span>No</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="border-red-600 bg-red-600 text-white">
                <p>
                  {isTransferRefunded
                    ? 'Reembolso completado'
                    : isRejected || hasClickedNo
                    ? 'Transferencia rechazada'
                    : 'La transferencia no fue realizada al cliente'
                  }
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={handleEditClick}
            disabled={shouldDisableEditButton}
            variant="default"
            className={`rounded-3xl px-4 py-2 ${
              shouldDisableEditButton
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-amber-600 text-white'
            }`}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Editar Destinatario</span>
          </Button>

          <ModalEditReciever modal={open} setModal={setOpen} trans={trans} />
        </div>
      </div>

      {isTransferCompleted ? (
        <div className="animate-in fade-in duration-500 mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-lg">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-green-100/30"></div>
            <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-emerald-100/20"></div>
            
            <div className="relative flex items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 shadow-md">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-800 mb-1">
                  ¡Transacción Completada!
                </h3>
                <p className="text-sm text-green-600 font-medium">
                  Dinero enviado exitosamente
                </p>
              </div>
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-green-200">
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : isTransferInTransit ? (
        <div className="animate-in fade-in grid grid-cols-1 gap-4 duration-300 mt-4">
          <Alert className="bg-blue-50 text-blue-800">
            <AlertDescription>Transferencia en camino - Ya se comunicó al solicitante.</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <div className="relative my-5 flex-1">
              <Input
                id="transfer_id"
                name="transfer_id"
                type="text"
                placeholder="Ingresa el ID de la transferencia"
                value={form.transfer_id}
                onChange={handleInputChange}
                className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] ${
                  isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                }`}
                aria-required="true"
                onFocus={() => setIsInputTransferIdFocused(true)}
                onBlur={() => setIsInputTransferIdFocused(false)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative mb-5 flex-1">
              <Input
                id="amount"
                name="amount"
                type="text"
                placeholder="Monto a transferir"
                value={form.amount}
                onChange={handleInputChange}
                className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] ${
                  isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                }`}
                aria-required="true"
              />
            </div>
          </div>

          <div className="animate-in fade-in flex flex-col items-center gap-4 pt-2 duration-300">
            <h4 className="text-center text-base font-semibold">Comprobante de Transferencia</h4>
            {!form.file ? (
              <div
                className={cn(
                  'flex h-32 w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg border-2 transition-all duration-300',
                  isDragging
                    ? 'bg-primary/10 border-[#90B0FE]'
                    : 'hover:border-primary/70 hover:bg-primary/5 border-[#90B0FE] bg-[#FFFFF8]'
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'form')}
              >
                <Upload className="text-primary h-8 w-8" />
                <p className="px-4 text-center text-sm text-gray-600">
                  Arrastra y suelta el comprobante aquí o
                  <Button
                    variant="link"
                    className="h-auto p-0 pl-1 font-medium"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    selecciona un archivo
                  </Button>
                </p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, 'form')}
                />
                <p className="text-xs text-gray-500">Formatos aceptados: JPG, PNG, PDF (máx. 5MB)</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Comprobante cargado</p>
                  </div>
                </div>
                <Button variant="link" className="gap-2 p-0 pt-5" onClick={() => setForm({ ...form, file: null })}>
                  <Trash2 className="h-4 w-4 text-red-700" />
                  <span className="text-sm font-medium">Eliminar comprobante</span>
                </Button>
              </div>
            )}

            <Button variant="link" className="gap-2 p-0">
              <LinkIcon className="h-4 w-4" />
              <span className="text-sm font-medium underline">Agregar link del comprobante</span>
            </Button>
          </div>

          <Button
            onClick={handleDialogAprove}
            className="h-11 rounded-3xl bg-custom-blue text-white hover:bg-blue-700"
            aria-label="Enviar ID de transferencia"
          >
            <span>Enviar</span>
          </Button>
        </div>
      ) : isRejected && !isTransferRefunded || hasClickedNo ? (
        <div className="animate-in fade-in duration-300 mt-4">

          <div className="mt-5">

            <div className="mt-5">
              <Label htmlFor="rejection-reason" className="text-sm font-medium text-gray-700">
                Motivo del Rechazo <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="rejection-reason"
                    name="description"
                    type="text"
                    placeholder="Ingresa el motivo del rechazo"
                    value={formRefund.description}
                    onChange={handleRefundInputChange}
                    className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] ${
                      isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                    }`}
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="relative my-5 flex-1">
                <Input
                  id="transfer-id"
                  name="transfer_id"
                  type="text"
                  placeholder="Id de el reembolso"
                  value={formRefund.transfer_id}
                  onChange={handleRefundInputChange}
                  className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] ${
                    isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                  }`}
                  aria-required="true"
                />
              </div>

              <div className="relative mb-5 flex-1">
                <Input
                  id="mount"
                  name="amount"
                  type="text"
                  placeholder="Monto transferido"
                  value={formRefund.amount}
                  onChange={handleRefundInputChange}
                  className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] ${
                    isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                  }`}
                  aria-required="true"
                />
              </div>
            </div>
            <div className="animate-in fade-in flex flex-col items-center gap-4 pt-2 duration-300">
              <h4 className="text-center text-base font-semibold">Comprobante de Transferencia</h4>
              {!formRefund.file ? (
                <div
                  className={cn(
                    'flex h-32 w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg border-2 transition-all duration-300',
                    isDragging
                      ? 'bg-primary/10 border-[#90B0FE]'
                      : 'hover:border-primary/70 hover:bg-primary/5 border-[#90B0FE] bg-[#FFFFF8]'
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'formRefund')}
                >
                  <Upload className="text-primary h-8 w-8" />
                  <p className="px-4 text-center text-sm text-gray-600">
                    Arrastra y suelta el comprobante aquí o
                    <Button
                      variant="link"
                      className="h-auto p-0 pl-1 font-medium"
                      onClick={() => document.getElementById('file-upload-refund')?.click()}
                    >
                      selecciona un archivo
                    </Button>
                  </p>
                  <input
                    id="file-upload-refund"
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'formRefund')}
                  />
                  <p className="text-xs text-gray-500">Formatos aceptados: JPG, PNG, PDF (máx. 5MB)</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Comprobante cargado</p>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    className="gap-2 p-0 pt-5"
                    onClick={() => setFormRefund({ ...formRefund, file: null })}
                  >
                    <Trash2 className="h-4 w-4 text-red-700" />
                    <span className="text-sm font-medium">Eliminar comprobante</span>
                  </Button>
                </div>
              )}

              <Button variant="link" className="gap-2 p-0">
                <LinkIcon className="h-4 w-4" />
                <span className="text-sm font-medium underline">Agregar link del comprobante</span>
              </Button>
            </div>

            <Button
              onClick={handleDialogRefund}
              className="h-11 w-full rounded-3xl bg-custom-blue text-white hover:bg-blue-700"
              aria-label="Enviar reembolso"
            >
              <span>Enviar</span>
            </Button>
          </div>

          <AlertDescription className="mt-2 text-xs text-gray-500">
            Este motivo será comunicado al cliente como razón del rechazo.
          </AlertDescription>
        </div>
      ) : isTransferRefunded ? (
        <div className="animate-in fade-in duration-300 mt-4">
          <Alert className="bg-blue-50 text-blue-800 border-blue-200">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="font-medium">
              Reembolso completado exitosamente
            </AlertDescription>
          </Alert>

          <div className="mt-4 grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Motivo del Rechazo</Label>
              <Input
                value={formRefund.description}
                disabled
                className="bg-gray-100 text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">ID de Reembolso</Label>
              <Input
                value={formRefund.transfer_id}
                disabled
                className="bg-gray-100 text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Monto Reembolsado</Label>
              <Input
                value={formRefund.amount}
                disabled
                className="bg-gray-100 text-gray-700"
              />
            </div>

            {formRefund.file && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600">Comprobante</Label>
                <div className="flex items-center gap-2 rounded bg-gray-100 px-3 py-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{formRefund.file.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {modalServer && <ServerErrorModal isOpen={modalServer} onClose={() => setModalServer(false)} />}

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="border border-gray-200 bg-white transition-all duration-300">
          <DialogHeader>
            <DialogTitle>Confirmar rechazo</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas rechazar esta solicitud?
            </DialogDescription>
          </DialogHeader>

          <div className="w-full rounded-lg bg-gray-100 p-3 text-left">
            <p className="mb-1 font-medium text-gray-800">Motivo:</p>
            <p className="text-gray-700">{rejectionReason}</p>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmRejection}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar rechazo'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAlert} onOpenChange={setShowAlert}>
        <DialogContent className="border border-gray-200 bg-white transition-all duration-300">
          <DialogHeader className="flex flex-col items-center text-center">
            <DialogTitle>Confirmar solicitud</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas confirmar esta solicitud?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center gap-2 sm:justify-center">
            <Button
              onClick={handleAprove}
              disabled={isLoading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar solicitud'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAlert(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmRefund} onOpenChange={setShowConfirmRefund}>
        <DialogContent className="border border-gray-200 bg-white transition-all duration-300">
          <DialogHeader>
            <DialogTitle className="text-center">Confirmar reembolso</DialogTitle>
            <DialogDescription className="text-center">
              ¿Estás seguro que deseas enviar este reembolso?
            </DialogDescription>
          </DialogHeader>

          <div className="w-full rounded-lg bg-gray-100 p-3 text-center">
            <p className="mb-1 font-medium text-gray-800">Motivo:</p>
            <p className="text-gray-700">{formRefund.description}</p>
          </div>

          <DialogFooter className="flex justify-center gap-2 sm:justify-center">
            <Button
              onClick={handleSendRefound}
              disabled={isLoading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar reembolso'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmRefund(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransferClient;