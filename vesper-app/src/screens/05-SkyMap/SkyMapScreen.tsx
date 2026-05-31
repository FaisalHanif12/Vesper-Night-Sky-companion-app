import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function SkyMapScreen() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <style>{`
        .star-twinkle { animation: twinkle 4s infinite alternate; }
        @keyframes twinkle { 0% { opacity: 0.3; } 100% { opacity: 1; } }
        .draw-line { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 1.5s ease-out forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        .bloom { box-shadow: 0 0 12px 2px var(--tw-colors-brass); }
      `}</style>

      {/* TopAppBar */}
      <header className="fixed top-0 right-0 h-topbar-height left-0 md:left-sidebar-width bg-nightfall/80 backdrop-blur-md dark:bg-nightfall/80 border-b border-faint-line flex justify-between items-center px-gutter z-40 transition-opacity">
        <div className="md:hidden font-headline-sm text-headline-sm font-bold text-brass uppercase">VESPER</div>
        <div className="hidden md:block"></div>
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-3 text-moonlight font-data-sm text-data-sm">
            <span className="flex items-center hover:text-starlight cursor-pointer transition-colors">
              <span className="material-symbols-outlined mr-1 text-[18px]">location_on</span> Austin, TX
            </span>
            <span className="flex items-center hover:text-starlight cursor-pointer transition-colors">
              <span className="material-symbols-outlined mr-1 text-[18px]">schedule</span> 09:42 PM
            </span>
          </div>
          <button className="text-brass border border-faint-line hover:border-outline bg-twilight/30 px-4 py-1.5 rounded-DEFAULT font-data-sm text-data-sm transition-colors flex items-center">
            <span className="material-symbols-outlined mr-2 text-[18px]">add</span> Log Observation
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 ml-0 md:ml-sidebar-width mt-topbar-height p-gutter h-[calc(100vh-64px)] overflow-y-auto flex flex-col md:flex-row gap-grid-gap">

        {/* Left Column: Sky Map (72%) */}
        <section className="flex-[3] flex flex-col min-h-[600px] h-full relative">
          <div className="mb-4">
            <div className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-1">SKY MAP · AUSTIN, TX · 09:42 PM</div>
            <h2 className="font-headline-lg text-headline-lg text-starlight">Tonight's sky</h2>
          </div>
          <div className="flex-1 bg-[#0A0F1A] rounded-xl border border-faint-line relative overflow-hidden flex items-center justify-center p-4">
            {/* Outer Map Ring */}
            <div className="w-full max-w-[800px] aspect-square rounded-full border border-[#3A4566] relative flex items-center justify-center">
              {/* SVG Overlay for precise cartography */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
                {/* Azimuth Grid */}
                <circle cx="500" cy="500" fill="none" r="480" stroke="#2A3552" strokeWidth="1" />
                <circle cx="500" cy="500" fill="none" r="320" stroke="#2A3552" strokeDasharray="4 4" strokeWidth="0.5" />
                <circle cx="500" cy="500" fill="none" r="160" stroke="#2A3552" strokeDasharray="4 4" strokeWidth="0.5" />
                {/* Meridian */}
                <line className="draw-line" opacity="0.6" stroke="#E6BE7A" strokeWidth="1" x1="500" x2="500" y1="20" y2="980" />
                {/* Horizon */}
                <path d="M 20 500 Q 500 800 980 500 Q 500 200 20 500" fill="none" stroke="#2A3552" strokeWidth="1" />
                {/* Constellation Lines (Orion approx) */}
                <polyline className="draw-line" fill="none" opacity="0.4" points="400,600 450,550 480,560 520,530" stroke="#E8EDF7" strokeWidth="0.5" />
                <polyline className="draw-line" fill="none" opacity="0.4" points="450,550 430,500" stroke="#E8EDF7" strokeWidth="0.5" />
              </svg>
              {/* Cardinal Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 font-data-sm text-data-sm text-moonlight bg-[#0A0F1A] px-1">N</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-data-sm text-data-sm text-moonlight bg-[#0A0F1A] px-1">S</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 font-data-sm text-data-sm text-moonlight bg-[#0A0F1A] py-1">E</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 font-data-sm text-data-sm text-moonlight bg-[#0A0F1A] py-1">W</div>
              {/* Stars */}
              <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[30%] left-[40%] star-twinkle"></div>
              <div className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full top-[20%] left-[60%] star-twinkle" style={{ animationDelay: '1s' }}></div>
              <div className="absolute w-[3px] h-[3px] bg-[#E8EDF7] rounded-full top-[55%] left-[45%] bloom"></div>{/* Rigel */}
              <div className="absolute w-[3px] h-[3px] bg-[#E8EDF7] rounded-full top-[53%] left-[52%] bloom"></div>{/* Betelgeuse */}
              <div className="absolute top-[56%] left-[48%] font-label-caps text-label-caps text-moonlight opacity-60">ORION</div>
              {/* Planets */}
              {/* Jupiter */}
              <div className="absolute top-[40%] left-[70%] group cursor-pointer hover:scale-110 transition-transform">
                <div className="w-3 h-3 bg-brass rounded-full bloom"></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap bg-twilight border border-faint-line p-2 rounded text-data-sm font-data-sm text-starlight">
                  Jupiter <span className="text-moonlight ml-2">Mag -2.4</span>
                </div>
              </div>
              {/* Saturn */}
              <div className="absolute top-[60%] left-[30%] group cursor-pointer hover:scale-110 transition-transform">
                <div className="w-2.5 h-2.5 bg-brass-dim rounded-full bloom"></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap bg-twilight border border-faint-line p-2 rounded text-data-sm font-data-sm text-starlight">
                  Saturn <span className="text-moonlight ml-2">Mag +0.8</span>
                </div>
              </div>
              {/* Moon */}
              <div
                className="absolute top-[30%] left-[20%] w-8 h-8 rounded-full border border-starlight/30"
                style={{ background: 'radial-gradient(circle at 30% 30%, #E8EDF7 0%, #9AA6BF 70%, #141C30 100%)' }}
              ></div>
            </div>
          </div>
        </section>

        {/* Right Panel (28%) */}
        <section className="flex-1 flex flex-col gap-4 min-w-[300px]">
          {/* Card A: Time */}
          <div className="bg-nightfall rounded-[16px] border border-faint-line p-card-padding">
            <div className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-4">OBSERVATION TIME</div>
            <div className="flex items-end justify-between mb-6">
              <div className="font-data-xl text-data-xl text-brass">09:42<span className="text-data-sm font-data-sm text-brass-dim ml-1">PM</span></div>
              <div className="font-data-md text-data-md text-moonlight">Oct 14</div>
            </div>
            <div className="relative h-2 bg-twilight rounded-full mb-2">
              <div className="absolute left-[20%] right-[30%] h-full bg-[#3A4566] rounded-full"></div>
              <div className="absolute left-[45%] w-3 h-3 bg-brass rounded-full -top-0.5 shadow-[0_0_8px_rgba(230,190,122,0.5)]"></div>
            </div>
            <div className="flex justify-between font-data-sm text-data-sm text-moonlight/60 italic mb-1">
              <span>18:32 Sunset</span>
              <span>06:14 Sunrise</span>
            </div>
            <div className="font-body-sm text-body-sm text-moonlight italic">Drag to scrub through tonight's timeline.</div>
          </div>

          {/* Card B: View Controls */}
          <div className="bg-nightfall rounded-[16px] border border-faint-line p-card-padding">
            <div className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-4">VIEW</div>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-starlight">Constellations</span>
                <div className="w-10 h-5 bg-brass/20 rounded-full relative cursor-pointer border border-brass/50">
                  <div className="absolute right-1 top-0.5 w-4 h-4 bg-brass rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-starlight">Planets</span>
                <div className="w-10 h-5 bg-brass/20 rounded-full relative cursor-pointer border border-brass/50">
                  <div className="absolute right-1 top-0.5 w-4 h-4 bg-brass rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-moonlight">Deep-Sky Objects</span>
                <div className="w-10 h-5 bg-twilight rounded-full relative cursor-pointer border border-faint-line">
                  <div className="absolute left-1 top-0.5 w-4 h-4 bg-moonlight/50 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-twilight border border-faint-line hover:border-outline text-moonlight py-2 rounded flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
              <button className="flex-1 bg-twilight border border-faint-line hover:border-outline text-moonlight py-2 rounded flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <button className="flex-1 bg-twilight border border-faint-line hover:border-outline text-moonlight py-2 rounded flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px]">my_location</span>
              </button>
            </div>
          </div>

          {/* Card C: At Center */}
          <div className="bg-nightfall rounded-[16px] border border-faint-line p-card-padding flex-1 flex flex-col">
            <div className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-4">AT CENTER</div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-headline-md text-headline-md text-starlight">Orion</h3>
              <span className="px-2 py-0.5 bg-twilight border border-faint-line rounded font-data-sm text-data-sm text-moonlight">CON</span>
            </div>
            <p className="font-body-md text-body-md text-moonlight mb-4 line-clamp-3">The Hunter. Prominent during winter in the northern hemisphere. Contains bright stars Rigel and Betelgeuse, and the famous Orion Nebula (M42).</p>
            <div className="mt-auto pt-4 border-t border-faint-line flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-data-sm text-data-sm text-moonlight">RA 05h 35m</span>
                <span className="font-data-sm text-data-sm text-moonlight">Dec +05° 23'</span>
              </div>
              <a
                className="text-brass hover:text-primary transition-colors flex items-center font-data-sm text-data-sm uppercase tracking-wider cursor-pointer"
                onClick={() => navigate('/object-detail')}
              >
                Details <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

      </main>
    </AppLayout>
  );
}
