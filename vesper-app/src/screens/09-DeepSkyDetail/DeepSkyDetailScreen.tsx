import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function DeepSkyDetailScreen() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* TopAppBar */}
      <header className="fixed top-0 right-0 h-topbar-height left-0 md:left-sidebar-width bg-nightfall/80 backdrop-blur-md z-40 border-b border-faint-line flex justify-between items-center px-gutter w-full md:w-[calc(100%-240px)]">
        <div className="flex items-center space-x-4">
          <span className="font-headline-sm text-headline-sm font-bold text-brass md:hidden">VESPER</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-4 text-moonlight hover:text-brass transition-colors duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            <span className="font-data-sm text-data-sm">Clear Skies</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-moonlight hover:text-brass transition-colors duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <span className="font-data-sm text-data-sm">Now</span>
          </div>
          <button className="bg-brass text-midnight px-6 py-2 rounded-full font-data-sm text-data-sm hover:opacity-80 transition-opacity">
            + Log Observation
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="md:ml-sidebar-width pt-topbar-height min-h-screen relative nebula-shader flex flex-col items-center">
        <div className="w-full max-w-container-max px-gutter py-8 fade-in">
          {/* Header Section */}
          <div className="mb-section-gap">
            <button
              onClick={() => navigate('/tonight')}
              className="inline-flex items-center text-moonlight hover:text-starlight transition-colors mb-6 group"
            >
              <span className="font-body-md text-[14px] font-[500]">← Orion</span>
            </button>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="font-label-caps text-label-caps text-moonlight mb-2">EMISSION NEBULA · ORION</div>
                <h1 className="font-headline-lg text-headline-lg text-starlight mb-2">M42 — Orion Nebula</h1>
                <p className="font-quote text-[18px] text-moonlight italic">The nearest stellar nursery to Earth.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex bg-nightfall border border-faint-line rounded-full overflow-hidden">
                  <span className="px-4 py-1.5 font-data-sm text-data-sm bg-aurora/20 text-aurora border-r border-faint-line">NAKED EYE</span>
                  <span className="px-4 py-1.5 font-data-sm text-data-sm text-moonlight border-r border-faint-line">BINOS</span>
                  <span className="px-4 py-1.5 font-data-sm text-data-sm text-moonlight">SCOPE</span>
                </div>
                <button className="bg-brass text-midnight px-6 py-2.5 rounded-full font-data-sm text-data-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add to Log
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gap">
            {/* Left Column (44%) */}
            <div className="lg:col-span-5 space-y-grid-gap flex flex-col">
              {/* Nebula Visual Panel */}
              <div className="bg-nightfall border border-faint-line rounded-xl overflow-hidden relative aspect-square flex items-center justify-center group stagger-1">
                {/* Abstract Nebula Visualization */}
                <div className="absolute inset-0 bg-gradient-radial from-twilight to-nightfall"></div>
                <div className="absolute w-[60%] h-[60%] rounded-full bg-nebula/20 blur-[60px]"></div>
                <div className="absolute w-[40%] h-[40%] rounded-full bg-aurora/10 blur-[40px] translate-x-4 -translate-y-4"></div>
                <div className="absolute w-[20%] h-[20%] rounded-full bg-starlight/30 blur-[20px]"></div>
                {/* Trapezium Cluster */}
                <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] -translate-x-1 -translate-y-1 stagger-2"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] translate-x-2 translate-y-1 stagger-2" style={{ animationDelay: '250ms' }}></div>
                <div className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] translate-x-1 -translate-y-3 stagger-2" style={{ animationDelay: '300ms' }}></div>
                <div className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] -translate-x-3 translate-y-2 stagger-2" style={{ animationDelay: '350ms' }}></div>
                {/* Finder Reticle */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
                  <circle className="draw-ring" cx="50" cy="50" fill="none" r="40" stroke="#E6BE7A" strokeDasharray="1000" strokeDashoffset="0" strokeWidth="0.5" />
                  <circle cx="50" cy="50" fill="none" opacity="0.3" r="40" stroke="#E6BE7A" strokeWidth="0.5" />
                  <line stroke="#E6BE7A" strokeWidth="0.5" x1="10" x2="20" y1="50" y2="50" />
                  <line stroke="#E6BE7A" strokeWidth="0.5" x1="80" x2="90" y1="50" y2="50" />
                  <line stroke="#E6BE7A" strokeWidth="0.5" x1="50" x2="50" y1="10" y2="20" />
                  <line stroke="#E6BE7A" strokeWidth="0.5" x1="50" x2="50" y1="80" y2="90" />
                </svg>
                <div className="absolute bottom-4 right-4 font-data-md text-[20px] text-brass">M42</div>
              </div>

              {/* Lore Card */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding stagger-2 flex-1">
                <div className="font-label-caps text-label-caps text-moonlight mb-4">OBSERVER'S NOTES</div>
                <p className="font-body-md text-body-md text-starlight leading-relaxed mb-4">
                  Visible to the naked eye even in areas affected by some light pollution, M42 appears as a fuzzy "star" in the middle of Orion's sword. Under dark skies, it reveals itself as a massive cloud of glowing gas and dust.
                </p>
                <p className="font-body-md text-body-md text-starlight leading-relaxed italic text-moonlight">
                  "The great nebula in Orion is a sight that never fails to impress, a glowing cosmic bat extending its wings across the field of view."
                </p>
              </div>
            </div>

            {/* Right Column (56%) */}
            <div className="lg:col-span-7 space-y-grid-gap">
              {/* Card A: Object Data */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding stagger-2">
                <div className="font-label-caps text-label-caps text-moonlight mb-6">PHYSICAL DATA</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">DESIGNATION</div>
                    <div className="font-data-md text-[15px] text-brass">M42 / NGC 1976</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">TYPE</div>
                    <div className="font-data-md text-[15px] text-starlight">Emission Nebula</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">MAGNITUDE</div>
                    <div className="font-data-md text-[15px] text-brass">+4.0</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">APPARENT SIZE</div>
                    <div className="font-data-md text-[15px] text-starlight">85' × 60'</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">DISTANCE</div>
                    <div className="font-data-md text-[15px] text-starlight">1,344 ly</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">CONSTELLATION</div>
                    <div className="font-data-md text-[15px] text-starlight">Orion</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">DISCOVERY</div>
                    <div className="font-data-md text-[15px] text-moonlight">1610 (Peiresc)</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-moonlight mb-1">BEST GEAR</div>
                    <div className="font-data-md text-[15px] text-moonlight">Low-power scope</div>
                  </div>
                </div>
              </div>

              {/* Card B: Star-Hop Guide */}
              <div className="bg-nightfall border border-faint-line rounded-xl relative overflow-hidden stagger-3 flex flex-col md:flex-row">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass"></div>
                <div className="w-full md:w-1/2 p-card-padding border-b md:border-b-0 md:border-r border-faint-line bg-twilight/30 flex flex-col justify-center items-center relative min-h-[200px]">
                  {/* Minimalist Star-Hop Map */}
                  <div className="absolute w-full h-full p-6">
                    <svg className="overflow-visible" height="100%" viewBox="0 0 100 100" width="100%">
                      {/* Orion's Belt */}
                      <circle cx="20" cy="20" fill="#E8EDF7" r="1.5" />
                      <circle cx="35" cy="30" fill="#E8EDF7" r="1.5" />
                      <circle cx="50" cy="40" fill="#E8EDF7" r="1.5" />
                      {/* Sword */}
                      <circle cx="45" cy="55" fill="#9AA6BF" r="1" />
                      {/* M42 */}
                      <circle cx="42" cy="70" fill="#9B86C4" opacity="0.6" r="3" />
                      <circle cx="42" cy="70" fill="#E6BE7A" r="1" />
                      <circle cx="39" cy="85" fill="#9AA6BF" r="1" />
                      {/* Hop Arrow */}
                      <path d="M 35 30 Q 55 50 45 65" fill="none" stroke="#E6BE7A" strokeDasharray="2,2" strokeWidth="1" />
                      <polygon fill="#E6BE7A" points="45,65 42,60 48,60" transform="rotate(-30 45 65)" />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-card-padding flex flex-col justify-center">
                  <div className="font-label-caps text-label-caps text-moonlight mb-4">STAR-HOP GUIDE</div>
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <span className="font-data-sm text-brass mt-0.5">01</span>
                      <span className="font-body-md text-starlight text-sm">Locate the three prominent stars forming Orion's Belt.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-data-sm text-brass mt-0.5">02</span>
                      <span className="font-body-md text-starlight text-sm">Look for the "Sword" hanging down from the center of the Belt.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-data-sm text-brass mt-0.5">03</span>
                      <span className="font-body-md text-starlight text-sm">M42 is the fuzzy "middle star" in the Sword.</span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Card C: Tonight's Visibility */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding stagger-4">
                <div className="flex justify-between items-end mb-6">
                  <div className="font-label-caps text-label-caps text-moonlight">TONIGHT'S VISIBILITY</div>
                  <div className="flex items-center gap-1">
                    <span className="font-label-caps text-label-caps text-moonlight mr-2">SEEING</span>
                    <span className="material-symbols-outlined text-[14px] text-brass" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[14px] text-brass" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[14px] text-brass" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[14px] text-faint-line" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[14px] text-faint-line" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-3 bg-twilight/50 rounded-lg border border-faint-line">
                    <div className="font-label-caps text-[10px] text-moonlight mb-1">RISES</div>
                    <div className="font-data-md text-starlight">18:42</div>
                  </div>
                  <div className="text-center p-3 bg-twilight/50 rounded-lg border border-faint-line border-b-2 border-b-brass">
                    <div className="font-label-caps text-[10px] text-brass mb-1">PEAKS</div>
                    <div className="font-data-md text-brass">00:15</div>
                  </div>
                  <div className="text-center p-3 bg-twilight/50 rounded-lg border border-faint-line">
                    <div className="font-label-caps text-[10px] text-moonlight mb-1">SETS</div>
                    <div className="font-data-md text-starlight">05:48</div>
                  </div>
                </div>
                {/* Visibility Bar */}
                <div className="relative pt-4 pb-2">
                  <div className="h-2 bg-twilight rounded-full w-full overflow-hidden">
                    <div className="h-full bg-brass rounded-full w-[60%] ml-[20%] opacity-80"></div>
                  </div>
                  {/* Now Marker */}
                  <div className="absolute top-1 left-[45%] flex flex-col items-center transform -translate-x-1/2">
                    <div className="w-1 h-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10"></div>
                    <div className="font-data-sm text-[10px] text-white mt-1">NOW</div>
                  </div>
                  <div className="flex justify-between mt-2 px-1">
                    <span className="font-data-sm text-[10px] text-faint-line">18:00</span>
                    <span className="font-data-sm text-[10px] text-moonlight">00:00</span>
                    <span className="font-data-sm text-[10px] text-faint-line">06:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
