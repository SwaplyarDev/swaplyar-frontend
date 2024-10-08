import { useEffect, useState } from 'react';

export const ResponsiveMarginHook = (margins: { [key: string]: string }) => {
  const [currentMargin, setCurrentMargin] = useState(margins.md);

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setCurrentMargin(margins.xs);
    } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
      setCurrentMargin(margins.sm);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1170) {
      setCurrentMargin(margins.md);
    } else if (window.innerWidth >= 1170 && window.innerWidth < 1280) {
      setCurrentMargin(margins.lg);
    } else {
      setCurrentMargin(margins.xl);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentMargin;
};
