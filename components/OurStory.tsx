'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function OurStory() {
  const t = useTranslations('story');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: '/images/story/1.jpg', text: t('slides.0') },
    { image: '/images/story/2.jpg', text: t('slides.1') },
    { image: '/images/story/3.jpg', text: t('slides.2') },
    { image: '/images/story/4.jpg', text: t('slides.3') },
    { image: '/images/story/5.jpg', text: t('slides.4') },
    { image: '/images/story/6.jpg', text: t('slides.5') },
    { image: '/images/story/8.jpg', text: t('slides.6') },
    { image: '/images/story/9.jpg', text: t('slides.7') },
    { image: '/images/story/10.jpg', text: t('slides.8') },
    { image: '/images/story/11.jpg', text: t('slides.9') },
    { image: '/images/story/12.jpg', text: t('slides.10') },
    { image: '/images/story/13.jpg', text: t('slides.10') },
  ];

  // Auto-advance slides every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

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

        {/* Slideshow */}
        <div className="mt-20">
          <div className="w-full max-w-3xl mx-auto bg-white border border-accent/20 px-3 pt-3 pb-2 md:p-6">
            {/* Text above image */}
            <div className="mb-0 min-h-[180px] md:min-h-[120px] flex items-center justify-center relative overflow-hidden">
              {slides.map((slide, index) => (
                <p
                  key={index}
                  className={`text-accent text-base md:text-xl font-script text-center px-2 md:px-4 absolute transition-all duration-700 leading-relaxed ${
                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                  }`}
                >
                  {slide.text}
                </p>
              ))}
            </div>

            {/* Image slideshow */}
            <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden mt-0">
              {/* Slides */}
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={`Our story ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Navigation arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 transition-all duration-300 z-10"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 transition-all duration-300 z-10"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Dots indicator and slide counter */}
            <div className="flex justify-center items-center gap-4 mt-0">
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-accent w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <span key={currentSlide} className="text-sm text-gray-500 font-light">
                {currentSlide + 1} / {slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
