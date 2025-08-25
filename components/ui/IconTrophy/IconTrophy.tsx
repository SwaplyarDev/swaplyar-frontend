import * as React from 'react';

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const SVGComponent: React.FC<SVGComponentProps> = (props) => (
  <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_5784_20795)">
      <path
        d="M22.4 0V4.20001H28C27.9618 7.57926 27.4308 9.96239 26.4072 11.3494L26.25 11.55C25.4271 12.5375 24.0224 13.2395 22.0359 13.6558C21.1178 16.6621 18.559 18.9527 15.403 19.4834C15.4004 19.5212 15.4 19.5605 15.4 19.6C15.4 22.6928 17.9072 25.2 21 25.2V28H6.99997V25.2C10.0927 25.2 12.6 22.6928 12.6 19.6L12.597 19.4834C9.44096 18.9527 6.88217 16.6621 5.96453 13.6555C3.97767 13.2394 2.57281 12.5376 1.74996 11.55C0.623482 10.1982 0.0401626 7.74818 0 4.20001H5.59999V0H22.4ZM14 2.79996L12.3816 6.64717L8.40001 7.07839L11.3848 9.87842L10.5392 14L14 11.8832L17.4608 14L16.6152 9.88399L19.6 7.08397L15.6184 6.65281L14 2.79996ZM5.59999 6.99997H2.99316L3.02355 7.20157C3.2031 8.35079 3.47859 9.16619 3.80941 9.63751L3.90102 9.75747C4.15932 10.0675 4.64488 10.3594 5.36426 10.6047L5.59999 10.6792V6.99997ZM25.0068 6.99997H22.4V10.6792L22.6357 10.6047C23.3551 10.3594 23.8406 10.0675 24.099 9.75747L24.1905 9.63751C24.5214 9.16619 24.7969 8.35079 24.9764 7.20157L25.0068 6.99997Z"
        fill="url(#paint0_linear_5784_20795)"
      />
    </g>
    <defs>
      <linearGradient id="paint0_linear_5784_20795" x1={14} y1={0} x2={14} y2={28} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCC21B" />
        <stop offset={1} stopColor="#F79329" />
      </linearGradient>
      <clipPath id="clip0_5784_20795">
        <rect width={28} height={28} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export { SVGComponent as IconTrophy };
