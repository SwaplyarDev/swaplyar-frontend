'use client';
import React from 'react';
import CardBlue from '@/app/es/swaplyAr-plus-rewards/Cards/CardBlue';
import CardYellow from '@/app/es/swaplyAr-plus-rewards/Cards/CardYellow';

interface CardProps {
  user: boolean;
  memberCode: string;
}

export const Cards: React.FC<CardProps> = ({ user, memberCode }) => {
  return <div>{user ? <CardBlue memberCode={memberCode} /> : <CardYellow />}</div>;
};
