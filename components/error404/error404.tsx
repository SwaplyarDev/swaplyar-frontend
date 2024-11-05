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
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import { Enchufe_dark, Enchufe_clear, tlf_404_dark, tlf_404_clear, post3_404, Enchufe_dark_largo, Enchufe_clear_largo } from '@/utils/assets/img-database';
import Link from 'next/link';

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
      <AnimatedBlurredCircles tope="top-[100px]"/>
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
          <div className={styles.image_tlf}>
            <Image
              src={tlf_404_dark}
              alt="Descripción de la imagen 1"
              width={2200}
              height={1000}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.message}>
            <h1 className="font-normal text-white">Ups..</h1>
            <h1 className="font-normal text-white">La pagina no</h1>
            <h1 className="font-normal text-white">
              ha sido encontrada
            </h1>
          </div>
          <div className={styles.tlf_message}>
            <h1 className="font-normal text-white">Ups..</h1>
            <h1 className="font-normal text-white">La pagina no</h1>
            <h1 className="font-normal text-white">
              ha sido encontrada
            </h1>
          </div>
          <div className={styles.redirectButton}>
            <Link
              href="/"
              target="_blank"
              className={`relative m-1 flex h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <p>Redireccion en {counter}</p>
            </Link>
          </div>
          <div className={styles.tlf_redirectButton}>
            <Link href="/">
            <p
              className="font-bold text-black bg-white"
              style={{
                fontSize: '9px',
                textAlign: 'center',
                borderRadius: '28px',
                width: '105px',
                height: '35px',
                padding: '10px'
              }}
            >
              Redireccion en {counter}
            </p>
            </Link>
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
          <div className={styles.postImage3}>
            <Image
              src={post3_404}
              alt="Descripción de la imagen 1"
              width={1200}
              height={500}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.lineaVertical1}></div>
          <div className={styles.tlf_lineaVertical1}></div>

          <div className={styles.enchufe1}>
            <Image
              src={Enchufe_dark_largo}
              alt="Descripción de la imagen enchufe"
              width={2800}
              height={50}
            />
          </div>
          <div className={styles.tlf_enchufe1}>
            <Image
              src={Enchufe_dark}
              alt="Descripción de la imagen enchufe"
              width={400}
              height={30}
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
          <div className={styles.image_tlf}>
            <Image
              src={tlf_404_clear}
              alt="Descripción de la imagen 1"
              width={2200}
              height={1000}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className={styles.message}>
            <p className="font-normal text-black">Ups..</p>
            <p className="font-normal text-black">La pagina no</p>
            <p className="font-normal text-black">
              ha sido encontrada
            </p>
          </div>
          <div className={styles.tlf_message}>
            <h1 className="font-normal text-black">Ups..</h1>
            <h1 className="font-normal text-black">La pagina no</h1>
            <h1 className="font-normal text-black">
              ha sido encontrada
            </h1>
          </div>
          <div className={styles.redirectButton}>
            <Link
              href="/"
              target="_blank"
              className={`relative m-1 flex h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-white p-3 font-bold text-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <p>Redireccion en {counter}</p>
            </Link>
          </div>
          <div className={styles.tlf_redirectButton}>
            <Link href="/">
            <p
              className="font-bold text-blue-950"
              style={{
                border: '1.5px solid blue',
                fontSize: '10px',
                textAlign: 'center',
                borderRadius: '28px',
                width: '115px',
                height: '42px',
                padding: '10px'
              }}
            >
              Redireccion en {counter}
            </p>
            </Link>
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
          <div className={styles.postImage3}>
            <Image
              src={post3_404}
              alt="Descripción de la imagen 1"
              width={1200}
              height={500}
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className={styles.lineaVertical2}></div>
          <div className={styles.tlf_lineaVertical2}></div>

          <div className={styles.enchufe2}>
            <Image
              src={Enchufe_clear_largo}
              alt="Descripción de la imagen enchufe"
              width={2800}
              height={50}
            />
          </div>
          <div className={styles.tlf_enchufe2}>
            <Image
              src={Enchufe_clear}
              alt="Descripción de la imagen enchufe"
              width={400}
              height={30}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Error_404;