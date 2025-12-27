'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('home');
  const nav = useTranslations('nav');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-script mb-6 text-accent">
            {t('title')}
          </h1>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
            <Image
              src="/images/couple.jpg"
              alt={t('names')}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mb-12">
          <p className="text-2xl md:text-3xl lg:text-4xl font-script text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <p className="text-2xl md:text-3xl font-serif text-gray-800">
            {t('date')}
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            {t('venue')}
          </p>
        </div>

        <div className="mt-12">
          <a
            href="#rsvp"
            className="group inline-block relative border-2 border-gray-800 text-gray-800 px-12 py-4 uppercase tracking-[0.25em] font-bold text-sm transition-all duration-300 hover:bg-gray-800 hover:text-white"
          >
            {nav('rsvp')}
          </a>
          <p className="mt-4 text-sm text-gray-600 font-light">
            {t('rsvpDeadline')}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-light to-transparent opacity-50"></div>
    </section>
  );
}
