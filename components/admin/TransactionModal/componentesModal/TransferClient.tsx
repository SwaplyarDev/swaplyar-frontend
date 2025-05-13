'use client';

import type React from 'react';

import { useState } from 'react';
import { CheckCircle, XCircle, Upload, LinkIcon, DollarSign, FileText, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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
import { TooltipContent, TooltipProvider } from '@/components/ui/Tooltip';
import { Tooltip } from '@/components/ui/Tooltip';
import { TooltipTrigger } from '@/components/ui/Tooltip';
import { updateTransactionStatus } from '@/actions/transactions/transaction-status.action';
import { useParams } from 'next/navigation';
import { Check } from '@mui/icons-material';
import { uploadTransactionReceipt } from '@/actions/transactions/admin-transaction';

interface Form {
  transfer_id: string;
  amount: number;
  file: File | null;
}

const TransferClient = () => {
  const params = useParams();
  const transId = params.id as string;

  const [selected, setSelected] = useState<boolean | null>(null);
  const [form, setForm] = useState<Form>({
    transfer_id: '',
    amount: 0,
    file: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFile(e.target.files);
    }
  };

  const handleFile = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];

      // Validación opcional
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

      setForm((prev) => ({ ...prev, file }));
      console.log('Archivo actualizado:', file.name);
    }
  };

  const handleSubmitRejection = async () => {
    if (!rejectionReason.trim()) {
      /*   toast({
          title: "Campo requerido",
          description: "Por favor ingresa el motivo del rechazo",
          variant: "destructive",
        }) */
      try {
        const response = await updateTransactionStatus('rejected', transId, {
          descripcion: rejectionReason,
        });
      } catch (error) {
        throw new Error(`❌ Error en la respuesta del servicio`);
      }
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmRejection = async () => {
    try {
      setIsLoading(true);

      console.log(rejectionReason, 'transaction_id: ' + transId);

      const response = await updateTransactionStatus('canceled', transId, {
        descripcion: rejectionReason,
      });

      console.log(response);
      setShowConfirmDialog(false);
      setIsLoading(false);
    } catch (error) {
      console.log('Error al rechazar la transacción:', error);
      setIsLoading(false);
      setShowConfirmDialog(false);

      /* toast({
        title: "Error",
        description: "Ocurrió un error al procesar la solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      }) */
    }
  };

  const handleAprove = async () => {
    try {
      setIsLoading(true);

      if (!form.file) return null;

      const formData = new FormData();
      formData.append('file', form.file);
      formData.append('transaction_id', transId);

      const response = await updateTransactionStatus('approved', transId, {
        review: form.transfer_id,
        amount: form.amount,
      });
      const responseFile = await uploadTransactionReceipt(formData);
      console.log(response, responseFile);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(`❌ Error en la respuesta del servicio`);
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

  return (
    <>
      <div className="!mt-4">
        <h2 className="text-lg font-medium text-gray-800">Información de la Transferencia al Cliente</h2>
        <p className="text-sm text-gray-500">¿La transferencia fue realizada al cliente?</p>

        {/* Transfer question */}
        <div className="flex flex-col items-center gap-3">
          <div className="mb-4 mt-2 flex w-full gap-4">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setSelected(true)}
                    variant="outline"
                    className={`${
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
                    className={`${
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
          </div>
        </div>

        {/* Conditional form fields */}
        {selected === true ? (
          <div className="animate-in fade-in grid grid-cols-1 gap-4 duration-300">
            <div className="space-y-2">
              <Label htmlFor="transfer_id" className="text-sm font-medium">
                ID de la Transferencia <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center rounded-md border">
                <FileText className="ml-2 h-5 w-5 text-gray-400" />
                <Input
                  id="transfer_id"
                  name="transfer_id"
                  type="text"
                  placeholder="Ingresa el ID de la transferencia"
                  value={form.transfer_id}
                  onChange={handleInputChange}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Monto Transferido <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center rounded-md border">
                <DollarSign className="ml-2 h-5 w-5 text-gray-400" />
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Ingresa el monto transferido"
                  value={form.amount || ''}
                  onChange={handleInputChange}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div className="animate-in fade-in flex flex-col items-center gap-4 pt-2 duration-300">
              <h4 className="text-center text-base font-semibold">Comprobante de Transferencia</h4>
              {!form.file ? (
                <div
                  className={cn(
                    'flex h-32 w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-all duration-300',
                    isDragging
                      ? 'border-primary bg-primary/10'
                      : 'hover:border-primary/70 hover:bg-primary/5 border-gray-50 bg-gray-800',
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
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
                    onChange={handleFileChange}
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
              className="h-11 bg-custom-blue text-white hover:bg-blue-700"
              aria-label="Enviar ID de transferencia"
            >
              <span>Enviar</span>
            </Button>
          </div>
        ) : (
          selected === false && (
            <div className="animate-in fade-in duration-300">
              <Label htmlFor="rejection-reason" className="text-sm font-medium text-gray-700">
                Motivo del Rechazo <span className="text-red-500">*</span>
              </Label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="rejection-reason"
                    type="text"
                    placeholder="Ingresa el motivo del rechazo"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className={`h-11 transition-all duration-300`}
                    aria-required="true"
                  />
                </div>

                <Button
                  onClick={handleSubmitRejection}
                  className="h-11 bg-custom-blue text-white hover:bg-blue-700"
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

        {/* Confirmation Dialog */}
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
              <p className="text-gray-700 dark:text-gray-300">{rejectionReason}</p>
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
                {isLoading ? 'Procesando...' : 'Confirmar rechazo'}
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
                variant="outline"
                onClick={() => setShowAlert(false)}
                disabled={isLoading}
                className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700/50"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleAprove()}
                disabled={isLoading}
                className="dark:bg-red-700 dark:hover:bg-red-800"
              >
                {isLoading ? 'Procesando...' : 'Confirmar solicitud'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TransferClient;
