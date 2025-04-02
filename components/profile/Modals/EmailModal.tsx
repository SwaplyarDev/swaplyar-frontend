'use client';

import { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/Dialog';
import { Label } from '../../ui/Label';
import { Email } from '@mui/icons-material';

type EmailModalProps = {
  show: boolean;
  setShow: (arg: boolean) => void;
};

const EmailModal = ({ show, setShow }: EmailModalProps) => {
  const currentEmail = 'usuario@ejemplo.com';

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="border-none bg-zinc-800 text-white sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="pt-4 text-center text-xl font-normal">Cambiar email</DialogTitle>
        </DialogHeader>

        <div className="mb-6 mt-4 space-y-5">
          <div className="flex items-center space-x-3 rounded-lg bg-zinc-700/50 p-4">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Email actual</p>
              <p className="text-white">{currentEmail}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-email" className="text-sm text-white">
              Nuevo email
            </Label>
            <Input
              id="new-email"
              type="email"
              className="border border-zinc-600 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Ingrese su nuevo email"
            />
          </div>

          <div className="rounded-lg border border-yellow-600/30 bg-yellow-600/20 p-3 text-sm text-yellow-300">
            <p>Te enviaremos un código de verificación a tu nuevo email para confirmar el cambio.</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => setShow(false)}
            variant="ghost"
            className="rounded-full px-4 text-white hover:bg-zinc-700"
          >
            Cancelar
          </Button>
          <Button className="rounded-md text-white hover:bg-white hover:text-[#4B4B4B]">Continuar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
