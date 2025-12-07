# Ștefan & Kristýna Wedding Website

A beautiful multilingual wedding website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Multilingual Support**: Romanian, Czech, and English translations
- **Countdown Timer**: Real-time countdown to the wedding day
- **Hero Section**: Beautiful gradient header with names and date
- **Our Story**: Personal story section with country flags
- **Location & Travel**: Detailed venue information and travel directions
- **RSVP Form**: Interactive form for guests to confirm attendance
- **Responsive Design**: Mobile-friendly layout that works on all devices

## Wedding Details

- **Couple**: Ștefan & Kristýna
- **Date**: July 11th, 2026
- **Venue**: Mlýn Davídkov, near Prague, Czech Republic

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
wedding-website/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.tsx      # Main layout with i18n provider
│   │   └── page.tsx        # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Countdown.tsx       # Countdown timer component
│   ├── Hero.tsx           # Hero section
│   ├── LanguageSelector.tsx # Language switcher
│   ├── Location.tsx       # Location and travel info
│   ├── OurStory.tsx       # Our story section
│   └── RSVPForm.tsx       # RSVP form
├── messages/
│   ├── en.json            # English translations
│   ├── ro.json            # Romanian translations
│   └── cs.json            # Czech translations
├── i18n.ts                # i18n configuration
└── middleware.ts          # Next.js middleware for locale detection
```

## Customization

### Update Translations

Edit the JSON files in the `messages/` directory to customize text content:
- `messages/en.json` - English
- `messages/ro.json` - Romanian (Română)
- `messages/cs.json` - Czech (Čeština)

### Change Wedding Date

Update the date in `components/Countdown.tsx`:
```typescript
const weddingDate = new Date('2026-07-11T15:00:00');
```

### Update Location

Modify the location details in the translation files and the Google Maps link in `components/Location.tsx`.

### RSVP Form Integration

Currently, the RSVP form logs submissions to the console. To integrate with a backend:

1. Create an API route in `app/api/rsvp/route.ts`
2. Update the form submission handler in `components/RSVPForm.tsx`
3. Consider using services like:
   - Google Forms
   - Formspree
   - EmailJS
   - Custom backend API

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization for Next.js
- **Google Fonts** - Cormorant Garamond & Montserrat

## Deployment

Deploy to Vercel (recommended):

```bash
npm install -g vercel
vercel
```

Or deploy to any platform that supports Next.js.

## License

This project is created for personal use.

---

Made with love for Ștefan & Kristýna
