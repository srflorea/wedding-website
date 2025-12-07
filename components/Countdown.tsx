'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const t = useTranslations('countdown');
  const weddingDate = new Date('2026-07-11T15:00:00');

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +weddingDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-gray-800">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div
              key={key}
              className="bg-white p-8 md:p-10 text-center border border-accent/20"
            >
              <div className="text-5xl md:text-6xl font-serif text-accent mb-3">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-600 uppercase tracking-[0.2em] text-xs font-bold">
                {t(key as keyof TimeLeft)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
