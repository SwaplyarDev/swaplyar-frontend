'use client';

import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function HistorialTransacciones() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    if (expandedId === index) {
      setExpandedId(null);
    } else {
      setExpandedId(index);
    }
  };

  const transacciones = [
    {
      id: '#ok1dm9oyswq',
      fecha: '02 Mar 2025',
      estado: 'Completada',
      destinatario: 'Jenifer Paola Gutierrez Mende',
      monto: '65 USD',
      completada: true,
      detalles: {
        horario: '16:39:09',
        solicitante: 'Oa Johan Javier Suarez Merchan',
        metodoEnvio: 'Payoneer',
        metodoRecepcion: 'ARS',
        cbu: '123456854578548785485',
        di: '25252525',
        montoRecibir: '75504',
      },
    },
    {
      id: '#1ysqdzylim',
      fecha: '16 Feb 2025',
      estado: 'Rechazada',
      destinatario: 'Jeanim Kuymn',
      monto: '67 USD',
      completada: false,
      detalles: {
        horario: '14:22:31',
        solicitante: 'Oa Johan Javier Suarez Merchan',
        metodoEnvio: 'Payoneer',
        metodoRecepcion: 'ARS',
        cbu: '987654321234567890123',
        di: '36363636',
        montoRecibir: '78504',
      },
    },
    {
      id: '#1ysqdzylim',
      fecha: '16 Feb 2025',
      estado: 'Rechazada',
      destinatario: 'Jeanim Kuymn',
      monto: '67 USD',
      completada: false,
      detalles: {
        horario: '14:22:31',
        solicitante: 'Oa Johan Javier Suarez Merchan',
        metodoEnvio: 'Payoneer',
        metodoRecepcion: 'ARS',
        cbu: '987654321234567890123',
        di: '36363636',
        montoRecibir: '78504',
      },
    },
    {
      id: '#ok1dm9oyswq',
      fecha: '02 Mar 2025',
      estado: 'Completada',
      destinatario: 'Jenifer Paola Gutierrez Mende',
      monto: '65 USD',
      completada: true,
      detalles: {
        horario: '16:39:09',
        solicitante: 'Oa Johan Javier Suarez Merchan',
        metodoEnvio: 'Payoneer',
        metodoRecepcion: 'ARS',
        cbu: '123456854578548785485',
        di: '25252525',
        montoRecibir: '75504',
      },
    },
    {
      id: '#1ysqdzylim',
      fecha: '16 Feb 2025',
      estado: 'Rechazada',
      destinatario: 'Jeanim Kuymn',
      monto: '67 USD',
      completada: false,
      detalles: {
        horario: '14:22:31',
        solicitante: 'Oa Johan Javier Suarez Merchan',
        metodoEnvio: 'Payoneer',
        metodoRecepcion: 'ARS',
        cbu: '987654321234567890123',
        di: '36363636',
        montoRecibir: '78504',
      },
    },
    {
      id: '#1ysqdzylim',
      fecha: '16 Feb 2025',
      estado: 'Rechazada',
      destinatario: 'Jeanim Kuymn',
      monto: '67 USD',
      completada: false,
      detalles: {
        horario: '14:22:31',
        solicitante: 'Oa Johan Javier Suarez Merchan',
        metodoEnvio: 'Payoneer',
        metodoRecepcion: 'ARS',
        cbu: '987654321234567890123',
        di: '36363636',
        montoRecibir: '78504',
      },
    },
  ];

  return (
    <div className="mx-auto my-6 max-w-3xl rounded-xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">Historial de Transacciones</h1>

      <div className="space-y-4">
        {transacciones.map((transaccion, index) => (
          <Card
            key={index}
            className="relative overflow-hidden shadow-sm transition-shadow hover:shadow-md dark:bg-[#4b4b4b]"
          >
            <CardContent className="p-0">
              <div className="relative">
                <div className="flex items-start justify-between p-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-lg font-semibold">N° de Solicitud {transaccion.id}</h3>
                      {transaccion.completada ? (
                        <span className="text-green-500">
                          <Check className="h-5 w-5" />
                        </span>
                      ) : (
                        <span className="text-red-500">
                          <X className="h-5 w-5" />
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-gray-700">{transaccion.fecha}</p>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-2 gap-y-1 px-4 pb-4 pt-1 text-sm ${expandedId === index ? 'hidden' : 'block'}`}
                >
                  <div className="text-gray-500">Estado de la Solicitud</div>
                  <div className={`text-right ${transaccion.completada ? 'text-green-600' : 'text-red-600'}`}>
                    {transaccion.estado}
                  </div>

                  <div className="text-gray-500">Destinatario</div>
                  <div className="text-right">{transaccion.destinatario}</div>

                  <div className="text-gray-500">Monto Enviado</div>
                  <div className="text-right font-medium">{transaccion.monto}</div>
                </div>

                {expandedId === index && (
                  <div className="px-4 pb-4 pt-1">
                    <div className="mb-3 grid grid-cols-2 gap-y-1 border-b pb-3 text-sm">
                      <div className="text-gray-500">Estado de la Solicitud</div>
                      <div className={`text-right ${transaccion.completada ? 'text-green-600' : 'text-red-600'}`}>
                        {transaccion.estado}
                      </div>

                      <div className="text-gray-500">Fecha de la Solicitud</div>
                      <div className="text-right">{transaccion.fecha}</div>

                      <div className="text-gray-500">Horario de la Transaccion</div>
                      <div className="text-right">{transaccion.detalles.horario}</div>
                    </div>

                    <div className="mb-3 grid grid-cols-2 gap-y-1 border-b pb-3 text-sm">
                      <div className="font-medium text-gray-500">Datos del Solicitante</div>
                      <div className="text-right"></div>

                      <div className="text-gray-500">Nombre y Apellido</div>
                      <div className="text-right">{transaccion.detalles.solicitante}</div>

                      <div className="text-gray-500">Metodo de Envio</div>
                      <div className="text-right">{transaccion.detalles.metodoEnvio}</div>

                      <div className="text-gray-500">Monto Enviado</div>
                      <div className="text-right font-medium">{transaccion.monto}</div>
                    </div>

                    <div className="mb-3 grid grid-cols-2 gap-y-1 border-b pb-3 text-sm">
                      <div className="font-medium text-gray-500">Destinatario</div>
                      <div className="text-right"></div>

                      <div className="text-gray-500">Nombre del Destinatario</div>
                      <div className="text-right">{transaccion.destinatario}</div>

                      <div className="text-gray-500">Metodo de Recepción</div>
                      <div className="text-right">{transaccion.detalles.metodoRecepcion}</div>

                      <div className="text-gray-500">CBU/CVU/ALIAS</div>
                      <div className="text-right">{transaccion.detalles.cbu}</div>

                      <div className="text-gray-500">DI/CUIT/CUIL:</div>
                      <div className="text-right">{transaccion.detalles.di}</div>

                      <div className="text-gray-500">Monto a Recibir</div>
                      <div className="text-right">{transaccion.detalles.montoRecibir}</div>
                    </div>

                    <div className="mb-3 text-xs text-gray-500">
                      El número de solicitud es únicamente para que nuestro equipo de Atención al Cliente pueda rastrear
                      la transacción.
                      <br />
                      <span className="font-medium">NOTA:</span> Esta transaccion fue{' '}
                      {transaccion.completada ? 'completada con éxito' : 'rechazada'}
                    </div>

                    {transaccion.completada && (
                      <div className="flex justify-center">
                        <Button className="rounded-full bg-blue-700 px-6 text-white hover:bg-blue-800">
                          Ver Comprobante
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end border-t border-gray-100 p-2" onClick={() => toggleExpand(index)}>
                  <button className="text-gray-400 transition-all hover:text-gray-600">
                    {expandedId === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
