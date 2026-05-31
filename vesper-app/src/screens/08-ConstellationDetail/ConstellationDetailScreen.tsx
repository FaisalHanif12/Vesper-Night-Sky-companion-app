import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function ConstellationDetailScreen() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* Atmospheric Background */}
      <div className="absolute inset-0 star-field opacity-40 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/90 to-nightfall pointer-events-none z-0"></div>

      <style>{`
        .star-field {
          background-image:
            radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 90px 40px, #E6BE7A, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 200px 50px, #E8EDF7, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 250px 90px, #ffffff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 300px 150px;
          animation: drift 120s linear infinite;
        }
        @keyframes drift {
          from { background-position: 0 0; }
          to { background-position: -300px -150px; }
        }

        .constellation-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 2s ease-out forwards;
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }

        .star-point {
          opacity: 0;
          animation: twinkleIn 0.5s ease-out forwards;
        }
        @keyframes twinkleIn {
          to { opacity: 1; }
        }

        .nebula-haze {
          opacity: 0;
          animation: fadeNebula 3s ease-in-out forwards;
          animation-delay: 1.5s;
        }
        @keyframes fadeNebula {
          to { opacity: 0.15; }
        }

        .stagger-1 { animation: slideUp 0.6s ease-out 0.1s both; }
        .stagger-2 { animation: slideUp 0.6s ease-out 0.2s both; }
        .stagger-3 { animation: slideUp 0.6s ease-out 0.3s both; }
        .stagger-4 { animation: slideUp 0.6s ease-out 0.4s both; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative z-10 max-w-container-max mx-auto h-full flex flex-col">
        {/* Breadcrumb / Back */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/sky-map')}
            className="inline-flex items-center text-moonlight hover:text-starlight transition-colors font-body-md font-medium group"
          >
            <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> Sky Map
          </button>
        </div>

        {/* Page Header */}
        <header className="flex justify-between items-end mb-8 stagger-1">
          <div>
            <span className="font-label-caps text-moonlight tracking-[0.14em] uppercase block mb-2">Constellation · Winter Sky</span>
            <div className="flex items-baseline gap-4">
              <h1 className="font-headline-display text-starlight text-[48px] font-bold leading-none">Orion</h1>
              <span className="font-quote text-moonlight italic text-[20px]">The Hunter</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-twilight px-3 py-1 rounded-full border border-aurora/30 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-aurora animate-pulse"></div>
              <span className="font-data-sm text-aurora font-mono uppercase">Visible Now</span>
            </div>
            <button className="bg-brass text-midnight px-6 py-2 rounded font-data-sm font-mono flex items-center gap-2 hover:bg-brass-dim transition-colors shadow-[0_0_15px_rgba(230,190,122,0.15)]">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Log Observation
            </button>
          </div>
        </header>

        {/* Layout Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[52%_48%] gap-6 pb-8">

          {/* LEFT COLUMN: Constellation Diagram */}
          <div className="bg-nightfall border border-faint-line rounded-lg overflow-hidden flex flex-col relative stagger-2 min-h-[500px]">
            <div className="p-4 border-b border-faint-line flex justify-between items-center bg-midnight/50 z-10">
              <h2 className="font-label-caps text-moonlight tracking-widest">Star Chart</h2>
              <span className="material-symbols-outlined text-moonlight text-sm">fullscreen</span>
            </div>
            <div className="flex-1 bg-midnight relative overflow-hidden flex items-center justify-center p-8">
              {/* Abstract Constellation Rendering */}
              <svg className="w-full h-full max-h-[600px] overflow-visible" viewBox="0 0 400 500">
                {/* Nebula M42 */}
                <circle className="nebula-haze filter blur-xl" cx="200" cy="320" fill="#9B86C4" r="40" />

                {/* Lines */}
                <g fill="none" opacity="0.6" stroke="#4A5A7A" strokeWidth="1.5">
                  {/* Shoulders to Belt */}
                  <line className="constellation-line" x1="120" x2="160" y1="100" y2="250" />
                  {/* Betelgeuse to Alnitak */}
                  <line className="constellation-line" style={{ animationDelay: '0.2s' }} x1="280" x2="240" y1="120" y2="230" />
                  {/* Bellatrix to Mintaka */}
                  {/* Shoulders */}
                  <line className="constellation-line" style={{ animationDelay: '0.4s' }} x1="120" x2="280" y1="100" y2="120" />
                  {/* Betelgeuse to Bellatrix */}
                  {/* Belt */}
                  <line className="constellation-line" style={{ animationDelay: '0.6s' }} x1="160" x2="200" y1="250" y2="240" />
                  {/* Alnitak to Alnilam */}
                  <line className="constellation-line" style={{ animationDelay: '0.8s' }} x1="200" x2="240" y1="240" y2="230" />
                  {/* Alnilam to Mintaka */}
                  {/* Belt to Knees/Feet */}
                  <line className="constellation-line" style={{ animationDelay: '1.0s' }} x1="160" x2="140" y1="250" y2="400" />
                  {/* Alnitak to Saiph */}
                  <line className="constellation-line" style={{ animationDelay: '1.2s' }} x1="240" x2="270" y1="230" y2="380" />
                  {/* Mintaka to Rigel */}
                  {/* Feet */}
                  <line className="constellation-line" style={{ animationDelay: '1.4s' }} x1="140" x2="270" y1="400" y2="380" />
                  {/* Saiph to Rigel */}
                  {/* Sword */}
                  <line className="constellation-line" style={{ animationDelay: '1.6s' }} x1="200" x2="200" y1="240" y2="320" />
                  {/* Alnilam to M42 area */}
                </g>

                {/* Stars */}
                {/* Betelgeuse */}
                <g className="star-point" style={{ animationDelay: '0s' }} transform="translate(120, 100)">
                  <circle fill="#D4856A" filter="drop-shadow(0 0 8px #D4856A)" r="6" />
                  <text className="font-body-sm text-[11px]" fill="#E8EDF7" textAnchor="end" x="-15" y="-10">Betelgeuse</text>
                </g>

                {/* Bellatrix */}
                <g className="star-point" style={{ animationDelay: '0.4s' }} transform="translate(280, 120)">
                  <circle fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" r="4" />
                  <text className="font-body-sm text-[11px]" fill="#E8EDF7" x="15" y="-5">Bellatrix</text>
                </g>

                {/* Belt: Alnitak */}
                <g className="star-point" style={{ animationDelay: '0.6s' }} transform="translate(160, 250)">
                  <circle fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff)" r="3" />
                  <text className="font-body-sm text-[10px]" fill="#9AA6BF" textAnchor="end" x="-10" y="5">Alnitak</text>
                </g>

                {/* Belt: Alnilam */}
                <g className="star-point" style={{ animationDelay: '0.8s' }} transform="translate(200, 240)">
                  <circle fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" r="4" />
                  <text className="font-body-sm text-[11px]" fill="#E8EDF7" textAnchor="middle" x="0" y="-10">Alnilam</text>
                </g>

                {/* Belt: Mintaka */}
                <g className="star-point" style={{ animationDelay: '1.0s' }} transform="translate(240, 230)">
                  <circle fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff)" r="3" />
                  <text className="font-body-sm text-[10px]" fill="#9AA6BF" x="10" y="5">Mintaka</text>
                </g>

                {/* Saiph */}
                <g className="star-point" style={{ animationDelay: '1.4s' }} transform="translate(140, 400)">
                  <circle fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" r="4" />
                  <text className="font-body-sm text-[11px]" fill="#E8EDF7" textAnchor="end" x="-15" y="5">Saiph</text>
                </g>

                {/* Rigel */}
                <g className="star-point" style={{ animationDelay: '1.2s' }} transform="translate(270, 380)">
                  <circle fill="#C8D8F0" filter="drop-shadow(0 0 10px #C8D8F0)" r="7" />
                  <text className="font-body-sm text-[11px]" fill="#E8EDF7" x="15" y="5">Rigel</text>
                </g>

                {/* M42 Marker */}
                <g className="star-point" style={{ animationDelay: '1.8s' }} transform="translate(200, 320)">
                  <circle fill="none" r="8" stroke="#E6BE7A" strokeDasharray="2 2" strokeWidth="1" />
                  <circle fill="#E6BE7A" r="1" />
                  <text className="font-data-sm text-[10px] font-mono" fill="#E6BE7A" x="12" y="4">M42</text>
                </g>
              </svg>
            </div>
          </div>

          {/* RIGHT COLUMN: Data Cards */}
          <div className="flex flex-col gap-6">

            {/* Card A: Overview */}
            <div className="bg-nightfall border border-faint-line rounded-lg p-5 stagger-3 hover:border-outline transition-colors duration-300">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <span className="font-label-caps text-moonlight block mb-1">RIGHT ASCENSION</span>
                  <span className="font-data-md text-starlight font-mono">05h 35m</span>
                </div>
                <div>
                  <span className="font-label-caps text-moonlight block mb-1">DECLINATION</span>
                  <span className="font-data-md text-starlight font-mono">+05° 23'</span>
                </div>
                <div>
                  <span className="font-label-caps text-moonlight block mb-1">AREA</span>
                  <span className="font-data-md text-starlight font-mono">594 sq deg</span>
                </div>
                <div>
                  <span className="font-label-caps text-moonlight block mb-1">MAIN STARS</span>
                  <span className="font-data-md text-starlight font-mono">7 (Belt + Body)</span>
                </div>
              </div>
            </div>

            {/* Card B: Mythology */}
            <div className="bg-nightfall border border-faint-line rounded-lg p-5 relative overflow-hidden stagger-3">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass"></div>
              <h3 className="font-label-caps text-moonlight tracking-widest mb-3 pl-2">MYTHOLOGY</h3>
              <p className="font-quote text-starlight text-[18px] leading-relaxed pl-2 mb-3">
                In Greek mythology, Orion was a gigantic, supernaturally strong hunter of ancient times.
              </p>
              <p className="font-body-md text-moonlight italic pl-2 border-l border-faint-line ml-2 pl-4">
                "He stands upon the celestial equator, club raised, facing the charge of Taurus the Bull."
              </p>
            </div>

            {/* Card C: Notable Stars */}
            <div className="bg-nightfall border border-faint-line rounded-lg flex flex-col stagger-4">
              <div className="p-4 border-b border-faint-line flex justify-between items-center">
                <h3 className="font-label-caps text-moonlight tracking-widest">NOTABLE STARS</h3>
              </div>
              <div className="flex flex-col">
                {/* Row 1 */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center p-3 border-b border-faint-line/50 hover:bg-twilight/30 transition-colors px-4">
                  <span className="font-body-md text-starlight font-medium">Betelgeuse</span>
                  <span className="inline-block bg-twilight border border-faint-line text-moonlight text-[10px] px-2 py-0.5 rounded-full w-max">Red Supergiant</span>
                  <span className="font-data-sm text-brass font-mono text-right">0.42v</span>
                  <span className="font-data-sm text-moonlight font-mono text-right">642 ly</span>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center p-3 border-b border-faint-line/50 hover:bg-twilight/30 transition-colors px-4">
                  <span className="font-body-md text-starlight font-medium">Rigel</span>
                  <span className="inline-block bg-twilight border border-faint-line text-moonlight text-[10px] px-2 py-0.5 rounded-full w-max">Blue Supergiant</span>
                  <span className="font-data-sm text-brass font-mono text-right">0.13</span>
                  <span className="font-data-sm text-moonlight font-mono text-right">863 ly</span>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center p-3 border-b border-faint-line/50 hover:bg-twilight/30 transition-colors px-4">
                  <span className="font-body-md text-starlight font-medium">Bellatrix</span>
                  <span className="inline-block bg-twilight border border-faint-line text-moonlight text-[10px] px-2 py-0.5 rounded-full w-max">Blue Giant</span>
                  <span className="font-data-sm text-brass font-mono text-right">1.64</span>
                  <span className="font-data-sm text-moonlight font-mono text-right">250 ly</span>
                </div>
                {/* Row 4 */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center p-3 hover:bg-twilight/30 transition-colors px-4">
                  <span className="font-body-md text-starlight font-medium">Alnilam</span>
                  <span className="inline-block bg-twilight border border-faint-line text-moonlight text-[10px] px-2 py-0.5 rounded-full w-max">Blue Supergiant</span>
                  <span className="font-data-sm text-brass font-mono text-right">1.69</span>
                  <span className="font-data-sm text-moonlight font-mono text-right">2000 ly</span>
                </div>
              </div>
            </div>

            {/* Card D: Deep-Sky Objects */}
            <div className="bg-nightfall border border-faint-line rounded-lg flex flex-col stagger-4">
              <div className="p-4 border-b border-faint-line flex justify-between items-center">
                <h3 className="font-label-caps text-moonlight tracking-widest">DEEP-SKY OBJECTS</h3>
              </div>
              <div className="flex flex-col">
                {/* Row 1: Linked */}
                <a className="grid grid-cols-[1fr_2fr_auto] items-center p-3 border-b border-faint-line/50 hover:bg-twilight/50 hover:border-l-2 hover:border-l-brass transition-all px-4 group" href="#">
                  <span className="font-data-sm text-starlight font-mono">M42</span>
                  <span className="font-body-sm text-moonlight group-hover:text-starlight transition-colors">Orion Nebula</span>
                  <span className="material-symbols-outlined text-moonlight text-sm group-hover:translate-x-1 transition-transform group-hover:text-brass">arrow_forward</span>
                </a>
                {/* Row 2 */}
                <div className="grid grid-cols-[1fr_2fr_auto] items-center p-3 border-b border-faint-line/50 hover:bg-twilight/30 transition-colors px-4">
                  <span className="font-data-sm text-starlight font-mono">M43</span>
                  <span className="font-body-sm text-moonlight">De Mairan's Nebula</span>
                  <span className="material-symbols-outlined text-transparent text-sm">arrow_forward</span>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-[1fr_2fr_auto] items-center p-3 hover:bg-twilight/30 transition-colors px-4">
                  <span className="font-data-sm text-starlight font-mono">NGC 2024</span>
                  <span className="font-body-sm text-moonlight">Flame Nebula</span>
                  <span className="material-symbols-outlined text-transparent text-sm">arrow_forward</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
