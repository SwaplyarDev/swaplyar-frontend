'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/Dialog';
import { Label } from '../../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';

type InfoPersonalModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

type UserInfo = {
  name: string;
  nationality: string;
  documentNumber: string;
  birthDate: string;
  alias: string;
};

type ValidationErrors = {
  name?: string;
  nationality?: string;
  documentNumber?: string;
  birthDate?: string;
  alias?: string;
};

const InfoPersonalModal = ({ show, setShow }: InfoPersonalModalProps) => {
  const { isDark } = useDarkTheme();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    nationality: '',
    documentNumber: '',
    birthDate: '',
    alias: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));

    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  const handleBlur = (field: keyof UserInfo) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!userInfo.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(userInfo.name)) {
      newErrors.name = 'El nombre solo debe contener letras';
    }

    if (!userInfo.nationality) {
      newErrors.nationality = 'Debe seleccionar una nacionalidad';
    }

    if (!userInfo.documentNumber) {
      newErrors.documentNumber = 'El número de documento es obligatorio';
    } else if (!/^\d{1,2}(\.\d{3}){1,2}$|^\d{7,8}$/.test(userInfo.documentNumber)) {
      newErrors.documentNumber = 'El documento debe contener solo números';
    }

    if (!userInfo.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
    } else {
      const birthDate = new Date(userInfo.birthDate);
      const today = new Date();

      if (isNaN(birthDate.getTime())) {
        newErrors.birthDate = 'Fecha inválida';
      } else if (birthDate > today) {
        newErrors.birthDate = 'La fecha no puede ser futura';
      }
    }

    if (userInfo.alias && userInfo.alias.length < 2) {
      newErrors.alias = 'El apodo debe tener al menos 2 caracteres';
    }

    return newErrors;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const validationErrors = validateForm();
      setErrors(validationErrors);
    }
  }, [userInfo, touched]);

  const handleSubmit = () => {
    setIsSubmitting(true);

    const allTouched = Object.keys(userInfo).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setTouched(allTouched);

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully:', userInfo);
      setShow(false);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        className={`max-h-[750px] border-none ${isDark ? 'bg-zinc-800 text-white' : 'text-black'} sm:max-w-md`}
      >
        <DialogHeader className="relative">
          <DialogTitle className="pt-4 text-center text-xl font-normal">Información personal</DialogTitle>
        </DialogHeader>

        <div className="mb-6 mt-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              Nombre legal
            </Label>
            <Input
              id="nombre"
              className={clsx(
                'inputChangeAutofill border bg-transparent focus:border-[#90B0FE] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                errors.nationality && touched.nationality ? 'border-red-500' : 'border-zinc-600',
              )}
              placeholder="Ingrese su nombre legal"
              value={userInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
            />
            {errors.name && touched.name && <p className="absolute text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nacionalidad" className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              Nacionalidad
            </Label>
            <Select
              value={userInfo.nationality}
              onValueChange={(value) => handleChange('nationality', value)}
              onOpenChange={() => handleBlur('nationality')}
            >
              <SelectTrigger
                id="nacionalidad"
                className={clsx(
                  'inputChangeAutofill appearance-none border bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                  errors.nationality && touched.nationality ? 'border-red-500' : 'border-zinc-600',
                )}
              >
                <SelectValue placeholder="Seleccione su nacionalidad" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-zinc-800 text-white focus:border-[#90B0FE]">
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
            {errors.nationality && touched.nationality && (
              <p className="absolute text-xs text-red-500">{errors.nationality}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="documento" className={`text-sm ${isDark ? 'text-white' : 'text-black'} `}>
              N° documento
            </Label>
            <Input
              id="documento"
              type="text"
              inputMode="numeric"
              className={clsx(
                'inputChangeAutofill !appearance-none border bg-transparent focus:border-[#90B0FE] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                errors.nationality && touched.nationality ? 'border-red-500' : 'border-zinc-600',
              )}
              placeholder="Ingrese su número de documento"
              value={userInfo.documentNumber}
              onChange={(e) => handleChange('documentNumber', e.target.value)}
              onBlur={() => handleBlur('documentNumber')}
            />
            {errors.documentNumber && touched.documentNumber && (
              <p className="absolute text-xs text-red-500">{errors.documentNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha" className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              Fecha nacimiento
            </Label>
            <Input
              id="fecha"
              type="date"
              className={clsx(
                'inputChangeAutofill appearance-none border bg-transparent focus:border-[#90B0FE] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                errors.nationality && touched.nationality ? 'border-red-500' : 'border-zinc-600',
              )}
              value={userInfo.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              onBlur={() => handleBlur('birthDate')}
            />
            {errors.birthDate && touched.birthDate && (
              <p className="absolute text-xs text-red-500">{errors.birthDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apodo" className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
              Apodo
            </Label>
            <Input
              id="apodo"
              className={clsx(
                'inputChangeAutofill appearance-none border bg-transparent focus:border-[#90B0FE] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                errors.nationality && touched.nationality ? 'border-red-500' : 'border-zinc-600',
              )}
              placeholder="Ingrese su apodo"
              value={userInfo.alias}
              onChange={(e) => handleChange('alias', e.target.value)}
              onBlur={() => handleBlur('alias')}
            />
            {errors.alias && touched.alias && <p className="absolute text-xs text-red-500">{errors.alias}</p>}
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
            className={`rounded-full px-4 ${
              isSubmitting
                ? 'opacity-70'
                : isDark
                  ? 'bg-white text-[#4B4B4B]'
                  : 'bg-blue-400 text-white hover:bg-blue-700'
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoPersonalModal;
