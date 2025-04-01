'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/Dialog';
import { Label } from '../../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';

export default function PersonalInfoModal() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-none bg-zinc-800 text-white sm:max-w-md">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 rounded-full text-white hover:bg-zinc-700"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="pt-4 text-center text-xl font-normal">Información personal</DialogTitle>
        </DialogHeader>

        <div className="mb-6 mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm text-white">
              Nombre legal
            </Label>
            <Input
              id="nombre"
              className="border border-zinc-600 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Ingrese su nombre legal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nacionalidad" className="text-sm text-white">
              Nacionalidad
            </Label>
            <Select>
              <SelectTrigger
                id="nacionalidad"
                className="border border-zinc-600 bg-transparent text-white focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <SelectValue placeholder="Seleccione su nacionalidad" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
                <SelectItem value="argentina">Argentina</SelectItem>
                <SelectItem value="brasil">Brasil</SelectItem>
                <SelectItem value="chile">Chile</SelectItem>
                <SelectItem value="colombia">Colombia</SelectItem>
                <SelectItem value="mexico">México</SelectItem>
                <SelectItem value="peru">Perú</SelectItem>
                <SelectItem value="uruguay">Uruguay</SelectItem>
                <SelectItem value="venezuela">Venezuela</SelectItem>
                <SelectItem value="espana">España</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documento" className="text-sm text-white">
              N° documento
            </Label>
            <Input
              id="documento"
              className="border border-zinc-600 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Ingrese su número de documento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha" className="text-sm text-white">
              Fecha nacimiento
            </Label>
            <Input
              id="fecha"
              type="date"
              className="border border-zinc-600 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apodo" className="text-sm text-white">
              Apodo
            </Label>
            <Input
              id="apodo"
              className="border border-zinc-600 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Ingrese su apodo"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Button variant="ghost" className="rounded-full px-4 text-white hover:bg-zinc-700">
            ← Volver
          </Button>
          <Button className="rounded-md bg-green-600 text-white hover:bg-green-700">Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
