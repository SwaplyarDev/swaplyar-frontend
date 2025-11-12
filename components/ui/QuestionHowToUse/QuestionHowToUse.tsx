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
import ShortButton from '../NewButtons/ShortButton';
import useQuestion from '@/components/ui/top-menu/UseQuestion/useQuestion';
import SkeletonQuestions from '@/components/ui/SkeletonQuestions/SkeletonQuestions';
// ...existing code...

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

// ...existing styled components...

const QuestionHowToUse = () => {
  const { isDark } = useDarkTheme();
  const { questions = [], loading } = useQuestion(); // <-- usa el hook para pedir preguntas
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // opcional: eliminar duplicados por título o id
  const uniqueQuestions = Array.isArray(questions)
    ? questions.filter((q, i, self) => i === self.findIndex(x => (x.id ?? x.title) === (q.id ?? q.title)))
    : [];

  return (
    <main
      className={`${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'} relative flex w-full max-w-[538px] flex-col items-center justify-center gap-10 lg2:max-w-[872px]`}
    >
      <header className={'w-full text-center text-[36px] lg2:text-left'}>
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
                className={`p-0 hover:bg-transparent`}
                isDark={isDark}
                expanded={expanded === `panel${index}`}
              >
                <Typography
                  className={`font-textFont text-[21px] ${isDark
                      ? 'text-custom-whiteD'
                      : expanded === `panel${index}`
                        ? 'text-custom-blue-800'
                        : 'text-custom-grayD'
                    } ${expanded === `panel${index}` ? '!font-bold' : 'font-light'}`}
                >
                  {dato.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                className={`flex flex-col items-center justify-center ${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'}`}
              >
                <Typography
                  className={`flex w-full gap-6 rounded-md p-2.5 text-left`}
                  style={
                    isDark
                      ? { background: 'rgba(75,75,75,1)', borderRadius: '16px' }
                      : { background: 'rgb(238, 234, 227)', borderRadius: '16px' }
                  }
                >
                  {dato.descripcion ?? dato.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <p className="text-center text-lg font-textFont py-6">No hay preguntas disponibles por el momento.</p>
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