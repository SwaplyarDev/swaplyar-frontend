// components/AuthForm.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LoginForm } from './auth-form-login';
import { RegisterForm } from './auth-form-register';
import ClientWrapper from '../clientWrapper/ClientWrapper';
import useStore from '@/store/authViewStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper as SwiperType } from 'swiper/types';

const AuthForm: React.FC = () => {
  const { view, setView } = useStore();

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(view === 'login' ? 0 : 1);    
    }
  }, [view]);

  console.log(view);
  console.log(swiperRef.current);

  return (
    <ClientWrapper>
      <section className='h-full min-h-screen flex flex-col items-center py-5'>
        <div className=" max-w-[552px] w-full hover:cursor-grab active:cursor-grabbing px-5">
        <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper; 
              swiper.slideTo(view === 'login' ? 0 : 1);
            }}
            onSlideChange={(swiper) => {
              setView(swiper.activeIndex === 0 ? 'login' : 'register');
            }}
            spaceBetween={50}
            slidesPerView={1}
          >
            <SwiperSlide>
              <LoginForm />
            </SwiperSlide>
            <SwiperSlide>
              <RegisterForm />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </ClientWrapper>
  );
};

export default AuthForm;

