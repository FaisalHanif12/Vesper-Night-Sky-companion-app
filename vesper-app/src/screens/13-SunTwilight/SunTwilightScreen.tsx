import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function SunTwilightScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Animate slide-marker: driven entirely by CSS animation declared in index.css / tailwind
    // No imperative JS was present in the original <script> tags beyond what CSS handles.
    return () => {
      // cleanup (no timers or listeners to clear)
    };
  }, []);

  return (
    <AppLayout>
      {/* Inline styles required by the original HTML */}
      <style>{`
        .sky-gradient {
          background: linear-gradient(to right,
            #0D1320 0%,
            #1a233a 15%,
            #8c5a45 25%,
            #3e495f 50%,
            #b58f55 75%,
            #1a233a 85%,
            #0D1320 100%);
        }

        .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; transform: translateY(10px); }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .slide-marker { animation: slideMarker 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; left: 0; }
        @keyframes slideMarker {
          to { left: 88%; }
        }

        .draw-path { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawPath 2s ease-in-out forwards; }
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Top App Bar */}
      <header className="fixed top-0 right-0 h-topbar-height w-full md:w-[calc(100%-240px)] bg-nightfall/80 backdrop-blur-md border-b border-faint-line flex justify-between items-center px-gutter z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-moonlight hover:border-outline transition-colors duration-200 cursor-pointer px-3 py-1.5 rounded-full bg-twilight/50 border border-transparent">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span className="font-data-sm text-data-sm">Austin, Texas</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-aurora flex items-center gap-2 px-3 py-1.5 rounded-full bg-aurora/10 border border-aurora/20 font-data-sm text-data-sm">
            <span className="w-2 h-2 rounded-full bg-aurora animate-pulse"></span>
            Clear Skies
          </button>
          <button className="bg-brass text-midnight font-data-md text-data-md px-4 py-2 rounded hover:opacity-80 transition-opacity flex items-center gap-2">
            + Log Observation
          </button>
        </div>
      </header>

      {/* Main Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto mt-topbar-height p-gutter pb-24">
        <div className="max-w-container-max mx-auto space-y-section-gap">

          {/* Page Header */}
          <header className="space-y-2 fade-in-up">
            <p className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">SUN &amp; TWILIGHT · TODAY</p>
            <h2 className="font-headline-lg text-headline-lg text-starlight">Today's light.</h2>
            <p className="font-body-md text-body-md text-moonlight">When to observe — and when to wait.</p>
          </header>

          {/* Hero Gradient Strip */}
          <section className="fade-in-up delay-100">
            <div className="h-[96px] w-full rounded-xl relative overflow-hidden flex flex-col justify-end sky-gradient border border-faint-line">
              {/* Tick marks */}
              <div className="absolute bottom-0 w-full flex justify-between px-4 pb-2 text-moonlight/50 font-data-sm text-[10px]">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
              </div>
              {/* NOW Marker */}
              <div className="absolute h-full w-[2px] bg-brass shadow-[0_0_8px_rgba(230,190,122,0.8)] z-10 slide-marker top-0 flex flex-col items-center">
                <div className="bg-nightfall border border-brass px-2 py-0.5 rounded text-brass font-data-sm text-[10px] mt-2 whitespace-nowrap -translate-x-1/2 ml-[1px]">
                  NOW 09:42 PM
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-brass absolute bottom-2 -translate-x-[2px]"></div>
              </div>
            </div>
          </section>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-gap">

            {/* LEFT COLUMN */}
            <div className="md:col-span-5 space-y-grid-gap fade-in-up delay-200">

              {/* Sun Visual Panel */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding flex flex-col items-center justify-center relative overflow-hidden group">
                {/* Background Subtle Grid */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMyQTM1NTIiLz48L3N2Zz4=')",
                  }}
                ></div>

                <div className="flex w-full justify-between items-center mb-8 relative z-10">
                  <div className="text-center">
                    <p className="font-label-caps text-label-caps text-moonlight mb-1">SUNRISE</p>
                    <p className="font-data-md text-data-md text-brass">07:00</p>
                  </div>

                  {/* Glowing Sun */}
                  <div className="relative flex justify-center items-center w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-brass opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="absolute w-16 h-16 rounded-full bg-brass/20 blur-md"></div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white via-brass to-ember shadow-[0_0_20px_rgba(230,190,122,0.6)] z-10"></div>
                  </div>

                  <div className="text-center">
                    <p className="font-label-caps text-label-caps text-moonlight mb-1">SUNSET</p>
                    <p className="font-data-md text-data-md text-brass">19:15</p>
                  </div>
                </div>

                {/* Sun Path Arc */}
                <div className="w-full relative z-10 mt-4 border-t border-faint-line pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-label-caps text-label-caps text-moonlight">TRAJECTORY</span>
                    <span className="font-label-caps text-label-caps text-ember flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-ember"></span>
                      SUN BELOW HORIZON
                    </span>
                  </div>
                  <div className="relative w-full h-24 overflow-hidden">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
                      {/* Horizon line */}
                      <line stroke="#2A3552" strokeWidth="1" x1="0" x2="200" y1="90" y2="90" />
                      {/* The Arc (Past) */}
                      <path
                        className="opacity-30"
                        d="M 10 90 Q 100 -20 190 90"
                        fill="none"
                        stroke="#E6BE7A"
                        strokeDasharray="4 4"
                        strokeWidth="2"
                      />
                      {/* Current Position Indicator (Below Horizon) */}
                      <circle className="animate-pulse" cx="195" cy="98" fill="#D9744E" r="4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Twilight Windows Card */}
              <div className="bg-nightfall border border-faint-line rounded-xl overflow-hidden">
                <div className="p-4 border-b border-faint-line bg-surface-container-highest/30">
                  <h3 className="font-body-lg text-body-lg text-starlight">Twilight Phases</h3>
                </div>
                <div className="flex flex-col">
                  {/* Row 1 */}
                  <div className="flex justify-between items-center p-4 border-b border-faint-line hover:bg-twilight/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-brass"></div>
                      <span className="font-body-md text-body-md text-moonlight">Golden Hour</span>
                    </div>
                    <span className="font-data-sm text-data-sm text-moonlight">18:30 – 19:15</span>
                  </div>
                  {/* Row 2 */}
                  <div className="flex justify-between items-center p-4 border-b border-faint-line hover:bg-twilight/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-ember"></div>
                      <span className="font-body-md text-body-md text-moonlight">Sunset</span>
                    </div>
                    <span className="font-data-sm text-data-sm text-moonlight">19:15</span>
                  </div>
                  {/* Row 3 */}
                  <div className="flex justify-between items-center p-4 border-b border-faint-line hover:bg-twilight/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                      <span className="font-body-md text-body-md text-moonlight">Civil Twilight</span>
                    </div>
                    <span className="font-data-sm text-data-sm text-moonlight">19:15 – 19:42</span>
                  </div>
                  {/* Row 4 */}
                  <div className="flex justify-between items-center p-4 border-b border-faint-line hover:bg-twilight/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-twilight border border-faint-line"></div>
                      <span className="font-body-md text-body-md text-moonlight">Nautical Twilight</span>
                    </div>
                    <span className="font-data-sm text-data-sm text-moonlight">19:42 – 20:15</span>
                  </div>
                  {/* Row 5 (ACTIVE) */}
                  <div className="flex justify-between items-center p-4 bg-twilight border-l-4 border-l-brass pl-[12px]">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-midnight border border-faint-line shadow-[0_0_4px_rgba(255,255,255,0.1)]"></div>
                      <span className="font-body-md text-body-md text-starlight font-medium">Astronomical Dark</span>
                      <span className="bg-aurora/20 text-aurora rounded-full px-2 py-0.5 font-label-caps text-[9px] uppercase tracking-wider ml-2 border border-aurora/30">NOW</span>
                    </div>
                    <span className="font-data-sm text-data-sm text-brass">21:00 – 04:30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="md:col-span-7 space-y-grid-gap fade-in-up delay-300">

              {/* Stargazing Window Card (Hero) */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding relative overflow-hidden group">
                {/* Subtle glow background */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-nebula/5 rounded-full blur-3xl group-hover:bg-nebula/10 transition-colors duration-700"></div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <div>
                    <p className="font-label-caps text-label-caps text-aurora mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      PRIME OBSERVATION WINDOW
                    </p>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-data-xl text-data-xl text-brass">21:00 – 04:30</h3>
                      <span className="font-body-sm text-body-sm text-moonlight hidden sm:inline">7h 30m total</span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 px-3 py-1 rounded bg-twilight border border-faint-line">
                    <span className="font-label-caps text-label-caps text-moonlight block text-center mb-1">RATING</span>
                    <span className="font-data-md text-data-md text-aurora">EXCELLENT</span>
                  </div>
                </div>
                {/* Timeline Bar */}
                <div className="w-full h-8 bg-twilight rounded-full border border-faint-line flex overflow-hidden relative mt-8">
                  <div className="w-1/4 h-full bg-secondary-container/30 border-r border-faint-line"></div>
                  <div className="w-1/2 h-full bg-aurora/10 border-x border-aurora/30 flex items-center justify-center">
                    <span className="font-label-caps text-[10px] text-aurora opacity-70 tracking-widest">DARK SKY</span>
                  </div>
                  <div className="w-1/4 h-full bg-secondary-container/30 border-l border-faint-line"></div>
                  {/* NOW Marker on Timeline */}
                  <div className="absolute h-full w-0.5 bg-brass left-[35%] shadow-[0_0_5px_rgba(230,190,122,1)]"></div>
                </div>
              </div>

              {/* Sun Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Item 1 */}
                <div className="bg-twilight border border-faint-line rounded-lg p-4 hover:border-outline transition-colors">
                  <p className="font-label-caps text-label-caps text-moonlight mb-2">ALTITUDE</p>
                  <p className="font-data-lg text-data-lg text-starlight">-42.5°</p>
                </div>
                {/* Item 2 */}
                <div className="bg-twilight border border-faint-line rounded-lg p-4 hover:border-outline transition-colors">
                  <p className="font-label-caps text-label-caps text-moonlight mb-2">AZIMUTH</p>
                  <p className="font-data-lg text-data-lg text-starlight">315.2° <span className="text-moonlight text-sm ml-1">NW</span></p>
                </div>
                {/* Item 3 */}
                <div className="bg-twilight border border-faint-line rounded-lg p-4 hover:border-outline transition-colors">
                  <p className="font-label-caps text-label-caps text-moonlight mb-2">CONSTELLATION</p>
                  <p className="font-body-md text-body-md text-starlight flex items-center gap-2">
                    Aries <span className="text-brass">♈︎</span>
                  </p>
                </div>
                {/* Item 4 */}
                <div className="bg-twilight border border-faint-line rounded-lg p-4 hover:border-outline transition-colors">
                  <p className="font-label-caps text-label-caps text-moonlight mb-2">DISTANCE</p>
                  <p className="font-data-md text-data-md text-starlight">1.002 <span className="text-moonlight text-xs">AU</span></p>
                </div>
                {/* Item 5 */}
                <div className="bg-twilight border border-faint-line rounded-lg p-4 hover:border-outline transition-colors">
                  <p className="font-label-caps text-label-caps text-moonlight mb-2">DECLINATION</p>
                  <p className="font-data-md text-data-md text-starlight">+14° 22' 10"</p>
                </div>
                {/* Item 6 */}
                <div className="bg-twilight border border-faint-line rounded-lg p-4 hover:border-outline transition-colors flex flex-col justify-center items-center">
                  <a
                    className="text-brass hover:text-starlight font-label-caps flex items-center gap-1 transition-colors cursor-pointer"
                    onClick={() => navigate('/orrery')}
                  >
                    VIEW IN ORRERY
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Photographer's Guide Card */}
              <div className="bg-nightfall border border-faint-line rounded-xl overflow-hidden">
                <div className="p-4 border-b border-faint-line flex justify-between items-center bg-surface-container-highest/30">
                  <h3 className="font-body-lg text-body-lg text-starlight flex items-center gap-2">
                    <span className="material-symbols-outlined text-moonlight">camera</span>
                    Photographer's Guide
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-faint-line">
                  {/* Guide Row 1 */}
                  <div className="bg-nightfall p-4 flex flex-col gap-1 hover:bg-twilight/50 transition-colors">
                    <span className="font-label-caps text-label-caps text-brass">GOLDEN HOUR</span>
                    <span className="font-body-sm text-body-sm text-moonlight">Warm directional light. Shadows elongate.</span>
                    <span className="font-data-sm text-data-sm text-starlight mt-2">18:30 – 19:15</span>
                  </div>
                  {/* Guide Row 2 */}
                  <div className="bg-nightfall p-4 flex flex-col gap-1 hover:bg-twilight/50 transition-colors">
                    <span className="font-label-caps text-label-caps text-secondary-fixed-dim">BLUE HOUR</span>
                    <span className="font-body-sm text-body-sm text-moonlight">Deep blue skies, city lights balance.</span>
                    <span className="font-data-sm text-data-sm text-starlight mt-2">19:15 – 19:45</span>
                  </div>
                  {/* Guide Row 3 */}
                  <div className="bg-nightfall p-4 flex flex-col gap-1 hover:bg-twilight/50 transition-colors">
                    <span className="font-label-caps text-label-caps text-nebula">MILKY WAY CORE</span>
                    <span className="font-body-sm text-body-sm text-moonlight">Visible during complete astro darkness.</span>
                    <span className="font-data-sm text-data-sm text-starlight mt-2">22:00 – 03:00</span>
                  </div>
                  {/* Guide Row 4 */}
                  <div className="bg-nightfall p-4 flex flex-col gap-1 hover:bg-twilight/50 transition-colors">
                    <span className="font-label-caps text-label-caps text-aurora">METEOR OPTIMAL</span>
                    <span className="font-body-sm text-body-sm text-moonlight">Radiant highest, minimal moon interference.</span>
                    <span className="font-data-sm text-data-sm text-starlight mt-2">02:00 – 04:30</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
