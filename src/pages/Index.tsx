
import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { MobileHome } from '../components/MobileHome';
import { DesktopTabletHome } from '../components/DesktopTabletHome';

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure device detection is complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return isMobile ? <MobileHome /> : <DesktopTabletHome />;
};

export default Index;
