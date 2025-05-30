'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Send, HelpCircle, AlertTriangle, Trash2, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { TransactionService } from './ui/TransactionService';
import { Check, Upload } from '@mui/icons-material';
import { cn } from '@/lib/utils';
import { updateTransactionStatus } from '@/actions/transactions/transaction-status.action';
import { uploadTransactionReceipt } from '@/actions/transactions/admin-transaction';
import { useSession } from 'next-auth/react';
import ServerErrorModal from '../../ModalErrorServidor/ModalErrorSevidor';
import { set } from 'date-fns';

interface DiscrepancySectionProps {
  trans: any; // Using any since TransactionTypeSingle is not provided
  value: boolean | null;
  setDiscrepancySend: (value: boolean) => void;
}

interface Form {
  description: string;
  transfer_id: string;
  amount: string;
  file: File | null;
}

const DiscrepancySection = ({ trans, value, setDiscrepancySend }: DiscrepancySectionProps) => {
  const [discrepancy, setDiscrepancy] = useState<boolean | null>(value);
  const [resolved, setResolved] = useState<boolean | null>(null);
  const [discrepancyReason, setDiscrepancyReason] = useState('');
  const [resolutionReason, setResolutionReason] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputTransferIdFocused, setIsInputTransferIdFocused] = useState(false);
  const [isResolutionInputFocused, setIsResolutionInputFocused] = useState(false);
  const [transferId, setTransferId] = useState('');

  const [modalServidor, setModalServidor] = useState(false);
  const [showConfirmRefund, setShowConfirmRefund] = useState(false);

  const [resolutionForm, setResolutionForm] = useState<Form>({
    description: '',
    transfer_id: '',
    amount: '',
    file: null,
  });

  // Dialog states
  const [showRequiredDialog, setShowRequiredDialog] = useState(false);
  const [showConfirmDiscrepancyDialog, setShowConfirmDiscrepancyDialog] = useState(false);
  const [showSuccessDiscrepancyDialog, setShowSuccessDiscrepancyDialog] = useState(false);
  const [showRequiredResolutionDialog, setShowRequiredResolutionDialog] = useState(false);
  const [showConfirmResolutionDialog, setShowConfirmResolutionDialog] = useState(false);
  const [showSuccessResolutionDialog, setShowSuccessResolutionDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'discrepancy' | 'resolution'>('discrepancy');

  const [form, setForm] = useState<Form>({
    description: '',
    transfer_id: '',
    amount: '',
    file: null,
  });

  const [isDragging, setIsDragging] = useState(false);

  const session = useSession();

  const token = session.data?.accessToken || '';

  const { transaction } = trans;

  useEffect(() => {
    // Sync local state with prop value when it changes
    setDiscrepancy(value);
  }, [value]);

  // Auto-close success dialogs after 2 seconds
  useEffect(() => {
    if (showSuccessDiscrepancyDialog || showSuccessResolutionDialog) {
      const timer = setTimeout(() => {
        setShowSuccessDiscrepancyDialog(false);
        setShowSuccessResolutionDialog(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessDiscrepancyDialog, showSuccessResolutionDialog]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, context: 'refund' | 'transfer') => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files, context);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, context: 'refund' | 'transfer') => {
    if (e.target.files) {
      handleFile(e.target.files, context);
    }
  };

  const handleFile = (files: FileList, context: 'refund' | 'transfer') => {
    const file = files[0];
    const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      alert('Archivo inválido');
      return;
    }

    if (context === 'refund') {
      setForm((prev) => ({ ...prev, file }));
    } else {
      setResolutionForm((prev) => ({ ...prev, file }));
    }
  };

  const handleClick = (newValue: boolean) => {
    setDiscrepancy(newValue);
  };

  const handleSubmitDiscrepancy = () => {
    if (!discrepancyReason.trim()) {
      setDialogType('discrepancy');
      setShowRequiredDialog(true);
      return;
    }

    setShowConfirmDiscrepancyDialog(true);
  };

  const confirmDiscrepancy = async () => {
    setShowConfirmDiscrepancyDialog(false);
    setShowSuccessDiscrepancyDialog(true);
    try {
      const response = await TransactionService('discrepancy', transaction.transaction_id, {
        descripcion: discrepancyReason,
      });
    } catch (error) {
      console.log('Error al enviar el motivo de discrepancia:', error);
      setModalServidor(true);
      setShowSuccessDiscrepancyDialog(false);
    }
    setDiscrepancySend(true);
  };

  const handleSubmitResolution = () => {
    if (!resolutionReason.trim()) {
      setDialogType('resolution');
      setShowRequiredDialog(true);
      return;
    }

    setShowConfirmResolutionDialog(true);
  };

  // const confirmResolution = async () => {
  //   setShowConfirmResolutionDialog(false);
  //   setShowSuccessResolutionDialog(true);
  //   try {
  //     const response = await TransactionService('approved', transaction.transaction_id, {
  //       description: resolutionReason,
  //     });
  //   } catch (error) {
  //     setModalServidor(true)
  //     console.log('Error al enviar el motivo de discrepancia:', error);
  //   }
  //   setDiscrepancySend(true);
  // };

  const handleSendRefound = async () => {
    try {
      if (!form.file) return null;
      const formData = new FormData();
      formData.append('file', form.file);
      formData.append('transaction_id', transaction.transaction_id);

      const response = await updateTransactionStatus('refunded', transaction.transaction_id, {
        descripcion: form.description,
        additionalData: {
          codigo_transferencia: form.transfer_id,
        },
        amount: Number(form.amount),
      });

      const responseFile = await fetch(`http://localhost:8080/api/v1/admin/transactions/voucher`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    } catch (error) {
      setShowConfirmResolutionDialog(false);
      setModalServidor(true);
    }
  };

  const transferDiscrepancyResolved = async () => {
    try {
      if (!resolutionForm.file) return null;

      const formData = new FormData();
      formData.append('file', resolutionForm.file);
      formData.append('transaction_id', transaction.transaction_id);

      const response = await updateTransactionStatus('approved', transaction.transaction_id, {
        descripcion: resolutionForm.description,
        additionalData: {
          codigo_transferencia: resolutionForm.transfer_id,
        },
        amount: Number(resolutionForm.amount),
      });

      if (!response || response.error) throw new Error('Error al actualizar transacción');

      const responseFile = await fetch(`http://localhost:8080/api/v1/admin/transactions/voucher`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!responseFile.ok) {
        const errorData = await responseFile.json();
        throw new Error(`Error al subir el comprobante: ${errorData}`);
      }
    } catch (error) {
      console.error('Error en transferDiscrepancyResolved:', error);
      setShowConfirmResolutionDialog(false);
      setModalServidor(true);
    }
  };

  return (
    <>
      <section className="space-y-6">
        <div className="flex w-full flex-col gap-6">
          {/* Segunda columna: Motivo de discrepancia */}
          {discrepancy === true && (
            <div className="animate-in fade-in flex flex-col gap-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="discrepancy-reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Motivo de la Discrepancia <span className="text-red-500">*</span>
                </Label>

                <div className="flex gap-2">
                  <Input
                    id="discrepancy-reason"
                    placeholder="Explica la discrepancia detalladamente"
                    value={discrepancyReason}
                    onChange={(e) => setDiscrepancyReason(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className={`h-10 transition-all duration-300 ${
                      isInputFocused ? 'border-amber-300 ring-2 ring-amber-300' : ''
                    }`}
                    aria-required="true"
                  />

                  <Button
                    disabled={discrepancyReason.length === 0}
                    onClick={handleSubmitDiscrepancy}
                    className="h-10 bg-amber-500 text-white hover:bg-amber-600"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    <span>Enviar</span>
                  </Button>
                </div>

                <p className="text-muted-foreground text-xs">
                  Describe claramente cuál es la discrepancia encontrada en esta operación.
                </p>
              </div>

              {/* Tercera columna: Discrepancia resuelta */}
              <div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">¿Discrepancia Resuelta?</h3>
                </div>

                <div className="flex gap-4">
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => setResolved(true)}
                          variant={resolved === true ? 'default' : 'outline'}
                          className={`relative transition-all duration-300 ${
                            resolved === true
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'hover:border-green-500 hover:text-green-600'
                          }`}
                        >
                          <CheckCircle
                            className={`mr-2 h-5 w-5 ${resolved === true ? 'text-white' : 'text-green-500'}`}
                          />
                          <span>Sí, resuelta</span>
                        </Button>
                      </TooltipTrigger>
                      {resolved !== true && (
                        <TooltipContent side="top" className="border-green-600 bg-green-600 text-white">
                          <p>Marcar como resuelta</p>
                        </TooltipContent>
                      )}
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => setResolved(false)}
                          variant={resolved === false ? 'destructive' : 'outline'}
                          className={`relative transition-all duration-300 ${
                            resolved === false
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'hover:border-red-500 hover:text-red-600'
                          }`}
                        >
                          <XCircle className={`mr-2 h-5 w-5 ${resolved === false ? 'text-white' : 'text-red-500'}`} />
                          <span>No resuelta</span>
                        </Button>
                      </TooltipTrigger>
                      {resolved !== false && (
                        <TooltipContent side="top" className="border-red-600 bg-red-600 text-white">
                          <p>Marcar como no resuelta</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {resolved === true && (
                  <div className="animate-in fade-in mt-4 space-y-4 duration-300">
                    <Alert variant="default" className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription className="mt-1.5 text-sm text-green-700">
                        La discrepancia ha sido resuelta satisfactoriamente.
                      </AlertDescription>
                    </Alert>
                    <div className="mt-5">
                      <h1>Realizar la transferencia al destinatario</h1>
                      <div className="mt-5">
                        <div className="space-y-2">
                          <Label htmlFor="resolution-reason" className="text-sm font-medium text-gray-700">
                            Motivo de la Resolución <span className="text-red-500">*</span>
                          </Label>

                          <div className="flex gap-2">
                            <Input
                              id="resolution-reason"
                              placeholder="Explica cómo se resolvió la discrepancia"
                              value={resolutionForm.description}
                              onChange={(e) => setResolutionForm({ ...resolutionForm, description: e.target.value })}
                              // onFocus={() => setIsResolutionInputFocused(true)}
                              // onBlur={() => setIsResolutionInputFocused(false)}
                              className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
                                isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                              }`}
                              aria-required="true"
                            />

                            {/* <Button
                          disabled={resolutionReason.length === 0}
                          onClick={handleSubmitResolution}
                          className="h-10 bg-green-600 text-white hover:bg-green-700"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          <span>Enviar</span>
                        </Button> */}
                          </div>

                          <p className="text-muted-foreground pb-2 text-xs">
                            Describe cómo se resolvió la discrepancia encontrada.
                          </p>
                        </div>
                        <div className="relative mb-5 flex-1">
                          <Input
                            id="transfer-id"
                            type="text"
                            placeholder="Id de la transferencia"
                            value={resolutionForm.transfer_id}
                            onChange={(e) => setResolutionForm({ ...resolutionForm, transfer_id: e.target.value })}
                            // onFocus={() => setIsInputTransferIdFocused(true)}
                            // onBlur={() => setIsInputTransferIdFocused(false)}
                            className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
                              isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                            }`}
                            aria-required="true"
                          />
                        </div>

                        <div className="relative mb-5 flex-1">
                          <Input
                            id="mount"
                            type="text"
                            placeholder="Monto transferido"
                            value={resolutionForm.amount}
                            onChange={(e) => setResolutionForm({ ...resolutionForm, amount: e.target.value })}
                            // onFocus={() => setIsInputTransferIdFocused(true)}
                            // onBlur={() => setIsInputTransferIdFocused(false)}
                            className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
                              isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                            }`}
                            aria-required="true"
                          />
                        </div>
                      </div>
                      <div className="animate-in fade-in flex flex-col items-center gap-4 pt-2 duration-300">
                        <h4 className="text-center text-base font-semibold">Comprobante de Transferencia</h4>
                        {!resolutionForm.file ? (
                          <div
                            className={cn(
                              'flex h-32 w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg border-2 transition-all duration-300',
                              isDragging
                                ? 'bg-primary/10 border-[#90B0FE]'
                                : 'hover:border-primary/70 hover:bg-primary/5 border-[#90B0FE] bg-[#FFFFF8] dark:border-gray-50 dark:bg-gray-800',
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'transfer')}
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
                              onChange={(e) => handleFileChange(e, 'transfer')}
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
                              onClick={() => setForm({ ...form, file: null })}
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
                        onClick={() => setShowConfirmResolutionDialog(true)}
                        className="h-11 w-full bg-custom-blue text-white hover:bg-blue-700"
                        aria-label="Enviar ID de transferencia"
                      >
                        <span>Enviar</span>
                      </Button>
                    </div>
                  </div>
                )}

                {resolved === false && (
                  <>
                    <Alert
                      variant="destructive"
                      className="animate-in fade-in mt-4 border-red-200 bg-[#F8C0C0] duration-300"
                    >
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="mt-1.5 text-sm text-red-700">
                        La discrepancia no se pudo resolver.
                      </AlertDescription>
                    </Alert>

                    <div className="mt-5">
                      <h1>Emitir el reembolso al Usuario a la cuenta de origen</h1>
                      <div className="mt-5">
                        <div className="relative mb-5 flex-1">
                          <div className="mb-2 flex items-center">
                            <Label
                              htmlFor="transfer-id"
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Motivo por el que no se resolvió la discrepancia
                              <span className="ml-1 text-red-500">*</span>
                            </Label>
                          </div>
                          <Input
                            id="reject-reason"
                            type="text"
                            placeholder="Motivo del rechazo"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            // onFocus={() => setIsInputTransferIdFocused(true)}
                            // onBlur={() => setIsInputTransferIdFocused(false)}
                            className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
                              isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                            }`}
                            aria-required="true"
                          />
                        </div>
                        <div className="relative mb-5 flex-1">
                          <Input
                            id="transfer-id"
                            type="text"
                            placeholder="Id de el reembolso"
                            value={form.transfer_id}
                            onChange={(e) => setForm({ ...form, transfer_id: e.target.value })}
                            // onFocus={() => setIsInputTransferIdFocused(true)}
                            // onBlur={() => setIsInputTransferIdFocused(false)}
                            className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
                              isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                            }`}
                            aria-required="true"
                          />
                        </div>

                        <div className="relative mb-5 flex-1">
                          <Input
                            id="mount"
                            type="text"
                            placeholder="Monto transferido"
                            value={form.amount}
                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                            // onFocus={() => setIsInputTransferIdFocused(true)}
                            // onBlur={() => setIsInputTransferIdFocused(false)}
                            className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
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
                                : 'hover:border-primary/70 hover:bg-primary/5 border-[#90B0FE] bg-[#FFFFF8] dark:border-gray-50 dark:bg-gray-800',
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'refund')}
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
                              onChange={(e) => handleFileChange(e, 'refund')}
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
                              onClick={() => setForm({ ...form, file: null })}
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
                        onClick={() => setShowConfirmRefund(true)}
                        className="h-11 w-full bg-custom-blue text-white hover:bg-blue-700"
                        aria-label="Enviar ID de transferencia"
                      >
                        <span>Enviar</span>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status indicator */}
        <div
          className={`h-1.5 w-full transition-all duration-500 ${
            discrepancy === true
              ? resolved === true
                ? 'bg-green-500'
                : resolved === false
                  ? 'bg-red-500'
                  : 'bg-amber-500'
              : discrepancy === false
                ? 'bg-green-500'
                : 'bg-gray-200'
          }`}
        ></div>
      </section>

      {/* Confirm Discrepancy Dialog */}
      <Dialog open={showConfirmDiscrepancyDialog} onOpenChange={setShowConfirmDiscrepancyDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">Confirmar discrepancia</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              ¿Estás seguro que quieres enviar este motivo de discrepancia?
            </p>
            <div className="w-full max-w-xs rounded-lg bg-gray-100 p-3 text-left dark:bg-gray-700/30">
              <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">Motivo:</p>
              <p className="text-gray-700 dark:text-gray-300">{discrepancyReason}</p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-center">
            <Button
              variant="default"
              onClick={confirmDiscrepancy}
              className="bg-[rgb(1,42,142)] text-white hover:bg-[rgb(1,32,112)] dark:bg-blue-900 dark:hover:bg-blue-950"
            >
              Confirmar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDiscrepancyDialog(false)}
              className="text-gray-600 dark:border-gray-500 dark:text-gray-300"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Discrepancy Dialog */}
      <Dialog open={showSuccessDiscrepancyDialog} onOpenChange={setShowSuccessDiscrepancyDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              Discrepancia registrada
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            El motivo de la discrepancia ha sido registrado exitosamente
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Confirm Resolution Dialog */}
      <Dialog open={showConfirmResolutionDialog} onOpenChange={setShowConfirmResolutionDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">Confirmar resolución</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              ¿Estás seguro que quieres enviar este motivo de resolución?
            </p>
            <div className="w-full max-w-xs rounded-lg bg-gray-100 p-3 text-left dark:bg-gray-700/30">
              <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">Motivo:</p>
              <p className="text-gray-700 dark:text-gray-300">{resolutionForm.description}</p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-center">
            <Button
              variant="default"
              onClick={transferDiscrepancyResolved}
              className="bg-[rgb(1,42,142)] text-white hover:bg-[rgb(1,32,112)] dark:bg-blue-900 dark:hover:bg-blue-950"
            >
              Confirmar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmResolutionDialog(false)}
              className="text-gray-600 dark:border-gray-500 dark:text-gray-300"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de error  */}
      {modalServidor && <ServerErrorModal isOpen={modalServidor} onClose={() => setModalServidor(false)} />}

      <Dialog open={showConfirmRefund} onOpenChange={setShowConfirmRefund}>
        <DialogContent className="border border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/95">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Confirmar reembolso</DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300">
              ¿Estás seguro que deseas enviar este reembolso?
            </DialogDescription>
          </DialogHeader>

          <div className="w-full rounded-lg bg-gray-100 p-3 text-left dark:bg-gray-700/30">
            <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">Motivo:</p>
            <p className="text-gray-700 dark:text-gray-300">{form.description}</p>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="destructive" onClick={handleSendRefound} className="dark:bg-red-700 dark:hover:bg-red-800">
              Confirmar reembolso
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmRefund(false)}
              className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700/50"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Resolution Dialog */}
      <Dialog open={showSuccessResolutionDialog} onOpenChange={setShowSuccessResolutionDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              Resolución registrada
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            El motivo de la resolución ha sido registrado exitosamente
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiscrepancySection;
