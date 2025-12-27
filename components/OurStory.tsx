'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function OurStory() {
  const t = useTranslations('story');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
    { image: '/images/story/13.jpg', text: t('slides.11') },
    { image: '/images/story/14.jpg', text: t('slides.12') },
    { image: '/images/story/15.jpg', text: t('slides.13') },
    { image: '/images/story/16.jpg', text: t('slides.14') },
    { image: '/images/story/17.jpg', text: t('slides.15') },
    { image: '/images/story/18.jpg', text: t('slides.16') },
    { image: '/images/story/19.jpg', text: t('slides.17') },
    { image: '/images/story/20.jpg', text: t('slides.18') },
    { image: '/images/story/21.jpg', text: t('slides.19') },
    { image: '/images/story/22.jpg', text: t('slides.20') },
  ];

  // Auto-advance slides only when modal is open
  useEffect(() => {
    if (!isModalOpen) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [slides.length, currentSlide, isModalOpen]);

  // Reset to first slide when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setCurrentSlide(0);
    }
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
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

        {/* Preview - First Slide Only */}
        <div className="mt-20">
          <div
            className="w-full max-w-3xl mx-auto bg-white border border-accent/20 px-3 pt-3 pb-2 md:p-6 cursor-pointer relative group"
            onClick={openModal}
          >
            {/* Text above image */}
            <div className="mb-0 min-h-[240px] md:min-h-[160px] flex items-center justify-center relative">
              <p className="text-accent text-lg md:text-2xl font-script text-center px-2 md:px-4 leading-relaxed">
                {slides[0].text}
              </p>
            </div>

            {/* First slide image */}
            <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden mt-[-30px]">
              <Image
                src={slides[0].image}
                alt="Our story"
                fill
                className="object-contain"
                priority
              />

              {/* Overlay with call to action */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-2xl md:text-3xl font-serif mb-4 drop-shadow-lg">{t('clickToView')}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-white animate-pulse drop-shadow-lg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="w-full h-full flex flex-col">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300"
              aria-label="Close slideshow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Slideshow content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
              {/* Text above image */}
              <div className="w-full max-w-5xl mb-4 min-h-[180px] md:min-h-[120px] flex items-center justify-center relative">
                {slides.map((slide, index) => (
                  <p
                    key={index}
                    className={`text-white text-xl md:text-3xl font-script text-center px-4 absolute transition-all duration-700 leading-relaxed ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}
                  >
                    {slide.text}
                  </p>
                ))}
              </div>

              {/* Image slideshow */}
              <div
                className="relative w-full max-w-5xl h-[50vh] md:h-[60vh]"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 z-10"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 z-10"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Dots indicator and slide counter */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <div className="hidden md:flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white font-light">
                  {currentSlide + 1} / {slides.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
