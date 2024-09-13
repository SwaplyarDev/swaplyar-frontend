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
  const { view } = useStore();

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
      <section className='flex flex-col items-center'>
        <div className="h-screen w-[512px]">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper; 
              swiper.slideTo(view === 'login' ? 0 : 1);
            }}
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
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

