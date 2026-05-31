import { useEffect, useRef } from 'react';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function PassesScreen() {
  const starfieldRef = useRef<HTMLCanvasElement>(null);
  const utcClockRef = useRef<HTMLSpanElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);

  // Starfield + UTC clock + countdown + count-up animations
  useEffect(() => {
    // Starfield
    const canvas = starfieldRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function drawStars() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 1.5;
        const alpha = Math.random() * 0.5 + 0.1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 237, 247, ${alpha})`;
        ctx.fill();
      }
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStars();
    }

    window.addEventListener('resize', resize);
    resize();

    // UTC Clock
    const clockInterval = setInterval(() => {
      if (utcClockRef.current) {
        const now = new Date();
        utcClockRef.current.textContent =
          now.toISOString().substring(11, 16) + ' UTC';
      }
    }, 60000);

    // Initial clock value
    if (utcClockRef.current) {
      const now = new Date();
      utcClockRef.current.textContent =
        now.toISOString().substring(11, 16) + ' UTC';
    }

    // Countdown ticker
    let totalSeconds = 1 * 3600 + 31 * 60 + 44; // 01:31:44
    const countdownInterval = setInterval(() => {
      if (totalSeconds <= 0) return;
      totalSeconds--;
      const h = Math.floor(totalSeconds / 3600)
        .toString()
        .padStart(2, '0');
      const m = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
      const s = (totalSeconds % 60).toString().padStart(2, '0');
      if (countdownRef.current) {
        countdownRef.current.textContent = `${h}:${m}:${s}`;
      }
    }, 1000);

    // Count-up animation for telemetry elements
    const countUpEls = document.querySelectorAll<HTMLSpanElement>('.count-up');
    const countUpTimers: ReturnType<typeof setInterval>[] = [];
    countUpEls.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const isDecimal = target % 1 !== 0;
      let current = parseFloat(el.textContent?.replace(/,/g, '') || '0');
      const increment = (target - current) / 20;
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        current += increment;
        if (frame >= 20) {
          current = target;
          clearInterval(timer);
        }
        if (isDecimal) {
          el.textContent = current.toFixed(1);
        } else {
          el.textContent = Math.floor(current).toLocaleString();
        }
      }, 100);
      countUpTimers.push(timer);
    });

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(clockInterval);
      clearInterval(countdownInterval);
      countUpTimers.forEach(clearInterval);
    };
  }, []);

  return (
    <AppLayout>
      <style>{`
        .starfield {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: transparent;
          z-index: 0;
          pointer-events: none;
        }

        .orbit-path {
          stroke-dasharray: 4, 6;
          animation: dash 30s linear infinite;
        }

        .anim-slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }

        @keyframes pulse-glow {
          0%   { box-shadow: 0 0 0 0 rgba(230, 190, 122, 0.4); }
          70%  { box-shadow: 0 0 0 10px rgba(230, 190, 122, 0); }
          100% { box-shadow: 0 0 0 0 rgba(230, 190, 122, 0); }
        }

        .brass-pulse {
          animation: pulse-glow 2s infinite;
        }

        @keyframes pathTravel {
          0%   { transform: rotate(-80deg) translateX(120px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: rotate(80deg) translateX(120px); opacity: 0; }
        }

        .arc-travel {
          transform-origin: center bottom;
          animation: pathTravel 6s linear infinite;
        }
      `}</style>

      {/* Starfield Background */}
      <canvas className="starfield" ref={starfieldRef} />

      {/* TopAppBar */}
      <header className="fixed top-0 right-0 h-topbar-height w-full md:w-[calc(100%-var(--sidebar-width))] bg-midnight border-b border-faint-line z-40 flex justify-between items-center px-gutter transition-all duration-300">
        <div className="md:hidden flex items-center">
          <span className="font-headline-sm text-headline-sm text-brass font-bold">Vesper</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-moonlight">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Austin, Texas</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-moonlight font-data-md text-data-md">
            <span className="w-2 h-2 rounded-full bg-aurora animate-pulse"></span>
            <span ref={utcClockRef}>02:44 UTC</span>
          </div>
          <button className="hidden md:flex items-center justify-center text-moonlight hover:text-brass transition-colors">
            <span className="material-symbols-outlined">sensors</span>
          </button>
          <button className="h-8 px-4 border border-faint-line rounded text-starlight font-label-caps text-label-caps hover:border-brass hover:text-brass transition-colors flex items-center gap-2">
            <span>Go Live</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="relative z-10 pt-topbar-height min-h-screen pb-24">
        <div className="max-w-container-max mx-auto px-gutter pt-8 pb-24 lg:px-section-gap">
          {/* Page Header */}
          <header className="mb-10 anim-slide-up">
            <h2 className="font-headline-lg text-headline-lg text-starlight">Visible passes from Austin.</h2>
            <p className="font-body-lg text-body-lg text-moonlight mt-2 max-w-2xl">
              Tracking active satellites and orbital stations with unoccluded visibility within the next 24 hours.
            </p>
          </header>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gap">
            {/* Left Column (55%) */}
            <div className="lg:col-span-7 space-y-grid-gap">
              {/* Featured ISS Card */}
              <section className="bg-nightfall rounded-lg border border-faint-line p-card-padding relative overflow-hidden anim-slide-up stagger-1 group hover:border-outline transition-colors duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brass opacity-5 rounded-bl-full blur-2xl"></div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest block mb-1">Featured Target</span>
                    <h3 className="font-headline-md text-headline-md text-brass flex items-center gap-3">
                      ISS{' '}
                      <span className="text-moonlight font-body-md text-sm bg-twilight px-2 py-0.5 rounded">Zarya</span>
                    </h3>
                    <p className="text-body-sm font-body-sm text-moonlight mt-1">International Space Station</p>
                  </div>
                  <div className="text-right">
                    <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest block mb-1">Time to Apparition</span>
                    <div
                      ref={countdownRef}
                      className="font-data-xl text-data-xl text-brass tabular-nums countdown-timer"
                    >
                      01:31:44
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-faint-line pt-4">
                  <div>
                    <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest block mb-1">Entry (NW)</span>
                    <div className="font-data-md text-data-md text-starlight">
                      10° <span className="text-moonlight text-sm">Alt</span>
                    </div>
                    <div className="font-data-sm text-data-sm text-moonlight mt-1">21:42:15</div>
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest block mb-1">Peak (NNE)</span>
                    <div className="font-data-md text-data-md text-starlight">
                      64° <span className="text-moonlight text-sm">Alt</span>
                    </div>
                    <div className="font-data-sm text-data-sm text-moonlight mt-1">21:45:30</div>
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest block mb-1">Exit (SE)</span>
                    <div className="font-data-md text-data-md text-starlight">
                      10° <span className="text-moonlight text-sm">Alt</span>
                    </div>
                    <div className="font-data-sm text-data-sm text-moonlight mt-1">21:48:12</div>
                  </div>
                </div>
              </section>

              {/* Pass Arc Diagram */}
              <section className="bg-nightfall rounded-lg border border-faint-line p-card-padding anim-slide-up stagger-2 h-72 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-headline-sm text-headline-sm text-starlight">Trajectory Arc</h4>
                  <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">Azimuth Path</span>
                </div>
                <div className="flex-1 relative w-full flex items-end justify-center overflow-hidden pb-4">
                  {/* Horizon Line */}
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-faint-line"></div>
                  {/* Dome Rings */}
                  <div className="absolute bottom-4 w-64 h-32 border-t border-l border-r border-faint-line rounded-t-full opacity-30"></div>
                  <div className="absolute bottom-4 w-96 h-48 border-t border-l border-r border-faint-line rounded-t-full opacity-10"></div>
                  {/* Labels */}
                  <span className="absolute bottom-0 left-8 font-data-sm text-data-sm text-moonlight">NW 315°</span>
                  <span className="absolute bottom-0 right-8 font-data-sm text-data-sm text-moonlight">SE 135°</span>
                  <span className="absolute top-4 font-data-sm text-data-sm text-moonlight opacity-50">Zenith 90°</span>
                  {/* Arc Path */}
                  <svg
                    className="absolute bottom-4 w-[280px] h-[140px] overflow-visible"
                    viewBox="0 0 280 140"
                  >
                    <path
                      className="orbit-path opacity-50"
                      d="M 20 140 Q 140 -20 260 140"
                      fill="none"
                      stroke="#E6BE7A"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 20 140 Q 140 -20 260 140"
                      fill="none"
                      stroke="#E6BE7A"
                      strokeDasharray="4 8"
                      strokeWidth="2"
                    />
                  </svg>
                  {/* Animated ISS Dot */}
                  <div className="absolute bottom-4 left-1/2 w-0 h-0 flex justify-center">
                    <div className="w-[240px] h-[240px] border border-transparent rounded-full flex items-start justify-center absolute -bottom-[120px] arc-travel">
                      <div className="w-3 h-3 bg-brass rounded-full brass-pulse transform -translate-y-1.5 shadow-[0_0_12px_rgba(230,190,122,0.8)]"></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Upcoming Passes List */}
              <section className="bg-nightfall rounded-lg border border-faint-line overflow-hidden anim-slide-up stagger-3">
                <div className="p-4 border-b border-faint-line flex justify-between items-center bg-twilight/50">
                  <h4 className="font-headline-sm text-headline-sm text-starlight">Upcoming Transit Schedule</h4>
                  <button className="text-moonlight hover:text-brass transition-colors">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                  </button>
                </div>
                <div className="divide-y divide-faint-line">
                  {/* Next Pass (Highlighted) */}
                  <div className="p-4 flex items-center justify-between group hover:bg-twilight transition-colors duration-200 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-full bg-brass/5"></div>
                    <div className="flex items-center gap-4 relative z-10 w-1/3">
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-faint-line text-brass">
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          satellite_alt
                        </span>
                      </div>
                      <div>
                        <div className="font-body-md font-medium text-starlight">ISS</div>
                        <div className="font-label-caps text-label-caps text-brass mt-0.5">NEXT IN 1h 31m</div>
                      </div>
                    </div>
                    <div className="font-data-md text-data-md text-starlight w-1/4 text-center">Mag -3.4</div>
                    <div className="font-data-md text-data-md text-moonlight w-1/4 text-center">6m 12s</div>
                    <div className="font-data-md text-data-md text-moonlight w-1/6 text-right">Max 64°</div>
                  </div>
                  {/* Standard Row: Tiangong */}
                  <div className="p-4 flex items-center justify-between group hover:bg-twilight transition-colors duration-200">
                    <div className="flex items-center gap-4 w-1/3">
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-faint-line text-moonlight group-hover:border-outline transition-colors">
                        <span className="material-symbols-outlined text-sm">satellite_alt</span>
                      </div>
                      <div>
                        <div className="font-body-md font-medium text-starlight group-hover:text-brass transition-colors">Tiangong</div>
                        <div className="font-label-caps text-label-caps text-moonlight mt-0.5">22:15 Tonight</div>
                      </div>
                    </div>
                    <div className="font-data-md text-data-md text-moonlight w-1/4 text-center">Mag -1.2</div>
                    <div className="font-data-md text-data-md text-moonlight w-1/4 text-center">4m 05s</div>
                    <div className="font-data-md text-data-md text-moonlight w-1/6 text-right">Max 42°</div>
                  </div>
                  {/* Standard Row: Hubble */}
                  <div className="p-4 flex items-center justify-between group hover:bg-twilight transition-colors duration-200">
                    <div className="flex items-center gap-4 w-1/3">
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-faint-line text-moonlight group-hover:border-outline transition-colors">
                        <span className="material-symbols-outlined text-sm">center_focus_strong</span>
                      </div>
                      <div>
                        <div className="font-body-md font-medium text-starlight group-hover:text-brass transition-colors">HST (Hubble)</div>
                        <div className="font-label-caps text-label-caps text-moonlight mt-0.5">04:30 Tomorrow</div>
                      </div>
                    </div>
                    <div className="font-data-md text-data-md text-moonlight w-1/4 text-center">Mag 2.1</div>
                    <div className="font-data-md text-data-md text-moonlight w-1/4 text-center">3m 40s</div>
                    <div className="font-data-md text-data-md text-moonlight w-1/6 text-right">Max 28°</div>
                  </div>
                  {/* Dim Row: Starlink */}
                  <div className="p-4 flex items-center justify-between group hover:bg-twilight transition-colors duration-200 opacity-60">
                    <div className="flex items-center gap-4 w-1/3">
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-faint-line text-moonlight">
                        <span className="material-symbols-outlined text-sm">satellite_alt</span>
                      </div>
                      <div>
                        <div className="font-body-md font-medium text-starlight">Starlink G6-12</div>
                        <div className="font-label-caps text-label-caps text-moonlight mt-0.5">05:15 Tomorrow</div>
                      </div>
                    </div>
                    <div className="font-data-md text-data-md text-moonlight w-1/4 text-center">Mag 3.5</div>
                    <div className="font-data-md text-data-md text-moonlight w-1/4 text-center">2m 10s</div>
                    <div className="font-data-md text-data-md text-moonlight w-1/6 text-right">Max 15°</div>
                  </div>
                </div>
                <div className="p-3 text-center border-t border-faint-line">
                  <button className="font-label-caps text-label-caps text-brass hover:text-primary transition-colors">
                    View All 24 Passes
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column (45%) */}
            <div className="lg:col-span-5 space-y-grid-gap">
              {/* Globe Tracker */}
              <section className="bg-nightfall rounded-lg border border-faint-line p-card-padding anim-slide-up stagger-4 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden group hover:border-outline transition-colors duration-300">
                <div className="absolute top-4 left-4">
                  <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest block">Live Telemetry</span>
                  <span className="font-headline-sm text-headline-sm text-starlight mt-1 block">Global Pos</span>
                </div>
                <div className="w-dial-lg h-dial-lg relative mt-8 flex items-center justify-center">
                  <div className="w-[260px] h-[260px] rounded-full border border-faint-line bg-surface-container-lowest relative overflow-hidden shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.8)]">
                    {/* Grid Lines */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, transparent 49%, #bbc7e1 50%, transparent 51%), linear-gradient(to bottom, transparent 49%, #bbc7e1 50%, transparent 51%)',
                        backgroundSize: '40px 40px',
                      }}
                    ></div>
                    {/* Fake Continents */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                      <path d="M 20 30 Q 40 20 60 40 T 90 30 L 90 90 L 10 90 Z" fill="#253145" />
                    </svg>
                    {/* Orbit Path */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <ellipse
                        cx="50"
                        cy="50"
                        fill="none"
                        rx="48"
                        ry="20"
                        stroke="#2A3552"
                        strokeWidth="1"
                        transform="rotate(-30 50 50)"
                      />
                      <ellipse
                        className="opacity-50"
                        cx="50"
                        cy="50"
                        fill="none"
                        rx="48"
                        ry="20"
                        stroke="#E6BE7A"
                        strokeDasharray="2 4"
                        strokeWidth="1.5"
                        transform="rotate(-30 50 50)"
                      />
                    </svg>
                    {/* Austin Marker */}
                    <div
                      className="absolute top-[35%] left-[25%] w-1.5 h-1.5 bg-ember rounded-full shadow-[0_0_8px_rgba(217,116,78,0.8)] z-10 group-hover:scale-125 transition-transform cursor-help"
                      title="Austin, TX"
                    ></div>
                    {/* ISS Marker */}
                    <div className="absolute top-[45%] left-[60%] z-20">
                      <div className="w-2.5 h-2.5 bg-brass rounded-full brass-pulse shadow-[0_0_12px_rgba(230,190,122,1)] relative">
                        <span className="absolute -top-5 -left-3 font-data-sm text-data-sm text-brass opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ISS Live
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ISS Status Card */}
              <section className="bg-nightfall rounded-lg border border-faint-line p-card-padding anim-slide-up stagger-5">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-starlight">Current Telemetry</h4>
                    <span className="font-body-sm text-body-sm text-moonlight">Updated 2s ago</span>
                  </div>
                  <span className="bg-surface-variant text-aurora border border-aurora/30 px-2 py-0.5 rounded-full font-data-sm text-data-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-aurora rounded-full animate-pulse"></span>
                    LIVE
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="bg-twilight/40 border border-faint-line rounded p-3 flex justify-between items-center group hover:border-outline transition-colors">
                    <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">Altitude</span>
                    <div className="font-data-lg text-data-lg text-starlight flex items-baseline gap-1">
                      <span className="count-up" data-target="408.2">408.1</span>{' '}
                      <span className="text-sm text-moonlight">km</span>
                    </div>
                  </div>
                  <div className="bg-twilight/40 border border-faint-line rounded p-3 flex justify-between items-center group hover:border-outline transition-colors">
                    <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">Velocity</span>
                    <div className="font-data-lg text-data-lg text-starlight flex items-baseline gap-1">
                      <span className="count-up" data-target="27600">27,598</span>{' '}
                      <span className="text-sm text-moonlight">km/h</span>
                    </div>
                  </div>
                  <div className="bg-twilight/40 border border-faint-line rounded p-3 flex justify-between items-center group hover:border-outline transition-colors">
                    <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">Illumination</span>
                    <div className="font-data-lg text-data-lg text-brass flex items-baseline gap-1">
                      100 <span className="text-sm text-moonlight">%</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pass Alerts */}
              <section className="bg-nightfall rounded-lg border border-faint-line p-card-padding anim-slide-up stagger-5">
                <h4 className="font-headline-sm text-headline-sm text-starlight mb-4">Observation Alerts</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body-md text-starlight">Mag -2.0 or brighter</div>
                      <div className="font-body-sm text-moonlight">Notify 15 mins before transit</div>
                    </div>
                    {/* Toggle On */}
                    <button className="w-10 h-5 bg-brass rounded-full relative transition-colors focus:outline-none ring-2 ring-transparent focus:ring-outline-variant">
                      <span className="absolute right-1 top-0.5 w-4 h-4 bg-midnight rounded-full transition-transform"></span>
                    </button>
                  </div>
                  <div className="h-px bg-faint-line w-full"></div>
                  <div className="flex items-center justify-between opacity-50">
                    <div>
                      <div className="font-body-md text-starlight">All Visible ISS Passes</div>
                      <div className="font-body-sm text-moonlight">Notify 5 mins before transit</div>
                    </div>
                    {/* Toggle Off */}
                    <button className="w-10 h-5 bg-surface-variant rounded-full relative transition-colors focus:outline-none ring-2 ring-transparent focus:ring-outline-variant border border-faint-line">
                      <span className="absolute left-1 top-0.5 w-4 h-4 bg-moonlight rounded-full transition-transform"></span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
