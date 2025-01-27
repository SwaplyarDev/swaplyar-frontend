// app/components/FlyerTrabajo.tsx

interface FlyerTrabajoProps {
  children: React.ReactNode;
  imageSrc: string;
}

export default function FlyerTrabajo({ children, imageSrc }: FlyerTrabajoProps) {
  const isExternalImage = imageSrc.startsWith('http') || imageSrc.startsWith('https');
  const backgroundImage = `url(${imageSrc})`;

  return (
    <div className={`relative -mt-10 mb-7 h-[272px] w-full bg-cover bg-center bg-repeat`} style={{ backgroundImage }}>
      <div className="absolute bottom-0 flex w-full justify-center bg-black bg-opacity-30">
        <div className="p-6 text-center text-darkText">
          <h3 className="text-2xl font-semibold">{children}</h3>
        </div>
      </div>
    </div>
  );
}
