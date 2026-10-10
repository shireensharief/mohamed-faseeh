# Mohamed Faseeh — Portfolio v2

Next.js 15 (static export) + Tailwind v4, GSAP ScrollTrigger, Lenis, matter-js.
Design modelled on an editorial single-page layout: travelling avatar guide,
swinging ID badge, phone-style skills grid, pinned sideways project rail.

## Edit content
All text lives in `src/data/content.ts`.

## Drop-in images
- `public/avatar/avatar.webp` (or `.png`) — full-body cartoon, transparent, ~2:3 portrait.
  Picked up automatically; a placeholder figure shows until it exists.
- `public/img/photo.webp` (or `.jpg` / `.png`) — headshot for the ID badge.
  The badge shows the "MF" monogram until it exists.

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build      # static site in out/

## Deploy
Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with the
right base path for the repo name and publishes to GitHub Pages
(Settings → Pages → Source: GitHub Actions).
