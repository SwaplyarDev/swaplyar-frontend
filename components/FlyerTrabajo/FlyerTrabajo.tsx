// app/components/FlyerTrabajo.tsx

interface FlyerTrabajoProps {
  children: React.ReactNode;
  imageSrc: string;
}

export default function FlyerTrabajo({
  children,
  imageSrc,
}: FlyerTrabajoProps) {
  const isExternalImage =
    imageSrc.startsWith('http') || imageSrc.startsWith('https');
  const backgroundImage = `url(${imageSrc})`;

  return (
    <div
<<<<<<< HEAD
      className={`relative w-full mb-7 bg-no-repeat bg-center bg-cover -mt-10 h-60 md:h- `}
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-2xl sm:text-3xl" >
            {children}
          </h1>
=======
      className={`relative -mt-10 mb-7 h-60 w-full bg-cover bg-center bg-no-repeat md:h-80`}
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="p-6 text-center text-white">
          <h1 className="text-2xl font-semibold">{children}</h1>
>>>>>>> 655db1fd43bfb505ce8e28322c88b1d7913564ab
        </div>
      </div>
    </div>
  );
}
