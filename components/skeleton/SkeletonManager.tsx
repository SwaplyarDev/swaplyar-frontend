// components/skeleton/SkeletonManager.tsx
import React from 'react';
import SkeletonRegister from './SkeletonRegister';
import SkeletonLogin from './SkeletonLogin';

interface SkeletonManagerProps {
  view: 'login' | 'register';
}

const SkeletonManager: React.FC<SkeletonManagerProps> = ({ view }) => {
  if (view === 'register') {
    return <SkeletonLogin />;
  }

  if (view === 'login') {
    return <SkeletonLogin />;
  }

  return null;
};

export default SkeletonManager;
