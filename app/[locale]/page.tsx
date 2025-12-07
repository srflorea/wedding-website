import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import OurStory from '@/components/OurStory';
import Location from '@/components/Location';
import RSVPForm from '@/components/RSVPForm';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('footer');

  return (
    <main className="min-h-screen">
      <Hero />
      <Countdown />
      <OurStory />
      <Location />
      <RSVPForm />

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-light text-gray-700 mb-3">{t('seeYouThere')}</p>
          <p className="text-3xl font-script text-accent mb-2">Ștefan & Kristýna</p>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">July 11, 2026</p>
        </div>
      </footer>
    </main>
  );
}
