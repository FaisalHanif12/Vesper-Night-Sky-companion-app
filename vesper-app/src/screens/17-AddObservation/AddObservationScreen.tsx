import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout/AppLayout';

type Equipment = 'naked-eye' | 'binoculars' | 'telescope';

interface FormState {
  objectName: string;
  date: string;
  time: string;
  seeing: number;
  clearSky: number;
  equipment: Equipment;
  notes: string;
  rating: number;
}

const QUICK_OBJECTS = ['Saturn', 'Jupiter', 'Moon', 'M31'];

export default function AddObservationScreen() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    objectName: 'Saturn',
    date: 'Aug 12, 2025',
    time: '09:42 PM',
    seeing: 4,
    clearSky: 87,
    equipment: 'naked-eye',
    notes: '',
    rating: 3,
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  function handleQuickObject(name: string) {
    setForm((prev) => ({ ...prev, objectName: name }));
  }

  function handleEquipment(value: Equipment) {
    setForm((prev) => ({ ...prev, equipment: value }));
  }

  function handleRating(value: number) {
    setForm((prev) => ({ ...prev, rating: value }));
  }

  function handleCancel() {
    navigate('/observation-log');
  }

  function handleSave() {
    navigate('/observation-log');
  }

  const displayRating = hoverRating ?? form.rating;

  return (
    <AppLayout>
      {/* TopAppBar */}
      <header className="h-topbar-height fixed top-0 right-0 left-sidebar-width border-b border-faint-line bg-nightfall flex justify-between items-center px-gutter w-full z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="text-brass hover:text-brass-dim transition-colors flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-label-caps text-label-caps">Log</span>
          </button>
          <h1 className="font-headline-sm text-headline-sm text-brass ml-4">VESPER</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-data-md text-data-md text-moonlight">Austin, Texas · 09:42 PM</span>
          <div className="flex gap-4 items-center border-l border-faint-line pl-6">
            <span className="font-data-md text-data-md text-moonlight">CLEAR 87%</span>
            <button className="text-starlight hover:text-brass-dim transition-colors hover:scale-105 duration-200">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-starlight hover:text-brass-dim transition-colors hover:scale-105 duration-200">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <div className="pt-topbar-height min-h-screen relative star-field flex items-center justify-center p-8">
        {/* Form Container */}
        <div className="w-full max-w-[760px] bg-nightfall border border-faint-line border-l-[3px] border-l-brass rounded-lg shadow-2xl p-8 slide-up-fade relative overflow-hidden">
          {/* Header */}
          <div className="mb-10">
            <span className="font-label-caps text-label-caps text-moonlight tracking-[0.2em] mb-2 block">
              NEW ENTRY
            </span>
            <h2 className="font-headline-lg text-headline-lg text-starlight">Log an observation.</h2>
          </div>

          <form className="space-y-section-gap" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            {/* Section 1: Object */}
            <section>
              <label className="font-label-caps text-label-caps text-moonlight block mb-3">
                CELESTIAL OBJECT
              </label>
              <div className="relative brass-glow rounded bg-twilight border border-faint-line flex items-center p-1 transition-all duration-300">
                <span className="material-symbols-outlined text-brass ml-3 mr-2">search</span>
                <input
                  className="bg-transparent border-none text-starlight font-data-md text-data-md w-full focus:ring-0"
                  placeholder="Search catalog..."
                  type="text"
                  value={form.objectName}
                  onChange={(e) => setForm((prev) => ({ ...prev, objectName: e.target.value }))}
                />
                <div className="bg-midnight border border-faint-line px-3 py-1 rounded-full mr-2">
                  <span className="font-data-sm text-data-sm text-brass">PLANET</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {QUICK_OBJECTS.map((obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => handleQuickObject(obj)}
                    className={
                      form.objectName === obj
                        ? 'px-4 py-2 rounded-full border border-brass bg-brass/10 text-brass font-data-sm text-data-sm whitespace-nowrap'
                        : 'px-4 py-2 rounded-full border border-faint-line text-moonlight hover:border-outline transition-colors font-data-sm text-data-sm whitespace-nowrap'
                    }
                  >
                    {obj}
                  </button>
                ))}
              </div>
            </section>

            {/* Section 2: When */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-grid-gap">
              <div>
                <label className="font-label-caps text-label-caps text-moonlight block mb-3">DATE</label>
                <div className="relative brass-glow rounded bg-twilight border border-faint-line flex items-center p-1 transition-all duration-300">
                  <span className="material-symbols-outlined text-moonlight ml-3 mr-2">calendar_today</span>
                  <input
                    className="bg-transparent border-none text-starlight font-data-md text-data-md w-full focus:ring-0"
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-moonlight block mb-3">TIME</label>
                <div className="relative brass-glow rounded bg-twilight border border-faint-line flex items-center p-1 transition-all duration-300">
                  <span className="material-symbols-outlined text-moonlight ml-3 mr-2">schedule</span>
                  <input
                    className="bg-transparent border-none text-starlight font-data-md text-data-md w-full focus:ring-0"
                    type="text"
                    value={form.time}
                    onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Conditions & Equipment */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-grid-gap">
              {/* Conditions Sliders */}
              <div className="bg-twilight border border-faint-line p-6 rounded">
                <h3 className="font-label-caps text-label-caps text-moonlight mb-6">CONDITIONS</h3>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-data-sm text-data-sm text-starlight">Seeing</span>
                    <span className="font-data-sm text-data-sm text-brass">{form.seeing}/5</span>
                  </div>
                  <input
                    className="w-full"
                    max={5}
                    min={1}
                    type="range"
                    value={form.seeing}
                    onChange={(e) => setForm((prev) => ({ ...prev, seeing: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-data-sm text-data-sm text-starlight">Clear Sky</span>
                    <span className="font-data-sm text-data-sm text-brass">{form.clearSky}%</span>
                  </div>
                  <input
                    className="w-full"
                    max={100}
                    min={0}
                    type="range"
                    value={form.clearSky}
                    onChange={(e) => setForm((prev) => ({ ...prev, clearSky: Number(e.target.value) }))}
                  />
                </div>
              </div>

              {/* Equipment Radio Cards */}
              <div>
                <h3 className="font-label-caps text-label-caps text-moonlight mb-3">EQUIPMENT</h3>
                <div className="space-y-3">
                  {/* Naked Eye */}
                  <label
                    className={
                      form.equipment === 'naked-eye'
                        ? 'flex items-center p-4 border border-brass bg-brass/5 rounded cursor-pointer transition-colors relative overflow-hidden'
                        : 'flex items-center p-4 border border-faint-line hover:border-outline bg-twilight rounded cursor-pointer transition-colors'
                    }
                  >
                    <input
                      className="sr-only"
                      name="equipment"
                      type="radio"
                      checked={form.equipment === 'naked-eye'}
                      onChange={() => handleEquipment('naked-eye')}
                    />
                    <span
                      className={
                        form.equipment === 'naked-eye'
                          ? 'material-symbols-outlined text-brass mr-4'
                          : 'material-symbols-outlined text-moonlight mr-4'
                      }
                    >
                      visibility
                    </span>
                    <span
                      className={
                        form.equipment === 'naked-eye'
                          ? 'font-data-md text-data-md text-starlight'
                          : 'font-data-md text-data-md text-moonlight'
                      }
                    >
                      Naked Eye
                    </span>
                    {form.equipment === 'naked-eye' && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-brass" />
                    )}
                  </label>

                  {/* Binoculars */}
                  <label
                    className={
                      form.equipment === 'binoculars'
                        ? 'flex items-center p-4 border border-brass bg-brass/5 rounded cursor-pointer transition-colors relative overflow-hidden'
                        : 'flex items-center p-4 border border-faint-line hover:border-outline bg-twilight rounded cursor-pointer transition-colors'
                    }
                  >
                    <input
                      className="sr-only"
                      name="equipment"
                      type="radio"
                      checked={form.equipment === 'binoculars'}
                      onChange={() => handleEquipment('binoculars')}
                    />
                    <span
                      className={
                        form.equipment === 'binoculars'
                          ? 'material-symbols-outlined text-brass mr-4'
                          : 'material-symbols-outlined text-moonlight mr-4'
                      }
                    >
                      eyeglasses
                    </span>
                    <span
                      className={
                        form.equipment === 'binoculars'
                          ? 'font-data-md text-data-md text-starlight'
                          : 'font-data-md text-data-md text-moonlight'
                      }
                    >
                      Binoculars
                    </span>
                    {form.equipment === 'binoculars' && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-brass" />
                    )}
                  </label>

                  {/* Telescope */}
                  <label
                    className={
                      form.equipment === 'telescope'
                        ? 'flex items-center p-4 border border-brass bg-brass/5 rounded cursor-pointer transition-colors relative overflow-hidden'
                        : 'flex items-center p-4 border border-faint-line hover:border-outline bg-twilight rounded cursor-pointer transition-colors'
                    }
                  >
                    <input
                      className="sr-only"
                      name="equipment"
                      type="radio"
                      checked={form.equipment === 'telescope'}
                      onChange={() => handleEquipment('telescope')}
                    />
                    <span
                      className={
                        form.equipment === 'telescope'
                          ? 'material-symbols-outlined text-brass mr-4'
                          : 'material-symbols-outlined text-moonlight mr-4'
                      }
                    >
                      satellite
                    </span>
                    <span
                      className={
                        form.equipment === 'telescope'
                          ? 'font-data-md text-data-md text-starlight'
                          : 'font-data-md text-data-md text-moonlight'
                      }
                    >
                      Telescope
                    </span>
                    {form.equipment === 'telescope' && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-brass" />
                    )}
                  </label>
                </div>
              </div>
            </section>

            {/* Section 4: Notes */}
            <section>
              <label className="font-label-caps text-label-caps text-moonlight block mb-3">
                OBSERVATION NOTES
              </label>
              <div className="brass-glow rounded bg-twilight border border-faint-line transition-all duration-300">
                <textarea
                  className="bg-transparent border-none text-starlight font-body-md text-body-md w-full h-[120px] p-4 focus:ring-0 resize-none placeholder-moonlight/50"
                  placeholder="Record visual details, magnitude estimates, or subjective impressions..."
                  value={form.notes}
                  onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </section>

            {/* Section 5: Rating & Actions */}
            <section className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-faint-line mt-8">
              <div className="flex items-center mb-6 sm:mb-0">
                <span className="font-label-caps text-label-caps text-moonlight mr-4">RATING</span>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= displayRating
                          ? 'material-symbols-outlined text-brass'
                          : 'material-symbols-outlined text-moonlight hover:text-brass transition-colors'
                      }
                      style={star <= displayRating ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <button
                  className="flex-1 sm:flex-none h-12 px-6 border border-faint-line rounded text-starlight font-data-md text-data-md hover:border-outline hover:text-white transition-colors"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 sm:flex-none h-12 px-8 bg-brass text-midnight font-data-md text-data-md rounded font-semibold hover:bg-brass-dim active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(230,190,122,0.3)]"
                  type="submit"
                >
                  Save Entry
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>

      <style>{`
        .star-field {
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(232, 237, 247, 0.4) 1px, transparent 0),
            radial-gradient(1px 1px at 30% 40%, rgba(232, 237, 247, 0.3) 1px, transparent 0),
            radial-gradient(2px 2px at 50% 60%, rgba(232, 237, 247, 0.5) 1px, transparent 0),
            radial-gradient(1px 1px at 70% 80%, rgba(232, 237, 247, 0.2) 1px, transparent 0),
            radial-gradient(1px 1px at 90% 10%, rgba(232, 237, 247, 0.6) 1px, transparent 0);
          background-size: 200px 200px;
        }

        .slide-up-fade {
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes slideUpFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brass-glow:focus-within {
          box-shadow: 0 0 12px rgba(230, 190, 122, 0.15);
          border-color: #E6BE7A;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #E6BE7A;
          cursor: pointer;
          margin-top: -4px;
          box-shadow: 0 0 8px rgba(230, 190, 122, 0.5);
        }

        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #1E2842;
          border-radius: 9999px;
          border: 1px solid #2A3552;
        }
      `}</style>
    </AppLayout>
  );
}
