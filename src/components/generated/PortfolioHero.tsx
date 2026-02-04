import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, ArrowRight } from 'lucide-react';
import profilImage from '../../assets/profil.jpg';
import { FaReact, FaJava, FaNodeJs, FaDocker } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript, SiJavascript, SiGo, SiRust, SiPreact, SiGraphql, SiPostgresql } from "react-icons/si";

// Color Palette Constants
const COLORS = {
  background: '#192230',
  accent: '#ffcd00',
  text: '#ffffff',
  textMuted: '#94a3b8'
};

// Tech Stack with Icons/Symbols
interface TechItem {
  name: string;
  color: string;
  symbol: React.ComponentType<{ size?: number }>;
}

const TECH_STACK: TechItem[] = [{
  name: 'React',
  color: '#61DAFB',
  symbol: FaReact
}, {
  name: 'Next.js',
  color: '#ffffff',
  symbol: SiNextdotjs
}, {
  name: 'TypeScript',
  color: '#3178C6',
  symbol: SiTypescript
}, {
  name: 'JavaScript',
  color: '#F7DF1E',
  symbol: SiJavascript
}, {
  name: 'Go',
  color: '#00ADD8',
  symbol: SiGo
}, {
  name: 'Rust',
  color: '#CE422B',
  symbol: SiRust
}, {
  name: 'Java',
  color: '#007396',
  symbol: FaJava
}, {
  name: 'Node.js',
  color: '#339933',
  symbol: FaNodeJs
}, {
  name: 'Preact',
  color: '#673AB8',
  symbol: SiPreact
}, {
  name: 'GraphQL',
  color: '#E10098',
  symbol: SiGraphql
}, {
  name: 'PostgreSQL',
  color: '#4169E1',
  symbol: SiPostgresql
}, {
  name: 'Docker',
  color: '#2496ED',
  symbol: FaDocker
}];

