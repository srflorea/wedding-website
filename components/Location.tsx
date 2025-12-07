import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

export default function Location() {
  const t = useTranslations('location');
  const locale = useLocale();

  // Use English version for en and ro, Czech version for cs
  const venueUrl = locale === 'cs' ? 'https://www.mlyndavidkov.cz' : 'https://www.mlyndavidkov.cz/en';

  return (
    <section id="location" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-gray-800">
          {t('title')}
        </h2>

        <div className="bg-white border border-accent/20 p-10 md:p-14 mb-12">
          <h3 className="text-3xl md:text-4xl font-script text-accent mb-6">
            {t('venueName')}
          </h3>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
            {t('venueDescription')}
          </p>

          <a
            href={venueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-accent text-accent px-8 md:px-10 py-3 uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-xs md:text-sm transition-all duration-300 hover:bg-accent hover:text-white mb-8"
          >
            {t('venueWebsite')}
          </a>

          <div className="relative w-full h-72 md:h-[28rem] mb-8 overflow-hidden">
            <Image
              src="/images/mlyn.jpeg"
              alt="Mlýn Davídkov"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-gray-800 mb-3">
              {t('address')}
            </h4>
            <p className="text-gray-600 mb-6">{t('addressDetails')}</p>

            <a
              href="https://maps.google.com/?q=Mlýn+Davídkov,+Hryzely+36,+281+63+Barchovice-Zásmuky,+Czechia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-gray-800 text-gray-800 px-8 md:px-12 py-4 uppercase tracking-[0.15em] md:tracking-[0.25em] font-bold text-xs md:text-sm transition-all duration-300 hover:bg-gray-800 hover:text-white"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-accent/20 p-10">
            <div className="text-5xl mb-6">🚗</div>
            <h3 className="text-2xl font-serif text-gray-800 mb-5">
              {t('fromPrague')}
            </h3>
            <p className="text-gray-600 leading-relaxed font-light">
              {t('fromPragueDetails')}
            </p>
          </div>

          <div className="bg-white border border-accent/20 p-10">
            <div className="text-5xl mb-6">✈️</div>
            <h3 className="text-2xl font-serif text-gray-800 mb-5">
              {t('fromAirport')}
            </h3>
            <p className="text-gray-600 leading-relaxed font-light">
              {t('fromAirportDetails')}
            </p>
          </div>
        </div>

        <div className="bg-white border border-accent/20 p-10 mb-8">
          <div className="text-5xl mb-6">🚐</div>
          <h3 className="text-2xl font-serif text-gray-800 mb-5">
            {t('transportation')}
          </h3>
          <p className="text-gray-600 leading-relaxed font-light">
            {t('transportationDetails')}
          </p>
        </div>

        <div className="bg-white border border-accent/20 p-10">
          <div className="text-5xl mb-6">🏨</div>
          <h3 className="text-2xl font-serif text-gray-800 mb-5">
            {t('accommodation')}
          </h3>
          <p className="text-gray-600 leading-relaxed font-light">
            {t('accommodationDetails')}
          </p>
        </div>
      </div>
    </section>
  );
}
