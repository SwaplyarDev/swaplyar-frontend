'use client';

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import useQuestion from '@/components/ui/top-menu/UseQuestion/useQuestion';
import SkeletonQuestions from '@/components/ui/SkeletonQuestions/SkeletonQuestions';
import ShortButton from '../NewButtons/ShortButton';


const Accordion = styled((props: AccordionProps & { isDark: boolean; expanded: boolean }) => {
  const { expanded, ...accordionProps } = props;
  return <MuiAccordion disableGutters elevation={0} square {...accordionProps} />;
})(({ isDark }) => ({
  border: 'none',
  background: 'transparent',
  position: 'relative',
  '&::before': {
    content: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 'clamp(50px, 12vw, 60px)',
    height: '1px',
    backgroundColor: isDark ? '#ebe7e0' : '#012c8a',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps & { isDark: boolean; expanded: boolean }) => {
  const { expanded, isDark, ...summaryProps } = props;
  return (
    <MuiAccordionSummary
      expandIcon={
        <div
          className={`${expanded
              ? isDark
                ? 'bg-custom-grayD-600'
                : 'bg-custom-blue-800'
              : !expanded
                ? !isDark
                  ? 'bg-custom-grayD-200'
                  : 'bg-custom-grayD-800'
                : ''
            } ${isDark ? 'group-hover:bg-custom-grayD-600' : 'group-hover:bg-custom-blue'}`}
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
            className={`${isDark
                ? expanded
                  ? 'text-custom-whiteD'
                  : 'text-custom-grayD-500'
                : expanded
                  ? 'text-custom-whiteD'
                  : 'text-custom-blue-300'
              } ${isDark ? 'group-hover:text-custom-whiteD' : 'group-hover:text-custom-whiteD'} `}
            sx={{
              fontSize: '2rem',
              transition: 'color 0.3s ease',
            }}
          />
        </div>
      }
      {...summaryProps}
    />
  );
})(({ theme, isDark }) => ({
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
  const { questions = [], loading } = useQuestion(); 
  const [expanded, setExpanded] = useState<string | false>(false);

  const uniqueQuestions = questions.filter(
    (question, index, self) => index === self.findIndex(q => q.title === question.title)
  );

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <main
  className={`${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'} relative mx-auto flex w-[clamp(320px,92vw,1026px)] flex-col items-center justify-center gap-10 px-4 md:px-8 lg2:px-4 md:mb-[50px] lg:mb-[50px] transition-all duration-300`}
>
  <header className="w-full text-center text-[36px]">
    <h2 className="font-textFont">Todo lo que necesitas saber antes de usar SwaplyAr</h2>
  </header>

  <section className="grid gap-6 w-full">
    {loading ? (
      <SkeletonQuestions />
    ) : uniqueQuestions.length > 0 ? (
      uniqueQuestions.map((dato, index) => (
        <Accordion
          isDark={isDark}
          key={dato.id ?? index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className="group"
        >
          <AccordionSummary
            className="p-0 hover:bg-transparent"
            isDark={isDark}
            expanded={expanded === `panel${index}`}
          >
            <Typography
              className={`font-textFont text-[21px] ${isDark
                  ? expanded === `panel${index}`
                    ? 'text-custom-whiteD'
                    : 'text-[#969696]'
                  : expanded === `panel${index}`
                    ? 'text-custom-blue-800'
                    : 'text-[#969696]'
                } ${expanded === `panel${index}` ? '!font-bold' : 'font-light'}`}
              style={{ transition: 'color 0.3s ease' }}
            >
              {dato.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            className={`flex flex-col items-center justify-center ${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'
              }`}
          >
            <Typography
              className="flex w-9/10 gap-6 rounded-md p-2.5 text-left"
              style={
                isDark
                  ? { background: 'rgba(75,75,75,1)', borderRadius: '16px' }
                  : { background: 'rgb(238, 234, 227)', borderRadius: '16px' }
              }
            >
              {dato.description || dato.descripcion}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))
    ) : (
      <p className="text-center text-lg font-textFont py-6">
        No hay preguntas disponibles por el momento.
      </p>
    )}
  </section>

  <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
    <p className="font-textFont text-lg">¿Tenés más dudas?</p>

       
        <ShortButton href="/es/centro-de-ayuda/preguntas-frecuentes" text="Ir a Preguntas Frecuentes" />
      </div>
    </main>
  );
};

export default QuestionHowToUse;