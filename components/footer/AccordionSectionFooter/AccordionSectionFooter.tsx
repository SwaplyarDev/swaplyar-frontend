'use client';

import { Accordion, AccordionDetails, AccordionSummary, ClickAwayListener } from '@mui/material';
import { FooterLink } from '../FooterLink/FooterLink';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

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
        className="accordion-custom"
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
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              className={`accordion-icon duration-600 transition-all ${expanded ? 'accordion-icon-expanded' : ''}`}
            />
          }
          aria-controls={`${title}-content`}
          id={`${title}-header`}
          className="accordion-summary"
          sx={{
            minHeight: '40px !important',
            padding: 0,
            '& .MuiAccordionSummary-content': {
              margin: '0 !important',
            },
            '& .MuiAccordionSummary-content.Mui-expanded': {
              margin: '0 !important',
            },
          }}
        >
          <h4 className={`accordion-title duration-600 transition-all ${expanded ? 'accordion-title-expanded' : ''}`}>
            {title}
          </h4>
        </AccordionSummary>
        <AccordionDetails
          className="flex flex-col items-center text-center"
          sx={{
            paddingBottom: '10px',
          }}
        >
          {links.map(({ href, label, view }) => (
            <FooterLink key={href} href={href} label={label} view={view} />
          ))}
        </AccordionDetails>
      </Accordion>
    </ClickAwayListener>
  );
}
