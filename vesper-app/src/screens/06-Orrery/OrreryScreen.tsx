import { useEffect } from 'react';
import AppLayout from '../../components/common/AppLayout/AppLayout';

export default function OrreryScreen() {

  useEffect(() => {
    // Inject keyframe animations and styles into the document
    const styleId = 'orrery-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .orbit-ring {
          border: 1px solid rgba(230, 190, 122, 0.3);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: drawIn 2s ease-out forwards;
          opacity: 0;
        }
        .orbit-ring.selected {
          border-color: rgba(230, 190, 122, 1);
          box-shadow: inset 0 0 10px rgba(230, 190, 122, 0.1), 0 0 10px rgba(230, 190, 122, 0.1);
        }
        .planet-node {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }
        .planet-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
        }
        .anim-p1 { animation: rotate 4s linear infinite; }
        .anim-p2 { animation: rotate 8s linear infinite; }
        .anim-p3 { animation: rotate 12s linear infinite; }
        .anim-p4 { animation: rotate 20s linear infinite; }
        .anim-p5 { animation: rotate 35s linear infinite; }
        .anim-p6 { animation: rotate 50s linear infinite; }
        .anim-p7 { animation: rotate 70s linear infinite; }
        .anim-p8 { animation: rotate 90s linear infinite; }
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes drawIn {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .sun-bloom {
          box-shadow: 0 0 40px rgba(255, 219, 160, 0.4), inset 0 0 20px rgba(255, 219, 160, 0.8);
        }
        .saturn-bloom {
          box-shadow: 0 0 20px rgba(230, 190, 122, 0.6);
        }
        .dashed-connector {
          background-image: linear-gradient(to right, #E6BE7A 50%, transparent 50%);
          background-size: 8px 1px;
          background-repeat: repeat-x;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  return (
    <AppLayout>
      {/* TopAppBar */}
      <header className="fixed top-0 right-0 h-topbar-height left-0 md:left-[240px] z-50 flex justify-between items-center px-gutter w-full md:w-[calc(100%-240px)] bg-nightfall/80 backdrop-blur-md border-b border-faint-line">
        <div className="flex items-center">
          {/* Mobile Menu Toggle (Dummy) */}
          <button className="md:hidden mr-4 text-brass"><span className="material-symbols-outlined">menu</span></button>
          <h1 className="font-headline-sm text-headline-sm font-bold text-brass tracking-wider hidden md:block">VESPER</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-moonlight hover:text-starlight transition-colors p-2 flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
          </button>
          <button className="text-moonlight hover:text-starlight transition-colors p-2 flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>schedule</span>
          </button>
          <button className="text-starlight border border-faint-line px-4 py-2 rounded flex items-center gap-2 hover:border-outline transition-colors text-sm">
            Clear Skies
          </button>
          <button className="bg-brass text-midnight px-4 py-2 rounded font-medium flex items-center gap-2 hover:opacity-90 transition-opacity text-sm">
            + Log Observation
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 mt-[64px] relative bg-midnight flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Orrery Area (Left/Center) */}
        <div className="flex-1 relative flex items-center justify-center p-8">
          {/* The Orrery Diagram */}
          <div className="relative w-[600px] h-[600px]">
            {/* Sun */}
            <div className="absolute top-1/2 left-1/2 w-[28px] h-[28px] -ml-[14px] -mt-[14px] bg-[#E6C07A] rounded-full sun-bloom z-10"></div>

            {/* 1: Mercury */}
            <div className="orbit-ring" style={{ width: 100, height: 100, animationDelay: '0.1s' }}></div>
            <div className="planet-container anim-p1" style={{ width: 100, height: 100 }}>
              <div className="planet-node bg-gray-400 w-[4px] h-[4px]" style={{ top: 0, left: '50%' }}></div>
            </div>

            {/* 2: Venus */}
            <div className="orbit-ring" style={{ width: 160, height: 160, animationDelay: '0.2s' }}></div>
            <div className="planet-container anim-p2" style={{ width: 160, height: 160 }}>
              <div className="planet-node bg-[#F0E6D2] w-[6px] h-[6px]" style={{ top: '80%', left: '10%' }}></div>
            </div>

            {/* 3: Earth */}
            <div className="orbit-ring" style={{ width: 230, height: 230, animationDelay: '0.3s' }}></div>
            <div className="planet-container anim-p3" style={{ width: 230, height: 230 }}>
              <div className="planet-node bg-[#4A90E2] w-[7px] h-[7px]" style={{ top: '20%', left: '85%' }}></div>
            </div>

            {/* 4: Mars */}
            <div className="orbit-ring" style={{ width: 310, height: 310, animationDelay: '0.4s' }}></div>
            <div className="planet-container anim-p4" style={{ width: 310, height: 310 }}>
              <div className="planet-node bg-ember w-[5px] h-[5px]" style={{ top: '90%', left: '70%' }}></div>
            </div>

            {/* 5: Jupiter */}
            <div className="orbit-ring" style={{ width: 410, height: 410, animationDelay: '0.5s' }}></div>
            <div className="planet-container anim-p5" style={{ width: 410, height: 410 }}>
              <div className="planet-node bg-[#C8A98B] w-[11px] h-[11px]" style={{ top: '30%', left: '10%' }}></div>
            </div>

            {/* 6: Saturn (Selected) */}
            <div className="orbit-ring selected" style={{ width: 520, height: 520, animationDelay: '0.6s' }}></div>
            <div className="planet-container anim-p6" style={{ width: 520, height: 520 }}>
              <div className="planet-node bg-brass w-[13px] h-[13px] saturn-bloom z-20 flex items-center justify-center" style={{ top: '15%', left: '80%' }}>
                {/* Tiny Saturn Ring representation */}
                <div className="absolute w-[24px] h-[4px] border border-brass rounded-[50%] transform -rotate-12"></div>
              </div>
            </div>

            {/* Dashed Connector from Saturn to Right Panel */}
            <div className="absolute top-[15%] left-[80%] w-[300px] h-[1px] dashed-connector z-0 ml-[6px]"></div>

            {/* 7: Uranus */}
            <div className="orbit-ring" style={{ width: 650, height: 650, animationDelay: '0.7s' }}></div>
            <div className="planet-container anim-p7" style={{ width: 650, height: 650 }}>
              <div className="planet-node bg-[#8FC1D4] w-[9px] h-[9px]" style={{ top: '60%', left: '95%' }}></div>
            </div>

            {/* 8: Neptune */}
            <div className="orbit-ring" style={{ width: 780, height: 780, animationDelay: '0.8s' }}></div>
            <div className="planet-container anim-p8" style={{ width: 780, height: 780 }}>
              <div className="planet-node bg-[#3A5FCD] w-[9px] h-[9px]" style={{ top: '85%', left: '25%' }}></div>
            </div>
          </div>

          {/* Bottom Time Controls */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-center gap-6 bg-nightfall/90 border border-faint-line p-4 rounded-xl backdrop-blur-sm max-w-[600px] mx-auto z-20">
            <div className="flex flex-col">
              <span className="font-label-caps text-moonlight mb-1">SIMULATION DATE</span>
              <span className="font-data-md text-data-md text-starlight">May 30, 2025</span>
            </div>
            <div className="flex-1 flex items-center gap-3 mx-4">
              <span className="material-symbols-outlined text-moonlight text-sm">fast_rewind</span>
              <div className="h-[2px] bg-faint-line flex-1 relative">
                <div className="absolute top-0 left-0 h-full bg-brass w-1/3"></div>
                <div className="absolute top-1/2 left-1/3 w-[12px] h-[12px] bg-brass rounded-full -mt-[6px] -ml-[6px] shadow-[0_0_8px_rgba(230,190,122,0.5)]"></div>
              </div>
              <span className="material-symbols-outlined text-moonlight text-sm">fast_forward</span>
            </div>
            <div className="flex gap-2 bg-twilight rounded-full p-1 border border-faint-line">
              <button className="px-3 py-1 text-xs font-data-sm text-moonlight hover:text-starlight rounded-full">1x</button>
              <button className="px-3 py-1 text-xs font-data-sm text-midnight bg-brass rounded-full font-medium">10x</button>
              <button className="px-3 py-1 text-xs font-data-sm text-moonlight hover:text-starlight rounded-full">100x</button>
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="w-[360px] bg-nightfall border-l border-faint-line h-full flex flex-col p-6 z-10 overflow-y-auto">
          {/* Card A: Selected Planet */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[8px] h-[8px] rounded-full bg-brass saturn-bloom"></div>
              <h2 className="font-headline-sm text-headline-sm text-brass tracking-wider uppercase">Saturn</h2>
            </div>
            <div
              className="w-full h-[180px] rounded border border-faint-line bg-twilight mb-4 relative overflow-hidden flex items-center justify-center"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtFLcG0Eu26pzXnfKz6SVXK7m-0l21TCEpLfF01JvlRAcspHp5VkeRgK1LkApzS5icFWPUNwYKT8qf9exG-Y3gB1crHleJzCEerWjcIbpVYRTJv8Vcqf_6PREE_VlU34t8bA0kNuA1ipsSzAxgUq5vsAkE9XN_K0lFTnGCUwlVBNrLFnu0pffTUY9L0Dddt5al5_LCQxMOxWa3CAofBRWijcst4ZIrKLzrA286kxk0zIzdentFq8OGYvoiNmkbZcwlHQ8H39H1E0o')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-twilight to-transparent"></div>
              <div className="absolute bottom-2 left-2 flex gap-1">
                <span className="px-2 py-0.5 bg-midnight/80 border border-faint-line rounded text-[10px] font-data-sm text-moonlight">Gas Giant</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col border-b border-faint-line pb-2">
                <span className="font-label-caps text-moonlight mb-1">DISTANCE (AU)</span>
                <span className="font-data-md text-starlight">9.582</span>
              </div>
              <div className="flex flex-col border-b border-faint-line pb-2">
                <span className="font-label-caps text-moonlight mb-1">ORBITAL PER.</span>
                <span className="font-data-md text-starlight">29.45 yr</span>
              </div>
              <div className="flex flex-col border-b border-faint-line pb-2">
                <span className="font-label-caps text-moonlight mb-1">VISUAL MAG.</span>
                <span className="font-data-md text-starlight">+0.46</span>
              </div>
              <div className="flex flex-col border-b border-faint-line pb-2">
                <span className="font-label-caps text-moonlight mb-1">NEXT OPP.</span>
                <span className="font-data-md text-starlight">Sep 8, '25</span>
              </div>
            </div>
          </div>

          {/* Card B: Planet List */}
          <div className="flex-1">
            <h3 className="font-label-caps text-moonlight mb-3">CELESTIAL BODIES</h3>
            <div className="flex flex-col gap-1">
              {/* Mercury */}
              <div className="flex items-center justify-between p-2 rounded hover:bg-twilight/50 transition-colors border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-400"></div>
                  <span className="text-sm text-starlight font-medium">Mercury</span>
                </div>
                <span className="font-data-sm text-moonlight text-xs">0.39 AU</span>
              </div>
              {/* Venus */}
              <div className="flex items-center justify-between p-2 rounded hover:bg-twilight/50 transition-colors border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#F0E6D2]"></div>
                  <span className="text-sm text-starlight font-medium">Venus</span>
                </div>
                <span className="font-data-sm text-moonlight text-xs">0.72 AU</span>
              </div>
              {/* Earth */}
              <div className="flex items-center justify-between p-2 rounded hover:bg-twilight/50 transition-colors border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#4A90E2]"></div>
                  <span className="text-sm text-starlight font-medium">Earth</span>
                </div>
                <span className="font-data-sm text-moonlight text-xs">1.00 AU</span>
              </div>
              {/* Mars */}
              <div className="flex items-center justify-between p-2 rounded hover:bg-twilight/50 transition-colors border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-ember"></div>
                  <span className="text-sm text-starlight font-medium">Mars</span>
                </div>
                <span className="font-data-sm text-moonlight text-xs">1.52 AU</span>
              </div>
              {/* Jupiter */}
              <div className="flex items-center justify-between p-2 rounded hover:bg-twilight/50 transition-colors border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#C8A98B]"></div>
                  <span className="text-sm text-starlight font-medium">Jupiter</span>
                </div>
                <span className="font-data-sm text-moonlight text-xs">5.20 AU</span>
              </div>
              {/* Saturn (Selected) */}
              <div className="flex items-center justify-between p-2 rounded bg-twilight border border-faint-line shadow-[inset_2px_0_0_#E6BE7A]">
                <div className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-brass saturn-bloom"></div>
                  <span className="text-sm text-brass font-medium">Saturn</span>
                </div>
                <span className="font-data-sm text-brass text-xs">9.58 AU</span>
              </div>
              {/* Uranus */}
              <div className="flex items-center justify-between p-2 rounded hover:bg-twilight/50 transition-colors border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#8FC1D4]"></div>
                  <span className="text-sm text-starlight font-medium">Uranus</span>
                </div>
                <span className="font-data-sm text-moonlight text-xs">19.2 AU</span>
              </div>
              {/* Neptune */}
              <div className="flex items-center justify-between p-2 rounded hover:bg-twilight/50 transition-colors border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#3A5FCD]"></div>
                  <span className="text-sm text-starlight font-medium">Neptune</span>
                </div>
                <span className="font-data-sm text-moonlight text-xs">30.1 AU</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
