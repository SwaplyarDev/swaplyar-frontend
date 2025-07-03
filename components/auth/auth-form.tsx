// components/AuthForm.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { LoginForm } from './auth-form-login';
import { RegisterForm } from './auth-form-register';
import useStore from '@/store/authViewStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper as SwiperType } from 'swiper/types';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';

const AuthForm: React.FC = () => {
  const { view, setView } = useStore();

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(view === 'login' ? 0 : 1);
    }
  }, [view]);

  return (
    <>
      <AnimatedBlurredCircles tope="top-[124px]" />
      <section className="flex min-h-screen flex-col items-center justify-center py-5">
        <div className="w-full max-w-[552px] px-5 hover:cursor-grab active:cursor-grabbing">
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
    </>
  );
};

export default AuthForm;
