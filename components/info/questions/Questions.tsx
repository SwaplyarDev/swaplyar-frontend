'use client';

import React, { useEffect, useState } from 'react';
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
import PaginationButtons from '@/components/ui/PaginationButtons.tsx/PaginationButtons';
import useQuestionStore from '@/store/useQuestion.store';

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
          // Condición aplicada al color de fondo
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
  const { currentPage } = useQuestionStore();

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

          <PaginationButtons currentPage={currentPage} totalPages={6} isLoading={false} />
        </div>
      </main>
    </>
  );
};

export default FrequentlyQuestions;
