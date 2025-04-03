'use client';

import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/Dialog';
import { Label } from '../../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

type InfoPersonalModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

const PersonalInfoModal = ({ show, setShow }: InfoPersonalModalProps) => {
  const { isDark } = useDarkTheme();

  const handleSubmit = () => {
    setShow(false);
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className={`border-none ${isDark ? 'bg-zinc-800 text-white' : 'text-black'} sm:max-w-md`}>
        <DialogHeader className="relative">
          <DialogTitle className="pt-4 text-center text-xl font-normal">Información personal</DialogTitle>
        </DialogHeader>

        <div className="mb-6 mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre" className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              Nombre legal
            </Label>
            <Input
              id="nombre"
              className={`border border-zinc-600 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0`}
              placeholder="Ingrese su nombre legal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nacionalidad" className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              Nacionalidad
            </Label>
            <Select>
              <SelectTrigger
                id="nacionalidad"
                className="border border-zinc-600 bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <SelectValue placeholder="Seleccione su nacionalidad" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
                <SelectItem className="hover:bg-zinc-700" value="argentina">
                  Argentina
                </SelectItem>
                <SelectItem className="hover:bg-zinc-700" value="brasil">
                  Brasil
                </SelectItem>
                <SelectItem className="hover:bg-zinc-700" value="chile">
                  Chile
                </SelectItem>
                <SelectItem className="hover:bg-zinc-700" value="colombia">
                  Colombia
                </SelectItem>
                <SelectItem className="hover:bg-zinc-700" value="mexico">
                  México
                </SelectItem>
                <SelectItem className="hover:bg-zinc-700" value="peru">
                  Perú
                </SelectItem>
                <SelectItem className="hover:bg-zinc-700" value="uruguay">
                  Uruguay
                </SelectItem>
                <SelectItem className="hover:bg-zinc-700" value="venezuela">
                  Venezuela
                </SelectItem>
                <SelectItem className="hover:bg-zinc-700" value="espana">
                  España
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documento" className={`text-sm ${isDark ? 'text-white' : 'text-black'} `}>
              N° documento
            </Label>
            <Input
              id="documento"
              type="number"
              className="border border-zinc-600 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Ingrese su número de documento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha" className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              Fecha nacimiento
            </Label>
            <Input
              id="fecha"
              type="date"
              className="border border-zinc-600 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apodo" className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              Apodo
            </Label>
            <Input
              id="apodo"
              className="border border-zinc-600 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Ingrese su apodo"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => setShow(false)}
            variant="ghost"
            className={`rounded-full px-4 ${isDark ? 'border border-white text-white hover:bg-white hover:text-[#4B4B4B]' : 'border border-blue-400 bg-white text-blue-400'}`}
          >
            ← Volver
          </Button>
          <Button
            className={`rounded-full px-4 ${isDark ? 'bg-white text-[#4B4B4B]' : 'bg-blue-400 text-white hover:bg-blue-700'}`}
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoModal;
