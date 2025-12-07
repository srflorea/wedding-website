'use client';

import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

const languageNames = {
  en: 'EN',
  ro: 'RO',
  cs: 'CS'
} as const;

export default function LanguageSelector() {
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathWithoutLocale = currentPath.replace(/^\/(en|ro|cs)/, '') || '/';
      window.location.href = `/${newLocale}${pathWithoutLocale}`;
    }
  };

  return (
    <div className="flex gap-1 items-center bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
      {routing.locales.map((loc, index) => (
        <div key={loc} className="flex items-center">
          {index > 0 && <span className="mx-1 text-gray-400">|</span>}
          <button
            type="button"
            onClick={() => handleLanguageChange(loc)}
            disabled={locale === loc}
            className={`px-2 py-1 uppercase tracking-widest text-xs font-bold transition-colors touch-manipulation ${
              locale === loc
                ? 'text-accent cursor-default'
                : 'text-gray-500 hover:text-accent active:text-accent cursor-pointer'
            }`}
            aria-label={`Switch to ${languageNames[loc]}`}
            aria-current={locale === loc ? 'true' : undefined}
          >
            {languageNames[loc]}
          </button>
        </div>
      ))}
    </div>
  );
}
