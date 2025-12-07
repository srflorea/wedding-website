'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function RSVPForm() {
  const t = useTranslations('rsvp');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    attending: '',
    dietary: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate name is always required, email only for 'yes'
    if (!formData.name || (formData.attending === 'yes' && !formData.email)) {
      setError(t('error'));
      setIsSubmitting(false);
      return;
    }

    try {
      // Use absolute path to avoid locale prefix
      const apiUrl = `${window.location.origin}/api/rsvp`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit RSVP');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        guests: '1',
        attending: '',
        dietary: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('RSVP submission error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="rsvp" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-8 text-gray-800">
          {t('title')}
        </h2>
        <p className="text-center text-gray-600 mb-14 text-lg font-light">
          {t('description')}
        </p>

        {submitted ? (
          <div className="bg-accent-light/30 border border-accent p-12 text-center">
            <div className="text-6xl mb-6 text-accent">✓</div>
            <h3 className="text-2xl font-serif text-gray-800 mb-2">
              {t('success')}
            </h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-accent/20 p-10 md:p-12">
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-300 text-red-800 text-sm">
                {error}
              </div>
            )}

            <div className="mb-8">
              <label className="block text-gray-800 font-bold text-sm uppercase tracking-[0.15em] mb-4">
                {t('attending')}
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    className="mr-3 w-4 h-4 text-accent accent-accent"
                  />
                  <span className="text-gray-700">{t('yes')}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                    className="mr-3 w-4 h-4 text-accent accent-accent"
                  />
                  <span className="text-gray-700">{t('no')}</span>
                </label>
              </div>
            </div>

            {formData.attending && (
              <>
                <div className="mb-8">
                  <label htmlFor="name" className="block text-gray-800 font-bold text-sm uppercase tracking-[0.15em] mb-3">
                    {t('name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                  />
                </div>

                {formData.attending === 'yes' && (
                  <>
                    <div className="mb-8">
                      <label htmlFor="email" className="block text-gray-800 font-bold text-sm uppercase tracking-[0.15em] mb-3">
                        {t('email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                      />
                    </div>

                    <div className="mb-8">
                      <label htmlFor="guests" className="block text-gray-800 font-bold text-sm uppercase tracking-[0.15em] mb-3">
                        {t('guests')}
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-8">
                      <label htmlFor="dietary" className="block text-gray-800 font-bold text-sm uppercase tracking-[0.15em] mb-3">
                        {t('dietary')}
                      </label>
                      <input
                        type="text"
                        id="dietary"
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        placeholder={t('dietaryPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                      />
                    </div>
                  </>
                )}

                <div className="mb-10">
                  <label htmlFor="message" className="block text-gray-800 font-bold text-sm uppercase tracking-[0.15em] mb-3">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border-2 border-gray-800 text-gray-800 py-4 uppercase tracking-[0.25em] font-bold text-sm transition-all duration-300 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-800"
            >
              {isSubmitting ? 'Submitting...' : t('submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
