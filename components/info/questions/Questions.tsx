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
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import SkeletonQuestions from '@/components/ui/SkeletonQuestions/SkeletonQuestions';
import { BannerQuestions } from '@/utils/assets/imgDatabaseCloudinary';

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
    <main
      className={`${isDark ? 'text-custom-whiteD' : 'text-custom-grayD'}relative flex w-full flex-col items-center justify-center`}
    >
      <AnimatedBlurredCircles tope={'top-[20px]'} />

      <header className={'mb-10 mt-10 text-center text-4xl lg:mt-20'}>
        <p className="font-titleFont font-medium md:text-[38px] lg:text-[40px]">Preguntas Frecuentes</p>
      </header>

      <section
        className={`grid max-w-[716px] gap-6 py-12 ${questions.length < 1 ? 'w-full' : ''}`}
        style={{ marginInline: currentMargin }}
      >
        {questions.length > 1 ? (
          questions.map((dato, index) => (
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
          ))
        ) : (
          <div>
            <SkeletonQuestions />
          </div>
        )}
      </section>
      <section className="mt-10 h-auto w-full">
        <FlyerTrabajo href="" imageSrc={BannerQuestions} />
      </section>
    </main>
  );
};

export default FrequentlyQuestions;
