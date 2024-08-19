'use client';

import useStore from '@/store/store';
import React, { useState } from 'react'
import { LoginForm } from './auth-form-login';
import { RegisterForm } from './auth-form-register';

const AuthForm = () => {
    const { view } = useStore();

  return (
    <>
        {view === 'login' && <LoginForm />}
        {view === 'register' && <RegisterForm />}
    </>
  )
}

export default AuthForm