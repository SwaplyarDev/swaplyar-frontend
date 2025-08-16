'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import Swal from 'sweetalert2';
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { TransactionService } from './ui/TransactionService';
import DiscrepancySection from './DiscrepancySection';
import type {  TransactionV2 } from '@/types/transactions/transactionsType';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { Tooltip } from '@/components/ui/Tooltip';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';
import { AlertTitle } from '@mui/material';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import MessageWpp from './ui/MessageWpp';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import clsx from 'clsx';
import ServerErrorModal from '../../ModalErrorServidor/ModalErrorSevidor';
import { getTransactionStatusHistory } from '@/actions/transactions/transactions.action';
import { updateTransactionStatus } from '@/actions/transactions/transaction-status.action';

interface AprobarRechazarProps {
  selected: 'stop' | 'accepted' | 'canceled' | null;
  onSelectChange: (value: 'stop' | 'accepted' | 'canceled' | null) => void;
  componentStates: {
    aprooveReject: 'stop' | 'accepted' | 'canceled' | null;
    confirmTransButton: boolean | null;
    discrepancySection: boolean | null;
    transferRealized: boolean;
  };
  transId: string;
  trans: TransactionV2;
  handleComponentStateChange: (key: keyof any['componentStates'], value: any) => void;
  setDiscrepancySend: (value: boolean) => void;
  onApprovedChange?: (isApproved: boolean) => void
  token?: string
}

