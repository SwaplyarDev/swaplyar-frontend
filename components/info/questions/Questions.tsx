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
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
//C:\Users\Administrator\swaplyar-frontend\components\info\questions\Questions.tsx
//C:\Users\Administrator\swaplyar-frontend\public\images

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
  '&:last-child': {
    borderBottom: isDark ? '1px solid #ebe7e0' : '1px solid #012c8a',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps & { isDark: boolean; expanded: boolean }) => (
  <MuiAccordionSummary
    expandIcon={
      <div
        className={`${props.isDark ? 'bg-[rgba(75,75,75,1)]' : 'bg-[rgb(225,225,225)]'} ${props.expanded && props.isDark ? 'bg-custom-gray' : props.expanded ? 'bg-custom-blue' : ''} font-bold ${props.isDark ? 'group-hover:bg-custom-gray' : 'group-hover:bg-custom-blue'}`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          width: '40px',
          height: '40px',

          transition: 'background-color 0.3s ease',
        }}
      >
        <ExpandMore
          className={` ${props.expanded || props.isDark ? 'text-white' : 'text-[rgb(144,176,254)]'} group-hover:text-white`}
          sx={{
            fontSize: '2rem',
            color: 'rgb(244,176,254)',

            transition: 'color 0.3s ease',
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
      color: isDark ? '#f5f5f5' : 'rgb(1,42,141)',
      fontWeight: '600',
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
    <main className="relative flex w-full flex-col items-center justify-center">
      <AnimatedBlurredCircles tope={'top-[20px]'} />

      <header className={`mt-10 text-left text-center text-4xl ${isDark ? 'text-gray-100' : 'text-slate-800'}`}>
        <p className="font-semibold">Preguntas Frecuentes</p>
      </header>

      <section className="grid max-w-[716px] gap-6 py-12" style={{ marginInline: currentMargin }}>
        {questions.map((dato, index) => (
          <Accordion
            isDark={isDark}
            key={dato.question_id}
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
                className={`} text-xl ${isDark ? 'text-[#ebe7e0]' : 'text-[#252526]'} ${isDark && expanded === `panel${index}` ? 'font-semibold' : 'font-normal'} ${!isDark && expanded === `panel${index}` ? 'font-semibold text-[rgb(1,42,141)]' : 'font-normal'} `}
              >
                {dato.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col items-center justify-center">
              <Typography
                className={`flex w-9/10 gap-6 rounded-md p-2.5 text-left${isDark ? 'bg-graytyc text-gray-100' : 'bg-gray-100 text-gray-900'}`}
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
      <section className="mt-10 h-auto w-full">
        <FlyerTrabajo imageSrc={BannerQuestions.src}>
          <></>
        </FlyerTrabajo>{' '}
      </section>
    </main>
  );
};

export default FrequentlyQuestions;
