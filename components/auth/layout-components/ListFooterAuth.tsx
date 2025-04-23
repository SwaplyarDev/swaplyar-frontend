'use client';

import { FooterLink } from '@/components/footer/FooterLink/FooterLink';

function ListFooterAuth() {
  return (
    <>
      <li>
        <FooterLink label="Terminos y Condiciones" href="/es/auth/terminos-y-condiciones/tyc-swaplyar" />
      </li>
      <li>
        <FooterLink label="Plus Rewards" href="/es/auth/terminos-y-condiciones/tyc-plus-rewards" />
      </li>
    </>
  );
}

export default ListFooterAuth;
