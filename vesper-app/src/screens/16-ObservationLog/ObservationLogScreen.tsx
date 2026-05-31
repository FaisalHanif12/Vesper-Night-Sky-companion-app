import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function ObservationLogScreen() {
  const navigate = useNavigate();
  const progressBarsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const progressBars = document.querySelectorAll<HTMLElement>('.progress-bar-fill');
      progressBarsRef.current = progressBars;
      progressBars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
          bar.style.width = targetWidth;
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AppLayout>
      <style>{`
        .star-field {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(2px 2px at 30% 40%, rgba(255,255,255,0.6) 100%, transparent),
            radial-gradient(1.5px 1.5px at 60% 80%, rgba(255,255,255,0.5) 100%, transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.3) 100%, transparent);
          background-size: 200px 200px;
          animation: drift 120s linear infinite;
        }
        @keyframes drift {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200px); }
        }
        .progress-bar-fill {
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          width: 0;
        }
        .card-enter {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .entry-hover-stripe {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: #E6BE7A;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .entry-card:hover .entry-hover-stripe {
          opacity: 1;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Star Field Background */}
      <div className="star-field"></div>

      {/* TopAppBar */}
      <header className="h-topbar-height fixed top-0 right-0 left-0 md:left-sidebar-width border-b border-faint-line bg-nightfall z-30 flex justify-between items-center px-gutter w-full">
        {/* Mobile Brand (Hidden on Desktop) */}
        <div className="md:hidden font-headline-sm text-headline-sm text-brass font-bold">
          VESPER
        </div>
        {/* Location/Time (Hidden on Mobile) */}
        <div className="hidden md:block font-data-md text-data-md text-starlight opacity-80">
          Austin, Texas · 09:42 PM
        </div>
        {/* Trailing Actions */}
        <div className="flex items-center space-x-4">
          <span className="font-data-sm text-data-sm text-moonlight border border-faint-line rounded-full px-3 py-1 bg-twilight/30">
            CLEAR 87%
          </span>
          <button
            className="hidden sm:block font-label-caps text-label-caps text-midnight bg-brass hover:bg-brass-dim transition-colors px-4 py-2 rounded"
            onClick={() => navigate('/add-observation')}
          >
            + Log Observation
          </button>
          <div className="flex items-center space-x-2 text-starlight">
            <button className="p-2 hover:text-brass-dim transition-colors rounded-full hover:bg-twilight">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 hover:text-brass-dim transition-colors rounded-full hover:bg-twilight">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="pt-[calc(theme('spacing.topbar-height')+32px)] pl-0 md:pl-sidebar-width min-h-screen relative z-10 pb-24">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="mb-12 card-enter" style={{ animationDelay: '0.1s' }}>
            <p className="font-label-caps text-label-caps text-moonlight tracking-[0.2em] mb-2">OBSERVATION LOG</p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-starlight" style={{ fontSize: '36px' }}>Your record.</h2>
                <p className="font-body-lg text-body-lg text-moonlight mt-2 max-w-2xl">A chronical of celestial encounters, equipment performance, and atmospheric conditions over time.</p>
              </div>
              <button
                className="inline-flex items-center justify-center font-label-caps text-label-caps text-midnight bg-brass hover:bg-brass-dim transition-colors px-6 h-[48px] rounded whitespace-nowrap shadow-[0_0_15px_rgba(230,190,122,0.2)]"
                onClick={() => navigate('/add-observation')}
              >
                + New Entry
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Column (32%) */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">

              {/* Observer Card */}
              <div className="bg-nightfall border border-brass rounded-lg p-card-padding relative overflow-hidden card-enter" style={{ animationDelay: '0.2s' }}>
                {/* Soft bloom background effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brass opacity-5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-twilight border border-faint-line flex items-center justify-center">
                    <span className="font-headline-sm text-headline-sm text-brass">A</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-starlight">Alexander</h3>
                    <p className="font-label-caps text-label-caps text-moonlight">Primary Observer</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 relative z-10">
                  <div>
                    <p className="font-label-caps text-label-caps text-moonlight mb-1">Objects Seen</p>
                    <p className="font-data-lg text-data-lg text-starlight">47</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-moonlight mb-1">Nights Out</p>
                    <p className="font-data-lg text-data-lg text-starlight">23</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-moonlight mb-1">Hours logged</p>
                    <p className="font-data-lg text-data-lg text-starlight">94.5</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-moonlight mb-1">Total Entries</p>
                    <p className="font-data-lg text-data-lg text-starlight">61</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-faint-line mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-label-caps text-label-caps text-moonlight">Current Streak</span>
                      <span className="font-data-md text-data-md text-brass flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-ember">local_fire_department</span>
                        12 Nights
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Life List Card */}
              <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding card-enter" style={{ animationDelay: '0.3s' }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline-sm text-headline-sm text-starlight">Life List</h3>
                  <span className="material-symbols-outlined text-moonlight">military_tech</span>
                </div>
                <div className="space-y-5">
                  {/* Planets */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-label-caps text-label-caps text-moonlight">Planets</span>
                      <span className="font-data-sm text-data-sm text-starlight">6/8</span>
                    </div>
                    <div className="h-1.5 w-full bg-twilight rounded-full overflow-hidden">
                      <div className="h-full bg-brass progress-bar-fill" data-width="75%"></div>
                    </div>
                  </div>
                  {/* Messier */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-label-caps text-label-caps text-moonlight">Messier Objects</span>
                      <span className="font-data-sm text-data-sm text-starlight">12/110</span>
                    </div>
                    <div className="h-1.5 w-full bg-twilight rounded-full overflow-hidden">
                      <div className="h-full bg-aurora progress-bar-fill" data-width="11%"></div>
                    </div>
                  </div>
                  {/* Constellations */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-label-caps text-label-caps text-moonlight">Constellations</span>
                      <span className="font-data-sm text-data-sm text-starlight">18/88</span>
                    </div>
                    <div className="h-1.5 w-full bg-twilight rounded-full overflow-hidden">
                      <div className="h-full bg-nebula progress-bar-fill" data-width="20%"></div>
                    </div>
                  </div>
                  {/* ISS */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-label-caps text-label-caps text-moonlight">ISS Transits</span>
                      <span className="font-data-sm text-data-sm text-starlight">5</span>
                    </div>
                    <div className="h-1.5 w-full bg-twilight rounded-full overflow-hidden">
                      <div className="h-full bg-surface-tint progress-bar-fill" data-width="40%"></div>
                    </div>
                  </div>
                  {/* Meteors */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-label-caps text-label-caps text-moonlight">Meteor Showers</span>
                      <span className="font-data-sm text-data-sm text-starlight">3</span>
                    </div>
                    <div className="h-1.5 w-full bg-twilight rounded-full overflow-hidden">
                      <div className="h-full bg-ember progress-bar-fill" data-width="25%"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (68%) */}
            <div className="w-full lg:w-[68%] flex flex-col gap-6">

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4 card-enter" style={{ animationDelay: '0.4s' }}>
                {/* Search Bar */}
                <div className="relative w-full sm:w-64 h-[44px]">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-moonlight">search</span>
                  <input
                    className="w-full h-full bg-nightfall border border-faint-line rounded-[16px] pl-10 pr-4 text-body-md font-body-md text-starlight placeholder:text-moonlight focus:outline-none focus:border-outline focus:ring-0 transition-colors"
                    placeholder="Search log..."
                    type="text"
                  />
                </div>
                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2 items-center flex-1">
                  <button className="h-8 px-4 rounded-full bg-twilight border border-brass text-brass font-label-caps text-label-caps">ALL</button>
                  <button className="h-8 px-4 rounded-full bg-nightfall border border-faint-line text-moonlight hover:border-outline hover:text-starlight font-label-caps text-label-caps transition-colors">Planets</button>
                  <button className="h-8 px-4 rounded-full bg-nightfall border border-faint-line text-moonlight hover:border-outline hover:text-starlight font-label-caps text-label-caps transition-colors">Nebulae</button>
                  <button className="h-8 px-4 rounded-full bg-nightfall border border-faint-line text-moonlight hover:border-outline hover:text-starlight font-label-caps text-label-caps transition-colors">Meteors</button>
                  <button className="h-8 px-4 rounded-full bg-nightfall border border-faint-line text-moonlight hover:border-outline hover:text-starlight font-label-caps text-label-caps transition-colors">Moon</button>
                  <button className="h-8 px-4 rounded-full bg-nightfall border border-faint-line text-moonlight hover:border-outline hover:text-starlight font-label-caps text-label-caps transition-colors">ISS</button>
                </div>
              </div>

              {/* Log Entries List */}
              <div className="flex flex-col gap-[12px]">

                {/* Entry 1 - Saturn */}
                <div
                  className="entry-card relative bg-nightfall border border-faint-line rounded-lg h-[72px] flex items-center px-4 hover:border-outline transition-colors cursor-pointer card-enter overflow-hidden group"
                  style={{ animationDelay: '0.5s' }}
                  onClick={() => navigate('/object-detail')}
                >
                  <div className="entry-hover-stripe"></div>
                  {/* Date Block */}
                  <div className="w-20 shrink-0 text-center border-r border-faint-line pr-4 mr-4">
                    <div className="font-data-md text-data-md text-starlight">Aug 12</div>
                    <div className="font-label-caps text-label-caps text-moonlight mt-0.5">2023</div>
                  </div>
                  {/* Main Info */}
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    <div className="font-headline-sm text-headline-sm text-starlight truncate group-hover:text-brass transition-colors">Saturn</div>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-data-sm text-[10px] text-surface-tint">Planet</span>
                    <div className="hidden md:block font-body-sm text-body-sm text-moonlight truncate opacity-70">Rings clearly defined, good seeing. Cassini division visible...</div>
                  </div>
                  {/* Meta/Rating */}
                  <div className="shrink-0 flex items-center gap-4 pl-4">
                    <div className="hidden sm:flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                    </div>
                    <div className="flex text-brass text-[16px]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                </div>

                {/* Entry 2 - Perseids */}
                <div
                  className="entry-card relative bg-nightfall border border-faint-line rounded-lg h-[72px] flex items-center px-4 hover:border-outline transition-colors cursor-pointer card-enter overflow-hidden group"
                  style={{ animationDelay: '0.55s' }}
                  onClick={() => navigate('/object-detail')}
                >
                  <div className="entry-hover-stripe"></div>
                  <div className="w-20 shrink-0 text-center border-r border-faint-line pr-4 mr-4">
                    <div className="font-data-md text-data-md text-starlight">Aug 10</div>
                    <div className="font-label-caps text-label-caps text-moonlight mt-0.5">2023</div>
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    <div className="font-headline-sm text-headline-sm text-starlight truncate group-hover:text-brass transition-colors">Perseids</div>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-data-sm text-[10px] text-ember">Shower</span>
                    <div className="hidden md:block font-body-sm text-body-sm text-moonlight truncate opacity-70">Counted roughly 45/hr near peak. Several bright fireballs...</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-4 pl-4">
                    <div className="hidden sm:flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                      <span className="w-2 h-2 rounded-full bg-ember"></span>
                      <span className="w-2 h-2 rounded-full bg-twilight"></span>
                    </div>
                    <div className="flex text-brass text-[16px]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined">star</span>
                    </div>
                  </div>
                </div>

                {/* Entry 3 - M42 */}
                <div
                  className="entry-card relative bg-nightfall border border-faint-line rounded-lg h-[72px] flex items-center px-4 hover:border-outline transition-colors cursor-pointer card-enter overflow-hidden group"
                  style={{ animationDelay: '0.6s' }}
                  onClick={() => navigate('/object-detail')}
                >
                  <div className="entry-hover-stripe"></div>
                  <div className="w-20 shrink-0 text-center border-r border-faint-line pr-4 mr-4">
                    <div className="font-data-md text-data-md text-starlight">Aug 08</div>
                    <div className="font-label-caps text-label-caps text-moonlight mt-0.5">2023</div>
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    <div className="font-headline-sm text-headline-sm text-starlight truncate group-hover:text-brass transition-colors">M42</div>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-data-sm text-[10px] text-nebula">Nebula</span>
                    <div className="hidden md:block font-body-sm text-body-sm text-moonlight truncate opacity-70">Trapezium visible at 150x. faint nebulosity extending out...</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-4 pl-4">
                    <div className="hidden sm:flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                      <span className="w-2 h-2 rounded-full bg-twilight"></span>
                    </div>
                    <div className="flex text-brass text-[16px]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                </div>

                {/* Entry 4 - ISS */}
                <div
                  className="entry-card relative bg-nightfall border border-faint-line rounded-lg h-[72px] flex items-center px-4 hover:border-outline transition-colors cursor-pointer card-enter overflow-hidden group"
                  style={{ animationDelay: '0.65s' }}
                  onClick={() => navigate('/object-detail')}
                >
                  <div className="entry-hover-stripe"></div>
                  <div className="w-20 shrink-0 text-center border-r border-faint-line pr-4 mr-4">
                    <div className="font-data-md text-data-md text-starlight">Aug 05</div>
                    <div className="font-label-caps text-label-caps text-moonlight mt-0.5">2023</div>
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    <div className="font-headline-sm text-headline-sm text-starlight truncate group-hover:text-brass transition-colors">ISS</div>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-data-sm text-[10px] text-moonlight">Satellite</span>
                    <div className="hidden md:block font-body-sm text-body-sm text-moonlight truncate opacity-70">Bright pass near zenith. Magnitude -3.2, tracked briefly...</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-4 pl-4">
                    <div className="flex text-brass text-[16px]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined">star</span>
                    </div>
                  </div>
                </div>

                {/* Entry 5 - Jupiter */}
                <div
                  className="entry-card relative bg-nightfall border border-faint-line rounded-lg h-[72px] flex items-center px-4 hover:border-outline transition-colors cursor-pointer card-enter overflow-hidden group"
                  style={{ animationDelay: '0.7s' }}
                  onClick={() => navigate('/object-detail')}
                >
                  <div className="entry-hover-stripe"></div>
                  <div className="w-20 shrink-0 text-center border-r border-faint-line pr-4 mr-4">
                    <div className="font-data-md text-data-md text-starlight">Aug 03</div>
                    <div className="font-label-caps text-label-caps text-moonlight mt-0.5">2023</div>
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    <div className="font-headline-sm text-headline-sm text-starlight truncate group-hover:text-brass transition-colors">Jupiter</div>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-data-sm text-[10px] text-surface-tint">Planet</span>
                    <div className="hidden md:block font-body-sm text-body-sm text-moonlight truncate opacity-70">Great Red Spot transit viewed. Three moons visible...</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-4 pl-4">
                    <div className="hidden sm:flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                      <span className="w-2 h-2 rounded-full bg-aurora"></span>
                    </div>
                    <div className="flex text-brass text-[16px]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                </div>

                {/* Entry 6 - Moon */}
                <div
                  className="entry-card relative bg-nightfall border border-faint-line rounded-lg h-[72px] flex items-center px-4 hover:border-outline transition-colors cursor-pointer card-enter overflow-hidden group"
                  style={{ animationDelay: '0.75s' }}
                  onClick={() => navigate('/object-detail')}
                >
                  <div className="entry-hover-stripe"></div>
                  <div className="w-20 shrink-0 text-center border-r border-faint-line pr-4 mr-4">
                    <div className="font-data-md text-data-md text-starlight">Jul 28</div>
                    <div className="font-label-caps text-label-caps text-moonlight mt-0.5">2023</div>
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    <div className="font-headline-sm text-headline-sm text-starlight truncate group-hover:text-brass transition-colors">Moon</div>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-twilight border border-faint-line font-data-sm text-[10px] text-starlight">Lunar</span>
                    <div className="hidden md:block font-body-sm text-body-sm text-moonlight truncate opacity-70">Terminator shadows crisp. Examined Tycho crater ray system...</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-4 pl-4">
                    <div className="flex text-brass text-[16px]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined">star</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-nightfall border-t border-faint-line z-40 flex justify-around items-center h-16 pb-safe">
        <a className="flex flex-col items-center justify-center w-full h-full text-moonlight hover:text-starlight" href="#">
          <span className="material-symbols-outlined text-[24px]">nights_stay</span>
          <span className="text-[10px] font-label-caps mt-1">Tonight</span>
        </a>
        <a className="flex flex-col items-center justify-center w-full h-full text-moonlight hover:text-starlight" href="#">
          <span className="material-symbols-outlined text-[24px]">map</span>
          <span className="text-[10px] font-label-caps mt-1">Sky Map</span>
        </a>
        {/* Active */}
        <a className="flex flex-col items-center justify-center w-full h-full text-brass" href="#">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
          <span className="text-[10px] font-label-caps mt-1 font-bold">Log</span>
        </a>
        <a className="flex flex-col items-center justify-center w-full h-full text-moonlight hover:text-starlight" href="#">
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <span className="text-[10px] font-label-caps mt-1">Settings</span>
        </a>
      </nav>
    </AppLayout>
  );
}
