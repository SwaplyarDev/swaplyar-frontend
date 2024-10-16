'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import error_404_clear from '@/public/images/clear-404.png';
import error_404_dark from '@/public/images/dark-404.png';
import post1_404 from '@/public/images/post1-404.png';
import post2_404 from '@/public/images/post2-404.png';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useRouter } from 'next/navigation';
import { fontGrid } from '@mui/material/styles/cssUtils';

const Error_404 = () => {
  const { isDark } = useDarkTheme();
  const [counter, setCounter] = useState(10); 
  const router = useRouter();

  useEffect(() => {
    
    if (counter === 0) {
      router.push('/'); 
      return; 
    }

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, router]);

  return (
    <div style={{ textAlign: 'center', padding: '10px', height: '750px', marginBottom: '50px'}}>

        {isDark ? (
          <>
            <div
              style={{
                position: 'relative',
                top: 'calc(50% - 90px)',
                left: 'calc(50% - 30px)',
                transform: 'translate(-50%, -50%)',
                width: '1350px',
                height: '680px'
              }}
            >
              <Image
                src={error_404_dark}
                alt="Descripción de la imagen 1"
                width={2400}
                height={1000}
                style={{ borderRadius: '8px'}}
              />
            </div>
            
            <div
                style={{
                  position: 'relative',
                  width: '310px',
                  padding: '10px',
                  textAlign: 'left',
                  top: 'calc(50% + -590px)',
                  left: 'calc(50% - 450px)',
                  
                }}
              >
                <p className="text-white text-3xl font-normal ">Ups..</p> 
                <p className="text-white text-3xl font-normal">La pagina no</p>
                <p className="text-white text-3xl font-normal">ha sido encontrada</p>
            </div>
            
            <div
              style={{
                position: 'relative',
                top: 'calc(50% + -555px)',
                left: 'calc(50% - 330px)',
                transform: 'translate(-50%, -50%)',
                border: '2px solid white',
                borderRadius: '35px',
                width: '180px',
                height: '70px',
                padding: '20px',
                textAlign: 'center',
                
              }}
            >
              <h1 className="text-white font-bold ">Redireccion en {counter}</h1> 
            </div>

            <div
              
              style={{
                  position: 'relative',
                  transform: 'translate(-50%, -50%)',
                  width: '420px',
                  //background: 'blue',
                  top: 'calc(50% - 810px)',
                  left: 'calc(50% - -109px)',
              }}
                
              
            >
              <Image
                src={post1_404}
                alt="Descripción de la imagen 1"
                width={415}
                height={380}
                style={{ borderRadius: '8px' }}
              />
            </div>

            <div
              style={{
                position: 'relative',
                top: 'calc(50% + -1180px)',
                left: 'calc(50% + 350px)',
                transform: 'translate(-50%, -50%)',
                //background: 'black',
                width: '420px'
              }}
            >
              <Image
                src={post2_404}
                alt="Descripción de la imagen 2"
                width={380}
                height={350}
                style={{ borderRadius: '8px' }}
              />
            </div>

            <div 
              style={{ 
                background: 'white', height: '170px', width: '3.5px', position:'relative', top: 'calc(50% + -1570px)', left: 'calc(50% - 448px)', border: '2px solid white',
                borderRadius: '35px',
              }}>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                position: 'relative',
                top: 'calc(50% - 90px)',
                left: 'calc(50% - 30px)',
                transform: 'translate(-50%, -50%)',
                width: '1350px',
                height: '680px'
              }}
            >
              <Image
                src={error_404_clear}
                alt="Descripción de la imagen 1"
                width={2400}
                height={1000}
                style={{ borderRadius: '8px'}}
              />
            </div>
            
            <div
                style={{
                  position: 'relative',
                  width: '310px',
                  padding: '10px',
                  textAlign: 'left',
                  top: 'calc(50% + -590px)',
                  left: 'calc(50% - 450px)',
                  
                }}
              >
                <p className="text-black text-3xl font-normal ">Ups..</p> 
                <p className="text-black text-3xl font-normal">La pagina no</p>
                <p className="text-black text-3xl font-normal">ha sido encontrada</p>
            </div>
            
            <div
              style={{
                position: 'relative',
                top: 'calc(50% + -555px)',
                left: 'calc(50% - 330px)',
                transform: 'translate(-50%, -50%)',
                border: '2px solid blue',
                borderRadius: '35px',
                width: '180px',
                height: '70px',
                padding: '20px',
                textAlign: 'center',
                
              }}
            >
              <h1 className="text-black font-bold ">Redireccion en {counter}</h1> 
            </div>

            <div
              
              style={{
                  position: 'relative',
                  transform: 'translate(-50%, -50%)',
                  width: '420px',
                  //background: 'blue',
                  top: 'calc(50% - 810px)',
                  left: 'calc(50% - -109px)',
              }}
                
              
            >
              <Image
                src={post1_404}
                alt="Descripción de la imagen 1"
                width={415}
                height={380}
                style={{ borderRadius: '8px' }}
              />
            </div>

            <div
              style={{
                position: 'relative',
                top: 'calc(50% + -1180px)',
                left: 'calc(50% + 350px)',
                transform: 'translate(-50%, -50%)',
                //background: 'black',
                width: '420px'
              }}
            >
              <Image
                src={post2_404}
                alt="Descripción de la imagen 2"
                width={380}
                height={350}
                style={{ borderRadius: '8px' }}
              />
            </div>

            <div 
              style={{ 
                background: 'blue', height: '170px', width: '3.5px', position:'relative', top: 'calc(50% + -1570px)', left: 'calc(50% - 448px)', border: '2px solid blue',
                borderRadius: '35px',
              }}>
            </div>
          </>
        )}
    </div>
    
  );
};

export default Error_404;
