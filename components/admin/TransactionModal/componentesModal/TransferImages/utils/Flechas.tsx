import * as React from 'react';

type FlechaProps = {
  styles?: string;
};

const Flecha = ({ styles }: FlechaProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <path
      fill={styles}
      d="M14.45 12 7.1 4.65a1.157 1.157 0 0 1-.363-.875c.008-.333.137-.625.388-.875.25-.25.542-.375.875-.375.333 0 .624.125.875.375l7.7 7.675c.2.2.35.425.45.675.1.25.15.5.15.75s-.05.5-.15.75c-.1.25-.25.475-.45.675l-7.7 7.7c-.25.25-.546.37-.888.363A1.253 1.253 0 0 1 7.1 21.1a1.207 1.207 0 0 1 0-1.75L14.45 12Z"
    />
  </svg>
);
export default Flecha;
