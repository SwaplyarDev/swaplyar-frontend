import React, { FC } from 'react';

type TickProps = {
  color: string;
};

const Copy: FC<TickProps> = ({ color }) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 41 41" fill="none">
      <path
        d="M28.4193 10.083C28.4193 8.75693 27.8925 7.48516 26.9548 6.54747C26.0171 5.60979 24.7454 5.08301 23.4193 5.08301H12.5859C11.2599 5.08301 9.98809 5.60979 9.0504 6.54747C8.11272 7.48516 7.58594 8.75693 7.58594 10.083V25.9163C7.58594 27.2424 8.11272 28.5142 9.0504 29.4519C9.98809 30.3896 11.2599 30.9163 12.5859 30.9163H23.4193C24.7454 30.9163 26.0171 30.3896 26.9548 29.4519C27.8925 28.5142 28.4193 27.2424 28.4193 25.9163V10.083Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.4167 11.75V25.9167C33.4167 28.5688 32.3631 31.1124 30.4877 32.9877C28.6124 34.8631 26.0688 35.9167 23.4167 35.9167H14.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Copy;