// @component: PortfolioHero
export const PortfolioHero = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 4500); // Extended to 4.5 seconds for the full animation
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // @return
  return <div className="relative min-h-screen w-full overflow-hidden" style={{
    backgroundColor: COLORS.background
  }}>
    {/* Intro Logo Animation - Redesigned with Split and Reveal */}
    <AnimatePresence mode="wait">
      {!isIntroComplete && <motion.div key="intro" initial={{
        opacity: 1
      }} exit={{
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)'
      }} transition={{
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#192230]">
        <div className="relative flex items-center justify-center">
          {/* Unified Name Animation Container */}
          <motion.div initial={{
            scale: 0.8,
            opacity: 0,
            x: 0,
            y: 0
          }} animate={{
            scale: [0.8, 1, 1, 0.15],
            opacity: [0, 1, 1, 1],
            x: [0, 0, 0, 'calc(-50vw + 80px)'],
            y: [0, 0, 0, 'calc(-50vh + 40px)']
          }} transition={{
            duration: 4.5,
            times: [0, 0.13, 0.71, 1],
            ease: [0.4, 0, 0.2, 1]
          }} className="flex items-center gap-5">
            {/* First Name: Aliou */}
            <div className="flex items-center">
              <motion.span initial={{
                opacity: 1
              }} className="text-8xl md:text-9xl font-black tracking-tighter" style={{
                color: COLORS.accent
              }}>
                A
              </motion.span>
              <motion.span initial={{
                opacity: 0,
                x: -60
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1.2,
                duration: 0.8,
                ease: "easeOut"
              }} className="text-8xl md:text-9xl font-black tracking-tighter text-white">
                liou
              </motion.span>
            </div>

            {/* Last Name: NIANG */}
            <div className="flex items-center">
              <motion.span initial={{
                opacity: 1
              }} className="text-8xl md:text-9xl font-black tracking-tighter" style={{
                color: COLORS.accent
              }}>
                N
              </motion.span>
              <motion.span initial={{
                opacity: 0,
                x: -60
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1.2,
                duration: 0.8,
                ease: "easeOut"
              }} className="text-8xl md:text-9xl font-black tracking-tighter text-white">
                IANG
              </motion.span>
            </div>
          </motion.div>

          {/* Yellow line below - appears after name is complete */}
          <motion.div initial={{
            width: 0,
            opacity: 0
          }} animate={{
            width: '100%',
            opacity: 1
          }} transition={{
            delay: 2.2,
            duration: 0.8
          }} className="absolute -bottom-4 left-0 right-0 h-1 mx-auto" style={{
            backgroundColor: COLORS.accent
          }} />
        </div>
      </motion.div>}
    </AnimatePresence>

    {/* Hero Section */}
    <motion.main initial={{
      opacity: 0
    }} animate={{
      opacity: isIntroComplete ? 1 : 0
    }} transition={{
      duration: 1.2,
      delay: 0.2
    }} className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-16">
      {/* Massive Background Typography - Parallax Layer 1 - 5% opacity - FIXED */}
      <div className="fixed inset-0 z-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden opacity-[0.05]">
        <motion.h2 initial={{
          x: -100
        }} animate={isIntroComplete ? {
          x: 0
        } : {}} transition={{
          duration: 2,
          ease: "easeOut"
        }} className="text-[15vw] leading-none font-black italic whitespace-nowrap text-white">
          FULL STACK
        </motion.h2>
        <motion.h2 initial={{
          x: 100
        }} animate={isIntroComplete ? {
          x: 0
        } : {}} transition={{
          duration: 2,
          ease: "easeOut"
        }} className="text-[15vw] leading-none font-black italic whitespace-nowrap text-right text-white">
          DEVELOPER
        </motion.h2>
      </div>

      {/* Central Content Container - Parallax Layer 2 */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12">

        {/* Left Side - Portrait and Tech Cloud */}
        <motion.div initial={{
          x: -50,
          opacity: 0
        }} animate={isIntroComplete ? {
          x: 0,
          opacity: 1
        } : {}} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="flex-1 flex flex-col items-center lg:items-start gap-8 w-full mt-8">

          {/* Portrait Section */}
          <div className="relative flex-shrink-0 group">
            {/* Geometric accents behind photo */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-[#ffcd00]/30 rounded-tl-3xl transition-all duration-[400ms] ease-in-out group-hover:border-[#ffcd00] group-hover:shadow-[0_0_20px_rgba(255,205,0,0.3)]" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-[#ffcd00]/30 rounded-br-3xl transition-all duration-[400ms] ease-in-out group-hover:border-[#ffcd00] group-hover:shadow-[0_0_20px_rgba(255,205,0,0.3)]" />

            <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl">
              <img src={profilImage} alt="Aliou NIANG" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-[400ms] ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#192230] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Element */}
            <motion.div animate={{
              y: [0, -10, 0]
            }} transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }} className="absolute -bottom-4 -left-4 bg-[#ffcd00] text-[#192230] px-6 py-3 rounded-lg font-black shadow-lg text-sm md:text-base">
              ALIOU NIANG
            </motion.div>
          </div>

          {/* Tech Cloud Visualization */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={isIntroComplete ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 1.2
          }} className="w-full max-w-md">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-[2px] w-8 bg-[#ffcd00]" />
              <span className="text-[#ffcd00] font-mono text-xs uppercase tracking-wider">Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech, index) => <motion.div key={tech.name} initial={{
                opacity: 0,
                scale: 0.8
              }} animate={isIntroComplete ? {
                opacity: 1,
                scale: 1
              } : {}} transition={{
                duration: 0.4,
                delay: 1.3 + index * 0.05,
                ease: "easeOut"
              }} whileHover={{
                scale: 1.1,
                y: -2,
                transition: {
                  duration: 0.2
                }
              }} className="group relative px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:border-[#ffcd00]/50 transition-all duration-300 cursor-default">
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,205,0,0.8)]" style={{
                    color: tech.color
                  }}>
                    <tech.symbol size={20} />
                  </span>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
                {/* Hover yellow glow effect */}
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-[#ffcd00] pointer-events-none" />
              </motion.div>)}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Quote, Description & Info */}
        <motion.div initial={{
          x: 50,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="flex-1 flex flex-col gap-8 w-full">

          {/* Quote */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-relaxed max-w-2xl italic">
            "Hard work is worthless for those that don't believe in themselves."
          </h3>

          {/* Scrollable Capabilities and Philosophy Container with Custom Scrollbar */}
          <div className="max-w-2xl mt-16 overflow-y-auto pr-2 capabilities-scroll" style={{
            maxHeight: 'calc(100vh - 400px)',
            scrollbarWidth: 'thin',
            scrollbarColor: '#ffcd00 rgba(255, 255, 255, 0.1)'
          }}>
            <style>{`
                .capabilities-scroll::-webkit-scrollbar {
                  width: 6px;
                }
                .capabilities-scroll::-webkit-scrollbar-track {
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 3px;
                }
                .capabilities-scroll::-webkit-scrollbar-thumb {
                  background: #ffcd00;
                  border-radius: 3px;
                }
                .capabilities-scroll::-webkit-scrollbar-thumb:hover {
                  background: #ffd700;
                }
              `}</style>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#ffcd00] font-mono text-xs tracking-wider">01. CAPABILITIES</span>
                </div>
                <ul className="space-y-3 text-slate-400 text-sm leading-relaxed">
                  <li>• Full-stack application development</li>
                  <li>• Modern React & Next.js frontends</li>
                  <li>• Backend services with Node.js, Go, Rust</li>
                  <li>• Scalable Docker deployments</li>
                  <li>• SQL & NoSQL database design</li>
                  <li>• GraphQL & REST API integration</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#ffcd00] font-mono text-xs tracking-wider">02. PHILOSOPHY</span>
                </div>
                <ul className="space-y-3 text-slate-400 text-sm leading-relaxed">
                  <li>• Clean, maintainable code</li>
                  <li>• Continuous learning mindset</li>
                  <li>• Attention to detail matters</li>
                  <li>• Embrace emerging technologies</li>
                  <li>• Consistent growth over perfection</li>
                  <li>• Build better software, daily</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Button Section - Perfectly Centered with Glitch Effect */}
      <motion.div initial={{
        y: 50,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 1.4
      }} className="mt-20 relative z-30 flex flex-col items-center">
        <button onMouseEnter={() => setIsGlitching(true)} onMouseLeave={() => setIsGlitching(false)} className="group relative px-10 py-5 bg-[#ffcd00] text-[#192230] border-[4px] border-[#192230] font-black uppercase tracking-widest text-sm overflow-hidden flex items-center gap-3 transition-all hover:bg-[#ffcd00]/90 hover:scale-105 animate-pulse hover:animate-none shadow-2xl hover:shadow-[#ffcd00]/50">
          <span className={`relative z-10 transition-all ${isGlitching ? 'animate-[glitch_0.3s_infinite]' : ''}`}>
            INITIALIZE_SYSTEM
          </span>
          <ArrowRight size={22} className="relative z-10 transition-transform group-hover:translate-x-2" />

          {/* Glitch effect layers */}
          {isGlitching && <>
            <span className="absolute inset-0 z-0 bg-[#ff0000] opacity-30 animate-[glitch_0.15s_infinite] mix-blend-multiply" style={{
              transform: 'translate(-2px, 2px)'
            }}></span>
            <span className="absolute inset-0 z-0 bg-[#00ffff] opacity-30 animate-[glitch_0.2s_infinite] mix-blend-multiply" style={{
              transform: 'translate(2px, -2px)'
            }}></span>
          </>}
        </button>
      </motion.div>

      {/* Vertical Transition Line to Next Section */}
      <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 80,
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 2
      }} className="mt-12 w-[2px] bg-gradient-to-b from-[#ffcd00] to-transparent shadow-[0_0_10px_rgba(255,205,0,0.6)]" />
    </motion.main>

    {/* Modern UI Decorations */}
    <div className="fixed bottom-10 left-10 z-40 hidden md:flex flex-col gap-4 text-white/40">
      <a href="#" className="hover:text-[#ffcd00] transition-colors"><MousePointer2 size={20} /></a>
      <div className="w-[1px] h-20 bg-white/20 ml-2.5" />
    </div>

    {/* Right Side Scroll Indicators - Hidden until intro is COMPLETE */}
    {isIntroComplete && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.8,
      delay: 0.5
    }} style={{
      zIndex: 100,
      pointerEvents: 'none'
    }} className="fixed top-1/2 right-10 -translate-y-1/2 hidden md:flex flex-col gap-6 items-center">
      {[0, 1, 2, 3].map(i => {
        // Calculate which section is active based on scroll position
        const heroHeight = window.innerHeight;
        const questLogStart = heroHeight;
        const questLogSectionHeight = window.innerHeight * 0.8; // Approximate height per mission

        let activeSection = 0;
        if (scrollY < heroHeight * 0.5) {
          activeSection = 0; // Hero section
        } else if (scrollY < questLogStart + questLogSectionHeight) {
          activeSection = 1; // First Quest Log section
        } else if (scrollY < questLogStart + questLogSectionHeight * 2) {
          activeSection = 2; // Second Quest Log section
        } else {
          activeSection = 3; // Third Quest Log section and beyond
        }
        return <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === activeSection ? 'bg-[#ffcd00] scale-150' : 'bg-white/20'}`} />;
      })}
    </motion.div>}

    {/* Top Left Branding - AN. Logo WITHOUT Role Label */}
    <div className="absolute top-10 left-10 z-40">
      <div className="text-white font-black text-2xl tracking-tighter">
        A<span className="text-[#ffcd00]">N</span>.
      </div>
    </div>

    {/* CSS Keyframes for Glitch Animation */}
    <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
  </div>;
};