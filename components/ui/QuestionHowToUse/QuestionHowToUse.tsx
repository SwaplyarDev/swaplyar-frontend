'use client';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Link from 'next/link';
import clsx from 'clsx';
const questions = [
  {
    title: '¿Es seguro usar SwaplyAr?',
    descripcion:
      'Sí, SwaplyAr es una plataforma segura y confiable. Contamos con sistemas de verificación para garantizar la protección de cada transacción y asegurar que tu dinero llegue correctamente al destino seleccionado.',
  },
  {
    title: '¿Cuánto tarda en completarse la operación?',
    descripcion:
      'El proceso suele tardar menos de 5 minutos una vez que hemos confirmado el pago y recibido el comprobante.',
  },
  {
    title: '¿Qué pasa si me equivoqué al ingresar mis datos?',
    descripcion:
      'Si ingresaste algún dato incorrecto, puedes corregirlo accediendo al Centro de Ayuda, en la sección "Editar Solicitud". Allí podrás:\n- Revisar la información ingresada.\n- Especificar el dato que deseas corregir.\n- Subir un nuevo comprobante en caso de haber enviado uno erróneo.',
  },
  {
    title: '¿Qué métodos de pago aceptan?',
    descripcion:
      'Aceptamos pagos mediante transferencias bancarias y billeteras digitales. Puedes ver las opciones disponibles en nuestra calculadora, donde también se muestran los métodos de pago que aceptamos y las opciones de retiro. Próximamente agregaremos más métodos para mayor comodidad.',
  },
  {
    title: '¿Qué hago si han pasado más de 5 minutos y no he recibido mi dinero?',
    descripcion:
      'Puedes verificar el estado de tu solicitud en la sección "Centro de Ayuda" → "Buscar Solicitudes". Allí podrás ver el estado de tu transferencia en tiempo real. Además, recibirás notificaciones por email en cada etapa del proceso.',
  },
  {
    title: '¿Puedo cancelar mi solicitud y recibir un reembolso?',
    descripcion:
      'Si la solicitud aún está en proceso, puedes solicitar el reembolso y recibir el dinero de vuelta en la cuenta de origen. Si la transacción ya se completó y el pago fue enviado al destinatario, la solicitud no podrá ser cancelada.',
  },

  {
    title: '¿Por qué me piden mi número de teléfono y datos personales?',
    descripcion:
      'Solicitamos esta información para garantizar la seguridad de la transacción y contactarte en caso de cualquier eventualidad. Nos comunicaremos contigo por email o WhatsApp si es necesario.',
  },
  {
    title: '¿Qué hago si mi solicitud fue rechazada?',
    descripcion:
      'Si tu solicitud fue rechazada, revisa el motivo en la sección "Centro de Ayuda" → "Buscar Solicitudes". Puede deberse a un error en los datos ingresados o en el comprobante de pago. Si necesitas asistencia, contáctanos a través de nuestro soporte para solucionarlo.',
  },
];
const Accordion = styled((props: AccordionProps & { isDark: boolean; expanded: boolean }) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ isDark, expanded }) => ({
  border: 'none',
  background: 'transparent',

  borderTop: isDark ? '1px solid #ebe7e0' : '1px solid #012c8a',
  '&::before': {
    content: 'none',
    border: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps & { isDark: boolean; expanded: boolean }) => (
  <MuiAccordionSummary
    expandIcon={
      <div
        className={`${
          props.expanded
            ? props.isDark
              ? 'bg-custom-grayD-600'
              : 'bg-custom-blue-800'
            : !props.expanded
              ? !props.isDark
                ? 'bg-custom-grayD-200'
                : 'bg-custom-grayD-800'
              : ''
        } ${props.isDark ? 'group-hover:bg-custom-grayD-600' : 'group-hover:bg-custom-blue'}`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
        }}
      >
        <ExpandMore
          /*className={` ${props.expanded || props.isDark ? 'text-white' : 'text-custom-blue-300'} group-hover:custom-grayD-500`}*/

          className={`${
            props.isDark
              ? props.expanded
                ? 'text-custom-whiteD'
                : 'text-custom-grayD-500'
              : props.expanded
                ? 'text-custom-whiteD'
                : 'text-custom-blue-300'
          } ${props.isDark ? 'group-hover:text-custom-whiteD' : 'group-hover:text-custom-whiteD'} `}
          sx={{
            fontSize: '2rem',
            transition: 'color 0.3s ease',

            borderRadius: '100%',
          }}
        />
      </div>
    }
    {...props}
  />
))(({ theme, isDark }) => ({
  border: 'none',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(0),
  },
  '&:hover': {
    backgroundColor: isDark ? '#333' : '#f5f5f5',

    [`& .MuiTypography-root`]: {
      color: isDark ? '#f5f5f5' : 'rgb(1, 42, 141)',
      fontWeight: '600',
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: 'none',
}));

const QuestionHowToUse = () => {
  const { isDark } = useDarkTheme();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <main
      className={`${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'} relative flex w-full max-w-[538px] flex-col items-center justify-center gap-10 lg2:max-w-[872px]`}
    >
      <header className={'w-full text-center text-[36px] lg2:text-left'}>
        <h2 className="font-textFont">Todo lo que necesitas saber antes de usar SwaplyAr</h2>
      </header>

      <section className="grid gap-6">
        {questions.map((dato, index) => (
          <Accordion
            isDark={isDark}
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            className="group"
          >
            <AccordionSummary
              className={`p-0 hover:bg-transparent`}
              isDark={isDark}
              expanded={expanded === `panel${index}`}
            >
              <Typography
                className={`font-textFont text-[21px] ${
                  isDark
                    ? 'text-custom-whiteD'
                    : expanded === `panel${index}`
                      ? 'text-custom-blue-800'
                      : 'text-custom-grayD'
                } ${expanded === `panel${index}` ? 'font-semibold' : 'font-light'}`}
              >
                {dato.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              className={`flex flex-col items-center justify-center ${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'}`}
            >
              <Typography
                className={`flex w-9/10 gap-6 rounded-md p-2.5 text-left`}
                style={
                  isDark
                    ? { background: 'rgba(75,75,75,1)', borderRadius: '16px' }
                    : { background: 'rgb(238, 234, 227)', borderRadius: '16px' }
                }
              >
                {dato.descripcion}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </section>

      {/* w-full px-[5%] sm:px-[10%]  md:px-[0px]*/}
      <div className={'flex w-full flex-col justify-between gap-4 md:flex-row md:items-center'}>
        <p className="font-textFont text-lg">¿Tenés más dudas?</p>
        <Link
          className={clsx(
            'flex w-[244px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 font-titleFont font-semibold text-buttonsLigth dark:border-darkText dark:text-darkText',
            isDark ? 'buttonSecondDark' : 'buttonSecond',
          )}
          href="/es/centro-de-ayuda/preguntas-frecuentes"
        >
          Ir a Preguntas Frecuentes
        </Link>
      </div>
    </main>
  );
};

export default QuestionHowToUse;
