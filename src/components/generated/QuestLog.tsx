import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Download, CheckCircle, Target } from 'lucide-react';
import { FaReact, FaJava, FaNodeJs, FaDocker } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript, SiJavascript, SiGo, SiRust, SiGraphql, SiPostgresql, SiMongodb, SiSocketdotio } from "react-icons/si";

// Color Palette Constants
const COLORS = {
  background: '#192230',
  accent: '#ffcd00',
  text: '#ffffff',
  textMuted: '#94a3b8'
};

// Mission Data - COMPLETE SYSTEM DATA INJECTION
interface MissionStat {
  label: string;
  value: string;
}

interface Mission {
  id: number;
  name: string;
  status: string;
  brief: string;
  stats: MissionStat[];
  tech: string[];
  color: string;
  technicalWin: string;
  keyStat: string;
}

const MISSIONS: Mission[] = [{
  id: 1,
  name: 'LOCALHOST',
  status: 'COMPLETED',
  brief: 'Built a custom HTTP/1.1 server in Rust using zero external crates.',
  stats: [{
    label: 'Response Time',
    value: 'Sub-millisecond'
  }, {
    label: 'Architecture',
    value: 'Thread-pool'
  }, {
    label: 'Socket Programming',
    value: 'Low-level'
  }],
  tech: ['Rust', 'Docker'],
  color: '#CE422B',
  technicalWin: 'Implemented a thread-pool architecture and low-level socket programming for high-concurrency handling.',
  keyStat: 'Achieved sub-millisecond response times for static file serving.'
}, {
  id: 2,
  name: 'GO_FORUM',
  status: 'COMPLETED',
  brief: 'Developed a real-time web forum utilizing Go and SQLite.',
  stats: [{
    label: 'Session Management',
    value: 'Custom'
  }, {
    label: 'Real-time',
    value: 'WebSockets'
  }, {
    label: 'ACID Compliance',
    value: '100%'
  }],
  tech: ['Go', 'WebSockets', 'Docker'],
  color: '#00ADD8',
  technicalWin: 'Designed a custom session management system and utilized WebSockets for live notifications.',
  keyStat: '100% ACID compliance on all data transactions.'
}, {
  id: 3,
  name: 'MULTIPLAYER_FPS',
  status: 'COMPLETED',
  brief: 'Collaborative FPS development in Rust using the Bevy (ECS) engine.',
  stats: [{
    label: 'Game State Sync',
    value: '60 FPS'
  }, {
    label: 'Network Protocol',
    value: 'UDP'
  }, {
    label: 'Architecture',
    value: 'ECS'
  }],
  tech: ['Rust'],
  color: '#CE422B',
  technicalWin: 'Engineered low-latency networking via the UDP protocol and implemented Entity Component System (ECS) patterns.',
  keyStat: 'Maintained synchronized game state across multiple clients at 60 FPS.'
}, {
  id: 4,
  name: 'FILLER',
  status: 'ACHIEVED',
  brief: 'Competitive Rust-based AI for a grid-conquest game.',
  stats: [{
    label: 'Algorithm',
    value: 'Minimax + Alpha-Beta'
  }, {
    label: 'Optimization',
    value: 'Strategic'
  }, {
    label: 'Leaderboard',
    value: 'Top Tier'
  }],
  tech: ['Rust'],
  color: '#CE422B',
  technicalWin: 'Implemented Minimax algorithm with Alpha-Beta pruning for strategic move optimization.',
  keyStat: 'Ranked in the top tier of the Zone01 Dakar leaderboard for algorithmic efficiency.'
}];

// Tech Icon Mapping
// Tech Icon Mapping
const TECH_ICONS: Record<string, {
  symbol: React.ComponentType<{ size?: number }>;
  color: string;
}> = {
  'React': {
    symbol: FaReact,
    color: '#61DAFB'
  },
  'Next.js': {
    symbol: SiNextdotjs,
    color: '#ffffff'
  },
  'TypeScript': {
    symbol: SiTypescript,
    color: '#3178C6'
  },
  'JavaScript': {
    symbol: SiJavascript,
    color: '#F7DF1E'
  },
  'Go': {
    symbol: SiGo,
    color: '#00ADD8'
  },
  'Rust': {
    symbol: SiRust,
    color: '#CE422B'
  },
  'Java': {
    symbol: FaJava,
    color: '#007396'
  },
  'Node.js': {
    symbol: FaNodeJs,
    color: '#339933'
  },
  'GraphQL': {
    symbol: SiGraphql,
    color: '#E10098'
  },
  'PostgreSQL': {
    symbol: SiPostgresql,
    color: '#4169E1'
  },
  'Docker': {
    symbol: FaDocker,
    color: '#2496ED'
  },
  'WebSockets': {
    symbol: SiSocketdotio,
    color: '#ffcd00'
  },
  'MongoDB': {
    symbol: SiMongodb,
    color: '#47A248'
  }
};

