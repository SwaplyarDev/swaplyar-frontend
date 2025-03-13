import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ICloudProps } from './types';
import clsx from 'clsx';

export const Cloud: React.FC<ICloudProps> = ({ classes, src, alt }: ICloudProps) => {
  return (
    <motion.div animate={{ y: ['-10px', '10px', '-10px'] }} transition={{ repeat: Infinity, duration: 2 }}>
      <Image className={clsx(classes, 'absolute')} src={src} alt={alt} width={500} height={500} priority />
    </motion.div>
  );
};

export default Cloud;
