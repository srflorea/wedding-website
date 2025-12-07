import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function OurStory() {
  const t = useTranslations('story');

  return (
    <section id="our-story" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-gray-800">
          {t('title')}
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed text-center font-light">
            {t('content')}
          </p>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="relative w-full max-w-2xl h-[300px] md:h-[400px]">
            <Image
              src="/images/with_flags.jpg"
              alt="Ștefan & Kristýna with flags"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
