import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function ObjectDetailScreen() {
  const navigate = useNavigate();
  const arcNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (arcNodeRef.current) {
        arcNodeRef.current.style.left = '60%';
        arcNodeRef.current.style.top = '15%';
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      {/* Main Canvas */}
      <div className="flex-1 w-full relative star-drift overflow-y-auto">
        <style>{`
          .star-drift {
            background-image:
              radial-gradient(1px 1px at 20px 30px, rgba(232, 237, 247, 0.8), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 40px 70px, rgba(232, 237, 247, 0.4), rgba(0,0,0,0)),
              radial-gradient(2px 2px at 90px 40px, rgba(230, 190, 122, 0.6), rgba(0,0,0,0)),
              radial-gradient(1px 1px at 160px 120px, rgba(232, 237, 247, 0.9), rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: drift 100s linear infinite;
          }
          @keyframes drift {
            from { background-position: 0 0; }
            to { background-position: -200px 200px; }
          }
          .saturn-glow {
            box-shadow: 0 0 40px rgba(230, 190, 122, 0.15);
          }
          .pulse-badge {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
          .rotate-slow {
            animation: rotate 60s linear infinite;
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>

        {/* Back Link & Header Area */}
        <header className="px-gutter pt-gutter pb-8 max-w-container-max mx-auto relative z-10">
          <button
            onClick={() => navigate('/tonight')}
            className="flex items-center gap-2 text-moonlight hover:text-starlight transition-colors duration-200 group mb-section-gap"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-label-caps text-label-caps">Tonight</span>
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-label-caps text-label-caps text-moonlight uppercase tracking-wider">PLANET · SOLAR SYSTEM</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-twilight border border-faint-line">
                  <div className="w-1.5 h-1.5 rounded-full bg-aurora pulse-badge"></div>
                  <span className="font-data-sm text-data-sm text-starlight">VISIBLE NOW</span>
                </div>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-starlight mb-4">Saturn</h1>
              <p className="font-quote text-quote italic text-moonlight max-w-2xl">The ringed jewel of the outer solar system, currently gracing the southern ecliptic.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center justify-center gap-2 px-6 h-12 rounded border border-faint-line text-starlight hover:border-outline hover:text-brass transition-colors duration-200 bg-twilight/50 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                <span className="font-label-caps text-label-caps">View in Orrery</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-6 h-12 rounded bg-brass text-midnight hover:bg-primary-fixed-dim transition-colors duration-200 font-label-caps text-label-caps">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add to Log
              </button>
            </div>
          </div>
        </header>

        {/* Content Layout */}
        <div className="max-w-container-max mx-auto px-gutter pb-section-gap grid grid-cols-1 lg:grid-cols-12 gap-grid-gap relative z-10">

          {/* Left Column: Visuals & Lore */}
          <div className="lg:col-span-5 flex flex-col gap-grid-gap">

            {/* Render Card */}
            <div className="bg-nightfall border border-faint-line rounded-lg p-section-gap flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
              {/* Subtle background radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,190,122,0.05)_0%,transparent_70%)]"></div>

              {/* Simulated Saturn Render */}
              <div
                className="w-[200px] h-[200px] rounded-full relative saturn-glow rotate-slow group-hover:scale-105 transition-transform duration-500 ease-out"
                style={{ background: 'radial-gradient(circle at 30% 30%, #E6BE7A, #B8965C 40%, #141C30 90%)' }}
              >
                {/* Rings */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[100px] rounded-[50%] border-[8px] border-brass/20"
                  style={{ transform: 'translate(-50%, -50%) rotate(-20deg) rotateX(70deg)' }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[85px] rounded-[50%] border-[12px] border-brass/40"
                  style={{ transform: 'translate(-50%, -50%) rotate(-20deg) rotateX(70deg)' }}
                ></div>
              </div>
            </div>

            {/* Best Viewing */}
            <div className="bg-twilight border border-faint-line rounded-lg p-card-padding flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-label-caps text-label-caps text-moonlight">OPTIMAL VIEWING (LOCAL)</span>
                <div className="flex items-center gap-2 text-brass">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span className="font-data-lg text-data-lg">20:14 – 03:14</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-faint-line flex items-center justify-center bg-nightfall">
                <span className="material-symbols-outlined text-aurora">wb_sunny</span>
              </div>
            </div>
          </div>

          {/* Right Column: Instrument Data & Arcs */}
          <div className="lg:col-span-7 flex flex-col gap-grid-gap">

            {/* Coordinate Data Grid */}
            <div className="bg-twilight border border-faint-line rounded-lg p-card-padding">
              <div className="flex items-center gap-2 mb-6 border-b border-faint-line pb-4">
                <span className="material-symbols-outlined text-brass text-[20px]">explore</span>
                <h2 className="font-headline-sm text-headline-sm text-starlight">Live Telemetry</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">ALTITUDE</span>
                  <span className="font-data-md text-data-md text-brass">+42° 18' 04"</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">AZIMUTH</span>
                  <span className="font-data-md text-data-md text-brass">156° 42' 11"</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">MAGNITUDE</span>
                  <span className="font-data-md text-data-md text-starlight">0.40</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">RIGHT ASCENSION</span>
                  <span className="font-data-md text-data-md text-moonlight">22h 38m 14s</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">DECLINATION</span>
                  <span className="font-data-md text-data-md text-moonlight">-10° 24' 55"</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">DISTANCE (AU)</span>
                  <span className="font-data-md text-data-md text-moonlight">8.942</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">CONSTELLATION</span>
                  <span className="font-body-md text-body-md text-starlight">Aquarius</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">PHASE ANGLE</span>
                  <span className="font-data-md text-data-md text-moonlight">5.2°</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-moonlight">ILLUMINATION</span>
                  <span className="font-data-md text-data-md text-starlight">99.8%</span>
                </div>
              </div>
            </div>

            {/* Visibility Arc */}
            <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding flex-1">
              <div className="flex justify-between items-center mb-8">
                <span className="font-label-caps text-label-caps text-moonlight">TRAJECTORY ARC</span>
                <span className="font-data-sm text-data-sm text-brass">Transit: 23:44</span>
              </div>

              {/* Simulated Arc Diagram */}
              <div className="relative w-full h-48 overflow-hidden flex items-end justify-center">
                {/* Horizon Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-faint-line"></div>

                {/* Track Arc */}
                <div className="w-[80%] h-[160px] rounded-t-[50%] border-t border-l border-r border-faint-line border-dashed relative">
                  {/* Current Position Indicator (Brass) */}
                  <div
                    ref={arcNodeRef}
                    className="absolute w-3 h-3 bg-brass rounded-full shadow-[0_0_10px_rgba(230,190,122,0.8)] -ml-1.5 -mt-1.5 transition-all duration-1000 ease-out"
                    style={{ left: '0%', top: '100%' }}
                  ></div>
                  {/* Path Fill (Simulated) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-twilight/20 to-transparent rounded-t-[50%]"></div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-2 left-4 font-data-sm text-data-sm text-moonlight">E</div>
                <div className="absolute bottom-2 right-4 font-data-sm text-data-sm text-moonlight">W</div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 font-data-sm text-data-sm text-moonlight">S</div>
              </div>

              {/* Visibility Timeline Bar */}
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex justify-between font-label-caps text-label-caps text-moonlight">
                  <span>18:00</span>
                  <span>00:00</span>
                  <span>06:00</span>
                </div>
                <div className="w-full h-2 rounded-full bg-twilight flex overflow-hidden">
                  <div className="w-[10%] h-full bg-faint-line"></div>
                  <div className="w-[15%] h-full bg-outline-variant"></div>
                  {/* Optimal Dark Sky Window */}
                  <div className="w-[50%] h-full bg-aurora/80 border-t border-b border-aurora"></div>
                  <div className="w-[15%] h-full bg-outline-variant"></div>
                  <div className="w-[10%] h-full bg-faint-line"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
