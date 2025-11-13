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
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import SkeletonQuestions from '@/components/ui/SkeletonQuestions/SkeletonQuestions';
import { BannerQuestions } from '@/utils/assets/imgDatabaseCloudinary';

const Accordion = styled((props: AccordionProps & { isDark: boolean }) => {
  const { expanded, ...accordionProps } = props;
  return <MuiAccordion disableGutters elevation={0} square {...accordionProps} />;
})(({ isDark }) => ({
  border: 'none',
  background: 'transparent',
  position: 'relative',
  '&::before': {
    content: 'none',
    border: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 'clamp(50px, 12vw, 60px)',
    height: '1px',
    backgroundColor: isDark ? '#ffffff' : '#012c8a',
  },
  // Ensure child Summary hover doesn't turn white due to external styles
  '& .MuiAccordionSummary-root:hover': {
    backgroundColor: isDark ? '#333 !important' : '#f5f5f5 !important',
  },
  '& .MuiButtonBase-root.MuiAccordionSummary-root:hover': {
    backgroundColor: isDark ? '#333 !important' : '#f5f5f5 !important',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps & { $expanded: boolean }) => {
  const { $expanded, ...summaryProps } = props;
  return (
    <MuiAccordionSummary
      expandIcon={
        <div
          className={`${
            $expanded ? 'bg-custom-grayD-600' : 'bg-custom-grayD-200'
          }`}
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
            className={`${
              $expanded ? 'text-custom-whiteD' : 'text-custom-grayD-500'
            }`}
            sx={{
              fontSize: '2rem',
              transition: 'color 0.3s ease',
              borderRadius: '100%',
            }}
          />
        </div>
      }
      {...summaryProps}
    />
  );
})(({ theme }) => ({
  border: 'none',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(0),
  },
  '&&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#333 !important' : '#f5f5f5 !important',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: 'none',
}));

const FrequentlyQuestions = () => {
  const { questions = [] } = useQuestion({ force: true, path: '/questions', minCount: 11, scope: 'faq' });
  const { isDark } = useDarkTheme();
  

  const uniqueQuestions = Array.isArray(questions)
    ? questions.filter((q, i, self) =>
        i ===
        self.findIndex(
          (x) =>
            String(x.id) === String(q.id) ||
            (typeof x.title === 'string' && typeof q.title === 'string' && x.title.trim().toLowerCase() === q.title.trim().toLowerCase())
        )
      )
    : [];

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <main
      className={`${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'} relative flex w-full flex-col items-center justify-center`}
    >
      <AnimatedBlurredCircles tope={'top-[20px]'} />

      <header className={'mb-10 mt-10 text-center text-4xl lg:mt-20'}>
        <p className="font-titleFont font-medium md:text-[38px] lg:text-[40px]">Preguntas Frecuentes</p>
      </header>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-24">
        {uniqueQuestions.length > 0 ? (
          uniqueQuestions.map((dato, index) => (
            <Accordion
              key={dato.id}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              className="group"
              isDark={isDark}
            >
              <AccordionSummary
                className={`p-0`}
                $expanded={expanded === `panel${index}`}
              >
                <Typography
                  className={`text-xl ${
                    isDark
                      ? 'text-custom-whiteD'
                      : expanded === `panel${index}` 
                      ? 'text-custom-blue-800'
                      : 'text-custom-grayD'
                  } ${expanded === `panel${index}` ? 'font-semibold' : 'font-normal'}`}
                >
                  {dato.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                className={`flex flex-col items-center justify-center ${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'}`}
              >
                <Typography
                  className={`flex w-full gap-6 rounded-md p-2.5 text-left`}
                  style={{
                    background: isDark ? 'rgba(75,75,75,1)' : 'rgb(238, 234, 227)',
                    borderRadius: '16px',
                  }}
                >
                  {dato.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <SkeletonQuestions />
        )}
      </section>
      <section className="hidden h-auto w-full md:block">
        <FlyerTrabajo href="" imageSrc={BannerQuestions} />
      </section>
    </main>
  );
};

export default FrequentlyQuestions;