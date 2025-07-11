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
        className="before:contante-[''] duration-600 after:duration-600 group relative !bg-transparent shadow-none transition-all before:absolute before:w-0 after:absolute after:bottom-0 after:left-[50%] after:h-[1px] after:w-[70%] after:min-w-[204px] after:-translate-x-[50%] after:bg-buttonExpandDark after:transition-all after:content-[''] after:active:bg-buttonsLigth dark:after:active:bg-buttonExpandDark after:[&.Mui-expanded]:bg-buttonsLigth dark:after:[&.Mui-expanded]:bg-buttonExpandDark"
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon className="duration-600 group-[&.Mui-expanded]:rotate-360 h-10 w-10 text-buttonsExtraLigth transition-all group-active:text-buttonsLigth group-[&.Mui-expanded]:text-buttonsLigth dark:text-buttonExpandDark dark:group-active:text-buttonExpandDark dark:group-[&.Mui-expanded]:text-buttonExpandDark" />
          }
          aria-controls={`${title}-content`}
          id={`${title}-header`}
          className="group min-h-10 !bg-transparent px-0"
          sx={{
            minHeight: '0!important',
            '& .MuiAccordionSummary-content': {
              margin: '0!important',
            },
          }}
        >
          <h4 className="text-xl font-light text-lightText transition-all group-active:font-semibold group-[&.Mui-expanded]:font-semibold dark:text-darkText">
            {title}
          </h4>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col items-center text-center">
          {links.map(({ href, label, view }) => (
            <FooterLink key={href} href={href} label={label} view={view} />
          ))}
        </AccordionDetails>
      </Accordion>
    </ClickAwayListener>
  );
}
