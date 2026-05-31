import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function SettingsScreen() {
  const navigate = useNavigate();

  const [issPass, setIssPass] = useState(true);
  const [planetaryAlignments, setPlanetaryAlignments] = useState(true);
  const [meteorShowers, setMeteorShowers] = useState(true);
  const [eclipses, setEclipses] = useState(true);
  const [clearSky, setClearSky] = useState(false);

  useEffect(() => {
    // Entry animation classes are driven purely by CSS; no JS cleanup required.
    return () => {};
  }, []);

  return (
    <AppLayout>
      <style>{`
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }

        .toggle-checkbox:checked {
          right: 0;
          border-color: #E6BE7A;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #E6BE7A;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes staggerFade {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up    { animation: slideUpFade  0.6s cubic-bezier(0.16, 1, 0.3, 1)       forwards; }
        .animate-stagger-1   { animation: staggerFade  0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s  forwards; opacity: 0; }
        .animate-stagger-2   { animation: staggerFade  0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s  forwards; opacity: 0; }
        .animate-stagger-3   { animation: staggerFade  0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s  forwards; opacity: 0; }
        .animate-stagger-4   { animation: staggerFade  0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s  forwards; opacity: 0; }
        .animate-stagger-5   { animation: staggerFade  0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s  forwards; opacity: 0; }
      `}</style>

      {/* TopAppBar */}
      <header className="h-topbar-height fixed top-0 right-0 left-0 md:left-sidebar-width border-b border-faint-line bg-nightfall/95 backdrop-blur-md z-40 flex justify-between items-center px-gutter w-full md:w-[calc(100%-240px)]">
        <div className="flex items-center gap-4">
          <span className="md:hidden font-headline-sm text-headline-sm text-brass font-bold">VESPER</span>
          <nav className="hidden md:flex gap-6">
            <span className="font-data-md text-data-md text-starlight hover:text-brass-dim transition-colors cursor-pointer">
              Austin, Texas · 09:42 PM
            </span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-moonlight hover:text-brass transition-colors font-label-caps text-label-caps uppercase tracking-wider">
            CLEAR 87%
          </button>
          <div className="h-6 w-px bg-faint-line hidden md:block mx-2"></div>
          <button className="text-moonlight hover:text-brass transition-colors relative group">
            <span className="material-symbols-outlined">notifications</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-ember rounded-full"></div>
          </button>
          <button className="text-brass hover:text-brass-dim transition-colors relative group">
            <span className="material-symbols-outlined group-hover:scale-105 transition-transform">account_circle</span>
            <div className="absolute inset-0 bg-brass/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button className="hidden md:block bg-brass text-midnight font-body-md text-body-md font-medium px-4 py-2 rounded ml-2 hover:bg-brass-dim transition-colors">
            + Log Observation
          </button>
        </div>
      </header>

      {/* Settings Content Grid */}
      <div className="max-w-container-max mx-auto px-gutter py-8 md:py-12">
        <div className="mb-8 animate-slide-up">
          <h2 className="font-headline-lg text-headline-lg text-starlight mb-2">Settings</h2>
          <p className="font-body-md text-body-md text-moonlight">Manage your observatory preferences and identity.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-grid-gap">
          {/* Left Column (38%) */}
          <div className="w-full lg:w-[38%] space-y-grid-gap flex flex-col">

            {/* Observer Identity Card */}
            <div className="bg-nightfall border border-brass rounded-lg p-card-padding relative overflow-hidden animate-stagger-1">
              {/* Abstract Orrery background accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 border border-faint-line rounded-full opacity-30"></div>
              <div className="absolute -top-16 -right-16 w-48 h-48 border border-brass/20 rounded-full opacity-40"></div>

              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-brass flex items-center justify-center bg-twilight shadow-[0_0_15px_rgba(230,190,122,0.15)]">
                    <span className="font-headline-md text-headline-md text-brass">A</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-starlight">Aanya Sharma</h3>
                    <p className="font-body-sm text-body-sm text-moonlight flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> Austin, Texas
                    </p>
                  </div>
                </div>
                <button className="text-moonlight hover:text-brass transition-colors p-1" title="Edit Profile">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-faint-line pt-5">
                <div>
                  <p className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-1">Objects Logged</p>
                  <p className="font-data-lg text-data-lg text-starlight">142</p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-1">Nights Active</p>
                  <p className="font-data-lg text-data-lg text-starlight">86</p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-1">Hours Observed</p>
                  <p className="font-data-lg text-data-lg text-starlight">
                    214<span className="text-moonlight font-data-sm text-data-sm">h</span>
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-1">Entries</p>
                  <p className="font-data-lg text-data-lg text-starlight">315</p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-1">Current Streak</p>
                  <p className="font-data-lg text-data-lg text-brass flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">local_fire_department</span> 12
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest mb-1">This Year</p>
                  <p className="font-data-lg text-data-lg text-starlight">42</p>
                </div>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding animate-stagger-2">
              <div className="flex items-center justify-between mb-5 border-b border-faint-line pb-3">
                <h4 className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">Achievements</h4>
                <span className="font-data-sm text-data-sm text-brass">3/24</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Earned */}
                <div className="bg-twilight rounded p-3 flex flex-col items-center text-center group cursor-pointer hover:border-outline border border-transparent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(230,190,122,0.2)]">
                    <span
                      className="material-symbols-outlined text-brass"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      flare
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-starlight font-medium">First Light</span>
                </div>
                {/* Earned */}
                <div className="bg-twilight rounded p-3 flex flex-col items-center text-center group cursor-pointer hover:border-outline border border-transparent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(230,190,122,0.2)]">
                    <span
                      className="material-symbols-outlined text-brass"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      travel_explore
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-starlight font-medium">Planet Hunter</span>
                </div>
                {/* Earned */}
                <div className="bg-twilight rounded p-3 flex flex-col items-center text-center group cursor-pointer hover:border-outline border border-transparent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(230,190,122,0.2)]">
                    <span
                      className="material-symbols-outlined text-brass"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-starlight font-medium">Messier Dozen</span>
                </div>
                {/* Locked */}
                <div className="bg-surface-container-low rounded p-3 flex flex-col items-center text-center border border-faint-line border-dashed opacity-60">
                  <div className="w-10 h-10 rounded-full border border-outline flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-outline">lock</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-moonlight">Dark Sky</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (62%) */}
          <div className="w-full lg:w-[62%] space-y-grid-gap">

            {/* Location Settings */}
            <div className="bg-nightfall border border-faint-line rounded-lg overflow-hidden animate-stagger-3 hover:border-outline transition-colors">
              <div className="px-card-padding py-4 border-b border-faint-line bg-twilight/30">
                <h4 className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">Location &amp; Environment</h4>
              </div>
              <div className="p-card-padding space-y-0">
                <div
                  className="flex items-center justify-between h-[48px] border-b border-faint-line group cursor-pointer"
                  onClick={() => navigate('/set-your-sky')}
                >
                  <span className="font-body-md text-body-md text-starlight">Primary Location</span>
                  <div className="flex items-center gap-2 group-hover:text-brass transition-colors">
                    <span className="font-data-md text-data-md text-moonlight group-hover:text-brass">Austin, Texas</span>
                    <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
                  </div>
                </div>
                <div className="flex items-center justify-between h-[48px] border-b border-faint-line">
                  <span className="font-body-md text-body-md text-starlight">Coordinates</span>
                  <span className="font-data-md text-data-md text-moonlight">30.2672° N, 97.7431° W</span>
                </div>
                <div className="flex items-center justify-between h-[48px] border-b border-faint-line">
                  <span className="font-body-md text-body-md text-starlight">Light Pollution Estimate</span>
                  <span className="font-data-md text-data-md text-moonlight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-ember inline-block"></span> Bortle 4
                  </span>
                </div>
                <div className="flex items-center justify-between h-[48px]">
                  <span className="font-body-md text-body-md text-starlight">Timezone</span>
                  <span className="font-data-md text-data-md text-moonlight">CST (UTC -6)</span>
                </div>
              </div>
            </div>

            {/* Equipment Settings */}
            <div className="bg-nightfall border border-faint-line rounded-lg overflow-hidden animate-stagger-4 hover:border-outline transition-colors">
              <div className="px-card-padding py-4 border-b border-faint-line bg-twilight/30 flex justify-between items-center">
                <h4 className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">Equipment Preset</h4>
                <button className="text-brass hover:text-brass-dim font-label-caps text-label-caps uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">add</span> Add New
                </button>
              </div>
              <div className="p-card-padding space-y-0">
                <div className="flex items-center justify-between h-[48px] border-b border-faint-line group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline group-hover:text-brass transition-colors">biotech</span>
                    <span className="font-body-md text-body-md text-starlight">Primary Instrument</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-data-md text-data-md text-moonlight group-hover:text-brass transition-colors">Binoculars</span>
                    <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
                  </div>
                </div>
                <div className="flex items-center justify-between h-[48px]">
                  <span className="font-body-md text-body-md text-starlight">Default Magnification</span>
                  <span className="font-data-md text-data-md text-moonlight">10x</span>
                </div>
              </div>
            </div>

            {/* Celestial Alerts */}
            <div className="bg-nightfall border border-faint-line rounded-lg overflow-hidden animate-stagger-5 hover:border-outline transition-colors">
              <div className="px-card-padding py-4 border-b border-faint-line bg-twilight/30">
                <h4 className="font-label-caps text-label-caps text-moonlight uppercase tracking-widest">Celestial Alerts</h4>
              </div>
              <div className="p-card-padding space-y-0">

                {/* Toggle: ISS Passes */}
                <div className="flex items-center justify-between h-[48px] border-b border-faint-line">
                  <span className="font-body-md text-body-md text-starlight">ISS Passes</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      checked={issPass}
                      onChange={() => setIssPass(!issPass)}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-midnight border-2 border-outline appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10 checked:translate-x-full checked:border-brass"
                      id="toggle_iss"
                      name="toggle_iss"
                      type="checkbox"
                    />
                    <label
                      className="toggle-label block overflow-hidden h-5 rounded-full bg-twilight cursor-pointer transition-colors duration-200 ease-in-out border border-faint-line peer-checked:bg-brass/30"
                      htmlFor="toggle_iss"
                    ></label>
                  </div>
                </div>

                {/* Toggle: Planetary Alignments */}
                <div className="flex items-center justify-between h-[48px] border-b border-faint-line">
                  <span className="font-body-md text-body-md text-starlight">Planetary Alignments</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      checked={planetaryAlignments}
                      onChange={() => setPlanetaryAlignments(!planetaryAlignments)}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-midnight border-2 border-outline appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10 checked:translate-x-full checked:border-brass"
                      id="toggle_planets"
                      name="toggle_planets"
                      type="checkbox"
                    />
                    <label
                      className="toggle-label block overflow-hidden h-5 rounded-full bg-twilight cursor-pointer transition-colors duration-200 ease-in-out border border-faint-line"
                      htmlFor="toggle_planets"
                    ></label>
                  </div>
                </div>

                {/* Toggle: Meteor Showers */}
                <div className="flex items-center justify-between h-[48px] border-b border-faint-line">
                  <span className="font-body-md text-body-md text-starlight">Meteor Showers</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      checked={meteorShowers}
                      onChange={() => setMeteorShowers(!meteorShowers)}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-midnight border-2 border-outline appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10 checked:translate-x-full checked:border-brass"
                      id="toggle_meteor"
                      name="toggle_meteor"
                      type="checkbox"
                    />
                    <label
                      className="toggle-label block overflow-hidden h-5 rounded-full bg-twilight cursor-pointer transition-colors duration-200 ease-in-out border border-faint-line"
                      htmlFor="toggle_meteor"
                    ></label>
                  </div>
                </div>

                {/* Toggle: Eclipses */}
                <div className="flex items-center justify-between h-[48px] border-b border-faint-line">
                  <span className="font-body-md text-body-md text-starlight">Eclipses</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      checked={eclipses}
                      onChange={() => setEclipses(!eclipses)}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-midnight border-2 border-outline appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10 checked:translate-x-full checked:border-brass"
                      id="toggle_eclipse"
                      name="toggle_eclipse"
                      type="checkbox"
                    />
                    <label
                      className="toggle-label block overflow-hidden h-5 rounded-full bg-twilight cursor-pointer transition-colors duration-200 ease-in-out border border-faint-line"
                      htmlFor="toggle_eclipse"
                    ></label>
                  </div>
                </div>

                {/* Toggle: Clear Sky Notifications (default OFF) */}
                <div className="flex items-center justify-between h-[48px]">
                  <span className="font-body-md text-body-md text-starlight">Clear Sky Notifications</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      checked={clearSky}
                      onChange={() => setClearSky(!clearSky)}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-moonlight border-2 border-outline appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10 checked:translate-x-full checked:border-brass"
                      id="toggle_clear"
                      name="toggle_clear"
                      type="checkbox"
                    />
                    <label
                      className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-container-low cursor-pointer transition-colors duration-200 ease-in-out border border-faint-line"
                      htmlFor="toggle_clear"
                    ></label>
                  </div>
                </div>

              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-nightfall border border-faint-line rounded-lg overflow-hidden animate-stagger-5 hover:border-outline transition-colors mt-8">
              <div className="p-card-padding flex flex-col gap-2">
                <button className="w-full text-left h-[48px] flex items-center justify-between group">
                  <span className="font-body-md text-body-md text-starlight group-hover:text-brass transition-colors">Export Observation Data</span>
                  <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-brass transition-colors">download</span>
                </button>
                <div className="h-px bg-faint-line w-full"></div>
                <button className="w-full text-left h-[48px] flex items-center justify-between group">
                  <span className="font-body-md text-body-md text-aurora group-hover:opacity-80 transition-opacity">Backup to Cloud</span>
                  <span className="material-symbols-outlined text-[18px] text-aurora opacity-70 group-hover:opacity-100 transition-opacity">cloud_upload</span>
                </button>
                <div className="h-px bg-faint-line w-full"></div>
                <button className="w-full text-left h-[48px] flex items-center justify-between group">
                  <span className="font-body-md text-body-md text-ember group-hover:opacity-80 transition-opacity">Sign Out</span>
                  <span className="material-symbols-outlined text-[18px] text-ember opacity-70 group-hover:opacity-100 transition-opacity">logout</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-24 md:h-12"></div>
      </div>
    </AppLayout>
  );
}
