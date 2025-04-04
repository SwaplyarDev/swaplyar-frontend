'use client';

import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/Dialog';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

type WhatsappVerificationProps = {
  show: boolean;
  setShow: (arg: boolean) => void;
};

const WhatsAppModal = ({ show, setShow }: WhatsappVerificationProps) => {
  const { isDark } = useDarkTheme();

  const [countryCode, setCountryCode] = useState('+54');

  const [telNumber, setTelNumber] = useState(countryCode);

  const handleSubmit = () => {
    const telRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,4}[-.\s]?\d{0,4}$/;
    const isValid = telRegex.test(telNumber);

    if (isValid) {
      //logica para conectar con el backend
      setShow(false);
    }
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className={`border-none ${isDark ? 'bg-zinc-800 text-white' : 'text-black'} sm:max-w-md`}>
        <DialogHeader className="relative">
          <DialogTitle className="pt-4 text-center text-xl font-normal">Verificar numero de WhatsApp</DialogTitle>
        </DialogHeader>

        <div className="mb-6 mt-4">
          <div className="flex overflow-hidden rounded-2xl border border-zinc-600">
            <div className="flex-shrink-0">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[80px] border-0 bg-transparent">
                  <SelectValue placeholder="+54" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700 bg-zinc-800">
                  <SelectItem className="hover:bg-zinc-700" value="+54">
                    +54
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+55">
                    +55
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+56">
                    +56
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+57">
                    +57
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+52">
                    +52
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+51">
                    +51
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+589">
                    +589
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+58">
                    +58
                  </SelectItem>
                  <SelectItem className="hover:bg-zinc-700" value="+34">
                    +34
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelNumber(countryCode + e.target.value)}
              className="border-0 bg-transparent"
              type="tel"
              placeholder="Numero de WhatsApp"
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
            onClick={handleSubmit}
            className={`rounded-full px-4 ${isDark ? 'bg-white text-[#4B4B4B]' : 'bg-blue-400 text-white hover:bg-blue-700'}`}
          >
            Enviar Código
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;
