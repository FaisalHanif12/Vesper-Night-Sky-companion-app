import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStarField } from '../../hooks/useStarField'

type InterestKey = 'planets' | 'deepSky' | 'meteors' | 'moon' | 'iss'
type GearKey = 'nakedEye' | 'binoculars' | 'telescope'

const INTERESTS: { key: InterestKey; icon: string; label: string }[] = [
  { key: 'planets',   icon: 'public',           label: 'Planets' },
  { key: 'deepSky',   icon: 'blur_on',           label: 'Deep-Sky Objects' },
  { key: 'meteors',   icon: 'storm',             label: 'Meteor Showers' },
  { key: 'moon',      icon: 'nightlight_round',  label: 'The Moon' },
  { key: 'iss',       icon: 'satellite_alt',     label: 'ISS Passes' },
]

const GEAR: { key: GearKey; icon: string; label: string }[] = [
  { key: 'nakedEye',    icon: 'visibility',  label: 'Naked Eye' },
  { key: 'binoculars',  icon: 'eyeglasses',  label: 'Binoculars' },
  { key: 'telescope',   icon: 'satellite',   label: 'Telescope' },
]

export default function CalibrateScreen() {
  const navigate = useNavigate()
  useStarField('starfield', 150)

  const [selectedInterests, setSelectedInterests] = useState<Set<InterestKey>>(
    new Set(['planets', 'deepSky', 'meteors', 'moon', 'iss'])
  )
  const [selectedGear, setSelectedGear] = useState<GearKey>('nakedEye')

  function toggleInterest(key: InterestKey) {
    setSelectedInterests(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div
      className="bg-midnight min-h-screen text-starlight font-body-md overflow-x-hidden"
      style={{ backgroundColor: '#0D1320' }}
    >
      {/* Embedded styles */}
      <style>{`
        .starfield-container {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .star {
          position: absolute;
          background-color: #E8EDF7;
          border-radius: 50%;
          animation: drift linear infinite;
        }

        .star-large {
          width: 3px;
          height: 3px;
          background-color: #E8EDF7;
          opacity: 1;
        }

        .star-medium {
          width: 2px;
          height: 2px;
          background-color: #9AA6BF;
          opacity: 0.6;
        }

        .star-small {
          width: 1px;
          height: 1px;
          background-color: #9AA6BF;
          opacity: 0.25;
        }

        @keyframes drift {
          from { transform: translateY(100vh); }
          to { transform: translateY(-100px); }
        }

        .horizon-glow {
          position: fixed;
          bottom: 0; left: 0; width: 100vw; height: 50vh;
          background: linear-gradient(to top, rgba(36, 27, 40, 0.8), transparent);
          pointer-events: none;
          z-index: 0;
        }

        .stagger-1 { animation: fadeInUp 0.6s ease-out 0.08s both; }
        .stagger-2 { animation: fadeInUp 0.6s ease-out 0.16s both; }
        .stagger-3 { animation: fadeInUp 0.6s ease-out 0.24s both; }
        .stagger-4 { animation: fadeInUp 0.6s ease-out 0.32s both; }
        .stagger-5 { animation: fadeInUp 0.6s ease-out 0.40s both; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .toggle-card.selected {
          border-color: #E6BE7A;
          background-color: rgba(230, 190, 122, 0.05);
        }

        .toggle-card.selected .material-symbols-outlined {
          color: #E6BE7A;
        }

        .radio-card.selected {
          border-color: #E6BE7A;
          background-color: rgba(230, 190, 122, 0.05);
        }

        .radio-card.selected .material-symbols-outlined {
          color: #E6BE7A;
        }

        @media (prefers-reduced-motion: reduce) {
          .star { animation: none !important; }
        }
      `}</style>

      <div className="starfield-container" id="starfield" />
      <div className="horizon-glow" />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center py-12 px-6">
        <div className="w-full max-w-[640px] flex flex-col gap-10 mx-auto">

          {/* Header Section */}
          <div className="flex flex-col gap-4 stagger-1">
            <button
              aria-label="Go back"
              className="text-moonlight hover:text-starlight transition-colors self-start mb-4"
              onClick={() => navigate('/set-your-sky')}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div>
              <p className="font-label-caps text-label-caps text-moonlight uppercase tracking-[0.14em]">STEP 2 OF 2</p>
              <h1 className="font-headline-lg text-headline-lg mt-2 mb-3">What do you want to chase?</h1>
              <p className="font-body-md text-body-md text-moonlight">Select everything that interests you. Vesper will rank your sky accordingly.</p>
            </div>
          </div>

          {/* Interest Selector */}
          <div className="stagger-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTERESTS.map(({ key, icon, label }) => (
                <button
                  key={key}
                  className={`toggle-card${selectedInterests.has(key) ? ' selected' : ''} flex items-center gap-3 bg-nightfall border border-faint-line rounded-2xl h-[48px] px-[22px] transition-all duration-200 ease-in-out hover:border-outline text-left`}
                  onClick={() => toggleInterest(key)}
                >
                  <span className="material-symbols-outlined text-[18px] text-moonlight transition-colors duration-200">{icon}</span>
                  <span className="font-body-md text-[14px] font-medium text-starlight">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gear Section */}
          <div className="flex flex-col gap-4 stagger-3 mt-4">
            <h2 className="font-body-md text-[16px] font-semibold text-starlight">What's your setup?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GEAR.map(({ key, icon, label }) => (
                <button
                  key={key}
                  className={`radio-card${selectedGear === key ? ' selected' : ''} flex items-center justify-center gap-2 bg-nightfall border border-faint-line rounded-2xl h-[48px] px-[22px] transition-all duration-200 ease-in-out hover:border-outline`}
                  onClick={() => setSelectedGear(key)}
                >
                  <span className="material-symbols-outlined text-[18px] text-moonlight transition-colors duration-200">{icon}</span>
                  <span className="font-body-md text-[14px] font-medium text-starlight">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Closing */}
          <div className="flex flex-col items-center gap-8 stagger-4 mt-8 text-center">
            <p className="font-quote text-quote italic text-[#4A5568] max-w-md">Vesper will find the best targets for your sky and your eyes.</p>
            <button
              className="bg-brass text-midnight font-body-md font-medium text-[16px] h-[48px] w-[200px] rounded-xl flex items-center justify-center gap-2 hover:bg-brass-dim transition-colors"
              onClick={() => navigate('/tonight')}
            >
              Enter Vesper
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}
