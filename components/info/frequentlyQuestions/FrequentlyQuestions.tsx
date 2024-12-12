'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

// Estilo del Accordion con uso de la prop `isDark`
const Accordion = styled((props: AccordionProps & { isDark: boolean }) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ isDark }) => ({
    border: 'none', // Asegura que no haya bordes extra
    borderTop: isDark ? '1px solid #ebe7e0' : '1px solid #252526', // Borde superior según el tema
    backgroundColor: 'transparent',  // Aseguramos que el fondo sea transparente
    '&:last-child': {
      borderBottom: isDark ? '1px solid #ebe7e0' : '1px solid #252526', // Borde inferior según el tema
    },
  })
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
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
          backgroundColor: '#ddd',
        }}
      >
        <ExpandMore sx={{ fontSize: '2rem', color: '#333' }} />
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
}));

const FrequentlyQuestions = () => {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const { isDark } = useDarkTheme();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded((prevExpanded) => {
      const newExpandedSet = new Set(prevExpanded);
      if (newExpanded) {
        newExpandedSet.add(panel);
      } else {
        newExpandedSet.delete(panel);
      }
      return newExpandedSet;
    });
  };

  return (
    <div className='m-14'>
      <Accordion expanded={expanded.has('panel1')} onChange={handleChange('panel1')} isDark={isDark}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography className={`${isDark ? 'text-[#ebe7e0]' : 'text-[#252526]'}`}>Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails className='flex justify-center'>
          <Typography className='bg-gray-200 p-6 rounded-md text-left w-9/10'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sitasdda amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded.has('panel2')} onChange={handleChange('panel2')} isDark={isDark}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography className={`${isDark ? 'text-[#ebe7e0]' : 'text-[#252526]'}`}>Collapsible Group Item #2</Typography>
        </AccordionSummary>
        <AccordionDetails className='flex justify-center'>
          <Typography className='bg-gray-200 p-6 rounded-md text-left w-9/10'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded.has('panel3')} onChange={handleChange('panel3')} isDark={isDark}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography className={`${isDark ? 'text-[#ebe7e0]' : 'text-[#252526]'}`}>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails className='flex justify-center'>
          <Typography className='bg-gray-200 p-6 rounded-md text-left w-9/10'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FrequentlyQuestions;
