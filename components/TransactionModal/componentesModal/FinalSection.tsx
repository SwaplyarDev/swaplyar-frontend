'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CheckCircle, XCircle, User, FileText, Loader2 } from 'lucide-react';
import { TransactionService } from './ui/TransactionService';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

const FinalSection = ({ transId }: { transId: string }) => {
  const { data: session } = useSession();
  const userName = session?.decodedToken.fullName;
  const [note, setNote] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleApprove = async () => {
    try {
      setIsLoading(true);

      // Simulate API call - replace with actual service call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowApproveDialog(false);
      setIsLoading(false);

      /* toast({
        title: "Solicitud aprobada",
        description: "La solicitud ha sido aprobada exitosamente",
        variant: "default",
      }) */

      console.log('Solicitud aprobada con nota:', note);
      // Add logic to save the approval
    } catch (error) {
      setIsLoading(false);
      /* toast({
        title: "Error",
        description: "Ocurrió un error al procesar la solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      }) */
    }
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);

      const response = await TransactionService('canceled', transId);

      /* @ts-ignore */
      if (response?.message === 'Status updated successfully') {
        setShowRejectDialog(false);
        setIsLoading(false);

        /*  toast({
          title: "Solicitud rechazada",
          description: "La solicitud ha sido rechazada exitosamente",
          variant: "default",
        }) */
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    } catch (error) {
      console.log('Error al rechazar la transacción:', error);
      setIsLoading(false);

      /* toast({
        title: "Error",
        description: "Ocurrió un error al procesar la solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      }) */
    }
  };

  const getButtonClass = (type: 'approve' | 'reject') => {
    const baseClass = 'flex items-center justify-center gap-2 font-medium transition-all duration-300';

    if (type === 'approve') {
      return cn(
        baseClass,
        'border-2 border-green-500 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500',
      );
    } else {
      return cn(baseClass, 'border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500');
    }
  };

  return (
    <TooltipProvider>
      <section className="w-full overflow-hidden rounded-xl border shadow-md transition-all duration-300">
        <div className="p-6">
          <div className="flex flex-col space-y-6">
            {/* Notes field */}
            <div className="w-full">
              <Label htmlFor="process-note" className="mb-2 flex items-center text-sm font-medium text-gray-700">
                <FileText className="mr-1 h-4 w-4 text-gray-500" />
                Notas del proceso
              </Label>

              <div
                className={cn(
                  'flex w-full items-start rounded-lg p-1 transition-all duration-300',
                  isInputFocused ? 'ring-primary/30 bg-primary/5 ring-2' : 'border border-gray-300 bg-white',
                )}
              >
                <Textarea
                  id="process-note"
                  placeholder="Proporcione una nota de cómo fue el proceso de la solicitud"
                  className="min-h-[4.25rem] flex-1 resize-y border-none bg-transparent p-3 text-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col justify-end gap-4 md:flex-row md:gap-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setShowRejectDialog(true)}
                    variant="outline"
                    className={getButtonClass('reject')}
                    disabled={isLoading}
                  >
                    <XCircle className="mr-2 h-5 w-5" />
                    <span className="text-lg">Rechazar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="border-red-600 bg-red-600 text-white">
                  <p>Rechazar esta solicitud</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setShowApproveDialog(true)}
                    variant="outline"
                    className={getButtonClass('approve')}
                    disabled={isLoading}
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    <span className="text-lg">Aprobar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="border-green-600 bg-green-600 text-white">
                  <p>Aprobar esta solicitud</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Operator information */}
            <div className="mt-4 flex items-center justify-end">
              <p className="flex items-center text-sm text-gray-600">
                <User className="mr-1 h-4 w-4 text-gray-500" />
                Esta solicitud fue operada por:
                <span className="ml-1 font-medium text-gray-800">{userName || 'Usuario no identificado'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </section>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar aprobación</DialogTitle>
            <DialogDescription>¿Estás seguro que deseas aprobar esta solicitud?</DialogDescription>
          </DialogHeader>

          {note && (
            <div className="mt-2 w-full rounded-lg bg-gray-100 p-3 text-left">
              <p className="mb-1 font-medium text-gray-800">Nota:</p>
              <p className="text-gray-700">{note}</p>
            </div>
          )}

          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setShowApproveDialog(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleApprove} disabled={isLoading} className="bg-green-600 text-white hover:bg-green-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Aprobar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar rechazo</DialogTitle>
            <DialogDescription>¿Estás seguro que deseas rechazar esta solicitud?</DialogDescription>
          </DialogHeader>

          {note && (
            <div className="mt-2 w-full rounded-lg bg-gray-100 p-3 text-left">
              <p className="mb-1 font-medium text-gray-800">Nota:</p>
              <p className="text-gray-700">{note}</p>
            </div>
          )}

          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleReject} disabled={isLoading} variant="destructive">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Rechazar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default FinalSection;
