import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  ClickAwayListener,
} from '@mui/material';
import { FooterLink } from '../FooterLink/FooterLink';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

interface FooterLinkProps {
  href: string;
  label: string;
  view?: 'login' | 'register';
}

const CustomAccordion = styled(MuiAccordion)(() => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  position: 'relative',
  margin: 0,
  padding: 0,
  '&::before': {
    display: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    height: '1px',
    width: '70%',
    minWidth: '204px',
    transform: 'translateX(-50%)',
    backgroundColor: '#90B0FE',
    transition: 'all 0.6s',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
}));

const CustomAccordionSummary = styled(MuiAccordionSummary)(() => ({
  backgroundColor: 'transparent',
  padding: 0,
  paddingBottom: '4px',
  margin: 0,
  minHeight: '40px',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    padding: 0,
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    padding: 0,
    margin: 0,
  },
}));

const CustomAccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
  paddingBottom: '4px',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

export function AccordionSection({ title, links }: { title: string; links: FooterLinkProps[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <CustomAccordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <CustomAccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                width: 40,
                height: 40,
                fontSize: 40,
                transition: 'all 0.6s',
                color: '#2A68FE',
                '&.Mui-expanded': {
                  transform: 'rotate(180deg)',
                  color: '#012A8E',
                },
              }}
            />
          }
          aria-controls={`${title}-content`}
          id={`${title}-header`}
        >
          <h4
            style={{
              fontSize: '1.25rem',
              fontWeight: expanded ? 600 : 300,
              color: '#252526',
              lineHeight: '1.75rem',
              transition: 'all 0.6s',
              margin: 0,
              padding: 0,
            }}
          >
            {title}
          </h4>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          {links.map(({ href, label, view }) => (
            <FooterLink key={href} href={href} label={label} view={view} />
          ))}
        </CustomAccordionDetails>
      </CustomAccordion>
    </ClickAwayListener>
  );
}
