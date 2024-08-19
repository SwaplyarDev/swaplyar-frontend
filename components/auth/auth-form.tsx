// components/AuthForm.tsx
'use client';

import React from 'react';
import useStore from '@/store/store';
import { LoginForm } from './auth-form-login';
import { RegisterForm } from './auth-form-register';
import ClientWrapper from '../clientWrapper/ClientWrapper';

const AuthForm: React.FC = () => {
  const { view } = useStore();

  return (
    <ClientWrapper>
      {view === 'login' && <LoginForm />}
      {view === 'register' && <RegisterForm />}
    </ClientWrapper>
  );
};

export default AuthForm;
