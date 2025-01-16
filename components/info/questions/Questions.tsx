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
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import BannerQuestions from '@/public/images/baner_questions.png';
//C:\Users\Administrator\swaplyar-frontend\components\info\questions\Questions.tsx
//C:\Users\Administrator\swaplyar-frontend\public\images

const Accordion = styled((props: AccordionProps & { isDark: boolean }) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ isDark }) => ({
  border: 'none',
  backgroundColor: 'transparent',
  borderTop: isDark ? '1px solid #ebe7e0' : '1px solid #012c8a',
  '&::before': {
    content: 'none',
    border: 'none',
  },
  '&:last-child': {
    borderBottom: isDark ? '1px solid #ebe7e0' : '1px solid #012c8a',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps & { isDark: boolean }) => (
  <MuiAccordionSummary
    expandIcon={
      <div
        className={`${props.isDark ? 'bg-[rgba(75,75,75,1)]' : 'bg-[rgb(225,225,225)] group-hover:bg-[rgb(1,42,142)]'}`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          width: '40px',
          height: '40px',

          // Fondo predeterminado
          transition: 'background-color 0.3s ease',
          // Animar el cambio de color de fondo
        }}
      >
        <ExpandMore
          className={`${props.isDark ? 'text-white' : 'group-hover:text-[rgb(235,231,224)]'}`}
          sx={{
            fontSize: '2rem',
            color: 'rgb(144,176,254)',

            transition: 'color 0.3s ease', // Animar el cambio de color de la flecha si se desea
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
    backgroundColor: isDark ? '#333' : '#f5f5f5', // Color de fondo en hover
    [`& .MuiTypography-root`]: {
      color: isDark ? '#f5f5f5' : 'rgb(1,42,141)', // Cambiar color del texto en hover
    },
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
    <main className="flex w-full flex-col items-center justify-center">
      <header className={`mt-10 text-left text-center text-4xl ${isDark ? 'text-gray-100' : 'text-slate-800'}`}>
        <p>Preguntas Frecuentes</p>
      </header>

      <section className="grid max-w-[716px] gap-6 py-12" style={{ marginInline: currentMargin }}>
        {questions.map((dato, index) => (
          <Accordion
            isDark={isDark}
            key={dato.question_id}
            expanded={expanded === `panel${index}`} // Comprobar si este panel está expandido
            onChange={handleChange(`panel${index}`)} // Manejar la expansión del panel
            className="group" // Agregar "group" al Accordion completo
          >
            <AccordionSummary
              className={`p-0 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-transparent'}`}
              isDark={isDark}
            >
              <Typography className={`text-xl ${isDark ? 'text-[#ebe7e0]' : 'text-[#252526]'} `}>
                {dato.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col items-center justify-center">
              <Typography
                className={`w-9/10 rounded-md p-6 text-left ${isDark ? 'bg-graytyc text-gray-100' : 'bg-gray-100 text-gray-900'}`}
                style={isDark ? { background: 'rgba(75,75,75,1)' } : { background: 'rgb(238, 234, 227)' }}
              >
                {dato.descripcion}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </section>
      <section className="mt-10 h-auto w-full">
        <FlyerTrabajo imageSrc={BannerQuestions.src}>
          <></>
        </FlyerTrabajo>{' '}
      </section>
    </main>
  );
};

export default FrequentlyQuestions;
