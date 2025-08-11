# MediCompare

A sleek, fast medical tourism search SPA built with Vite + React + TypeScript and Tailwind CSS.

## Local development

- npm install
- npm run dev

## Production build

- npm run build
- npm run preview

## Deploy to Vercel

This repo is ready for one-click Vercel deploy. Settings:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- No environment variables required

SPA routing is configured via `vercel.json` to rewrite all routes to `/index.html`.

## Features
- Autocomplete search and country selector
- Smart pre-filter modal
- 3-card recommendations with real pricing bands
- Offers list with instant filters
- Offer detail page with breakdowns, surgeon, reviews, logistics
- Favorites, compare (up to 3), price alerts (local storage)
- Floating live chat widget
