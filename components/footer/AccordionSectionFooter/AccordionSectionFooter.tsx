
'use client';

import { Accordion, AccordionDetails, AccordionSummary, ClickAwayListener } from '@mui/material';
import { FooterLink } from '../FooterLink/FooterLink';
import { useState } from 'react';
import { IconAcordeon } from '@/components/ui/icon-acordeon/IconAcordeon';
import  { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
interface FooterLinkProps {
  href: string;
  label: string;
  view?: 'login' | 'register';
}

export function AccordionSection({ title, links }: { title: string; links: FooterLinkProps[] }) {
  const [expanded, setExpanded] = useState(false);
  const { isDark } = useDarkTheme();

  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Accordion
        disableGutters
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
          width: { xs: '358px', sm: '704px', lg: 'auto' },
          '&.MuiAccordion-root': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:before': {
              display: 'none',
            },
          },
          '&.MuiAccordion-root.Mui-expanded': {
            margin: 0,
          },
        }}
      >
        {/* --- Título del acordion --- */}
        <AccordionSummary
          expandIcon={<IconAcordeon sizeIcon={30} expanded={expanded} />}
          aria-controls={`${title}-content`}
          id={`${title}-header`}
          sx={{
            position: 'relative',
            minHeight: '1px !important',
            paddingY: 0,
            '& .MuiAccordionSummary-content': {
              margin: '0 !important',
            },
            '& .MuiAccordionSummary-content.Mui-expanded': {
              margin: '0 !important',
            },
            '&::after':
            {
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: { xs: '48%', sm: '50%' },
              transform: 'translateX(-50%)',
              width: { xs: '62%', sm: '75%' },
              height: '1px',
               backgroundColor: isDark ? '#EBE7E0' : '#012A8E', 
         
              transformOrigin: 'center',
    
              transition: 'opacity 0.3s ease, scale 0.3s ease, width 0.3s ease',
            }
            ,
           
          }}
          className='transition-all dark:text-[#FFFFFF]  '
        >
          <h4>{title}</h4>
        </AccordionSummary>

        {/* --- Contenido del acordeón --- */}
        <AccordionDetails
          className="flex flex-col  items-center justify-center text-center"
         sx={{padding:0 ,paddingY:0 ,paddingTop:2}}
        >
          {links.map(({ href, label, view }) => (
            <FooterLink key={href} href={href} label={label} view={view} />
          ))}
        </AccordionDetails>
      </Accordion>
    </ClickAwayListener>
  );
}
