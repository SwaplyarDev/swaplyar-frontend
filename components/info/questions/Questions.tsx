'use client';

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import useQuestion from '@/components/ui/top-menu/UseQuestion/useQuestion';
import PaginationButtonsProps from '@/components/ui/PaginationButtonsProps/PaginationButtonsProps';

// Estilo del Accordion con uso de la prop `isDark`
// const Accordion = styled((props: AccordionProps & { isDark: boolean }) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ isDark }) => ({
//   border: 'none', // Asegura que no haya bordes extra
//   // borderTop: isDark ? '1px solid #454545' : '1px solid #f3f4f6', // Borde superior según el tema
//   backgroundColor: 'transparent', // Aseguramos que el fondo sea transparente
//   // '&:last-child': {
//   //   borderBottom: isDark ? '1px solid #111111' : '1px solid #f3f4f6', // Borde inferior según el tema
//   // },
// }));

const Accordion = styled((props: AccordionProps & { isDark: boolean }) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ isDark }) => ({
  border: 'none',
  backgroundColor: 'transparent',
  borderTop: isDark ? '2px solid #ebe7e0' : '2px solid #012c8a',
  '&::before': {
    // Eliminar cualquier borde o contenido en el ::before
    content: 'none', // Esto elimina cualquier contenido de ::before
    border: 'none', // Eliminar borde si existe
  },
  '&:last-child': {
    borderBottom: isDark ? '2px solid #ebe7e0' : '2px solid #012c8a',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps & { isDark: boolean }) => (
  <MuiAccordionSummary
    expandIcon={
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          backgroundColor: props.isDark ? '#ebe7e0' : '#012c8a', // Condición aplicada al color de fondo
        }}
      >
        <ExpandMore
          sx={{
            fontSize: '2rem',
            color: props.isDark ? '#252526' : 'white',
            // color: '#ebe7e0', // Condición aplicada al color del icono
          }}
        />
      </div>
    }
    {...props}
  />
))(({ theme }) => ({
  border: 'none', // Eliminar cualquier borde en el summary
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: 'none',
}));

const FrequentlyQuestions = () => {
  const { questions } = useQuestion();
  const { isDark } = useDarkTheme();
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);

  useEffect(() => {}, [questions]);

  return (
    <>
      <main className="relative flex w-full flex-col items-center justify-center py-10">
        <div className="mx-auto grid max-w-[1000px]" style={{ margin: currentMargin }}>
          <h1 className={`mb-14 text-left text-4xl font-bold ${isDark ? 'text-gray-100' : 'text-buttonsLigth'}`}>
            Preguntas Frecuentes
          </h1>
          <div></div>

          {questions.map((dato) => (
            <Accordion isDark={isDark} key={dato.question_id}>
              <AccordionSummary className="p-0" isDark={isDark}>
                <Typography className={`mr-8 py-2 text-xl ${isDark ? 'text-[#ebe7e0]' : 'text-[#252526]'}`}>
                  {dato.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col items-center justify-center">
                <Typography
                  className={`w-9/10 rounded-md bg-gray-200 p-6 text-left ${isDark ? 'bg-graytyc text-gray-100' : 'bg-gray-100 text-gray-900'}`}
                >
                  {dato.descripcion}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          <PaginationButtonsProps
            currentPage={2}
            totalPages={2}
            handlePageChange={() => console.log('asd')}
            isLoading={true}
          />
          {/*
          <Accordion expanded={expanded.has('panel1')} onChange={handleChange('panel1')} isDark={isDark}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" isDark={isDark} className="p-0">
              <Typography className={`mr-8 py-2 text-xl ${isDark ? 'text-[#ebe7e0]' : 'text-[#252526]'}`}>
                ¿Cuáles son los requisitos para ser miembro de SwaplyAr Rewards?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col items-center justify-center">
              <Typography
                className={`w-9/10 rounded-md bg-gray-200 p-6 text-left ${isDark ? 'bg-graytyc text-gray-100' : 'bg-gray-100 text-gray-900'}`}
              >
                <Typography>
                  Será inscrito automáticamente cuando cree un perfil en SwaplyAr proporcionando su dirección de correo
                  electrónico. También puede inscribirse como miembro de SwaplyAr Rewards en una ubicación participante
                  de SwaplyAr o a través de otros canales que SwaplyAr pueda poner a disposición ocasionalmente. Siempre
                  que cumpla con los requisitos de elegibilidad, será inscrito como miembro de SwaplyAr Rewards (en
                  adelante, “Miembro”).
                </Typography>
                <Typography className="text-right">{currentDate}</Typography>
              </Typography>
            </AccordionDetails>
                  </Accordion>*/}
        </div>
      </main>
    </>
  );
};

export default FrequentlyQuestions;
