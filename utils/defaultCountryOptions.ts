const defaultCountryOptions = [
  {
    value: 'AR',
    label: '+54 (AR)',
    callingCode: '+54',
    country: 'Argentina',
  },
  {
    callingCode: '+52',
    country: 'Mexico',
    label: '+52 (MX)',
    value: 'MX',
  },
  {
    callingCode: '+51',
    country: 'Peru',
    label: '+51 (PE)',
    value: 'PE',
  },
  {
    callingCode: '+57',
    country: 'Colombia',
    label: '+57 (CO)',
    value: 'CO',
  },
  {
    callingCode: '+1787',
    country: 'Puerto Rico',
    label: '+1787 (PR)',
    value: 'PR',
  },
  {
    callingCode: '+1809',
    country: 'Dominican Republic',
    label: '+1809 (DO)',
    value: 'DO',
  },
  {
    callingCode: '+595',
    country: 'Paraguay',
    label: '+595 (PY)',
    value: 'PY',
  },
  {
    callingCode: '+503',
    country: 'El Salvador',
    label: '+503 (SV)',
    value: 'SV',
  },
  {
    callingCode: '+53',
    country: 'Cuba',
    label: '+53 (CU)',
    value: 'CU',
  },
  {
    callingCode: '+34',
    country: 'Spain',
    label: '+34 (ES)',
    value: 'ES',
  },
  {
    callingCode: '+506',
    country: 'Costa Rica',
    label: '+506 (CR)',
    value: 'CR',
  },
  {
    callingCode: '+598',
    country: 'Uruguay',
    label: '+598 (UY)',
    value: 'UY',
  },
  {
    callingCode: '+507',
    country: 'Panama',
    label: '+507 (PA)',
    value: 'PA',
  },
  {
    callingCode: '+591',
    country: 'Bolivia',
    label: '+591 (BO)',
    value: 'BO',
  },
  {
    callingCode: '+56',
    country: 'Chile',
    label: '+56 (CL)',
    value: 'CL',
  },
  {
    callingCode: '+1201',
    country: 'United States',
    label: '+1201 (US)',
    value: 'US',
  },
  {
    callingCode: '+502',
    country: 'Guatemala',
    label: '+502 (GT)',
    value: 'GT',
  },
  {
    callingCode: '+593',
    country: 'Ecuador',
    label: '+593 (EC)',
    value: 'EC',
  },
  {
    callingCode: '+55',
    country: 'Brazil',
    label: '+55 (BR)',
    value: 'BR',
  },
  {
    callingCode: '+58',
    country: 'Venezuela',
    label: '+58 (VE)',
    value: 'VE',
  },
  {
    callingCode: '+351',
    country: 'Portugal',
    label: '+351 (PT)',
    value: 'PT',
  },
  {
    callingCode: '+593',
    country: 'Ecuador',
    label: '+593 (EC)',
    value: 'EC',
  },
];

const defaultCountryValues = defaultCountryOptions.map((option) => ({
  value: option.value,
  label: option.value,
  callingCode: option.callingCode,
  country: option.country,
}));

export { defaultCountryOptions, defaultCountryValues };
