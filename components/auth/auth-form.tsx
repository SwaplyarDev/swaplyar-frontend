'use client';


import React, { useState } from 'react';
import { LoginForm } from './auth-form-login';
import { RegisterForm } from './auth-form-register';
import ClientWrapper from '../clientWrapper/ClientWrapper';
import useStore from '@/store/authViewStore';

const AuthForm = () => {
  const { view } = useStore();

  return (
    <>
      <ClientWrapper>
        {view === 'login' && <LoginForm />}
        {view === 'register' && <RegisterForm />}
      </ClientWrapper>
    </>
  );
};

export default AuthForm;
