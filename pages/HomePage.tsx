import React, { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ROUTES, SLIDESHOW_IMAGES } from '../constants';
import Button from '../components/common/Button';
import Slideshow from '../components/common/Slideshow';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const navigateToApplyLoan = useCallback(() => {
    window.location.hash = ROUTES.APPLY_LOAN;
  }, []);

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center text-center px-4 bg-[#F5F5F5]">
      {/* Slideshow Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto mb-12">
        <Slideshow 
          images={SLIDESHOW_IMAGES} 
          interval={5000}
          className="rounded-lg shadow-lg h-[300px] md:h-[450px]"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-30 rounded-lg">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            {t('home.hero.subtitle')}
          </p>
          <Button onClick={navigateToApplyLoan} size="lg" variant="primary" className="shadow-lg">
            {t('button.apply_now')}
          </Button>
        </div>
      </section>

      {/* Placeholder for features or information */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-[#444444]">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#EE1C25] hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-[#EE1C25]">Fast Approval</h2>
          <p className="text-[#777777]">Get your loan approved quickly with our streamlined process.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#EE1C25] hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-[#EE1C25]">Flexible Terms</h2>
          <p className="text-[#777777]">Choose from flexible loan durations that suit your needs.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#EE1C25] hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-[#EE1C25]">Secure & Transparent</h2>
          <p className="text-[#777777]">Your data is safe, and our terms are always clear.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;