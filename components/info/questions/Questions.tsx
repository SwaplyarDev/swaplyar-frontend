'use client';

import React, { useState } from 'react';
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

const Accordion = styled((props: AccordionProps & { isDark: boolean }) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ isDark }) => ({
  border: 'none',
  backgroundColor: 'transparent',
  borderTop: isDark ? '2px solid #ebe7e0' : '2px solid #012c8a',
  '&::before': {
    content: 'none',
    border: 'none',
  },
  '&:last-child': {
    borderBottom: isDark ? '2px solid #ebe7e0' : '2px solid #012c8a',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps & { isDark: boolean }) => (
  <MuiAccordionSummary
    expandIcon={
      <div
        className="group" // Usamos "group" aquí para que el hover se aplique correctamente
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          backgroundColor: '#ebe7e0', // Fondo predeterminado
          transition: 'background-color 0.3s ease', // Animar el cambio de color de fondo
        }}
      >
        <ExpandMore
          sx={{
            fontSize: '2rem',
            color: '#252526', // Color de la flecha
            transition: 'color 0.3s ease', // Animar el cambio de color de la flecha si se desea
          }}
        />
      </div>
    }
    {...props}
  />
))(({ theme }) => ({
  border: 'none',
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

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <main className="relative flex w-full flex-col items-center justify-center py-10">
      <div className="mx-auto grid max-w-[1000px]" style={{ margin: currentMargin }}>
        <h1 className={`mb-14 text-left text-4xl font-bold ${isDark ? 'text-gray-100' : 'text-buttonsLigth'}`}>
          Preguntas Frecuentes
        </h1>

        {questions.map((dato, index) => (
          <Accordion
            isDark={isDark}
            key={dato.question_id}
            expanded={expanded === `panel${index}`} // Comprobar si este panel está expandido
            onChange={handleChange(`panel${index}`)} // Manejar la expansión del panel
            className="group" // Agregar "group" al Accordion completo
          >
            <AccordionSummary className="p-0" isDark={isDark}>
              <Typography
                className={`mr-8 py-2 text-xl ${isDark ? 'text-[#ebe7e0]' : 'text-[#252526] group-hover:text-[rgb(1,42,141)]'} `}
              >
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
      </div>
    </main>
  );
};

export default FrequentlyQuestions;
