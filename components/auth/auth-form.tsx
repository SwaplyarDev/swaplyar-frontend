'use client';

import useStore from '@/store/store';
import React, { useState } from 'react';
import { LoginForm } from './auth-form-login';
import { RegisterForm } from './auth-form-register';
import ClientWrapper from '../clientWrapper/ClientWrapper';

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
