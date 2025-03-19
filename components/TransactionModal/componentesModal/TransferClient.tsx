'use client';

import type React from 'react';

import { useState } from 'react';
import { CheckCircle, XCircle, Upload, LinkIcon, DollarSign, FileText } from 'lucide-react';

const TransferClient = () => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [form, setForm] = useState<{ transfer_id: string; amount: number }>({
    transfer_id: '',
    amount: 0,
  });
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

    // Aquí se manejaría la lógica para procesar los archivos
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      console.log('Archivo recibido:', files[0].name);
      // Implementar lógica de carga de archivos
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="">
        <h3 className="mb-4 text-center font-titleFont text-lg font-medium text-gray-800">
          Información de la Transferencia al Cliente
        </h3>

        <div className="flex flex-col space-y-6">
          {/* Pregunta sobre la transferencia */}
          <div className="flex flex-col items-center gap-3">
            <p className="font-medium text-gray-800">¿La transferencia fue realizada al cliente?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSelected(true)}
                onMouseEnter={() => setIsHovering('yes-transfer')}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                  selected === true
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-green-500 hover:text-green-600'
                } `}
                aria-pressed={selected === true}
              >
                <CheckCircle className={`h-5 w-5 ${selected === true ? 'text-white' : 'text-green-500'}`} />
                <span>Sí</span>
                {isHovering === 'yes-transfer' && selected !== true && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white">
                    Confirmar transferencia
                  </span>
                )}
              </button>

              <button
                onClick={() => setSelected(false)}
                onMouseEnter={() => setIsHovering('no-transfer')}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                  selected === false
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-red-500 hover:text-red-600'
                } `}
                aria-pressed={selected === false}
              >
                <XCircle className={`h-5 w-5 ${selected === false ? 'text-white' : 'text-red-500'}`} />
                <span>No</span>
                {isHovering === 'no-transfer' && selected !== false && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-red-600 px-2 py-1 text-xs text-white">
                    Marcar como pendiente
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Campos de formulario condicionales */}
          {selected === true && (
            <div className="animate-fadeIn grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="transfer_id" className="text-sm font-medium text-gray-700">
                  ID de la Transferencia <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center gap-2 rounded-lg p-1 transition-all duration-300 ${isInputFocused === 'transfer_id' ? 'bg-blue-50 ring-2 ring-blue-300' : 'border border-gray-300 bg-white'} `}
                >
                  <FileText className="ml-2 h-5 w-5 text-gray-400" />
                  <input
                    id="transfer_id"
                    name="transfer_id"
                    type="text"
                    placeholder="Ingresa el ID de la transferencia"
                    className="h-10 flex-1 border-none bg-transparent px-2 text-gray-800 focus:outline-none"
                    value={form.transfer_id}
                    onChange={handleInputChange}
                    onFocus={() => setIsInputFocused('transfer_id')}
                    onBlur={() => setIsInputFocused(null)}
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  Monto Transferido <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center gap-2 rounded-lg p-1 transition-all duration-300 ${isInputFocused === 'amount' ? 'bg-blue-50 ring-2 ring-blue-300' : 'border border-gray-300 bg-white'} `}
                >
                  <DollarSign className="ml-2 h-5 w-5 text-gray-400" />
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Ingresa el monto transferido"
                    className="h-10 flex-1 border-none bg-transparent px-2 text-gray-800 focus:outline-none"
                    value={form.amount || ''}
                    onChange={handleInputChange}
                    onFocus={() => setIsInputFocused('amount')}
                    onBlur={() => setIsInputFocused(null)}
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sección de comprobante */}
          <div className="animate-fadeIn flex flex-col items-center gap-4 pt-2">
            <h4 className="text-center text-base font-semibold text-gray-800">Comprobante de Transferencia</h4>

            <div
              className={`flex h-32 w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'} `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 text-blue-500" />
              <p className="px-4 text-center text-sm text-gray-600">
                Arrastra y suelta el comprobante aquí o
                <button
                  className="ml-1 font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  selecciona un archivo
                </button>
              </p>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    console.log('Archivo seleccionado:', e.target.files[0].name);
                    // Implementar lógica de carga de archivos
                  }
                }}
              />
              <p className="text-xs text-gray-500">Formatos aceptados: JPG, PNG, PDF (máx. 5MB)</p>
            </div>

            <button
              className="flex items-center gap-2 text-blue-600 transition-colors duration-200 hover:text-blue-800 focus:outline-none"
              onMouseEnter={() => setIsHovering('link')}
              onMouseLeave={() => setIsHovering(null)}
            >
              <LinkIcon className="h-4 w-4" />
              <span className="text-sm font-medium underline">Agregar link del comprobante</span>
              {isHovering === 'link' && (
                <span className="animate-fadeIn absolute mt-8 whitespace-nowrap rounded bg-blue-600 px-2 py-1 text-xs text-white">
                  Usar URL en lugar de archivo
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferClient;
