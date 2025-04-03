'use client';

import { Check, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

// Nuevas interfaces basadas en la estructura proporcionada
interface SenderDetails {
  email_account: string;
  transfer_code: string;
}

interface ReceiverDetails {
  bank_name: string;
  sender_method_key: string;
  sender_method_value: string;
  document_type: string;
  document_value: string;
}

interface PaymentMethod {
  sender: {
    value: string;
    details: SenderDetails;
  };
  receiver: {
    value: string;
    details: ReceiverDetails;
  };
}

interface Amount {
  amount: string;
  currency: string;
}

interface Amounts {
  sent: Amount;
  received: Amount;
}

interface ProofOfPayment {
  img_transaction: string;
}

interface Transaction {
  transaction_id: string;
  sender_accounts_id: string;
  receiver_accounts_id: string;
  country_transaction: string;
  message: string;
  created_at: string;
  user_id: string | null;
  status: string;
  idAdmin: string | null;
  regret_id: string | null;
  note_id: string | null;
}

interface Sender {
  first_name: string;
  last_name: string;
  identification: string;
  phone_number: string;
  email: string;
  payment_method_id: string;
}

interface Receiver {
  first_name: string;
  last_name: string;
  payment_method_id: string;
}

interface TransactionData {
  transaction: Transaction;
  sender: Sender;
  receiver: Receiver;
  payment_method: PaymentMethod;
  amounts: Amounts;
  status: string;
  proof_of_payment: ProofOfPayment;
}

// Interfaz para la respuesta paginada
interface PaginatedResponse {
  data: TransactionData[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

export default function HistorialTransacciones() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [transacciones, setTransacciones] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const toggleExpand = (index: number) => {
    if (expandedId === index) {
      setExpandedId(null);
    } else {
      setExpandedId(index);
    }
  };

  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.ejemplo.com';

  // Función para cambiar de página
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Función para determinar si una transacción está completada basada en su estado
  const isCompleted = (status: string) => {
    const completedStatuses = ['completed', 'success', 'done'];
    return completedStatuses.includes(status.toLowerCase());
  };

  // Función para obtener el estado en español
  const getEstadoEspanol = (status: string) => {
    const statusMap: Record<string, string> = {
      completed: 'Completada',
      success: 'Completada',
      done: 'Completada',
      refund_in_transit: 'Reembolso en tránsito',
      pending: 'Pendiente',
      failed: 'Fallida',
      rejected: 'Rechazada',
      cancelled: 'Cancelada',
    };

    return statusMap[status.toLowerCase()] || status;
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Función para formatear la hora
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  useEffect(() => {
    const fetchTransacciones = async () => {
      setLoading(true);
      try {
        // Aseguramos que la URL tenga el signo de interrogación
        const response = await fetch(
          `${NEXT_PUBLIC_BACKEND_URL}/v1/transactions?page=${currentPage}&perPage=${perPage}`,
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        // Asumimos que la API devuelve un objeto con datos y metadatos de paginación
        const responseData: PaginatedResponse = await response.json();

        // Actualizamos los estados con la información de paginación
        setTransacciones(responseData.data || []);
        setTotalPages(responseData.pagination?.totalPages || 1);
        setTotalItems(responseData.pagination?.totalItems || 0);
        setError(null);
      } catch (err) {
        console.error('Error al obtener las transacciones:', err);
        setError('No se pudieron cargar las transacciones. Por favor, intenta de nuevo más tarde.');

        // Datos de respaldo en caso de error
        const mockData = [
          {
            transaction: {
              transaction_id: '1t2sfp3vkfb',
              sender_accounts_id: '9l2qn3vnoeg',
              receiver_accounts_id: 'k3pavhza4cn',
              country_transaction: 'Pakistan',
              message: 'Transaccion enviada',
              created_at: '2025-01-29T11:34:20.933Z',
              user_id: null,
              status: 'rcd05bisid9',
              idAdmin: null,
              regret_id: null,
              note_id: null,
            },
            sender: {
              first_name: 'Alan',
              last_name: 'Fernandez',
              identification: '1125878945',
              phone_number: '+543516458975',
              email: 'fernandeezalan20@gmail.com',
              payment_method_id: 'payoneer_ivrlhwjsty',
            },
            receiver: {
              first_name: 'Juan',
              last_name: 'Perez',
              payment_method_id: 'ars_v72xv59fa6b',
            },
            payment_method: {
              sender: {
                value: 'payoneer',
                details: {
                  email_account: 'mf@gmail.com',
                  transfer_code: '12345678',
                },
              },
              receiver: {
                value: 'ars',
                details: {
                  bank_name: 'Santander',
                  sender_method_key: 'cbu',
                  sender_method_value: '7654354254542545676543',
                  document_type: 'DNI',
                  document_value: '5426413258',
                },
              },
            },
            amounts: {
              sent: {
                amount: '2000',
                currency: 'USD',
              },
              received: {
                amount: '560',
                currency: 'EUR',
              },
            },
            status: 'refund_in_transit',
            proof_of_payment: {
              img_transaction: 'https://drive.google.com/uc?id=1t2sfp3vkfb_payoneer_receipt.jpeg',
            },
          },
        ];

        setTransacciones(mockData);
        setTotalPages(3); // Valor de ejemplo
        setTotalItems(15); // Valor de ejemplo
      } finally {
        setLoading(false);
      }
    };

    fetchTransacciones();
  }, [currentPage, perPage]); // Dependencias para que se ejecute cuando cambie la página o items por página

  // Renderizar los controles de paginación
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Mostrar números de página */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          // Lógica para mostrar páginas alrededor de la actual
          let pageToShow;
          if (totalPages <= 5) {
            pageToShow = i + 1;
          } else if (currentPage <= 3) {
            pageToShow = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageToShow = totalPages - 4 + i;
          } else {
            pageToShow = currentPage - 2 + i;
          }

          // Solo mostrar si está en rango
          if (pageToShow > 0 && pageToShow <= totalPages) {
            return (
              <Button
                key={pageToShow}
                variant={currentPage === pageToShow ? 'default' : 'outline'}
                onClick={() => goToPage(pageToShow)}
                className="h-8 w-8 px-0"
              >
                {pageToShow}
              </Button>
            );
          }
          return null;
        })}

        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
        <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>
        <div className="flex h-40 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
        <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>
        <div className="rounded-lg bg-red-100 p-4 text-center text-red-600">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-blue-700 text-white hover:bg-blue-800">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-24 mt-8 w-full max-w-xl rounded-xl p-6 sm:my-6">
      <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>

      {transacciones.length === 0 ? (
        <div className="rounded-lg bg-gray-100 p-4 text-center text-gray-600 dark:bg-[#2a2a2a] dark:text-white">
          No hay transacciones disponibles.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {transacciones.map((transaccion, index) => {
              const completada = isCompleted(transaccion.status);
              const estado = getEstadoEspanol(transaccion.status);
              const fecha = formatDate(transaccion.transaction.created_at);
              const horario = formatTime(transaccion.transaction.created_at);
              const nombreDestinatario = `${transaccion.receiver.first_name} ${transaccion.receiver.last_name}`;
              const nombreSolicitante = `${transaccion.sender.first_name} ${transaccion.sender.last_name}`;
              const montoEnviado = `${transaccion.amounts.sent.amount} ${transaccion.amounts.sent.currency}`;
              const montoRecibido = `${transaccion.amounts.received.amount} ${transaccion.amounts.received.currency}`;

              return (
                <Card
                  key={index}
                  className="relative overflow-hidden shadow-sm transition-shadow hover:shadow-md dark:!border-[#4b4b4b] dark:bg-[#4b4b4b]"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="flex items-start justify-between p-4">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              N° de Solicitud #{transaccion.transaction.transaction_id}
                            </h3>
                            {completada ? (
                              <span className="text-green-500">
                                <Check className="h-5 w-5" />
                              </span>
                            ) : (
                              <span className="text-red-500">
                                <X className="h-5 w-5" />
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-gray-700 dark:text-white">{fecha}</p>
                        </div>
                      </div>

                      <div
                        className={`grid grid-cols-2 gap-y-1 px-4 pb-4 pt-1 text-sm ${expandedId === index ? 'hidden' : 'block'}`}
                      >
                        <div className="text-gray-500 dark:text-white">Estado de la Solicitud</div>
                        <div
                          className={`text-right ${completada ? 'text-green-600 dark:text-green-300' : 'text-red-600'}`}
                        >
                          {estado}
                        </div>

                        <div className="text-gray-500 dark:text-white">Destinatario</div>
                        <div className="text-right">{nombreDestinatario}</div>

                        <div className="text-gray-500 dark:text-white">Monto Enviado</div>
                        <div className="text-right font-medium">{montoEnviado}</div>
                      </div>

                      {expandedId === index && (
                        <div className="px-4 pb-4 pt-1">
                          <div className="mb-3 grid grid-cols-2 gap-y-1 border-b pb-3 text-sm">
                            <div className="text-gray-500 dark:text-white">Estado de la Solicitud</div>
                            <div
                              className={`text-right ${completada ? 'text-green-600 dark:text-green-300' : 'text-red-600'}`}
                            >
                              {estado}
                            </div>

                            <div className="text-gray-500 dark:text-white">Fecha de la Solicitud</div>
                            <div className="text-right">{fecha}</div>

                            <div className="text-gray-500 dark:text-white">Horario de la Transaccion</div>
                            <div className="text-right">{horario}</div>
                          </div>

                          <div className="mb-3 grid grid-cols-2 gap-y-1 border-b pb-3 text-sm">
                            <div className="font-medium text-gray-500 dark:text-white">Datos del Solicitante</div>
                            <div className="text-right"></div>

                            <div className="text-gray-500 dark:text-white">Nombre y Apellido</div>
                            <div className="text-right">{nombreSolicitante}</div>

                            <div className="text-gray-500 dark:text-white">Metodo de Envio</div>
                            <div className="text-right">{transaccion.payment_method.sender.value}</div>

                            <div className="text-gray-500 dark:text-white">Monto Enviado</div>
                            <div className="text-right font-medium">{montoEnviado}</div>
                          </div>

                          <div className="mb-3 grid grid-cols-2 gap-y-1 border-b pb-3 text-sm">
                            <div className="font-medium text-gray-500 dark:text-white">Destinatario</div>
                            <div className="text-right"></div>

                            <div className="text-gray-500 dark:text-white">Nombre del Destinatario</div>
                            <div className="text-right">{nombreDestinatario}</div>

                            <div className="text-gray-500 dark:text-white">Metodo de Recepción</div>
                            <div className="text-right">{transaccion.payment_method.receiver.value}</div>

                            <div className="text-gray-500 dark:text-white">
                              {transaccion.payment_method.receiver.details.sender_method_key.toUpperCase()}
                            </div>
                            <div className="text-right">
                              {transaccion.payment_method.receiver.details.sender_method_value}
                            </div>

                            <div className="text-gray-500 dark:text-white">
                              {transaccion.payment_method.receiver.details.document_type}:
                            </div>
                            <div className="text-right">
                              {transaccion.payment_method.receiver.details.document_value}
                            </div>

                            <div className="text-gray-500 dark:text-white">Monto a Recibir</div>
                            <div className="text-right">{montoRecibido}</div>
                          </div>

                          <div className="mb-3 text-xs text-gray-500 dark:text-white">
                            El número de solicitud es únicamente para que nuestro equipo de Atención al Cliente pueda
                            rastrear la transacción.
                            <br />
                            <span className="font-medium">NOTA:</span> Esta transaccion fue{' '}
                            {completada ? 'completada con éxito' : transaccion.transaction.message || 'procesada'}
                          </div>

                          {transaccion.proof_of_payment?.img_transaction && (
                            <div className="flex justify-center">
                              <Button
                                className="rounded-full bg-blue-700 px-6 text-white hover:bg-blue-800"
                                onClick={() => window.open(transaccion.proof_of_payment.img_transaction, '_blank')}
                              >
                                Ver Comprobante
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className="flex justify-end border-t border-gray-100 p-2 hover:cursor-pointer dark:!border-[#2a2a2a]"
                        onClick={() => toggleExpand(index)}
                      >
                        <button className="text-gray-400 transition-all hover:text-gray-600">
                          {expandedId === index ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Controles de paginación */}
          {renderPagination()}

          {/* Información de paginación */}
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Mostrando {transacciones.length} de {totalItems} transacciones | Página {currentPage} de {totalPages}
          </div>
        </>
      )}
    </div>
  );
}
