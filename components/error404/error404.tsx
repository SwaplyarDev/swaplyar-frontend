'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import styles from '@/components/error404/error404.module.css';
import { useRouter } from 'next/navigation';
import { Error_404_clear } from '@/utils/assets/img-database';
import { Error_404_dark } from '@/utils/assets/img-database';
import { Post1_404 } from '@/utils/assets/img-database';
import { Post2_404 } from '@/utils/assets/img-database';
import { Enchufe_dark, Enchufe_clear } from '@/utils/assets/img-database';

const Error_404 = () => {
  const { isDark } = useDarkTheme();
  const [counter, setCounter] = useState(10);
  const router = useRouter();

/*   useEffect(() => {
    
    if (counter === 0) {
      router.push('/'); 
      return; 
    }

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, router]); */

  return (
    <div className={styles.container} style={{marginBottom: '80px'}}>
      {isDark ? (
        <>
          <div className={styles.image}>
            <Image
              src={Error_404_dark}
              alt="Descripción de la imagen 1"
              width={2400}
              height={1000}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.message}>
            <h1 className="text-3xl font-normal text-white">Ups..</h1>
            <h1 className="text-3xl font-normal text-white">La pagina no</h1>
            <h1 className="text-3xl font-normal text-white">
              ha sido encontrada
            </h1>
          </div>
          <div className={styles.redirectButton}>
            <h2
              className="font-bold text-white"
              style={{
                border: '2px solid white',
                borderRadius: '20px',
                width: '200px',
                height: '60px',
                padding: '12px',
              }}
            >
              Redireccion en {counter}
            </h2>
          </div>
          <div className={styles.postImage1}>
            <Image
              src={Post1_404}
              alt="Descripción de la imagen 1"
              width={460}
              height={380}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.postImage2}>
            <Image
              src={Post2_404}
              alt="Descripción de la imagen 2"
              width={465}
              height={350}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.lineaVertical1}></div>

          <div className={styles.enchufe}>
            <Image
              src={Enchufe_dark}
              alt="Descripción de la imagen enchufe"
              width={1600}
              height={50}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.image}>
            <Image
              src={Error_404_clear}
              alt="Descripción de la imagen 1"
              width={2400}
              height={1000}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.message}>
            <p className="text-3xl font-normal text-black">Ups..</p>
            <p className="text-3xl font-normal text-black">La pagina no</p>
            <p className="text-3xl font-normal text-black">
              ha sido encontrada
            </p>
          </div>
          <div className={styles.redirectButton}>
            <h1
              className="font-bold text-black"
              style={{
                border: '2px solid blue',
                borderRadius: '20px',
                width: '200px',
                height: '60px',
                padding: '12px',
              }}
            >
              Redireccion en {counter}
            </h1>
          </div>
          <div className={styles.postImage1}>
            <Image
              src={Post1_404}
              alt="Descripción de la imagen 1"
              width={460}
              height={380}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.postImage2}>
            <Image
              src={Post2_404}
              alt="Descripción de la imagen 2"
              width={465}
              height={350}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.lineaVertical2}></div>
        </>
      )}
    </div>
  );
};

export default Error_404;