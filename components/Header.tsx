'use client';

import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('home');
  const countdown = useTranslations('countdown');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const weddingDate = new Date('2026-07-11T13:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left: Names */}
            <div className="flex-1">
              <a href="#home" className="text-xl md:text-2xl font-script text-accent hover:text-accent/80 transition-colors">
                Ștefan & Kristýna
              </a>
            </div>

            {/* Center: Countdown - Desktop only */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex items-center gap-4 text-xs font-light text-gray-600">
                <div className="text-center">
                  <div className="text-lg font-bold text-accent">{timeLeft.days}</div>
                  <div className="uppercase tracking-wider">{countdown('days')}</div>
                </div>
                <div className="text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent">{timeLeft.hours}</div>
                  <div className="uppercase tracking-wider">{countdown('hours')}</div>
                </div>
                <div className="text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent">{timeLeft.minutes}</div>
                  <div className="uppercase tracking-wider">{countdown('minutes')}</div>
                </div>
                <div className="text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent">{timeLeft.seconds}</div>
                  <div className="uppercase tracking-wider">{countdown('seconds')}</div>
                </div>
              </div>
            </div>

            {/* Right: RSVP and Language selector */}
            <div className="flex-1 flex items-center justify-end gap-4">
              <a
                href="#rsvp"
                className="border-2 border-gray-800 text-gray-800 px-6 py-2 uppercase tracking-wider font-bold text-xs transition-all duration-300 hover:bg-gray-800 hover:text-white"
              >
                RSVP
              </a>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Countdown - Below header */}
      <div className="lg:hidden fixed top-[72px] left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-xs font-light text-gray-600">
            <div className="text-center">
              <div className="text-base font-bold text-accent">{timeLeft.days}</div>
              <div className="uppercase tracking-wider text-[10px]">{countdown('days')}</div>
            </div>
            <div className="text-gray-400">:</div>
            <div className="text-center">
              <div className="text-base font-bold text-accent">{timeLeft.hours}</div>
              <div className="uppercase tracking-wider text-[10px]">{countdown('hours')}</div>
            </div>
            <div className="text-gray-400">:</div>
            <div className="text-center">
              <div className="text-base font-bold text-accent">{timeLeft.minutes}</div>
              <div className="uppercase tracking-wider text-[10px]">{countdown('minutes')}</div>
            </div>
            <div className="text-gray-400">:</div>
            <div className="text-center">
              <div className="text-base font-bold text-accent">{timeLeft.seconds}</div>
              <div className="uppercase tracking-wider text-[10px]">{countdown('seconds')}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
