'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';
import { FooterLink } from '@/components/footer/FooterLink/FooterLink';

function ListFooterAuth() {
  return (
    <>
      <li>
        <FooterLink label="Terminos y Condiciones" href="/es/terminos-y-condiciones/tyc-swaplyar" />
      </li>
      <li>
        <FooterLink label="Plus Rewards" href="/es/terminos-y-condiciones/tyc-plus-rewards" />
      </li>
    </>
  );
}

export default ListFooterAuth;
