'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import error_404_clear from '@/public/images/clear-404.png';
import error_404_dark from '@/public/images/dark-404.png';
import post1_404 from '@/public/images/post1-404.png';
import post2_404 from '@/public/images/post2-404.png';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import styles from './Error404.module.css'; 
import { useRouter } from 'next/navigation';

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
  }, [counter, router]);  */
  

  return (
    <div className={styles.container}>
      {isDark ? (
        <>
          <div className={styles.image}>
            <Image
              src={error_404_dark}
              alt="Descripción de la imagen 1"
              width={2400}
              height={1000}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.message}>
            <p className="text-white text-3xl font-normal ">Ups..</p> 
            <p className="text-white text-3xl font-normal">La pagina no</p>
            <p className="text-white text-3xl font-normal">ha sido encontrada</p>
          </div>
          <div className={styles.redirectButton}>
            <h1 className="text-white font-bold " style={{ border: '2px solid white', borderRadius: '20px', width: '200px', height: '60px', padding: '12px'}}>Redireccion en {counter}</h1> 
          </div>
          <div className={styles.postImage1}>
            <Image
              src={post1_404}
              alt="Descripción de la imagen 1"
              width={460}
              height={380}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.postImage2}>
            <Image
              src={post2_404}
              alt="Descripción de la imagen 2"
              width={465}
              height={350}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.lineaVertical1}></div>
        </>
      ) : (
        <>
          <div className={styles.image}>
            <Image
              src={error_404_clear}
              alt="Descripción de la imagen 1"
              width={2400}
              height={1000}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.message}>
            <p className="text-black text-3xl font-normal ">Ups..</p> 
            <p className="text-black text-3xl font-normal">La pagina no</p>
            <p className="text-black text-3xl font-normal">ha sido encontrada</p>
          </div>
          <div className={styles.redirectButton}>
          <h1 className="text-black font-bold " style={{ border: '2px solid blue', borderRadius: '20px', width: '200px', height: '60px', padding: '12px'}}>Redireccion en {counter}</h1>
          </div>
          <div className={styles.postImage1}>
            <Image
              src={post1_404}
              alt="Descripción de la imagen 1"
              width={460}
              height={380}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.postImage2}>
            <Image
              src={post2_404}
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
