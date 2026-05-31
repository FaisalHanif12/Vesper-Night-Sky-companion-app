import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStarField } from '../../hooks/useStarField'

export default function WelcomeScreen() {
  const navigate = useNavigate()
  useStarField('starfield', 150)

  useEffect(() => {
    const meteors = document.querySelectorAll<HTMLElement>('.meteor-streak')
    const fireMeteors = () => {
      meteors.forEach(m => {
        m.style.animation = 'none'
        void m.offsetHeight
      })
      const m1 = document.getElementById('meteor-1')
      const m2 = document.getElementById('meteor-2')
      const m3 = document.getElementById('meteor-3')
      if (m1) setTimeout(() => { m1.style.animation = 'm1-anim 0.5s ease-in forwards' }, 0)
      if (m3) setTimeout(() => { m3.style.animation = 'm3-anim 0.45s ease-in forwards' }, 80)
      if (m2) setTimeout(() => { m2.style.animation = 'm2-anim 0.4s ease-in forwards' }, 150)
    }
    const t = setTimeout(() => {
      fireMeteors()
      const id = setInterval(fireMeteors, 5500)
      return () => clearInterval(id)
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="relative flex flex-col items-center justify-center font-sans text-starlight antialiased selection:bg-brass/30"
      style={{ minHeight: '100vh', backgroundColor: '#0D1320', overflow: 'hidden' }}
    >
      {/* Embedded styles for Welcome-specific animations */}
      <style>{`
        .meteor-streak {
          position: absolute;
          height: 1.5px;
          background: linear-gradient(to right, rgba(232,237,247,0), #E8EDF7);
          border-radius: 50px;
          opacity: 0;
        }
        #meteor-1 { top: 15%; right: 20%; width: 120px; }
        #meteor-2 { top: 10%; left: 15%; width: 80px; }
        #meteor-3 { top: 5%; left: 45%; width: 100px; }
        @keyframes m1-anim {
          0% { opacity: 0; transform: rotate(160deg) translateX(0) scaleX(0); }
          15% { opacity: 1; transform: rotate(160deg) translateX(50px) scaleX(1); }
          85% { opacity: 1; transform: rotate(160deg) translateX(250px) scaleX(1); }
          100% { opacity: 0; transform: rotate(160deg) translateX(300px) scaleX(0); }
        }
        @keyframes m2-anim {
          0% { opacity: 0; transform: rotate(35deg) translateX(0) scaleX(0); }
          15% { opacity: 1; transform: rotate(35deg) translateX(30px) scaleX(1); }
          85% { opacity: 1; transform: rotate(35deg) translateX(150px) scaleX(1); }
          100% { opacity: 0; transform: rotate(35deg) translateX(180px) scaleX(0); }
        }
        @keyframes m3-anim {
          0% { opacity: 0; transform: rotate(168deg) translateX(0) scaleX(0); }
          15% { opacity: 1; transform: rotate(168deg) translateX(40px) scaleX(1); }
          85% { opacity: 1; transform: rotate(168deg) translateX(200px) scaleX(1); }
          100% { opacity: 0; transform: rotate(168deg) translateX(240px) scaleX(0); }
        }
        .orrery-emblem {
          width: 24px; height: 24px; position: relative; margin: 0 auto 16px auto;
          border-radius: 50%; border: 1px solid #E6BE7A;
          display: flex; align-items: center; justify-content: center;
        }
        .orrery-center { width: 4px; height: 4px; background-color: #E6BE7A; border-radius: 50%; box-shadow: 0 0 4px 1px rgba(230,190,122,0.4); }
        .orrery-orbit-1 { position: absolute; width: 12px; height: 4px; border: 1px solid rgba(230,190,122,0.5); border-radius: 50%; transform: rotate(30deg); }
        .orrery-orbit-2 { position: absolute; width: 18px; height: 6px; border: 1px solid rgba(230,190,122,0.3); border-radius: 50%; transform: rotate(-45deg); }
      `}</style>

      {/* Star Field */}
      <div className="absolute inset-0 z-0 pointer-events-none" id="starfield" />

      {/* Horizon Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/5 horizon-gradient z-0 pointer-events-none" />

      {/* Meteors */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="meteor-streak" id="meteor-1" />
        <div className="meteor-streak" id="meteor-2" />
        <div className="meteor-streak" id="meteor-3" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center">
        {/* Top Mark */}
        <div className="fade-in delay-0 mb-12">
          <div className="orrery-emblem">
            <div className="orrery-orbit-1" />
            <div className="orrery-orbit-2" />
            <div className="orrery-center" />
          </div>
          <div style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9AA6BF' }}>
            VESPER
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: 52, lineHeight: 1.1, fontWeight: 600, letterSpacing: '-0.02em', color: '#E8EDF7', marginBottom: 24, maxWidth: 520 }}
          className="fade-in delay-1">
          A field companion for the night sky.
        </h1>

        {/* Subline */}
        <p style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 16, lineHeight: 1.6, color: '#9AA6BF', marginBottom: 48, maxWidth: 400 }}
          className="fade-in delay-2">
          Know what to look for tonight. Know when. Know exactly where.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-6">
          <div className="fade-in delay-3">
            <button
              onClick={() => navigate('/set-your-sky')}
              style={{
                backgroundColor: '#E6BE7A', color: '#0D1320', width: 160, height: 48,
                borderRadius: 12, fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 16,
                fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s'
              }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#B8965C')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#E6BE7A')}
            >
              Begin
            </button>
          </div>
          <div className="fade-in delay-4">
            <button
              onClick={() => navigate('/tonight')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 16,
                color: '#9AA6BF', transition: 'color 0.2s'
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#E8EDF7')}
              onMouseOut={e => (e.currentTarget.style.color = '#9AA6BF')}
            >
              I already have an account
              <span style={{ color: '#E6BE7A' }}>→</span>
            </button>
          </div>
        </div>

        {/* Closing Line */}
        <p className="fade-in delay-5" style={{ fontFamily: '"Fraunces", serif', fontSize: 18, fontStyle: 'italic', color: '#4A5568', marginTop: 48 }}>
          Step outside. The sky is waiting.
        </p>
      </div>
    </div>
  )
}
