import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function EventDetailScreen() {
  const navigate = useNavigate();
  const meteorContainerRef = useRef<HTMLDivElement>(null);
  const countdownRingRef = useRef<SVGCircleElement>(null);
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 22, seconds: 15 });
  const [alertEnabled, setAlertEnabled] = useState(true);

  // Countdown ring animation + ticker
  useEffect(() => {
    const ringTimeout = setTimeout(() => {
      if (countdownRingRef.current) {
        countdownRingRef.current.style.strokeDashoffset = '326.7';
      }
    }, 100);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => {
      clearTimeout(ringTimeout);
      clearInterval(interval);
    };
  }, []);

  // Meteor animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = meteorContainerRef.current;
    if (!container) return;

    const angles = [165, 155, 145];

    function createMeteor(quadrant: number, angle: number) {
      if (!container) return;
      const meteor = document.createElement('div');
      meteor.style.position = 'absolute';
      meteor.style.width = '150px';
      meteor.style.height = '1.5px';
      meteor.style.background = 'linear-gradient(90deg, transparent, #D9744E)';
      meteor.style.borderRadius = '1px';

      const width = window.innerWidth;
      let startX: number;
      if (quadrant === 0) startX = Math.random() * (width / 3);
      else if (quadrant === 1) startX = (width / 3) + Math.random() * (width / 3);
      else startX = (2 * width / 3) + Math.random() * (width / 3);

      const startY = Math.random() * 200;

      meteor.style.left = `${startX}px`;
      meteor.style.top = `${startY}px`;
      meteor.style.transformOrigin = 'left center';

      const distance = 500;

      meteor.animate([
        { transform: `rotate(${angle}deg) translateX(0)`, opacity: '0' },
        { opacity: '1', offset: 0.1 },
        { opacity: '1', offset: 0.8 },
        { transform: `rotate(${angle}deg) translateX(${distance}px)`, opacity: '0' },
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }).onfinish = () => meteor.remove();

      container.appendChild(meteor);
    }

    function fireBurst() {
      createMeteor(0, angles[0]);
      createMeteor(1, angles[1]);
      createMeteor(2, angles[2]);
    }

    const initialTimeout = setTimeout(fireBurst, 1000);
    const burstInterval = setInterval(fireBurst, 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(burstInterval);
    };
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const countdownDisplay = `${pad(countdown.hours)}:${pad(countdown.minutes)}:${pad(countdown.seconds)}`;

  return (
    <AppLayout>
      {/* Animated Meteor Container */}
      <div
        ref={meteorContainerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />

      {/* Main Content Canvas */}
      <div className="flex-grow pt-topbar-height min-h-screen relative z-10 p-gutter">
        <div className="max-w-container-max mx-auto h-full flex flex-col">

          {/* Hero Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-section-gap pt-8 stagger-card">
            <div>
              <span className="font-label-caps text-label-caps text-moonlight tracking-[0.14em] uppercase block mb-3">
                METEOR SHOWER · ANNUAL EVENT
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-starlight mb-2">
                Perseid Meteor Shower
              </h2>
              <p className="font-body-lg text-body-lg text-moonlight max-w-2xl">
                Earth passes through the debris trail of Comet Swift-Tuttle.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-4">
              <span className="bg-twilight border border-faint-line px-3 py-1.5 rounded-full flex items-center gap-2 font-data-sm text-data-sm text-starlight">
                <span className="w-2 h-2 rounded-full bg-ember animate-pulse" /> PEAK TONIGHT
              </span>
              <button
                className="px-5 py-2 border border-faint-line rounded text-starlight font-body-md text-body-md hover:border-outline transition-colors flex items-center gap-2 group"
                onClick={() => navigate('/events')}
              >
                Set Alert{' '}
                <span className="text-brass group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gap flex-grow">

            {/* Left Column (Layout: 7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-grid-gap">

              {/* Countdown Card */}
              <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding relative overflow-hidden stagger-card delay-1 group hover:border-outline transition-colors">
                <span className="font-label-caps text-label-caps text-moonlight uppercase block mb-6">
                  Peak Approaching
                </span>
                <div className="flex items-center justify-center py-8">
                  <div className="relative w-dial-lg h-dial-lg flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280">
                      <circle cx="140" cy="140" fill="none" r="130" stroke="#2A3552" strokeWidth="2" />
                      <circle
                        ref={countdownRingRef}
                        className="progress-ring-circle"
                        cx="140"
                        cy="140"
                        fill="none"
                        id="countdown-ring"
                        r="130"
                        stroke="#E6BE7A"
                        strokeDasharray="816.8"
                        strokeDashoffset="816.8"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="text-center">
                      <div className="font-data-xl text-data-xl font-medium text-brass tabular-nums tracking-wider">
                        {countdownDisplay}
                      </div>
                      <div className="font-data-sm text-data-sm text-moonlight mt-2">
                        UNTIL MAXIMUM RADIANT ALTITUDE
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-gap flex-grow">

                {/* Key Stats Card */}
                <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding stagger-card delay-2 hover:border-outline transition-colors">
                  <span className="font-label-caps text-label-caps text-moonlight uppercase block mb-6">
                    Event Parameters
                  </span>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center border-b border-faint-line pb-2">
                      <span className="font-body-md text-moonlight">Peak Rate</span>
                      <span className="font-data-md text-starlight">~45/hr</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-faint-line pb-2">
                      <span className="font-body-md text-moonlight">Radiant</span>
                      <span className="font-data-md text-brass">Perseus</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-faint-line pb-2">
                      <span className="font-body-md text-moonlight">Speed</span>
                      <span className="font-data-md text-starlight">59 km/s</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-faint-line pb-2">
                      <span className="font-body-md text-moonlight">Parent Body</span>
                      <span className="font-data-md text-starlight">Comet Swift-Tuttle</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-faint-line pb-2">
                      <span className="font-body-md text-moonlight">Best Time</span>
                      <span className="font-data-md text-ember">After 01:00</span>
                    </li>
                    <li className="flex justify-between items-center pt-1">
                      <span className="font-body-md text-moonlight">Moon Phase</span>
                      <span className="font-data-md text-starlight">73% Waning</span>
                    </li>
                  </ul>
                </div>

                {/* Visibility Card */}
                <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding flex flex-col justify-between stagger-card delay-3 hover:border-outline transition-colors">
                  <div>
                    <span className="font-label-caps text-label-caps text-moonlight uppercase block mb-6">
                      Current Visibility
                    </span>
                    <div className="mb-6">
                      <div className="text-moonlight font-body-sm mb-1">Direction</div>
                      <div className="font-data-lg text-brass">NE Sky</div>
                    </div>
                    <div className="mb-6">
                      <div className="text-moonlight font-body-sm mb-1">Altitude</div>
                      <div className="font-data-lg text-starlight">60°</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-label-caps text-label-caps text-moonlight">Conditions</span>
                      <span className="font-data-sm text-starlight">Fair</span>
                    </div>
                    <div className="flex gap-1">
                      <span
                        className="material-symbols-outlined text-brass fill-icon text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-brass fill-icon text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-brass fill-icon text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
                      >
                        star
                      </span>
                      <span className="material-symbols-outlined text-faint-line text-[16px]">star</span>
                      <span className="material-symbols-outlined text-faint-line text-[16px]">star</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column (Layout: 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-grid-gap">

              {/* Radiant Map Card */}
              <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding flex flex-col items-center justify-center stagger-card delay-2 hover:border-outline transition-colors relative h-64">
                <span className="font-label-caps text-label-caps text-moonlight uppercase absolute top-card-padding left-card-padding">
                  Radiant Origin
                </span>
                <div className="w-[200px] h-[200px] rounded-full border border-faint-line bg-twilight/30 relative flex items-center justify-center overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-0 border border-faint-line/50 rounded-full scale-[0.6]" />
                  <div className="absolute inset-0 border border-faint-line/50 rounded-full scale-[0.3]" />
                  <div className="w-full h-[1px] bg-faint-line/50 absolute top-1/2" />
                  <div className="h-full w-[1px] bg-faint-line/50 absolute left-1/2" />
                  {/* Radiant Point */}
                  <div className="w-3 h-3 bg-brass rounded-full shadow-[0_0_15px_rgba(230,190,122,0.8)] z-10 relative">
                    <div className="absolute inset-0 bg-brass rounded-full animate-ping opacity-50" />
                  </div>
                  {/* Constellation Lines (Perseus roughly) */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
                    viewBox="0 0 200 200"
                  >
                    <polyline fill="none" points="100,100 80,70 60,80 50,110" stroke="#E8EDF7" strokeWidth="1" />
                    <polyline fill="none" points="100,100 130,80 150,90 140,120" stroke="#E8EDF7" strokeWidth="1" />
                    <circle cx="80" cy="70" fill="#E8EDF7" r="2" />
                    <circle cx="60" cy="80" fill="#E8EDF7" r="1.5" />
                    <circle cx="50" cy="110" fill="#E8EDF7" r="1" />
                    <circle cx="130" cy="80" fill="#E8EDF7" r="2" />
                    <circle cx="150" cy="90" fill="#E8EDF7" r="1.5" />
                    <circle cx="140" cy="120" fill="#E8EDF7" r="1" />
                  </svg>
                  {/* Animated Meteor Streaks from center */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 w-16 h-[1px] bg-gradient-to-r from-brass to-transparent origin-left rotate-[30deg] animate-[ping_3s_ease-out_infinite]" />
                    <div className="absolute top-1/2 left-1/2 w-20 h-[1px] bg-gradient-to-r from-ember to-transparent origin-left rotate-[150deg] animate-[ping_4s_ease-out_infinite_1s]" />
                    <div className="absolute top-1/2 left-1/2 w-12 h-[1px] bg-gradient-to-r from-starlight to-transparent origin-left rotate-[260deg] animate-[ping_2.5s_ease-out_infinite_0.5s]" />
                  </div>
                </div>
              </div>

              {/* Viewing Guide */}
              <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding flex-grow stagger-card delay-3 hover:border-outline transition-colors">
                <span className="font-label-caps text-label-caps text-moonlight uppercase block mb-6">
                  Observation Protocol
                </span>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="font-data-lg text-brass font-medium pt-1">01</span>
                    <div>
                      <div className="font-body-lg text-starlight mb-1">Find a dark spot</div>
                      <div className="font-body-sm text-moonlight">
                        Get away from city lights. The darker the sky, the more faint meteors you'll see.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-data-lg text-brass font-medium pt-1">02</span>
                    <div>
                      <div className="font-body-lg text-starlight mb-1">Look Northeast after midnight</div>
                      <div className="font-body-sm text-moonlight">
                        The radiant (Perseus) rises higher in the sky as the night progresses.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-data-lg text-brass font-medium pt-1">03</span>
                    <div>
                      <div className="font-body-lg text-starlight mb-1">Let eyes adjust</div>
                      <div className="font-body-sm text-moonlight">
                        Allow 20-30 minutes for full dark adaptation. Avoid looking at your phone.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-data-lg text-brass font-medium pt-1">04</span>
                    <div>
                      <div className="font-body-lg text-starlight mb-1">Scan widely</div>
                      <div className="font-body-sm text-moonlight">
                        Don't stare directly at the radiant. Meteors will appear across the entire sky.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Toggle Card */}
              <div className="bg-twilight border border-faint-line rounded-lg p-4 flex justify-between items-center stagger-card delay-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-moonlight">notifications</span>
                  <span className="font-body-md text-starlight font-medium">Notify me at peak</span>
                </div>
                <label className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in cursor-pointer">
                  <input
                    checked={alertEnabled}
                    onChange={(e) => setAlertEnabled(e.target.checked)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-midnight border-2 border-faint-line appearance-none cursor-pointer z-10 transition-transform duration-200"
                    id="alert-toggle"
                    name="toggle"
                    type="checkbox"
                  />
                  <label
                    className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-variant cursor-pointer transition-colors duration-200"
                    htmlFor="alert-toggle"
                  />
                </label>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        .fill-icon { font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24; }

        .progress-ring-circle {
          transition: stroke-dashoffset 1.2s ease-in-out;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }

        .stagger-card {
          opacity: 0;
          transform: translateY(20px);
          animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-up {
          to { opacity: 1; transform: translateY(0); }
        }

        .delay-1 { animation-delay: 120ms; }
        .delay-2 { animation-delay: 240ms; }
        .delay-3 { animation-delay: 360ms; }
        .delay-4 { animation-delay: 480ms; }

        .toggle-checkbox:checked {
          right: 0;
          border-color: #E6BE7A;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #E6BE7A;
        }
      `}</style>
    </AppLayout>
  );
}