const AprobarRechazar: React.FC<AprobarRechazarProps> = ({
  selected,
  onSelectChange,
  transId,
  trans,
  handleComponentStateChange,
  setDiscrepancySend,
  onApprovedChange,
  token,
}) => {
  const { componentStates } = useTransactionStore();
  const [rejectionReason, setRejectionReason] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isDiscrepancy, setIsDiscrepancy] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<string>("");

  useEffect(() => {
    const checkApprovalStatus = async () => {
      if (!transId || !token) {
        setIsLoadingHistory(false)
        return
      }

      try {
        setIsLoadingHistory(true)
        const statusHistory = await getTransactionStatusHistory(transId, token)

        if (statusHistory && statusHistory.length > 0) {
          const lastStatusEntry = statusHistory[0]
          const lastStatus = lastStatusEntry.status
          setCurrentStatus(lastStatus)

          if (lastStatus === "approved") {
            setIsApproved(true)
          } else if (lastStatus === "canceled" || lastStatus === "rejected") {
            setIsRejected(true)
          } else if (lastStatus === "discrepancy") {
            setIsDiscrepancy(true)
          }
        }
      } catch (error) {
        console.error("Error al verificar historial de status:", error)
      } finally {
        setIsLoadingHistory(false)
      }
    }

    checkApprovalStatus()
  }, [transId, token])

  useEffect(() => {
    if (isDiscrepancy && selected !== "stop") {
      onSelectChange("stop")
    }
  }, [isDiscrepancy, selected, onSelectChange])

  useEffect(() => {
    if (!isLoadingHistory && onApprovedChange) {
      onApprovedChange(isApproved)
    }
  }, [isApproved, onApprovedChange, isLoadingHistory])

  const [openModalReject, setOpenModalReject] = useState(false)
  const [openModalRejectResponse, setOpenModalRejectResponse] = useState(false)
  const [modalServidor, setModalServidor] = useState(false)

  useEffect(() => {
    if (
      componentStates.confirmTransButton === false &&
      selected !== "canceled" &&
      selected !== "stop" &&
      !isApproved &&
      !isRejected &&
      !isDiscrepancy
    ) {
      onSelectChange("canceled")
    }
  }, [componentStates.confirmTransButton, selected, onSelectChange, isApproved, isRejected, isDiscrepancy])

  const [loading, setLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState<any>("")

  const handleApprove = async () => {
    if (isApproved || isRejected || isApproving || isDiscrepancy) return

    setIsApproving(true)

    try {
      const response = await updateTransactionStatus("approved", transId, {
        message: "Solicitud aprobada por el administrador",
      })

      if (!response.success) {
        Swal.fire({
          title: "Error",
          text: "No se pudo aprobar la solicitud. Intente nuevamente.",
          icon: "error",
          confirmButtonText: "OK",
        })

        throw new Error(response.error || "Error al aprobar la solicitud")
      }

      setIsApproved(true)
    } catch (error: any) {
      console.error("Error al aprobar la transacción:", error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleSubmitRejection = async () => {
    if (!rejectionReason.trim() || isApproved || isRejected || isDiscrepancy) return;

    try {
      setLoading(true);
      const response = await acceptReject();
      if (!response) {
        setLoading(false);
        setModalServidor(true);
        setOpenModalReject(false);
      } else {
        setLoading(false);
        setApiResponse(response);
        setOpenModalReject(false);
        setOpenModalRejectResponse(true);
        setIsRejected(true)
      }
    } catch (error: any) {
      console.error('Error al rechazar la transacción:', error);
      setLoading(false);
      setApiResponse(null);
      setOpenModalReject(false);
      setOpenModalRejectResponse(true);
      setModalServidor(true);
    }
  };

  const acceptReject = async () => {
    const response = await TransactionService("rejected", transId, {
      descripcion: rejectionReason,
    });
    return response;
  };

  const getButtonClass = (type: 'accepted' | 'stop' | 'canceled') => {
    const isActionCompleted = isApproved || isRejected || isDiscrepancy
    const isStopSelected = selected === "stop"

    const baseClass =
      'w-[150px] h-[40px] relative flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300';

    if (type === "stop") {
      if (isDiscrepancy) {
        return `${baseClass} bg-amber-300 dark:bg-amber-400 text-amber-900 dark:text-amber-800 shadow-lg shadow-amber-200 dark:shadow-amber-900/20 cursor-not-allowed`;
      }
      
      if (isStopSelected && !isActionCompleted) {
        return `${baseClass} bg-amber-500 dark:bg-amber-600 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/20`;
      }
      
      if (isApproved || isRejected) {
        return `${baseClass} bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
      }
      
      if (!componentStates.confirmTransButton) {
        return `${baseClass} bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
      }
      
      return `${baseClass} bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-amber-500 dark:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20`;
    }

    if (type === "accepted" && isApproved) {
      return `${baseClass} bg-green-600 dark:bg-green-700 text-white shadow-lg shadow-green-200 dark:shadow-green-900/20`
    }

    if (type === "canceled" && isRejected) {
      return `${baseClass} bg-red-600 dark:bg-red-700 text-white shadow-lg shadow-red-200 dark:shadow-red-900/20`
    }

    const isDisabled =
      (!componentStates.confirmTransButton && type !== "canceled") ||
      isApproving ||
      loading ||
      (type === "accepted" && (isRejected || isApproved || isDiscrepancy || isStopSelected)) || 
      (type === "canceled" && (isApproved || isDiscrepancy || isStopSelected))

    if (isDisabled) {
      return `${baseClass}  bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
    }

    switch (type) {
      case 'accepted':
        return `${baseClass} bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400`
      case 'canceled':
        return `${baseClass} ${
          selected === 'canceled' && !isActionCompleted && !componentStates.confirmTransButton
            ? 'bg-red-600 dark:bg-red-700 text-white shadow-lg shadow-red-200 dark:shadow-red-900/20'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400'
        }`
    }
 };

  const getTooltipContent = (type: "accepted" | "stop" | "canceled") => {
    const isStopSelected = selected === "stop"

    if (isDiscrepancy) {
      if (type === "stop") {
        return {
          className: "border-amber-500 bg-amber-500 text-white",
          text: "Transacción en discrepancia - Resuélvela para continuar",
        }
      }
      return {
        className: "border-gray-500 bg-gray-500 text-white",
        text: "Deshabilitado - Transacción en discrepancia",
      }
    }

    if (isStopSelected && type !== "stop") {
      return {
        className: "border-gray-500 bg-gray-500 text-white",
        text: "Deshabilitado - Stop seleccionado, resuelve la discrepancia primero",
      }
    }

    if (isApproved && type !== "accepted") {
      return { className: "border-gray-500 bg-gray-500 text-white", text: "Deshabilitado - Solicitud ya aprobada" }
    }
    if (isRejected && type !== "canceled") {
      return { className: "border-gray-500 bg-gray-500 text-white", text: "Deshabilitado - Solicitud ya rechazada" }
    }
    if (!componentStates.confirmTransButton && type !== "canceled") {
      return {
        className: "border-gray-500 bg-gray-500 text-white",
        text: "Deshabilitado - Confirmar transferencia primero",
      }
    }

    switch (type) {
      case "accepted":
        return { className: "border-green-600 bg-green-600 text-white", text: "Aprobar solicitud" }
      case "stop":
        return { className: "border-amber-500 bg-amber-500 text-white", text: "Pausar para revisión" }
      case "canceled":
        return { className: "border-red-600 bg-red-600 text-white", text: "Rechazar solicitud" }
    }
  }

  return (
    <>
      <div className="rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90 dark:hover:bg-gray-800">
        <h3 className="text-lg font-semibold dark:text-white">Aprobar/Rechazar Solicitud</h3>

        <div className="mt-2 flex flex-wrap justify-between gap-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleApprove}
                  disabled={
                    !componentStates.confirmTransButton ||
                    isApproving ||
                    isApproved ||
                    isRejected ||
                    isDiscrepancy ||
                    selected === "stop"
                  }
                  variant="outline"
                  className={clsx(
                    getButtonClass('accepted'),
                    'rounded-3xl shadow-none ring-0 focus:outline-none focus:ring-0',
                  )}
                  aria-pressed={isApproved}
                >
                  {isApproving ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <CheckCircle
                      className={`mr-2 h-5 w-5 ${isApproved ? 'text-white' : 'text-green-500 dark:text-green-400'}`}
                    />
                  )}
                  <span>{isApproving ? "Aprobando..." : isApproved ? "Aprobado" : "Aprobar"}</span>
                </Button>
              </TooltipTrigger>
              {(() => {
                const tooltip = getTooltipContent("accepted")
                return (
                  <TooltipContent side="top" className={tooltip.className}>
                    <p>{tooltip.text}</p>
                  </TooltipContent>
                )
              })()}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    if (!isDiscrepancy && !isApproved && !isRejected && componentStates.confirmTransButton) {
                      onSelectChange("stop");
                    }
                  }}
                  disabled={!componentStates.confirmTransButton || isApproving || isApproved || isRejected || isDiscrepancy}
                  variant="outline"
                  className={clsx(
                    getButtonClass("stop"),
                    "rounded-3xl shadow-none ring-0 focus:outline-none focus:ring-0",
                  )}
                  aria-pressed={selected === "stop" || isDiscrepancy}
                >
                  <AlertTriangle
                    className={`mr-2 h-5 w-5 ${
                      selected === "stop" || isDiscrepancy
                        ? isDiscrepancy
                          ? "text-amber-900 dark:text-amber-800"
                          : "text-white"
                        : "text-amber-500 dark:text-amber-400"
                    }`}
                  />
                  <span className="font-bold">STOP</span>
                </Button>
              </TooltipTrigger>
              {(() => {
                const tooltip = getTooltipContent("stop")
                return (
                  <TooltipContent side="top" className={tooltip.className}>
                    <p>{tooltip.text}</p>
                  </TooltipContent>
                )
              })()}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    !isApproved && !isRejected && !isDiscrepancy && selected !== "stop" && onSelectChange('canceled')
                  }
                  disabled={
                    isApproved || loading || isDiscrepancy || selected === "stop"
                  }
                  variant="outline"
                  className={clsx(
                    getButtonClass("canceled"),
                    "rounded-3xl shadow-none ring-0 focus:outline-none focus:ring-0",
                  )}
                  aria-pressed={isRejected}
                >
                  <XCircle className={`mr-2 h-5 w-5 ${isRejected ? "text-white" : "text-red-500 dark:text-red-400"}`} />
                  <span>{isRejected ? "Rechazado" : "Rechazar"}</span>
                </Button>
              </TooltipTrigger>
              {(() => {
                const tooltip = getTooltipContent("canceled")
                return (
                  <TooltipContent side="top" className={tooltip.className}>
                    <p>{tooltip.text}</p>
                  </TooltipContent>
                )
              })()}
            </Tooltip>
          </TooltipProvider>
        </div>

        {(selected === 'canceled' && componentStates.confirmTransButton === false) &&
          !isApproved &&
          !isRejected &&
          !isDiscrepancy && (
            <div className="animate-in fade-in mt-6 duration-300">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Label htmlFor="transfer-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Motivo del Rechazo
                    <span className="ml-1 text-red-500">*</span>
                  </Label>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="rejection-reason"
                      type="text"
                      placeholder="Ingresa el motivo del rechazo"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      disabled={isApproved || isRejected || isDiscrepancy}
                      className={`h-11 transition-all duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 ${
                        isInputFocused ? 'ring-primary border-primary ring-2' : ""
                      } ${isApproved || isRejected || isDiscrepancy ? "opacity-50 cursor-not-allowed" : ""}`}
                      aria-required="true"
                    />
                  </div>

                  <Button
                    onClick={() => setOpenModalReject(true)}
                    disabled={isApproved || isRejected || !rejectionReason.trim() || isDiscrepancy}
                    className={`h-11 rounded-3xl bg-custom-blue text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 dark:hover:shadow-blue-900/20 ${
                      isApproved || isRejected || isDiscrepancy ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    aria-label="Enviar motivo de rechazo"
                  >
                    <span>Enviar</span>
                  </Button>
                </div>

                <p className="text-muted-foreground text-xs dark:text-gray-400">Este motivo será enviado al cliente.</p>
              </div>
            </div>
          )}

        {(selected === 'stop' || isDiscrepancy) && !isApproved && !isRejected && (
          <div className="animate-in fade-in mt-6 space-y-4 duration-300">
            <Alert className="border-l-4 border-l-amber-500 bg-amber-50 transition-all duration-300 hover:bg-amber-100 dark:border-l-amber-600 dark:bg-amber-900/20 dark:hover:bg-amber-900/30">
              <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300">Información sobre STOP</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                <p className="mt-1">
                  Si los datos de la operación no coinciden (por ejemplo, si el monto es mayor o menor al acordado),
                  comunícate con el solicitante para resolverlo antes de continuar.
                </p>
                <p className="mt-2">Esta acción pausará el proceso hasta que se resuelvan las discrepancias.</p>
              </AlertDescription>
            </Alert>

            <MessageWpp text="Comunicate mediante **WhatsApp** del Remitente para solucionar la discrepancia " />

            <DiscrepancySection trans={trans} value={true} setDiscrepancySend={setDiscrepancySend} />
          </div>
        )}

        {(selected === 'accepted' || isApproved) && (
          <div className="animate-in fade-in mt-6 duration-300">
            <Alert className="border-l-4 border-l-green-500 bg-green-50 transition-all duration-300 hover:bg-green-100 dark:border-l-green-600 dark:bg-green-900/20 dark:hover:bg-green-900/30">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">Información sobre Aprobación</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                Al aprobar esta solicitud, confirmas que todos los datos son correctos y que la transferencia puede ser
                procesada.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {isRejected && (
          <div className="animate-in fade-in mt-6 duration-300">
            <Alert className="border-l-4 border-l-red-500 bg-red-50 transition-all duration-300 hover:bg-red-100 dark:border-l-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/30">
              <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
              <AlertTitle className="text-red-800 dark:text-red-300">Solicitud Rechazada</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-400">
                La solicitud ha sido rechazada y el cliente ha sido notificado.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      {modalServidor && <ServerErrorModal isOpen={modalServidor} onClose={() => setModalServidor(false)} />}

      <Dialog open={openModalReject} onOpenChange={(open) => !loading && setOpenModalReject(open)}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Rechazo</DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-center">
            <p className="text-gray-700 dark:text-gray-300">¿Estás seguro de enviar el motivo de rechazo?</p>
            <div className="w-full max-w-xs rounded-lg bg-gray-100 p-3 text-center mt-3 dark:bg-gray-700">
              <span className="font-medium text-gray-800 dark:text-gray-200">{rejectionReason}</span>
            </div>
          </div>
          <DialogFooter className="mt-4 sm:justify-center">
            <Button
              onClick={handleSubmitRejection}
              disabled={loading || isApproved || isRejected || isDiscrepancy}
              className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              <span>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar'}</span>
            </Button>
            <Button
              onClick={() => setOpenModalReject(false)}
              disabled={loading}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <span>Cancelar</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openModalRejectResponse} onOpenChange={setOpenModalRejectResponse}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resultado del Rechazo</DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              {apiResponse
                ? apiResponse.newStatus.message
                : 'Error del servidor, intente de nuevo en un momento. Si el error persiste contacte con el soporte.'}
            </p>
          </div>
          <DialogFooter className="mt-4 sm:justify-center">
            <Button className="bg-blue-700" onClick={() => setOpenModalRejectResponse(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AprobarRechazar;
