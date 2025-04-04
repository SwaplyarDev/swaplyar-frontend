'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
/* import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select" */

export default function AddAccountForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    pix: '',
    cpf: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="grid gap-4 py-4">
      {/* <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione una Billetera" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paypal">PayPal</SelectItem>
          <SelectItem value="transferencia">Transferencia</SelectItem>
          <SelectItem value="tether">Tether</SelectItem>
          <SelectItem value="wise">Wise</SelectItem>
          <SelectItem value="blockchain">Blockchain</SelectItem>
        </SelectContent>
      </Select> */}

      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          className="dark:placeholder:text-gray-400"
          id="nombre"
          placeholder="Ingrese su nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="apellido">Apellido</Label>
        <Input
          className="dark:placeholder:text-gray-400"
          id="apellido"
          placeholder="Ingrese su apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="pix">PIX KEY</Label>
        <Input
          className="dark:placeholder:text-gray-400"
          id="pix"
          placeholder="Ingrese su clave PIX"
          value={formData.pix}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          className="dark:placeholder:text-gray-400"
          id="cpf"
          placeholder="Ingrese su CPF"
          value={formData.cpf}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
