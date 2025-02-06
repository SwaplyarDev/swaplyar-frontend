interface InfoBoxProps {
  title: string;
  value: string | number;
  width?: string; // Permite personalizar el ancho
}

const InfoBox = ({ title, value, width = 'w-[262px]' }: InfoBoxProps) => {
  return (
    <div className={`flex h-[81px] ${width} flex-col items-center justify-center gap-1`}>
      <div className="flex items-center justify-center gap-2.5 self-stretch px-2.5">
        <div className="shrink grow basis-0 text-xs font-normal leading-none text-[#252526]">{title}</div>
      </div>
      <div className="flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white py-2 pl-[9px] pr-2.5">
        <div className="shrink grow basis-0 text-base font-normal leading-none text-[#252526]">{value}</div>
      </div>
    </div>
  );
};

export default InfoBox;
