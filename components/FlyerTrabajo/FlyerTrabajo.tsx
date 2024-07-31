// app/components/FlyerTrabajo.tsx

interface FlyerTrabajoProps {
  children: React.ReactNode;
  imageSrc: string;
}

export default function FlyerTrabajo({ children, imageSrc }: FlyerTrabajoProps) {
  const isExternalImage = imageSrc.startsWith('http') || imageSrc.startsWith('https');
  const backgroundImage = `url(${imageSrc})`;

  return (
    <div
      className={`relative w-full mb-7 bg-no-repeat bg-center bg-cover -mt-10 h-60 md:h-80`}
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-2xl font-semibold">
            {children}
          </h1>
        </div>
      </div>
    </div>
  );
}
