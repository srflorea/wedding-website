'use client';

import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { useState, useEffect, useRef } from 'react';

const languageNames = {
  en: 'EN',
  ro: 'RO',
  cs: 'CS'
} as const;

export default function LanguageSelector() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: string) => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathWithoutLocale = currentPath.replace(/^\/(en|ro|cs)/, '') || '/';
      window.location.href = `/${newLocale}${pathWithoutLocale}`;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="uppercase tracking-widest text-xs font-bold text-gray-800">
          {languageNames[locale]}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-3 h-3 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[80px]">
          {routing.locales
            .filter(loc => loc !== locale)
            .map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  handleLanguageChange(loc);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left uppercase tracking-widest text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-accent transition-colors"
                aria-label={`Switch to ${languageNames[loc]}`}
              >
                {languageNames[loc]}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