// @component: QuestLog
export const QuestLog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isRoleTitleVisible, setIsRoleTitleVisible] = useState(false);
  const [isObstructed, setIsObstructed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Show role title when Quest Log section is in view
      let shouldShowTitle = false;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        shouldShowTitle = rect.top <= 100 && rect.bottom >= 100;
      }
      setIsRoleTitleVisible(shouldShowTitle);

      // Check for obstruction with cards
      if (shouldShowTitle) {
        let obstructed = false;
        const cards = document.querySelectorAll('[data-mission-card]');
        cards.forEach((card, index) => {
          // Only check left-aligned cards (even index mostly, but depends on layout)
          // We can check rect.left
          const rect = card.getBoundingClientRect();

          // Check if card is on the left side (approx < 40% width)
          const isLeft = rect.left < window.innerWidth * 0.4;

          // Collision zone: Top-left fixed area (approx 10px to 60px down)
          // We define a safety box: top < 80px AND bottom > 20px
          if (isLeft && rect.top < 100 && rect.bottom > 20) {
            obstructed = true;
          }
        });
        setIsObstructed(obstructed);
      } else {
        setIsObstructed(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Parallax effect for background - moves at 50% speed
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const isQuestLogVisible = scrollY > window.innerHeight;
  return <div ref={containerRef} className="relative w-full min-h-screen py-20 px-6 overflow-hidden" style={{
    backgroundColor: COLORS.background
  }}>
    {/* Role Title - Top Left - Appears ONLY in Quest Log Section with smooth animation */}
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: isRoleTitleVisible && !isObstructed ? 1 : 0,
      y: isRoleTitleVisible && !isObstructed ? 0 : -20, // Move up and fade out if obstructed
      x: isObstructed ? -10 : 0
    }} transition={{
      duration: 0.4, // Faster transition for obstruction
      ease: "easeOut"
    }} className="fixed top-10 left-10 z-40 text-[#ffcd00] text-sm font-mono tracking-wider uppercase pointer-events-none" style={{
      fontFamily: 'JetBrains Mono, monospace'
    }}>
      Junior Full Stack Developer
    </motion.div>

    {/* Parallax Grid Background - Moves at 50% speed */}
    <motion.div style={{
      y: backgroundY
    }} className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="w-full h-full" style={{
        backgroundImage: `
            linear-gradient(rgba(255,205,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,205,0,0.1) 1px, transparent 1px)
          `,
        backgroundSize: '50px 50px'
      }} />
    </motion.div>

    {/* Parallax "FULL STACK" Background Text */}
    <motion.div style={{
      y: backgroundY
    }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="text-[20vw] font-black text-white/[0.02] select-none whitespace-nowrap" style={{
        fontFamily: 'Inter, sans-serif'
      }}>
        FULL STACK
      </div>
    </motion.div>

    {/* Fixed Scroll Indicators - Right Side */}
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {MISSIONS.map((mission, index) => <motion.div key={mission.id} animate={{
        scale: activeIndex === index ? 1.5 : 1,
        backgroundColor: activeIndex === index ? COLORS.accent : 'rgba(255, 255, 255, 0.3)',
        boxShadow: activeIndex === index ? `0 0 20px ${COLORS.accent}` : '0 0 0px transparent'
      }} transition={{
        duration: 0.3
      }} className="w-3 h-3 rounded-full cursor-pointer" onClick={() => {
        const cards = document.querySelectorAll('[data-mission-card]');
        cards[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }} />)}
    </div>

    {/* Section Header */}
    <motion.div initial={{
      opacity: 0,
      y: -30
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }} className="text-center mb-20">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-[#ffcd00]/30 mb-4">
        <Target size={16} className="text-[#ffcd00]" />
        <span className="text-[#ffcd00] font-mono text-xs uppercase tracking-wider">Mission Archives</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight" style={{
        fontFamily: 'Inter, sans-serif'
      }}>
        01. QUEST <span style={{
          color: COLORS.accent
        }}>LOG</span>
      </h2>
      <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
        A chronicle of completed missions and current objectives. Each challenge conquered, each skill unlocked.
      </p>
    </motion.div>

    {/* Timeline Container */}
    <div className="relative max-w-6xl mx-auto">
      {/* Vertical Progress Line - Hidden until user leaves Hero section */}
      <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: isQuestLogVisible ? 1 : 0
      }} transition={{
        duration: 0.8
      }} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
        <motion.div style={{
          height: isQuestLogVisible ? lineHeight : '0%',
          backgroundColor: COLORS.accent,
          boxShadow: `0 0 20px ${COLORS.accent}`
        }} className="w-full origin-top" />
      </motion.div>

      {/* Mission Cards */}
      <div className="space-y-16 md:space-y-24">
        {MISSIONS.map((mission, index) => <MissionCard key={mission.id} mission={mission} index={index} onInView={() => setActiveIndex(index)} />)}
      </div>
    </div>

    {/* Magnetic Save Point Button */}
    <motion.div initial={{
      opacity: 0,
      y: 30
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.3
    }} viewport={{
      once: true
    }} className="mt-24 flex justify-center">
      <MagneticButton />
    </motion.div>
  </div>;
};

