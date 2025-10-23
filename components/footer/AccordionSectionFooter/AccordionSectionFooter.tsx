
'use client';

import { Accordion, AccordionDetails, AccordionSummary, ClickAwayListener } from '@mui/material';
import { FooterLink } from '../FooterLink/FooterLink';
import { useState } from 'react';
import { IconAcordeon } from '@/components/ui/icon-acordeon/IconAcordeon';

interface FooterLinkProps {
  href: string;
  label: string;
  view?: 'login' | 'register';
}

export function AccordionSection({ title, links }: { title: string; links: FooterLinkProps[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Accordion
        disableGutters
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
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
        {/* --- Título del acordeón --- */}
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
              backgroundColor: '#012A8E',
         
              transformOrigin: 'center',
    
              transition: 'opacity 0.3s ease, scale 0.3s ease, width 0.3s ease',
            }
            ,
            // '&::after': !expanded
            //   ? {
            //     content: '""',
            //     position: 'absolute',
            //     bottom: -5,
            //     left: { xs: '45%', sm: '55%' },
            //     transform: 'translateX(-50%)',
            //     width: { xs: '60%', sm: '75%' },
            //     height: '1px',
            //     backgroundColor: '#012A8E',
            //     opacity: expanded ? 0 : 1,
            //     transformOrigin: 'center',
            //     scale: expanded ? '0.8' : '1',
            //     transition: 'opacity 0.3s ease, scale 0.3s ease, width 0.3s ease',
            //   }
            //   : {},
          }}
          className='transition-all'
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
