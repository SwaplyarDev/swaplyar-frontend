'use client';

import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/Dialog';

type WhatsappVerificationProps = {
  show: boolean;
  setShow: (arg: boolean) => void;
};

const WhatsAppModal = ({ show, setShow }: WhatsappVerificationProps) => {
  const [countryCode, setCountryCode] = useState('+54');

  const handleSubmit = () => {
    setShow(false);
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="border-none bg-zinc-800 text-white sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="pt-4 text-center text-xl font-normal">Verificar numero de WhatsApp</DialogTitle>
        </DialogHeader>

        <div className="mb-6 mt-4">
          <div className="flex overflow-hidden rounded-md border border-zinc-600">
            <div className="flex-shrink-0">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[80px] border-0 bg-transparent text-white">
                  <SelectValue placeholder="+54" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
                  <SelectItem className="hover:bg-zinc-700" value="+54">
                    +54
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+1">
                    +1
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+34">
                    +34
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+52">
                    +52
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+55">
                    +55
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input className="border-0 bg-transparent text-white" placeholder="Numero de WhatsApp" />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => setShow(false)}
            variant="ghost"
            className="rounded-full px-4 text-white hover:bg-zinc-700"
          >
            ← Volver
          </Button>
          <Button onClick={handleSubmit} className="rounded-md text-white hover:bg-white hover:text-[#4B4B4B]">
            Enviar Código
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;
