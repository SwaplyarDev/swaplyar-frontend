'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useStepperStore } from '@/store/stateStepperStore';
import StepperContainer from './StepperContainer';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

const SolicitudFlowWrapper = () => {
  const { data: session, status } = useSession();
  const { updateFormData } = useStepperStore((s) => ({ updateFormData: s.updateFormData }));

  const prefilledOnceRef = useRef(false);

  useEffect(() => {
    if (status !== 'authenticated' || !session || prefilledOnceRef.current) {
      return;
    }

    console.log('Autocompletando datos del usuario logueado...');

    const userInfo = {
      first_name: session?.user?.profile?.firstName || '',
      last_name: session?.user?.profile?.lastName || '',
      email: session?.user?.email || '',
      phone: session?.user?.profile?.phone || '',
    };

    const transferInfo = {
      tax_identification: session?.user?.profile?.identification || undefined,
    };

    updateFormData(0, userInfo);
    updateFormData(1, transferInfo);

    prefilledOnceRef.current = true;
  }, [session, status, updateFormData]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingGif size="64px" />
      </div>
    );
  }
  return <StepperContainer session={session} />;
};

export default SolicitudFlowWrapper;