// Magnetic Button Component
const MagneticButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = {
    damping: 15,
    stiffness: 150
  };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Magnetic effect within 100px
    if (distance < 100) {
      const strength = 0.3;
      mouseX.set(distanceX * strength);
      mouseY.set(distanceY * strength);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  return <motion.a ref={buttonRef} href="/resume.pdf" download="Aliou_Niang_Resume.pdf" style={{
    x,
    y
  }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="group relative px-10 py-5 bg-[#192230] text-[#ffcd00] border-2 border-[#ffcd00] font-bold uppercase tracking-widest text-sm overflow-hidden flex items-center gap-3 transition-all hover:bg-[#ffcd00] hover:text-[#192230] shadow-lg hover:shadow-[0_0_30px_rgba(255,205,0,0.5)] cursor-pointer">
    <Download size={20} className="transition-transform group-hover:scale-110" />
    <span style={{
      fontFamily: 'JetBrains Mono, monospace'
    }}>SAVE POINT: EXPORT LOG</span>
  </motion.a>;
};

// Mission Card Component with Staggered Reveal
interface MissionCardProps {
  mission: typeof MISSIONS[0];
  index: number;
  onInView: () => void;
}
const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  index,
  onInView
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0
  });
  const isInView = useInView(cardRef, {
    once: false,
    margin: "-100px",
    amount: 0.5
  });
  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * 10,
      y: (x - 0.5) * -10
    });
  };
  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0
    });
  };
  const isLeft = index % 2 === 0;

  // Staggered animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  return <div ref={cardRef} data-mission-card className={`relative flex items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
    {/* Timeline Node */}
    <motion.div initial={{
      scale: 0,
      opacity: 0
    }} animate={isInView ? {
      scale: 1,
      opacity: 1
    } : {
      scale: 0.5,
      opacity: 0.3
    }} transition={{
      duration: 0.4,
      delay: 0.2
    }} className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
      <motion.div animate={isInView ? {
        scale: [1, 1.2, 1],
        boxShadow: [`0 0 10px ${COLORS.accent}`, `0 0 25px ${COLORS.accent}`, `0 0 10px ${COLORS.accent}`]
      } : {
        scale: 0.7,
        boxShadow: `0 0 5px rgba(255, 205, 0, 0.3)`
      }} transition={isInView ? {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      } : {
        duration: 0.3
      }} className={`rounded-full bg-[#ffcd00] border-4 border-[#192230] ${isInView ? 'w-4 h-4' : 'w-3 h-3'}`} style={{
        opacity: isInView ? 1 : 0.5
      }} />
    </motion.div>

    {/* Mission Card */}
    <motion.div initial={{
      x: isLeft ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }} animate={isInView ? {
      x: 0,
      opacity: 1,
      scale: 1
    } : {
      x: isLeft ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }} transition={{
      duration: 0.7,
      delay: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }} whileHover={{
      scale: 1.02
    }} className={`w-full md:w-[calc(50%-4rem)] ml-16 md:ml-0 ${!isLeft ? 'md:mr-16' : 'md:ml-16'}`}>
      <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} animate={{
        rotateX: tilt.x,
        rotateY: tilt.y
      }} transition={{
        duration: 0.3,
        ease: "easeOut"
      }} style={{
        transformStyle: "preserve-3d",
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 205, 0, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }} className="relative p-6 md:p-8 rounded-2xl overflow-hidden group cursor-pointer">
        {/* Glassmorphism Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{
          background: `radial-gradient(circle at ${isLeft ? 'left' : 'right'}, ${COLORS.accent}, transparent)`
        }} />

        {/* Staggered Card Content */}
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Card Header with Staggered Reveal */}
          <div className="relative z-10 mb-4">
            <div className="flex items-start justify-between mb-3">
              {/* MISSION title appears first */}
              <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-black tracking-tight text-white" style={{
                fontFamily: 'Inter, sans-serif'
              }}>
                <span className="text-slate-500">MISSION:</span> {mission.name}
              </motion.h3>

              {/* Status Badge appears 100ms later */}
              <motion.div variants={itemVariants}>
                {mission.status === 'COMPLETED' || mission.status === 'ACHIEVED' ? <CheckCircle size={24} className="text-green-400 flex-shrink-0" /> : <motion.div animate={{
                  rotate: 360
                }} transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear"
                }}>
                  <Target size={24} className="text-[#ffcd00] flex-shrink-0" />
                </motion.div>}
              </motion.div>
            </div>

            <motion.span variants={itemVariants} className="inline-block px-3 py-1 rounded text-xs font-mono tracking-wider" style={{
              backgroundColor: mission.status === 'IN PROGRESS' ? 'rgba(255, 205, 0, 0.1)' : 'rgba(34, 197, 94, 0.1)',
              color: mission.status === 'IN PROGRESS' ? COLORS.accent : '#22c55e',
              border: `1px solid ${mission.status === 'IN PROGRESS' ? 'rgba(255, 205, 0, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
            }}>
              STATUS: {mission.status}
            </motion.span>
          </div>

          {/* Brief - appears after status */}
          <motion.p variants={itemVariants} className="relative z-10 text-slate-400 text-sm md:text-base leading-relaxed mb-6">
            {mission.brief}
          </motion.p>

          {/* Tech Badges */}
          {mission.tech && mission.tech.length > 0 && <motion.div variants={itemVariants} className="relative z-10 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[2px] w-4 bg-[#ffcd00]" />
              <span className="text-[#ffcd00] font-mono text-xs uppercase tracking-wider" style={{
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mission.tech.map((techName: string) => {
                const tech = TECH_ICONS[techName];
                if (!tech) return null;
                return <motion.div key={techName} whileHover={{
                  scale: 1.1,
                  y: -2
                }} className="px-3 py-1.5 rounded-md bg-black/30 border border-white/10 hover:border-[#ffcd00]/50 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <span className="text-sm leading-none" style={{
                      color: tech.color
                    }}>
                      <tech.symbol size={16} />
                    </span>
                    <span className="text-xs font-medium text-slate-300">
                      {techName}
                    </span>
                  </div>
                </motion.div>;
              })}
            </div>
          </motion.div>}

          {/* Mission Stats HUD */}
          <motion.div variants={itemVariants} className="relative z-10 p-4 rounded-lg" style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 205, 0, 0.2)'
          }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[2px] w-4 bg-[#ffcd00]" />
              <span className="text-[#ffcd00] font-mono text-xs uppercase tracking-wider" style={{
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                Mission Stats
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mission.stats.map((stat, i) => <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs font-mono" style={{
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    {stat.label}
                  </span>
                  <span className="text-[#ffcd00] font-bold text-xs" style={{
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    {stat.value}
                  </span>
                </div>
                {/* Yellow Progress Bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{
                    width: 0
                  }} animate={isInView ? {
                    width: '100%'
                  } : {
                    width: 0
                  }} transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.1
                  }} className="h-full bg-[#ffcd00] rounded-full" style={{
                    boxShadow: '0 0 10px rgba(255, 205, 0, 0.6)'
                  }} />
                </div>
              </div>)}
            </div>
          </motion.div>
        </motion.div>

        {/* Accent Line with thicker yellow border */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{
          background: `linear-gradient(90deg, transparent, ${mission.color || COLORS.accent}, transparent)`
        }} />
      </motion.div>
    </motion.div>
  </div>;
};