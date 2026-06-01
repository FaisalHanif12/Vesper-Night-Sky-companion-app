# Vesper — Night Sky Companion App

A beautifully designed night sky companion app for stargazers, astronomers, and anyone who loves the cosmos.

**Live Demo:** [https://vespersky-companion.netlify.app](https://vespersky-companion.netlify.app)

---

## What's Inside

Vesper is an 18-screen mobile-first web app that covers every aspect of amateur astronomy:

| Screen | Description |
|---|---|
| Welcome | Onboarding intro to the app |
| Set Your Sky | Configure your location for accurate sky data |
| Calibrate | Calibrate your device compass for AR-style sky viewing |
| Tonight | Overview of what's visible in the sky tonight |
| Sky Map | Interactive real-time star map |
| Orrery | Animated solar system model showing planet positions |
| Object Detail | Deep information on planets, stars, and other objects |
| Constellation Detail | Explore individual constellations with mythology and stars |
| Deep Sky Detail | Information on nebulae, galaxies, and star clusters |
| Events | Upcoming astronomical events (eclipses, meteor showers, etc.) |
| Event Detail | Full details for a specific astronomical event |
| Moon | Moon phase, rise/set times, and lunar calendar |
| Sun & Twilight | Sunrise, sunset, and twilight window data |
| Passes | Satellite and ISS pass predictions for your location |
| Sky Conditions | Atmospheric and weather conditions for stargazing |
| Observation Log | Personal log of all your past observations |
| Add Observation | Record a new observation with notes and object data |
| Settings | App preferences, units, and location settings |

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for fast builds
- **Tailwind CSS v4** for styling
- **React Router v7** for navigation

## Run Locally

```bash
cd vesper-app
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build

```bash
cd vesper-app
npm run build
# Output goes to /dist at the project root
```
