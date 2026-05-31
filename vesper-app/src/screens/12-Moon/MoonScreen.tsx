import { useEffect } from 'react';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function MoonScreen() {

  useEffect(() => {
    // Star-field and CSS animation are handled via the global styles / Tailwind classes.
    // No imperative JS cleanup needed from the original HTML.
    return () => {};
  }, []);

  return (
    <AppLayout>
      {/* Star Field */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.4,
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, white 1px, transparent 0),
            radial-gradient(1px 1px at 30% 60%, white 1px, transparent 0),
            radial-gradient(2px 2px at 60% 80%, rgba(255,255,255,0.8) 1px, transparent 0),
            radial-gradient(1px 1px at 80% 30%, white 1px, transparent 0),
            radial-gradient(1.5px 1.5px at 90% 90%, rgba(255,255,255,0.5) 1px, transparent 0)
          `,
          backgroundSize: '200px 200px',
          animation: 'drift 120s linear infinite',
        }}
      />

      <style>{`
        @keyframes drift {
          from { transform: translateY(0); }
          to { transform: translateY(-200px); }
        }
        .progress-ring {
          transition: stroke-dashoffset 1.5s ease-in-out;
        }
        .stagger-item {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 0.6s forwards;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .moon-glow {
          box-shadow: 0 0 40px 10px rgba(245, 240, 232, 0.15);
        }
      `}</style>

      {/* Main Content Area */}
      <div className="flex flex-col w-full h-full relative z-10">
        {/* TopAppBar */}
        <header className="bg-nightfall/80 backdrop-blur-md dark:bg-nightfall/80 flex justify-between items-center px-gutter h-topbar-height border-b border-faint-line shrink-0">
          <div className="flex items-center gap-2 text-moonlight">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span className="font-body-sm text-body-sm">Austin, Texas</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-moonlight hover:text-starlight transition-colors">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span className="font-body-sm text-body-sm">Clear Skies</span>
            </button>
            <button className="bg-brass text-midnight px-4 py-2 rounded font-body-sm text-body-sm font-medium hover:bg-brass-dim transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              Log Observation
            </button>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="flex-grow p-8 overflow-y-auto w-full max-w-container-max mx-auto flex flex-col gap-8">
          {/* Header Section */}
          <section className="stagger-item" style={{ animationDelay: '0.1s' }}>
            <div className="font-label-caps text-label-caps text-moonlight mb-2 tracking-widest uppercase">
              THE MOON · TONIGHT
            </div>
            <h2 className="font-headline-lg text-headline-lg text-starlight mb-2">Waxing Gibbous</h2>
            <div className="font-data-md text-data-md text-moonlight">
              73% illuminated · Rises 20:45 · Sets 01:30
            </div>
          </section>

          {/* Columns Layout */}
          <div className="flex gap-8 items-start">
            {/* LEFT COLUMN (~42%) */}
            <div className="w-[42%] flex flex-col gap-8">
              {/* Moon Visualizer Card */}
              <div
                className="bg-nightfall border border-faint-line rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden stagger-item"
                style={{ animationDelay: '0.2s' }}
              >
                {/* Moon Disc SVG */}
                <div
                  className="relative w-[220px] h-[220px] mb-8 moon-glow rounded-full"
                >
                  <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 100">
                    {/* Background (Dark side) */}
                    <circle cx="50" cy="50" fill="#0A0E18" r="48" />
                    {/* Illuminated side (Waxing Gibbous approx 73%) */}
                    <path d="M 50 2 A 48 48 0 0 1 50 98 A 20 48 0 0 0 50 2" fill="#F5F0E8" />
                    <path
                      clipPath="url(#gibbous-clip)"
                      d="M 50 2 A 48 48 0 0 1 50 98 A 48 48 0 0 1 50 2"
                      fill="#F5F0E8"
                    />
                    {/* Soft terminator overlay */}
                    <ellipse
                      cx="30"
                      cy="50"
                      fill="url(#terminator-grad)"
                      opacity="0.4"
                      rx="15"
                      ry="48"
                    />
                    <defs>
                      <clipPath id="gibbous-clip">
                        <rect height="100" width="50" x="50" y="0" />
                      </clipPath>
                      <linearGradient id="terminator-grad" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="#0A0E18" stopOpacity="1" />
                        <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Progress Ring Overlay */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none"
                    viewBox="0 0 240 240"
                  >
                    <circle cx="120" cy="120" fill="none" r="115" stroke="#2A3552" strokeWidth="2" />
                    <circle
                      className="progress-ring"
                      cx="120"
                      cy="120"
                      fill="none"
                      r="115"
                      stroke="#E6BE7A"
                      strokeDasharray="722.5"
                      strokeDashoffset="195"
                      strokeWidth="2"
                    />
                    {/* ~73% of 2*pi*r */}
                  </svg>
                </div>
                <div className="text-center">
                  <div className="font-data-xl text-data-xl text-starlight mb-1">73%</div>
                  <div className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">
                    Illuminated
                  </div>
                </div>
              </div>

              {/* Live Data Card */}
              <div
                className="bg-nightfall border border-faint-line rounded-xl p-6 stagger-item"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">MOONRISE</div>
                    <div className="font-data-lg text-data-lg text-starlight">20:45</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">MOONSET</div>
                    <div className="font-data-lg text-data-lg text-starlight">01:30</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">DISTANCE</div>
                    <div className="font-data-lg text-data-lg text-starlight">
                      384,400 <span className="text-sm text-moonlight">km</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">PHASE</div>
                    <div className="font-body-md text-body-md text-starlight">Waxing Gibbous</div>
                  </div>
                </div>
                <div className="pt-6 border-t border-faint-line">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-label-caps text-label-caps text-moonlight">NEXT FULL MOON</div>
                    <div className="font-data-sm text-data-sm text-starlight">Aug 17</div>
                  </div>
                  <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-brass w-[73%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (~58%) */}
            <div
              className="w-[58%] flex flex-col gap-8 stagger-item"
              style={{ animationDelay: '0.4s' }}
            >
              {/* Phase Calendar Card */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline-sm text-headline-sm text-starlight">August</h3>
                  <div className="flex gap-2">
                    <button className="text-moonlight hover:text-starlight">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="text-moonlight hover:text-starlight">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {/* Day headers */}
                  <div className="text-center font-label-caps text-label-caps text-moonlight py-2">S</div>
                  <div className="text-center font-label-caps text-label-caps text-moonlight py-2">M</div>
                  <div className="text-center font-label-caps text-label-caps text-moonlight py-2">T</div>
                  <div className="text-center font-label-caps text-label-caps text-moonlight py-2">W</div>
                  <div className="text-center font-label-caps text-label-caps text-moonlight py-2">T</div>
                  <div className="text-center font-label-caps text-label-caps text-moonlight py-2">F</div>
                  <div className="text-center font-label-caps text-label-caps text-moonlight py-2">S</div>

                  {/* Placeholder empty days */}
                  <div className="h-16 flex flex-col items-center justify-center p-1" />
                  <div className="h-16 flex flex-col items-center justify-center p-1" />
                  <div className="h-16 flex flex-col items-center justify-center p-1" />
                  <div className="h-16 flex flex-col items-center justify-center p-1" />

                  {/* Aug 1 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">1</span>
                    <div className="w-4 h-4 rounded-full bg-[#1A1F2D] border border-faint-line mt-1" />
                  </div>
                  {/* Aug 2 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">2</span>
                    <div className="w-4 h-4 rounded-full bg-[#1A1F2D] border border-faint-line mt-1" />
                  </div>
                  {/* Aug 3 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">3</span>
                    <div className="w-4 h-4 rounded-full bg-[#1A1F2D] border border-faint-line mt-1" />
                  </div>

                  {/* Aug 11 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group col-start-1">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">11</span>
                    <div
                      className="w-4 h-4 rounded-full bg-[#F5F0E8] mt-1"
                      style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                    />
                  </div>

                  {/* TODAY ACTIVE — Aug 12 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-brass bg-twilight cursor-pointer relative">
                    <span className="font-data-sm text-data-sm text-brass font-bold">12</span>
                    <div className="w-4 h-4 rounded-full bg-[#F5F0E8] mt-1 relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-1/4 h-full bg-[#0A0E18]" />
                    </div>
                  </div>

                  {/* Aug 13 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">13</span>
                    <div className="w-4 h-4 rounded-full bg-[#F5F0E8] mt-1 relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-[15%] h-full bg-[#0A0E18]" />
                    </div>
                  </div>

                  {/* Aug 14 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">14</span>
                    <div className="w-4 h-4 rounded-full bg-[#F5F0E8] mt-1 relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-[10%] h-full bg-[#0A0E18]" />
                    </div>
                  </div>

                  {/* Aug 15 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">15</span>
                    <div className="w-4 h-4 rounded-full bg-[#F5F0E8] mt-1 relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-[5%] h-full bg-[#0A0E18]" />
                    </div>
                  </div>

                  {/* Aug 16 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">16</span>
                    <div className="w-4 h-4 rounded-full bg-[#F5F0E8] mt-1" />
                  </div>

                  {/* FULL MOON — Aug 17 */}
                  <div className="h-16 rounded flex flex-col items-center justify-center p-1 border border-transparent hover:border-outline-variant transition-colors cursor-pointer group relative">
                    <span className="font-data-sm text-data-sm text-moonlight group-hover:text-starlight">17</span>
                    <div
                      className="w-4 h-4 rounded-full bg-[#F5F0E8] mt-1"
                      style={{ boxShadow: '0 0 8px rgba(245,240,232,0.8)' }}
                    />
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-brass rounded-full" />
                  </div>
                </div>

                <p className="font-body-sm text-body-sm text-moonlight italic font-quote border-t border-faint-line pt-4">
                  * Lunar libration is currently favorable for observing the Mare Orientale basin on the western limb.
                </p>
              </div>

              {/* Trajectory Arc Card */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-6 relative overflow-hidden">
                <div className="font-label-caps text-label-caps text-moonlight mb-6">TONIGHT'S TRAJECTORY</div>
                <div className="relative h-32 w-full flex items-end justify-center mb-2">
                  {/* Arc SVG */}
                  <svg
                    className="absolute bottom-0 w-full h-full overflow-visible"
                    viewBox="0 0 400 150"
                  >
                    <path
                      d="M 20 130 Q 200 -20 380 130"
                      fill="none"
                      stroke="#2A3552"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    {/* Progress Arc */}
                    <path
                      d="M 20 130 Q 150 20 250 30"
                      fill="none"
                      stroke="#E6BE7A"
                      strokeWidth="2"
                    />
                    {/* Horizon Line */}
                    <line stroke="#2A3552" strokeWidth="1" x1="0" x2="400" y1="130" y2="130" />
                    {/* Current Position Dot */}
                    <circle cx="250" cy="30" fill="#E6BE7A" r="4" style={{ filter: 'drop-shadow(0 0 4px #E6BE7A)' }} />
                    {/* Apex label */}
                    <text
                      fill="#9AA6BF"
                      fontFamily="IBM Plex Mono"
                      fontSize="10"
                      textAnchor="middle"
                      x="200"
                      y="20"
                    >
                      APEX 58°
                    </text>
                  </svg>
                </div>
                <div className="flex justify-between w-full font-data-sm text-data-sm text-moonlight relative z-10">
                  <div>
                    <span className="block">RISE</span>
                    <span className="text-starlight">20:45</span>
                  </div>
                  <div className="text-right">
                    <span className="block">SET</span>
                    <span className="text-starlight">01:30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
