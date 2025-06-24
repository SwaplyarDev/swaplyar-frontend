'use client';

import type React from 'react';

import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Upload,
  LinkIcon,
  DollarSign,
  FileText,
  Send,
  Trash2,
  Edit,
  Loader2,
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
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import { TooltipContent, TooltipProvider } from '@/components/ui/Tooltip';
import { Tooltip } from '@/components/ui/Tooltip';
import { TooltipTrigger } from '@/components/ui/Tooltip';
import { updateTransactionStatus } from '@/actions/transactions/transaction-status.action';
import { useParams } from 'next/navigation';
import { Check } from '@mui/icons-material';
import { uploadTransactionReceipt } from '@/actions/transactions/admin-transaction';
import { useSession } from 'next-auth/react';
import ModalEditReciever from './ModalEditReciever/ModalEditReciever';
import { useTransactionStore } from '@/store/transactionModalStorage';
import ServerErrorModal from '../../ModalErrorServidor/ModalErrorSevidor';
import { set } from 'date-fns';

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

const TransferClient = () => {
  const params = useParams();
  const transId = params.id as string;

  const { trans } = useTransactionStore();

  const session = useSession();

  const token = session.data?.accessToken || '';

  const [selected, setSelected] = useState<boolean | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    transfer_id: '',
    amount: '',
    file: null,
  });

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

  const [open, setOpen] = useState(modal);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
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
    handleFile(e.dataTransfer.files, target);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'form' | 'formRefund') => {
    if (e.target.files) {
      handleFile(e.target.files, target);
    }
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

      if (target === 'form') {
        setForm((prev) => ({ ...prev, file }));
      } else {
        setFormRefund((prev) => ({ ...prev, file }));
      }
    }
  };

  const handleSubmitRejection = async () => {
    if (!rejectionReason.trim()) {
      try {
        const response = await updateTransactionStatus('rejected', {
          transactionId: transId,
          descripcion: rejectionReason,
        });

        if (!response) {
          setModalServer(true);
          setShowConfirmDialog(false);
        }
      } catch (error) {
        setModalServer(true);
        setShowConfirmDialog(false);
      }
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmRejection = async () => {
    try {
      setIsLoading(true);

      const response = await updateTransactionStatus('canceled', {
        transactionId: transId,
        descripcion: rejectionReason,
      });

      if (!response) {
        setModalServer(true);
        setIsLoading(false);
        setShowConfirmDialog(false);
      } else {
        setShowConfirmDialog(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error al rechazar la transacción:', error);
      setIsLoading(false);
      setShowConfirmDialog(false);
      setModalServer(true);
    }
  };

  const handleAprove = async () => {
    try {
      setIsLoading(true);

      if (!form.file) return null;

      const formData = new FormData();
      formData.append('file', form.file);
      formData.append('transaction_id', transId);

      const response = await updateTransactionStatus('approved', {
        transactionId: transId,
        descripcion: 'Proceso de transaccion exitoso',
        additionalData: {
          codigo_transferencia: form.transfer_id,
        },
        amount: Number(form.amount),
      });
      const responseFile = await uploadTransactionReceipt(formData);

      if (!response || !responseFile) {
        setModalServer(true);
      } else {
        setIsLoading(false);
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
    } else {
      setShowAlert(true);
    }
  };

  const handleSendRefound = async () => {
    try {
      if (!formRefund.file) return null;

      setIsLoading(true);
      const formData = new FormData();

      formData.append('file', formRefund.file);
      formData.append('transaction_id', transId);

      const response = await updateTransactionStatus('refunded', {
        transactionId: transId,
        descripcion: formRefund.description,
        additionalData: {
          codigo_transferencia: formRefund.transfer_id,
        },
        amount: Number(formRefund.amount),
      });

      const responseFile = await fetch(`http://localhost:3001/admin/transactions/voucher`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response || !responseFile.ok) {
        setIsLoading(false);
        setModalServer(true);
      } else {
        setIsLoading(false);
        setModalResponse(true);
      }
    } catch (error) {
      setIsLoading(false);
      setModalError(false);
      setModalServer(true);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setModal(open);
  };
  return (
    <>
      <div className="!mt-4">
        <h2 className="text-lg font-medium text-gray-800">Información de la Transferencia al Cliente</h2>
        <p className="text-sm text-gray-500">¿La transferencia fue realizada al cliente?</p>

        <div className="flex flex-col items-center gap-3">
          <div className="mb-4 mt-2 flex w-full gap-4">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setSelected(true)}
                    variant="outline"
                    className={`rounded-3xl ${
                      selected === true
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                        : 'border border-gray-300 bg-white text-gray-700 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    <CheckCircle className={`mr-2 h-5 w-5 ${selected === true ? 'text-white' : 'text-green-500'}`} />
                    <span>Si</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="border-green-600 bg-green-600 text-white">
                  <p>La transferencia fue realizada al cliente</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setSelected(false)}
                    variant="outline"
                    className={`rounded-3xl ${
                      selected === false
                        ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                        : 'border border-gray-300 bg-white text-gray-700 hover:border-red-500 hover:text-red-600'
                    }`}
                  >
                    <XCircle className={`mr-2 h-5 w-5 ${selected === false ? 'text-white' : 'text-red-500'}`} />
                    <span>No</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="border-red-600 bg-red-600 text-white">
                  <p>La transferencia no fue realizada al cliente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button
                  disabled={selected === true}
                  variant="default"
                  className={
                    !selected
                      ? 'rounded-3xl bg-gradient-to-r from-amber-600 to-orange-700 transition-all duration-300 hover:shadow-lg hover:shadow-orange-200 dark:from-amber-700 dark:to-orange-800 dark:hover:shadow-orange-900/20'
                      : 'border-2 bg-transparent'
                  }
                >
                  <Edit className={selected ? 'mr-2 h-4 w-4 text-[#AFAFAF]' : 'mr-2 h-4 w-4 text-white'} />
                  <span className={selected ? 'text-[#AFAFAF]' : 'text-white'}>Editar Destinatario</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="duratio n-300 border-gray-300 bg-white transition-all dark:border-gray-700 dark:bg-gray-800/95 sm:max-w-5xl">
                <ModalEditReciever modal={open} setModal={setOpen} trans={trans} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {selected === true ? (
          <div className="animate-in fade-in grid grid-cols-1 gap-4 duration-300">
            <div className="space-y-2">
              <div className="relative my-5 flex-1">
                <Input
                  id="transfer_id"
                  name="transfer_id"
                  type="text"
                  placeholder="Ingresa el ID de la transferencia"
                  value={form.transfer_id}
                  onChange={handleInputChange}
                  className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
                    isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                  }`}
                  aria-required="true"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative mb-5 flex-1">
                <Input
                  id="amount"
                  name="amount"
                  type="text"
                  placeholder="Monto a trasnferir"
                  value={form.amount}
                  onChange={handleInputChange}
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
        ) : (
          selected === false && (
            <div className="animate-in fade-in duration-300">
              <div className="mt-5">
                <h1>Emitir el reembolso al Usuario a la cuenta de origen</h1>

                <div className="mt-5">
                  <Label htmlFor="rejection-reason" className="text-sm font-medium text-gray-700">
                    Motivo del Rechazo <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="rejection-reason"
                        type="text"
                        placeholder="Ingresa el motivo del rechazo"
                        value={formRefund.description}
                        onChange={(e) => setFormRefund({ ...formRefund, description: e.target.value })}
                        className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
                          isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                        }`}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="relative my-5 flex-1">
                    <Input
                      id="transfer-id"
                      type="text"
                      placeholder="Id de el reembolso"
                      value={formRefund.transfer_id}
                      onChange={(e) => setFormRefund({ ...formRefund, transfer_id: e.target.value })}
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
                      value={formRefund.amount}
                      onChange={(e) => setFormRefund({ ...formRefund, amount: e.target.value })}
                      className={`h-11 border-[#90B0FE] transition-all duration-300 placeholder:text-[#90B0FE] dark:border-[#969696] dark:bg-gray-700 dark:placeholder:text-gray-200 ${
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
                          : 'hover:border-primary/70 hover:bg-primary/5 border-[#90B0FE] bg-[#FFFFF8] dark:border-gray-50 dark:bg-gray-800',
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
                  onClick={() => setShowConfirmRefund(true)}
                  className="h-11 w-full rounded-3xl bg-custom-blue text-white hover:bg-blue-700"
                  aria-label="Enviar ID de transferencia"
                >
                  <span>Enviar</span>
                </Button>
              </div>

              <AlertDescription className="mt-2 text-xs text-gray-500">
                Este motivo será comunicado al cliente como razón del rechazo.
              </AlertDescription>
            </div>
          )
        )}

        {modalServer && <ServerErrorModal isOpen={modalServer} onClose={() => setModalServer(false)} />}

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="border border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/95">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Confirmar rechazo</DialogTitle>
              <DialogDescription className="text-gray-700 dark:text-gray-300">
                ¿Estás seguro que deseas rechazar esta solicitud?
              </DialogDescription>
            </DialogHeader>

            <div className="w-full rounded-lg bg-gray-100 p-3 text-left dark:bg-gray-700/30">
              <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">Motivo:</p>
              <p className="text-gray-700 dark:text-gray-300">{formRefund.description}</p>
            </div>

            <DialogFooter className="flex gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                disabled={isLoading}
                className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700/50"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => confirmRejection()}
                disabled={isLoading}
                className="dark:bg-red-700 dark:hover:bg-red-800"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar rechazo'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={showAlert} onOpenChange={setShowAlert}>
          <DialogContent className="border border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/95">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Confirmar solicitud</DialogTitle>
              <DialogDescription className="text-gray-700 dark:text-gray-300">
                ¿Estás seguro que deseas confirmar esta solicitud?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex gap-2 sm:justify-end">
              <Button
                variant="destructive"
                onClick={() => handleAprove()}
                disabled={isLoading}
                className="dark:bg-red-700 dark:hover:bg-red-800"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar solicitud'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAlert(false)}
                disabled={isLoading}
                className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700/50"
              >
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
              <p className="text-gray-700 dark:text-gray-300">{formRefund.description}</p>
            </div>

            <DialogFooter className="flex gap-2 sm:justify-end">
              <Button
                variant="destructive"
                onClick={handleSendRefound}
                disabled={isLoading}
                className="dark:bg-red-700 dark:hover:bg-red-800"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar reembolso'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirmRefund(false)}
                disabled={isLoading}
                className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700/50"
              >
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TransferClient;
