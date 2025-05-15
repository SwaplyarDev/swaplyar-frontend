'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { XCircle, FileText } from 'lucide-react';
import { TransactionService } from './ui/TransactionService';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

const FinalSection = ({ transId }: { transId: string }) => {
  const { data: session } = useSession();
  const userName = session?.user.name;
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

      // const response = await TransactionService('canceled', transId);

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
    const baseClass = 'flex items-center justify-center gap-2 font-medium transition-all duration-300 shadow-sm';

    if (type === 'approve') {
      return cn(
        baseClass,
        'border-2 border-green-500 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-700 hover:text-white focus:ring-green-500 hover:shadow-green-200 dark:hover:shadow-green-900/20',
      );
    } else {
      return cn(
        baseClass,
        'border-2 border-red-500 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-700 hover:text-white focus:ring-red-500 hover:shadow-red-200 dark:hover:shadow-red-900/20',
      );
    }
  };

  return (
    <TooltipProvider>
      <section className="w-full overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700">
        <div className="bg-white p-6 transition-all duration-300 hover:bg-gray-50 dark:bg-gray-800/90 dark:hover:bg-gray-800">
          <div className="flex flex-col space-y-6">
            {/* Notes field */}
            <div className="w-full">
              <Label
                htmlFor="process-note"
                className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <FileText className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                Notas del proceso
              </Label>

              <div
                className={cn(
                  'flex w-full items-start rounded-lg p-1 transition-all duration-300',
                  isInputFocused
                    ? 'ring-primary/30 bg-primary/5 dark:bg-primary/10 ring-2'
                    : 'border border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-700/90',
                )}
              >
                <Textarea
                  id="process-note"
                  placeholder="Proporcione una nota de cómo fue el proceso de la solicitud"
                  className="min-h-[4.25rem] flex-1 resize-y border-none bg-transparent p-3 text-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-gray-200"
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
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default FinalSection;
