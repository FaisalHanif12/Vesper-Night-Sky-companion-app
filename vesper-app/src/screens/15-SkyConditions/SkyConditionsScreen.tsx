import { useEffect, useRef } from 'react';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function SkyConditionsScreen() {
  const animationFramesRef = useRef<number[]>([]);

  useEffect(() => {
    const animateValue = (
      id: string,
      start: number,
      end: number,
      duration: number,
      suffix: string = ''
    ) => {
      const obj = document.getElementById(id);
      if (!obj) return;

      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = progress * (end - start) + start;

        if (id === 'kpi-seeing') {
          obj.innerHTML =
            currentVal.toFixed(1) +
            '<span class="text-data-sm text-moonlight">/5</span>';
        } else {
          obj.innerHTML = Math.floor(currentVal) + suffix;
        }

        if (progress < 1) {
          const rafId = window.requestAnimationFrame(step);
          animationFramesRef.current.push(rafId);
        }
      };

      const rafId = window.requestAnimationFrame(step);
      animationFramesRef.current.push(rafId);
    };

    const timeoutId = setTimeout(() => {
      animateValue('kpi-clear', 0, 87, 1500, '%');
      animateValue('kpi-seeing', 0, 3.8, 1500);
      animateValue('kpi-moon', 0, 43, 1500, '%');
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      animationFramesRef.current.forEach((id) => window.cancelAnimationFrame(id));
      animationFramesRef.current = [];
    };
  }, []);

  return (
    <AppLayout>
      {/* Topbar */}
      <header className="hidden md:flex fixed top-0 right-0 h-topbar-height justify-between items-center px-gutter border-b border-faint-line bg-midnight z-50" style={{ width: 'calc(100% - 240px)', marginLeft: '240px' }}>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-moonlight hover:text-brass transition-colors cursor-pointer">location_on</span>
            <span className="material-symbols-outlined text-moonlight hover:text-brass transition-colors cursor-pointer">sensors</span>
          </div>
          <div className="h-6 w-px bg-faint-line mx-2"></div>
          <span className="font-data-md text-data-md text-moonlight font-medium">02:44 UTC</span>
          <button className="bg-brass text-midnight font-label-caps text-label-caps px-4 py-2 rounded font-semibold hover:bg-brass-dim transition-colors ml-4">Go Live</button>
        </div>
      </header>

      <style>{`
        .starfield {
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4) 1px, transparent 0),
            radial-gradient(1.5px 1.5px at 30% 40%, rgba(255,255,255,0.6) 1px, transparent 0),
            radial-gradient(2px 2px at 50% 60%, rgba(255,255,255,0.5) 1px, transparent 0),
            radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3) 1px, transparent 0),
            radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.7) 1px, transparent 0);
          background-size: 200px 200px;
          animation: drift 100s linear infinite;
        }
        @keyframes drift {
          from { background-position: 0 0; }
          to { background-position: -200px -200px; }
        }

        .bortle-scale {
          display: flex;
          height: 12px;
          border-radius: 9999px;
          overflow: hidden;
          width: 100%;
        }
        .bortle-segment { flex: 1; border-right: 1px solid rgba(13,19,32,0.5); }
        .bortle-segment:last-child { border-right: none; }
        .bortle-1 { background-color: #0D1320; }
        .bortle-2 { background-color: #141C30; }
        .bortle-3 { background-color: #1E2842; }
        .bortle-4 { background-color: #2A3552; }
        .bortle-5 { background-color: #4e4639; }
        .bortle-6 { background-color: #9a8f80; }
        .bortle-7 { background-color: #d1c5b4; }
        .bortle-8 { background-color: #ffdea9; }
        .bortle-9 { background-color: #E6BE7A; }

        .chart-row-animate {
          transform-origin: left;
          animation: growRight 1s ease-out forwards;
          width: 0;
        }
        @keyframes growRight {
          to { width: 100%; }
        }

        .stagger-item {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 0.6s ease-out forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Main Content Canvas */}
      <div className="bg-midnight text-on-surface min-h-screen overflow-x-hidden font-body-md starfield px-gutter md:px-section-gap pb-section-gap max-w-container-max mx-auto" style={{ paddingTop: 'calc(64px + 24px)' }}>

        {/* Header */}
        <header className="mb-10 stagger-item" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-headline-lg text-headline-lg md:font-headline-display md:text-headline-display text-starlight mb-4">
            Conditions are excellent.
          </h2>
        </header>

        {/* KPI Strip */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 stagger-item"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding flex flex-col items-start hover:border-outline transition-colors">
            <span className="font-label-caps text-label-caps text-moonlight mb-2">CLEAR SKY</span>
            <span className="font-data-xl text-data-xl text-aurora" id="kpi-clear">87%</span>
          </div>
          <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding flex flex-col items-start hover:border-outline transition-colors">
            <span className="font-label-caps text-label-caps text-moonlight mb-2">SEEING</span>
            <span className="font-data-xl text-data-xl text-brass" id="kpi-seeing">
              3.8<span className="text-data-sm text-moonlight">/5</span>
            </span>
          </div>
          <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding flex flex-col items-start hover:border-outline transition-colors">
            <span className="font-label-caps text-label-caps text-moonlight mb-2">TRANSPARENCY</span>
            <span className="font-headline-sm text-headline-sm text-starlight mt-2">Good</span>
          </div>
          <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding flex flex-col items-start hover:border-outline transition-colors">
            <span className="font-label-caps text-label-caps text-moonlight mb-2">MOON ILLUMINATION</span>
            <div className="flex items-center gap-3">
              <span className="font-data-xl text-data-xl text-starlight" id="kpi-moon">43%</span>
              <span className="material-symbols-outlined text-moonlight text-[32px]">brightness_4</span>
            </div>
          </div>
        </div>

        {/* Hourly Forecast Chart */}
        <section
          className="bg-nightfall border border-faint-line rounded-xl p-card-padding mb-10 hover:border-outline transition-colors stagger-item"
          style={{ animationDelay: '0.3s' }}
        >
          <h3 className="font-headline-sm text-headline-sm text-starlight mb-6">Hourly Forecast</h3>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Time Header */}
              <div className="grid grid-cols-9 gap-2 mb-4 font-data-sm text-data-sm text-moonlight border-b border-faint-line pb-2">
                <div className="col-span-1"></div>
                <div className="text-center">21:00</div>
                <div className="text-center">22:00</div>
                <div className="text-center">23:00</div>
                <div className="text-center">00:00</div>
                <div className="text-center">01:00</div>
                <div className="text-center">02:00</div>
                <div className="text-center">03:00</div>
                <div className="text-center">04:00</div>
              </div>

              {/* Cloud Cover Row */}
              <div className="grid grid-cols-9 gap-2 items-center mb-4">
                <div className="col-span-1 font-label-caps text-label-caps text-starlight">CLOUD COVER</div>
                <div className="col-span-8 flex gap-1 h-6 bg-twilight rounded overflow-hidden">
                  <div className="chart-row-animate h-full bg-aurora opacity-90 rounded-l" style={{ width: '70%' }}></div>
                  <div className="chart-row-animate h-full bg-aurora opacity-70" style={{ width: '20%', animationDelay: '0.1s' }}></div>
                  <div className="chart-row-animate h-full bg-moonlight opacity-50" style={{ width: '10%', animationDelay: '0.2s' }}></div>
                </div>
              </div>

              {/* Seeing Row */}
              <div className="grid grid-cols-9 gap-2 items-center mb-4">
                <div className="col-span-1 font-label-caps text-label-caps text-starlight">SEEING</div>
                <div className="col-span-8 flex gap-1 h-6 bg-twilight rounded overflow-hidden">
                  <div className="chart-row-animate h-full bg-brass opacity-80 rounded-l" style={{ width: '40%' }}></div>
                  <div className="chart-row-animate h-full bg-aurora opacity-90" style={{ width: '40%', animationDelay: '0.1s' }}></div>
                  <div className="chart-row-animate h-full bg-ember opacity-80" style={{ width: '20%', animationDelay: '0.2s' }}></div>
                </div>
              </div>

              {/* Transparency Row */}
              <div className="grid grid-cols-9 gap-2 items-center mb-4">
                <div className="col-span-1 font-label-caps text-label-caps text-starlight">TRANSPARENCY</div>
                <div className="col-span-8 flex gap-1 h-6 bg-twilight rounded overflow-hidden">
                  <div className="chart-row-animate h-full bg-aurora opacity-90 rounded-l" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Darkness Row */}
              <div className="grid grid-cols-9 gap-2 items-center">
                <div className="col-span-1 font-label-caps text-label-caps text-starlight">DARKNESS</div>
                <div className="col-span-8 flex gap-1 h-6 bg-twilight rounded overflow-hidden relative">
                  <div className="chart-row-animate h-full bg-midnight border border-faint-line w-full rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brass to-transparent opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Layout (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gap">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col gap-grid-gap">

            {/* Detailed Conditions */}
            <div
              className="bg-nightfall border border-faint-line rounded-xl p-card-padding hover:border-outline transition-colors stagger-item"
              style={{ animationDelay: '0.4s' }}
            >
              <h3 className="font-headline-sm text-headline-sm text-starlight mb-6">Detailed Conditions</h3>
              <div className="flex flex-col gap-4">

                <div className="flex justify-between items-center border-b border-faint-line pb-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-moonlight text-[20px]">cloud</span>
                    <span className="font-body-md text-body-md text-starlight">Cloud Cover</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-data-md text-data-md text-starlight">13%</span>
                    <div className="w-2 h-2 rounded-full bg-aurora shadow-[0_0_8px_rgba(111,182,162,0.6)]"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-faint-line pb-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-moonlight text-[20px]">air</span>
                    <span className="font-body-md text-body-md text-starlight">Wind Speed</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-data-md text-data-md text-starlight">4 mph NE</span>
                    <div className="w-2 h-2 rounded-full bg-aurora shadow-[0_0_8px_rgba(111,182,162,0.6)]"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-faint-line pb-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-moonlight text-[20px]">water_drop</span>
                    <span className="font-body-md text-body-md text-starlight">Humidity</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-data-md text-data-md text-starlight">65%</span>
                    <div className="w-2 h-2 rounded-full bg-brass shadow-[0_0_8px_rgba(230,190,122,0.6)]"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-faint-line pb-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-moonlight text-[20px]">thermostat</span>
                    <span className="font-body-md text-body-md text-starlight">Temperature</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-data-md text-data-md text-starlight">42°F</span>
                    <div className="w-2 h-2 rounded-full bg-aurora shadow-[0_0_8px_rgba(111,182,162,0.6)]"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-faint-line pb-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-moonlight text-[20px]">dew_point</span>
                    <span className="font-body-md text-body-md text-starlight">Dew Point</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-data-md text-data-md text-starlight">31°F</span>
                    <div className="w-2 h-2 rounded-full bg-brass shadow-[0_0_8px_rgba(230,190,122,0.6)]"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-moonlight text-[20px]">speed</span>
                    <span className="font-body-md text-body-md text-starlight">Pressure</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-data-md text-data-md text-starlight">1012 hPa</span>
                    <div className="w-2 h-2 rounded-full bg-aurora shadow-[0_0_8px_rgba(111,182,162,0.6)]"></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Light Pollution / Bortle */}
            <div
              className="bg-nightfall border border-faint-line rounded-xl p-card-padding hover:border-outline transition-colors stagger-item"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex justify-between items-end mb-6">
                <h3 className="font-headline-sm text-headline-sm text-starlight">Light Pollution</h3>
                <span className="font-data-sm text-data-sm text-moonlight">Class 4</span>
              </div>
              <div className="relative pt-6 pb-2">
                {/* Bortle Scale Bar */}
                <div className="bortle-scale border border-faint-line">
                  <div className="bortle-segment bortle-1"></div>
                  <div className="bortle-segment bortle-2"></div>
                  <div className="bortle-segment bortle-3"></div>
                  <div className="bortle-segment bortle-4"></div>
                  <div className="bortle-segment bortle-5"></div>
                  <div className="bortle-segment bortle-6"></div>
                  <div className="bortle-segment bortle-7"></div>
                  <div className="bortle-segment bortle-8"></div>
                  <div className="bortle-segment bortle-9"></div>
                </div>
                {/* Marker */}
                <div className="absolute top-0 w-full">
                  <div className="relative w-full h-full">
                    <div className="absolute left-[38%] transform -translate-x-1/2 flex flex-col items-center">
                      <span className="font-label-caps text-label-caps text-brass mb-1 whitespace-nowrap">YOU ARE HERE</span>
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-brass"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-moonlight mt-4">
                Rural/suburban transition. Milky Way is visible but lacks structure. Sky glow present.
              </p>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 flex flex-col gap-grid-gap">

            {/* Best Windows */}
            <div
              className="bg-nightfall border border-faint-line rounded-xl p-card-padding hover:border-outline transition-colors stagger-item"
              style={{ animationDelay: '0.6s' }}
            >
              <h3 className="font-headline-sm text-headline-sm text-starlight mb-6">Tonight's Best Windows</h3>
              <div className="flex flex-col gap-3">

                <div className="bg-twilight border border-faint-line rounded-lg p-4 flex justify-between items-center hover:border-aurora transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-faint-line group-hover:border-aurora transition-colors">
                      <span className="font-data-md text-data-md text-aurora">1</span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-headline-sm text-starlight">23:00 - 01:30</div>
                      <div className="font-label-caps text-label-caps text-aurora mt-1">OPTIMAL</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-aurora opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </div>

                <div className="bg-twilight border border-faint-line rounded-lg p-4 flex justify-between items-center hover:border-brass transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-faint-line group-hover:border-brass transition-colors">
                      <span className="font-data-md text-data-md text-brass">2</span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-headline-sm text-starlight">02:00 - 03:00</div>
                      <div className="font-label-caps text-label-caps text-brass mt-1">GOOD</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-brass opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </div>

                <div className="bg-twilight border border-faint-line rounded-lg p-4 flex justify-between items-center hover:border-ember transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-faint-line group-hover:border-ember transition-colors">
                      <span className="font-data-md text-data-md text-moonlight">3</span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-headline-sm text-starlight">04:00 - 05:00</div>
                      <div className="font-label-caps text-label-caps text-moonlight mt-1">FAIR</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-moonlight opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </div>

              </div>
            </div>

            {/* 5-Night Forecast */}
            <div
              className="bg-nightfall border border-faint-line rounded-xl p-card-padding hover:border-outline transition-colors stagger-item"
              style={{ animationDelay: '0.7s' }}
            >
              <h3 className="font-headline-sm text-headline-sm text-starlight mb-6">5-Night Outlook</h3>
              <div className="flex flex-col gap-4">

                {/* Tonight */}
                <div className="grid grid-cols-12 gap-4 items-center border-b border-faint-line pb-3">
                  <div className="col-span-3 font-body-md text-body-md text-starlight font-medium">Tonight</div>
                  <div className="col-span-2 flex justify-center">
                    <span className="material-symbols-outlined text-moonlight">brightness_4</span>
                  </div>
                  <div className="col-span-5 flex items-center h-2 bg-twilight rounded-full overflow-hidden">
                    <div className="h-full bg-aurora" style={{ width: '85%' }}></div>
                  </div>
                  <div className="col-span-2 text-right font-data-sm text-data-sm text-aurora">Excel</div>
                </div>

                {/* Tomorrow */}
                <div className="grid grid-cols-12 gap-4 items-center border-b border-faint-line pb-3">
                  <div className="col-span-3 font-body-md text-body-md text-moonlight">Tomorrow</div>
                  <div className="col-span-2 flex justify-center">
                    <span className="material-symbols-outlined text-moonlight">brightness_5</span>
                  </div>
                  <div className="col-span-5 flex items-center h-2 bg-twilight rounded-full overflow-hidden">
                    <div className="h-full bg-brass" style={{ width: '60%' }}></div>
                  </div>
                  <div className="col-span-2 text-right font-data-sm text-data-sm text-brass">Good</div>
                </div>

                {/* Day 3 */}
                <div className="grid grid-cols-12 gap-4 items-center border-b border-faint-line pb-3">
                  <div className="col-span-3 font-body-md text-body-md text-moonlight">Thu</div>
                  <div className="col-span-2 flex justify-center">
                    <span className="material-symbols-outlined text-moonlight">brightness_6</span>
                  </div>
                  <div className="col-span-5 flex items-center h-2 bg-twilight rounded-full overflow-hidden">
                    <div className="h-full bg-ember" style={{ width: '30%' }}></div>
                  </div>
                  <div className="col-span-2 text-right font-data-sm text-data-sm text-ember">Poor</div>
                </div>

                {/* Day 4 */}
                <div className="grid grid-cols-12 gap-4 items-center border-b border-faint-line pb-3">
                  <div className="col-span-3 font-body-md text-body-md text-moonlight">Fri</div>
                  <div className="col-span-2 flex justify-center">
                    <span className="material-symbols-outlined text-moonlight">brightness_7</span>
                  </div>
                  <div className="col-span-5 flex items-center h-2 bg-twilight rounded-full overflow-hidden">
                    <div className="h-full bg-brass" style={{ width: '50%' }}></div>
                  </div>
                  <div className="col-span-2 text-right font-data-sm text-data-sm text-brass">Fair</div>
                </div>

                {/* Day 5 */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 font-body-md text-body-md text-moonlight">Sat</div>
                  <div className="col-span-2 flex justify-center">
                    <span className="material-symbols-outlined text-moonlight">brightness_1</span>
                  </div>
                  <div className="col-span-5 flex items-center h-2 bg-twilight rounded-full overflow-hidden">
                    <div className="h-full bg-aurora" style={{ width: '90%' }}></div>
                  </div>
                  <div className="col-span-2 text-right font-data-sm text-data-sm text-aurora">Excel</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
