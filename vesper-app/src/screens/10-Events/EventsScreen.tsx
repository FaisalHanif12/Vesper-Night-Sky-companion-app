import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function EventsScreen() {
  const navigate = useNavigate();

  // Countdown timer state (initial: 4h 22m 15s)
  const [hours, setHours] = useState(4);
  const [minutes, setMinutes] = useState(22);
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        setMinutes((m) => {
          if (m > 0) return m - 1;
          setHours((h) => (h > 0 ? h - 1 : 0));
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const countdownDisplay = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return (
    <AppLayout>
      {/* Topbar */}
      <header className="fixed top-0 right-0 h-topbar-height md:left-sidebar-width left-0 bg-nightfall/80 backdrop-blur-md border-b border-faint-line flex justify-between items-center px-gutter z-40" style={{ width: 'calc(100% - 240px)', marginLeft: '240px' }}>
        <div className="flex items-center space-x-4 text-moonlight font-data-sm text-data-sm">
          <div className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">location_on</span> Austin, Texas</div>
          <div>·</div>
          <div className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">schedule</span> 02:47 AM</div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="font-data-sm text-data-sm text-starlight">CLEAR 87%</span>
            <div className="w-16 h-2 bg-twilight rounded-full overflow-hidden">
              <div className="h-full bg-aurora" style={{ width: '87%' }}></div>
            </div>
          </div>
          <button
            onClick={() => navigate('/add-observation')}
            className="flex items-center space-x-2 text-midnight bg-brass hover:bg-brass-dim px-4 py-2 rounded transition-colors duration-200 font-label-caps text-label-caps h-[40px]"
          >
            <span>+ Log Observation</span>
          </button>
        </div>
      </header>

      {/* Starfield Background */}
      <div className="star-layer drifting-stars"></div>

      {/* Main Content Canvas */}
      <div className="pt-topbar-height min-h-screen relative z-10 p-gutter md:p-section-gap max-w-container-max mx-auto">
        {/* Header Section */}
        <div className="mb-12 fade-in-up stagger-1">
          <p className="font-label-caps text-label-caps text-moonlight tracking-[0.14em] mb-2 uppercase">EVENTS · ALMANAC</p>
          <h2 className="font-headline-lg text-headline-lg font-semibold text-starlight">What's coming.</h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-10 fade-in-up stagger-2">
          <button className="px-4 py-2 rounded-full border border-brass bg-brass text-midnight font-label-caps text-label-caps uppercase transition-colors">ALL</button>
          <button className="px-4 py-2 rounded-full border border-faint-line bg-twilight text-moonlight font-label-caps text-label-caps hover:border-outline transition-colors uppercase">METEOR SHOWERS</button>
          <button className="px-4 py-2 rounded-full border border-faint-line bg-twilight text-moonlight font-label-caps text-label-caps hover:border-outline transition-colors uppercase">ECLIPSES</button>
          <button className="px-4 py-2 rounded-full border border-faint-line bg-twilight text-moonlight font-label-caps text-label-caps hover:border-outline transition-colors uppercase">CONJUNCTIONS</button>
          <button className="px-4 py-2 rounded-full border border-faint-line bg-twilight text-moonlight font-label-caps text-label-caps hover:border-outline transition-colors uppercase">PLANETS</button>
          <button className="px-4 py-2 rounded-full border border-faint-line bg-twilight text-moonlight font-label-caps text-label-caps hover:border-outline transition-colors uppercase">LUNAR</button>
        </div>

        {/* FEATURED CARD */}
        <div
          className="w-full bg-nightfall border border-brass rounded-lg p-6 md:p-8 mb-16 relative overflow-hidden fade-in-up stagger-3 group cursor-pointer"
          onClick={() => navigate('/event-detail')}
        >
          {/* Subtle glow effect inside card */}
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-brass/5 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-aurora animate-pulse"></span>
                <span className="font-label-caps text-label-caps text-brass tracking-[0.14em]">TONIGHT · PEAK EVENT</span>
              </div>
              <h3 className="font-headline-md text-headline-md font-semibold text-starlight mb-2 group-hover:text-brass transition-colors duration-300">Perseid Meteor Shower</h3>
              <p className="text-moonlight font-body-md max-w-lg">Earth passes through the debris trail of comet Swift-Tuttle. Expect up to 100 meteors per hour radiating from the constellation Perseus.</p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-label-caps text-label-caps text-moonlight mb-1">TIME TO PEAK</p>
              <div className="font-data-xl text-data-xl text-brass">{countdownDisplay}</div>
            </div>
          </div>
          {/* Interactive Arrow */}
          <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <span className="material-symbols-outlined text-brass">arrow_forward</span>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="space-y-12 fade-in-up stagger-4">

          {/* AUGUST */}
          <div>
            <h4 className="font-label-caps text-label-caps text-moonlight border-b border-faint-line pb-2 mb-4 tracking-[0.14em]">AUGUST</h4>
            <div className="flex flex-col space-y-2">
              {/* Row */}
              <div
                className="group relative flex items-center p-4 bg-nightfall hover:bg-twilight rounded border border-transparent hover:border-faint-line transition-all duration-200 cursor-pointer fade-in-up row-stagger overflow-hidden"
                onClick={() => navigate('/event-detail')}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 md:w-32 flex-shrink-0">
                  <span className="font-data-md text-data-md text-starlight">Aug 12</span>
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <span className="font-body-lg text-body-lg text-starlight group-hover:text-brass transition-colors">Perseid Meteor Shower</span>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <span className="hidden sm:inline-block px-3 py-1 bg-aurora/10 text-aurora border border-aurora/30 rounded-full font-data-sm text-data-sm">TONIGHT</span>
                  <span className="material-symbols-outlined text-moonlight group-hover:text-starlight opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              </div>
              {/* Row */}
              <div
                className="group relative flex items-center p-4 bg-nightfall hover:bg-twilight rounded border border-transparent hover:border-faint-line transition-all duration-200 cursor-pointer fade-in-up row-stagger overflow-hidden"
                onClick={() => navigate('/event-detail')}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 md:w-32 flex-shrink-0">
                  <span className="font-data-md text-data-md text-moonlight group-hover:text-starlight">Aug 15</span>
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <span className="font-body-lg text-body-lg text-moonlight group-hover:text-starlight transition-colors">Full Moon (Sturgeon Moon)</span>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <span className="font-data-sm text-data-sm text-moonlight hidden sm:block">In 3 days</span>
                  <span className="material-symbols-outlined text-moonlight group-hover:text-starlight opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              </div>
              {/* Row */}
              <div
                className="group relative flex items-center p-4 bg-nightfall hover:bg-twilight rounded border border-transparent hover:border-faint-line transition-all duration-200 cursor-pointer fade-in-up row-stagger overflow-hidden"
                onClick={() => navigate('/event-detail')}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 md:w-32 flex-shrink-0">
                  <span className="font-data-md text-data-md text-moonlight group-hover:text-starlight">Aug 27</span>
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <span className="font-body-lg text-body-lg text-moonlight group-hover:text-starlight transition-colors">Saturn at Opposition</span>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <span className="font-data-sm text-data-sm text-moonlight hidden sm:block">In 15 days</span>
                  <span className="material-symbols-outlined text-moonlight group-hover:text-starlight opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              </div>
            </div>
          </div>

          {/* SEPTEMBER */}
          <div>
            <h4 className="font-label-caps text-label-caps text-moonlight border-b border-faint-line pb-2 mb-4 tracking-[0.14em]">SEPTEMBER</h4>
            <div className="flex flex-col space-y-2">
              {/* Row */}
              <div
                className="group relative flex items-center p-4 bg-nightfall hover:bg-twilight rounded border border-transparent hover:border-faint-line transition-all duration-200 cursor-pointer fade-in-up row-stagger overflow-hidden"
                onClick={() => navigate('/event-detail')}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 md:w-32 flex-shrink-0">
                  <span className="font-data-md text-data-md text-moonlight group-hover:text-starlight">Sep 8</span>
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <span className="font-body-lg text-body-lg text-moonlight group-hover:text-starlight transition-colors">Jupiter Opposition</span>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <span className="material-symbols-outlined text-moonlight group-hover:text-starlight opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              </div>
              {/* Row */}
              <div
                className="group relative flex items-center p-4 bg-nightfall hover:bg-twilight rounded border border-transparent hover:border-faint-line transition-all duration-200 cursor-pointer fade-in-up row-stagger overflow-hidden"
                onClick={() => navigate('/event-detail')}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 md:w-32 flex-shrink-0">
                  <span className="font-data-md text-data-md text-moonlight group-hover:text-starlight">Sep 17</span>
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <span className="font-body-lg text-body-lg text-moonlight group-hover:text-starlight transition-colors">Partial Lunar Eclipse</span>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <span className="hidden sm:inline-block px-3 py-1 bg-nebula/10 text-nebula border border-nebula/30 rounded-full font-data-sm text-data-sm">ECLIPSE</span>
                  <span className="material-symbols-outlined text-moonlight group-hover:text-starlight opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              </div>
              {/* Row */}
              <div
                className="group relative flex items-center p-4 bg-nightfall hover:bg-twilight rounded border border-transparent hover:border-faint-line transition-all duration-200 cursor-pointer fade-in-up row-stagger overflow-hidden"
                onClick={() => navigate('/event-detail')}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 md:w-32 flex-shrink-0">
                  <span className="font-data-md text-data-md text-moonlight group-hover:text-starlight">Sep 22</span>
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <span className="font-body-lg text-body-lg text-moonlight group-hover:text-starlight transition-colors">Venus-Spica Conjunction</span>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <span className="material-symbols-outlined text-moonlight group-hover:text-starlight opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              </div>
            </div>
          </div>

          {/* OCTOBER */}
          <div>
            <h4 className="font-label-caps text-label-caps text-moonlight border-b border-faint-line pb-2 mb-4 tracking-[0.14em]">OCTOBER</h4>
            <div className="flex flex-col space-y-2">
              {/* Row */}
              <div
                className="group relative flex items-center p-4 bg-nightfall hover:bg-twilight rounded border border-transparent hover:border-faint-line transition-all duration-200 cursor-pointer fade-in-up row-stagger overflow-hidden"
                onClick={() => navigate('/event-detail')}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 md:w-32 flex-shrink-0">
                  <span className="font-data-md text-data-md text-moonlight group-hover:text-starlight">Oct 2</span>
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <span className="font-body-lg text-body-lg text-moonlight group-hover:text-starlight transition-colors">Annular Solar Eclipse</span>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <span className="hidden sm:inline-block px-3 py-1 bg-nebula/10 text-nebula border border-nebula/30 rounded-full font-data-sm text-data-sm">ECLIPSE</span>
                  <span className="material-symbols-outlined text-moonlight group-hover:text-starlight opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              </div>
              {/* Row */}
              <div
                className="group relative flex items-center p-4 bg-nightfall hover:bg-twilight rounded border border-transparent hover:border-faint-line transition-all duration-200 cursor-pointer fade-in-up row-stagger overflow-hidden"
                onClick={() => navigate('/event-detail')}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 md:w-32 flex-shrink-0">
                  <span className="font-data-md text-data-md text-moonlight group-hover:text-starlight">Oct 21</span>
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <span className="font-body-lg text-body-lg text-moonlight group-hover:text-starlight transition-colors">Orionid Meteor Shower</span>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <span className="material-symbols-outlined text-moonlight group-hover:text-starlight opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-nightfall/90 backdrop-blur-md border-t border-faint-line z-50 flex justify-around items-center h-16 px-2">
        <a className="flex flex-col items-center justify-center w-full h-full text-moonlight" href="#"><span className="material-symbols-outlined text-[24px]">nights_stay</span><span className="text-[10px] mt-1 font-medium">Tonight</span></a>
        <a className="flex flex-col items-center justify-center w-full h-full text-brass" href="#"><span className="material-symbols-outlined text-[24px]">event</span><span className="text-[10px] mt-1 font-medium">Events</span></a>
        <a className="flex flex-col items-center justify-center w-full h-full text-moonlight" href="#"><span className="material-symbols-outlined text-[24px]">settings_brightness</span><span className="text-[10px] mt-1 font-medium">Orrery</span></a>
        <a className="flex flex-col items-center justify-center w-full h-full text-moonlight" href="#"><span className="material-symbols-outlined text-[24px]">menu_book</span><span className="text-[10px] mt-1 font-medium">Log</span></a>
      </nav>
    </AppLayout>
  );
}
