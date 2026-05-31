import { useNavigate } from 'react-router-dom'
import { useStarField } from '../../hooks/useStarField'

export default function SetYourSkyScreen() {
  const navigate = useNavigate()
  useStarField('starfield-sky', 150)

  return (
    <div
      className="bg-midnight min-h-screen text-starlight antialiased overflow-x-hidden flex items-center justify-center relative"
      style={{ backgroundColor: '#0D1320' }}
    >
      {/* Page-scoped styles */}
      <style>{`
        .starfield-sky {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          z-index: -2;
          background: #0D1320;
          overflow: hidden;
        }
        .stars {
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(232,237,247,0.6) 1px, transparent 0),
            radial-gradient(1px 1px at 40% 60%, rgba(154,166,191,0.25) 1px, transparent 0),
            radial-gradient(1px 1px at 80% 30%, rgba(232,237,247,0.6) 1px, transparent 0),
            radial-gradient(2px 2px at 90% 80%, rgba(154,166,191,0.25) 1px, transparent 0);
          background-size: 200px 200px;
          animation: drift 120s linear infinite;
        }
        @keyframes drift {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .stagger-item {
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.6s ease-out forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .stagger-1 { animation-delay: 120ms; }
        .stagger-2 { animation-delay: 240ms; }
        .stagger-3 { animation-delay: 360ms; }
        .stagger-4 { animation-delay: 480ms; }
        .stagger-5 { animation-delay: 600ms; }
        .stagger-6 { animation-delay: 720ms; }
        .brass-bloom {
          box-shadow: 0 0 20px 5px rgba(230, 190, 122, 0.15);
        }
      `}</style>

      {/* Star field background */}
      <div className="starfield-sky" id="starfield-sky">
        <div className="stars" />
      </div>

      {/* Horizon gradient */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '15vh',
          zIndex: -1,
          background: 'linear-gradient(transparent, rgb(36, 27, 40))',
        }}
      />

      {/* Main content column */}
      <div className="w-full max-w-[720px] px-6 py-12 relative z-10 flex flex-col min-h-screen justify-center">

        {/* Top Navigation — back button placeholder */}
        <div className="absolute top-8 left-6 stagger-item stagger-1">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-moonlight hover:text-starlight transition-colors"
          />
        </div>

        {/* Header Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="font-label-caps text-label-caps text-moonlight mb-4 block stagger-item stagger-1 uppercase tracking-[0.14em]">
            STEP 1 OF 2
          </span>
          <h1
            className="font-headline-lg text-headline-lg text-starlight mb-4 stagger-item stagger-2"
            style={{ fontSize: 36 }}
          >
            Where are you observing from?
          </h1>
          <p className="font-body-md text-body-md text-moonlight max-w-md mx-auto stagger-item stagger-2">
            Vesper uses your location to show only what's visible from your sky.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full mb-8 stagger-item stagger-3">
          <div className="relative">
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-moonlight"
              style={{ fontSize: 20 }}
            >
              search
            </span>
            <input
              className="w-full bg-nightfall border border-faint-line rounded-[16px] h-[48px] pl-12 pr-4 text-starlight font-body-md text-body-md placeholder:text-moonlight focus:outline-none focus:border-brass transition-colors shadow-none ring-0 focus:ring-0"
              placeholder="Search city or coordinates…"
              type="text"
            />
          </div>
        </div>

        {/* Map Panel */}
        <div
          className="w-full h-[280px] rounded-[16px] border border-faint-line relative overflow-hidden mb-8 flex items-center justify-center stagger-item stagger-4"
          style={{ backgroundColor: '#0E1520' }}
        >
          {/* Realistic SVG Dark Map */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 800 280"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Downtown area */}
            <path d="M350,80 L450,80 L480,180 L320,180 Z" fill="#141E30" />
            {/* Parks / Green spaces */}
            <path d="M200,100 Q250,120 280,180 T250,250 Z" fill="#0E1F15" />
            <path d="M500,40 Q550,20 600,60 T650,150 Z" fill="#0E1F15" />
            {/* Lady Bird Lake */}
            <path
              d="M-50,160 Q100,160 200,180 T400,170 T600,190 T850,150"
              fill="none"
              stroke="#1A2E40"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            />
            {/* Local Streets (Faint grid) */}
            <g stroke="#1E2D45" strokeWidth="0.5">
              <path d="M0,20 L800,40 M0,60 L800,80 M0,100 L800,120 M0,140 L800,160 M0,180 L800,200 M0,220 L800,240 M0,260 L800,280" />
              <path d="M20,0 L40,280 M60,0 L80,280 M100,0 L120,280 M140,0 L160,280 M180,0 L200,280 M220,0 L240,280 M260,0 L280,280 M300,0 L320,280 M340,0 L360,280 M380,0 L400,280 M420,0 L440,280 M460,0 L480,280 M500,0 L520,280 M540,0 L560,280 M580,0 L600,280 M620,0 L640,280 M660,0 L680,280 M700,0 L720,280 M740,0 L760,280 M780,0 L800,280" />
            </g>
            {/* Main Roads */}
            <g stroke="#2A3A55" strokeWidth="1">
              <path d="M0,100 L800,120" />
              <path d="M0,200 L800,180" />
              <path d="M250,0 L250,280" />
              <path d="M550,0 L550,280" />
              <path d="M350,0 L350,280" />
              <path d="M450,0 L450,280" />
            </g>
            {/* Highways */}
            <g stroke="#3A4A6A" strokeWidth="2">
              {/* I-35 */}
              <path d="M500,0 Q520,140 480,280" fill="none" />
              {/* Hwy 290 */}
              <path d="M0,240 Q400,260 800,220" fill="none" />
            </g>
            {/* Labels */}
            <text fill="#4A5A7A" fontFamily="'IBM Plex Mono', monospace" fontSize="9px" x="355" y="100">
              Downtown Austin
            </text>
            <text fill="#3A4A6A" fontFamily="'IBM Plex Mono', monospace" fontSize="8px" x="360" y="210">
              South Congress
            </text>
            <text fill="#2A4055" fontFamily="'IBM Plex Mono', monospace" fontSize="8px" fontStyle="italic" x="580" y="200">
              Lady Bird Lake
            </text>
            <text fill="#3A4A6A" fontFamily="'IBM Plex Mono', monospace" fontSize="8px" x="510" y="40">
              I-35
            </text>
            <text fill="#3A4A6A" fontFamily="'IBM Plex Mono', monospace" fontSize="8px" x="100" y="235">
              Hwy 290
            </text>
          </svg>

          {/* Simulated Marker */}
          <div className="relative z-10 flex flex-col items-center">
            <span
              className="material-symbols-outlined text-brass mb-1 brass-bloom rounded-full"
              style={{ fontVariationSettings: '"FILL" 1', fontSize: 24 }}
            >
              location_on
            </span>
            <span className="font-label-caps text-label-caps text-brass bg-nightfall px-2 py-1 rounded border border-faint-line">
              AUSTIN, TEXAS
            </span>
          </div>
        </div>

        {/* Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-gap mb-12 stagger-item stagger-5">
          {/* Card 1: Bortle Scale */}
          <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-moonlight uppercase block mb-2">
                BORTLE SCALE
              </span>
              <div className="font-data-lg text-data-lg text-brass mb-1">Zone 4</div>
              <div className="font-body-sm text-body-sm text-moonlight mb-4">Rural / Suburban Transition</div>
            </div>
            {/* 9-step scale bar */}
            <div className="flex space-x-1 h-2">
              <div className="flex-1 bg-aurora rounded-l-full" />
              <div className="flex-1 bg-aurora" />
              <div className="flex-1 bg-aurora" />
              <div className="flex-1 bg-aurora" />
              <div className="flex-1 bg-faint-line" />
              <div className="flex-1 bg-faint-line" />
              <div className="flex-1 bg-faint-line" />
              <div className="flex-1 bg-faint-line" />
              <div className="flex-1 bg-faint-line rounded-r-full" />
            </div>
          </div>

          {/* Card 2: Dark Window */}
          <div className="bg-nightfall border border-faint-line rounded-lg p-card-padding flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-moonlight uppercase block mb-2">
                TONIGHT'S DARK WINDOW
              </span>
              <div className="font-data-lg text-data-lg text-starlight mb-1">21:34 → 04:12</div>
              <div className="font-body-sm text-body-sm text-moonlight mb-4">Astronomical twilight to dawn</div>
            </div>
            {/* Timeline bar */}
            <div className="relative h-2 bg-faint-line rounded-full w-full">
              <div className="absolute left-1/4 right-1/4 h-full bg-brass rounded-full brass-bloom" />
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-faint-line stagger-item stagger-6">
          <button
            onClick={() => navigate('/')}
            className="font-body-md text-body-md text-moonlight hover:text-starlight transition-colors flex items-center"
          >
            <span className="material-symbols-outlined mr-1" style={{ fontSize: 16 }}>
              arrow_back
            </span>{' '}
            Back
          </button>
          <button
            onClick={() => navigate('/calibrate')}
            className="bg-brass text-midnight font-data-md text-data-md rounded-[12px] w-[160px] h-[48px] flex items-center justify-center hover:bg-surface-tint transition-colors"
          >
            Continue{' '}
            <span className="material-symbols-outlined ml-2" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}
