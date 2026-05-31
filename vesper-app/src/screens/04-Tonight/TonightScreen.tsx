import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function TonightScreen() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* Ambient Star Field Background */}
      <div className="fixed inset-0 pointer-events-none z-0 star-field-bg opacity-50"></div>

      {/* TopAppBar Component */}
      <header
        className="hidden md:flex justify-between items-center px-gutter w-full bg-nightfall/80 backdrop-blur-md dark:bg-nightfall/80 text-brass dark:text-brass font-headline-sm text-headline-sm fixed top-0 right-0 h-topbar-height border-b border-faint-line z-30"
        style={{ width: 'calc(100% - 240px)' }}
      >
        <div className="flex items-center gap-4">
          <span className="font-label-caps text-label-caps text-moonlight">OBSERVATORY STATUS: ONLINE</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-moonlight font-data-sm text-data-sm border-r border-faint-line pr-4">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            <span>40.71° N, 74.00° W</span>
          </div>
          <div className="flex items-center gap-2 text-moonlight font-data-sm text-data-sm pr-2">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="text-starlight">21:42 LST</span>
          </div>
          <button className="px-4 py-2 bg-transparent border border-faint-line text-starlight hover:border-outline transition-colors duration-200 rounded flex items-center gap-2 font-data-sm text-data-sm active:opacity-80">
            Clear Skies
          </button>
          <button className="px-4 py-2 bg-brass text-midnight hover:bg-surface-tint transition-colors duration-200 rounded flex items-center gap-2 font-data-sm text-data-sm font-bold active:opacity-80">
            + Log Observation
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <div className="relative z-10 pt-topbar-height min-h-screen pb-12">
        <div className="max-w-container-max mx-auto px-gutter pt-8">

          {/* Header Section */}
          <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
            <p className="font-label-caps text-label-caps text-brass tracking-widest uppercase mb-2">TONIGHT · FRIDAY, MAY 30</p>
            <h2 className="font-headline-display text-headline-display text-starlight">5 objects worth stepping out for</h2>
          </div>

          {/* Sky-strip Panoramic Band */}
          <div className="w-full h-32 bg-twilight/30 border border-faint-line rounded-xl mb-grid-gap relative overflow-hidden flex items-end pb-4 px-8">
            {/* Horizon Line */}
            <div className="absolute bottom-6 left-0 w-full border-b border-faint-line/50"></div>
            {/* Vertical Brass NOW Meridian */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-brass z-10 shadow-[0_0_10px_rgba(230,190,122,0.5)]"></div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-midnight px-2 border border-brass/30 text-brass font-label-caps text-label-caps rounded-full z-20">NOW</div>
            {/* Cardinals */}
            <div className="absolute bottom-1 left-8 text-moonlight font-data-sm text-data-sm">W</div>
            <div className="absolute bottom-1 left-1/4 text-faint-line font-data-sm text-data-sm">SW</div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-moonlight font-data-sm text-data-sm">S</div>
            <div className="absolute bottom-1 right-1/4 text-faint-line font-data-sm text-data-sm">SE</div>
            <div className="absolute bottom-1 right-8 text-moonlight font-data-sm text-data-sm">E</div>
            {/* Markers */}
            <div className="absolute bottom-12 left-[30%] flex flex-col items-center gap-1 group cursor-pointer hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-starlight text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label-caps text-label-caps text-moonlight opacity-0 group-hover:opacity-100 transition-opacity">SIRIUS</span>
            </div>
            <div className="absolute bottom-20 left-[45%] flex flex-col items-center gap-1 group cursor-pointer hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-brass text-[24px]" style={{ fontVariationSettings: "'FILL' 1", filter: 'drop-shadow(0 0 8px rgba(230,190,122,0.4))' }}>brightness_3</span>
              <span className="font-label-caps text-label-caps text-moonlight opacity-0 group-hover:opacity-100 transition-opacity">MOON</span>
            </div>
            <div className="absolute bottom-16 right-[35%] flex flex-col items-center gap-1 group cursor-pointer hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-tertiary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              <span className="font-label-caps text-label-caps text-moonlight opacity-0 group-hover:opacity-100 transition-opacity">SATURN</span>
            </div>
            <div className="absolute bottom-24 right-[15%] flex flex-col items-center gap-1 group cursor-pointer hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-secondary text-[16px]">satellite_alt</span>
              <span className="font-label-caps text-label-caps text-moonlight opacity-0 group-hover:opacity-100 transition-opacity">ISS</span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gap">

            {/* Left Column: BEST TARGETS TONIGHT (58% ~ 7 cols) */}
            <div className="lg:col-span-7 bg-nightfall border border-faint-line rounded-xl p-card-padding flex flex-col gap-4 relative overflow-hidden">
              <h3 className="font-label-caps text-label-caps text-moonlight tracking-widest">BEST TARGETS TONIGHT</h3>
              <div className="flex flex-col border-t border-faint-line">

                {/* Row 1: Saturn */}
                <div className="flex items-center justify-between py-3 border-b border-faint-line/50 hover:bg-twilight/30 group transition-colors relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass scale-y-0 group-hover:scale-y-100 origin-left transition-transform duration-200"></div>
                  <div className="flex items-center gap-4 pl-3">
                    <span className="font-data-sm text-data-sm text-faint-line">01</span>
                    <div className="w-8 h-8 rounded bg-twilight border border-faint-line flex items-center justify-center">
                      <span className="material-symbols-outlined text-brass text-[18px]">public</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-starlight">Saturn</span>
                      <span className="font-data-sm text-data-sm text-moonlight">Southeast · 42° above</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pr-2">
                    <span className="px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-label-caps text-label-caps text-secondary">PLANET</span>
                    <span className="px-2 py-0.5 rounded-full bg-on-tertiary-container/20 border border-on-tertiary-container text-tertiary font-label-caps text-label-caps">NAKED EYE</span>
                    <div className="w-16 text-right font-data-sm text-data-sm text-moonlight">
                      R: 20:14
                    </div>
                  </div>
                </div>

                {/* Row 2: Jupiter */}
                <div className="flex items-center justify-between py-3 border-b border-faint-line/50 hover:bg-twilight/30 group transition-colors relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass scale-y-0 group-hover:scale-y-100 origin-left transition-transform duration-200"></div>
                  <div className="flex items-center gap-4 pl-3">
                    <span className="font-data-sm text-data-sm text-faint-line">02</span>
                    <div className="w-8 h-8 rounded bg-twilight border border-faint-line flex items-center justify-center">
                      <span className="material-symbols-outlined text-brass text-[18px]">language</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-starlight">Jupiter</span>
                      <span className="font-data-sm text-data-sm text-moonlight">Southwest · 30° above</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pr-2">
                    <span className="px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-label-caps text-label-caps text-secondary">PLANET</span>
                    <span className="px-2 py-0.5 rounded-full bg-on-tertiary-container/20 border border-on-tertiary-container text-tertiary font-label-caps text-label-caps">NAKED EYE</span>
                    <div className="w-16 text-right font-data-sm text-data-sm text-moonlight">
                      S: 23:45
                    </div>
                  </div>
                </div>

                {/* Row 3: ISS Pass */}
                <div className="flex items-center justify-between py-3 border-b border-faint-line/50 hover:bg-twilight/30 group transition-colors relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass scale-y-0 group-hover:scale-y-100 origin-left transition-transform duration-200"></div>
                  <div className="flex items-center gap-4 pl-3">
                    <span className="font-data-sm text-data-sm text-faint-line">03</span>
                    <div className="w-8 h-8 rounded bg-twilight border border-faint-line flex items-center justify-center">
                      <span className="material-symbols-outlined text-brass text-[18px]">satellite_alt</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-starlight">ISS Pass</span>
                      <span className="font-data-sm text-data-sm text-moonlight">W to NE · Max 68°</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pr-2">
                    <span className="px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-label-caps text-label-caps text-secondary">SATELLITE</span>
                    <span className="px-2 py-0.5 rounded-full bg-on-tertiary-container/20 border border-on-tertiary-container text-tertiary font-label-caps text-label-caps">NAKED EYE</span>
                    <div className="w-16 text-right font-data-sm text-data-sm text-brass">
                      21:14
                    </div>
                  </div>
                </div>

                {/* Row 4: Perseid Shower */}
                <div className="flex items-center justify-between py-3 border-b border-faint-line/50 hover:bg-twilight/30 group transition-colors relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass scale-y-0 group-hover:scale-y-100 origin-left transition-transform duration-200"></div>
                  <div className="flex items-center gap-4 pl-3">
                    <span className="font-data-sm text-data-sm text-faint-line">04</span>
                    <div className="w-8 h-8 rounded bg-twilight border border-faint-line flex items-center justify-center">
                      <span className="material-symbols-outlined text-brass text-[18px]">lens_blur</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-starlight">Perseid Shower</span>
                      <span className="font-data-sm text-data-sm text-moonlight">Northeast · Radiant 45°</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pr-2">
                    <span className="px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-label-caps text-label-caps text-secondary">METEOR</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-highest border border-faint-line text-moonlight font-label-caps text-label-caps">DARK SKY</span>
                    <div className="w-16 text-right font-data-sm text-data-sm text-moonlight">
                      Peak
                    </div>
                  </div>
                </div>

                {/* Row 5: M42 Nebula */}
                <div className="flex items-center justify-between py-3 border-b border-faint-line/50 hover:bg-twilight/30 group transition-colors relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass scale-y-0 group-hover:scale-y-100 origin-left transition-transform duration-200"></div>
                  <div className="flex items-center gap-4 pl-3">
                    <span className="font-data-sm text-data-sm text-faint-line">05</span>
                    <div className="w-8 h-8 rounded bg-twilight border border-faint-line flex items-center justify-center">
                      <span className="material-symbols-outlined text-brass text-[18px]">blur_on</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-starlight">M42 Orion Nebula</span>
                      <span className="font-data-sm text-data-sm text-moonlight">South · 55° above</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pr-2">
                    <span className="px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-label-caps text-label-caps text-secondary">DSO</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-highest border border-faint-line text-moonlight font-label-caps text-label-caps">BINOCULARS</span>
                    <div className="w-16 text-right font-data-sm text-data-sm text-moonlight">
                      S: 01:20
                    </div>
                  </div>
                </div>

                {/* Row 6: Moon */}
                <div className="flex items-center justify-between py-3 hover:bg-twilight/30 group transition-colors relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass scale-y-0 group-hover:scale-y-100 origin-left transition-transform duration-200"></div>
                  <div className="flex items-center gap-4 pl-3">
                    <span className="font-data-sm text-data-sm text-faint-line">06</span>
                    <div className="w-8 h-8 rounded bg-twilight border border-faint-line flex items-center justify-center">
                      <span className="material-symbols-outlined text-brass text-[18px]">brightness_3</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-starlight">Moon</span>
                      <span className="font-data-sm text-data-sm text-moonlight">East · 15° above</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pr-2">
                    <span className="px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-label-caps text-label-caps text-secondary">LUNAR</span>
                    <span className="px-2 py-0.5 rounded-full bg-on-tertiary-container/20 border border-on-tertiary-container text-tertiary font-label-caps text-label-caps">NAKED EYE</span>
                    <div className="w-16 text-right font-data-sm text-data-sm text-moonlight">
                      R: 20:45
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column (42% ~ 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-grid-gap">

              {/* Card A: CONDITIONS */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-label-caps text-label-caps text-moonlight tracking-widest">CONDITIONS</h3>
                  <span className="px-2 py-1 bg-surface-container-highest border border-faint-line rounded text-starlight font-data-sm text-data-sm">Bortle Class 4</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-twilight border border-faint-line rounded-lg p-3 flex flex-col justify-between">
                    <span className="font-label-caps text-label-caps text-moonlight mb-2">CLOUD COVER</span>
                    <div className="flex items-end justify-between">
                      <span className="font-data-lg text-data-lg text-starlight">87%</span>
                      <span className="material-symbols-outlined text-aurora text-[20px]">wb_sunny</span>
                    </div>
                  </div>
                  <div className="bg-twilight border border-faint-line rounded-lg p-3 flex flex-col justify-between">
                    <span className="font-label-caps text-label-caps text-moonlight mb-2">SEEING (ARCSEC)</span>
                    <div className="flex items-end justify-between">
                      <span className="font-data-lg text-data-lg text-starlight">1.2"</span>
                      <span className="material-symbols-outlined text-brass text-[20px]">visibility</span>
                    </div>
                  </div>
                  <div className="bg-twilight border border-faint-line rounded-lg p-3 flex flex-col justify-between">
                    <span className="font-label-caps text-label-caps text-moonlight mb-2">LUNAR ILLUM</span>
                    <div className="flex items-end justify-between">
                      <span className="font-data-lg text-data-lg text-starlight">43%</span>
                      <span className="material-symbols-outlined text-moonlight text-[20px]">brightness_4</span>
                    </div>
                  </div>
                  <div className="bg-twilight border border-faint-line rounded-lg p-3 flex flex-col justify-between">
                    <span className="font-label-caps text-label-caps text-moonlight mb-2">DARK WINDOW</span>
                    <div className="flex items-end justify-between">
                      <span className="font-data-md text-data-md text-starlight">22:30 - 04:15</span>
                      <span className="material-symbols-outlined text-tertiary-container text-[20px]">timelapse</span>
                    </div>
                  </div>
                </div>
                {/* Condition Bar */}
                <div className="mt-4">
                  <div className="flex justify-between font-label-caps text-label-caps text-moonlight mb-1">
                    <span>OBSERVATION QUALITY</span>
                    <span className="text-aurora">GOOD</span>
                  </div>
                  <div className="h-2 w-full bg-twilight rounded-full overflow-hidden border border-faint-line">
                    <div className="h-full bg-gradient-to-r from-aurora to-surface-tint w-[75%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Card B: FEATURED TONIGHT */}
              <div className="bg-nightfall border border-faint-line rounded-xl p-card-padding flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-4 left-4">
                  <span className="font-label-caps text-label-caps text-moonlight tracking-widest">FEATURED TONIGHT</span>
                </div>
                {/* Glowing Saturn Graphic */}
                <div className="mt-10 mb-6 relative w-24 h-24 flex items-center justify-center">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-surface-tint opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
                  <img
                    alt="Featured object Saturn"
                    className="w-20 h-20 object-cover rounded-full border border-faint-line z-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI-Bh7FLB24s1jt24JY0vZ3zAOxw3xUbws25_a45w16cf5nITMq8I8RprGmZ8BQuyCrm9eNYqMM-osmWAqcmENcsh1upbPvNsbwI5MoglwKkMAv8kCY9ReDou3yLkXZ8zbvrJIy9FioKCrulgvAMstJmJEm1oWa4rxYWuRDNOP32Ci7_yjyxujoHB69I493bLt9dfrISB6O214ujO2_qkeMz4Rvws4tigy1EjBKj8q0KaUvgZSJBszPUCYH5iqLy2o2bDi4Kk7hwk"
                  />
                </div>
                <h4 className="font-headline-md text-headline-md text-starlight mb-1">Saturn</h4>
                <p className="font-body-md text-body-md text-moonlight mb-6">Ring inclination currently at 8.4°, favorable for viewing Cassini Division.</p>
                {/* Data Pairs */}
                <div className="flex gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <span className="font-label-caps text-label-caps text-faint-line mb-1">MAG</span>
                    <span className="font-data-md text-data-md text-brass">+0.6</span>
                  </div>
                  <div className="w-px h-8 bg-faint-line"></div>
                  <div className="flex flex-col items-center">
                    <span className="font-label-caps text-label-caps text-faint-line mb-1">DIST</span>
                    <span className="font-data-md text-data-md text-starlight">8.9 AU</span>
                  </div>
                  <div className="w-px h-8 bg-faint-line"></div>
                  <div className="flex flex-col items-center">
                    <span className="font-label-caps text-label-caps text-faint-line mb-1">CONST</span>
                    <span className="font-data-md text-data-md text-starlight">AQR</span>
                  </div>
                </div>
                {/* Rise/Set Arc */}
                <div className="w-full relative h-16 mb-4">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                    <path d="M 0 45 Q 50 -10 100 45" fill="none" stroke="#2A3552" strokeDasharray="4 4" strokeWidth="2" />
                    <circle cx="70" cy="15" fill="#E6BE7A" r="3" />
                    {/* Current time line */}
                    <line stroke="#E6BE7A" strokeDasharray="2 2" strokeWidth="1" x1="70" x2="70" y1="15" y2="45" />
                  </svg>
                  <div className="absolute bottom-0 left-0 text-moonlight font-data-sm text-data-sm">Rise 20:14</div>
                  <div className="absolute bottom-0 right-0 text-moonlight font-data-sm text-data-sm">Set 07:32</div>
                </div>
                <button
                  className="w-full py-3 mt-auto border border-faint-line text-starlight hover:border-outline hover:text-brass transition-colors duration-200 rounded flex items-center justify-center gap-2 font-data-sm text-data-sm"
                  onClick={() => navigate('/object-detail')}
                >
                  View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
