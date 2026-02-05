"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Code2, Server, Globe, Database } from 'lucide-react';

// Color Palette Constants
const COLORS = {
  background: '#192230',
  accent: '#ffcd00',
  text: '#ffffff',
  textMuted: '#94a3b8'
};

// Categories Data with Icons and Tags - EXPANDED WITH COMPLETE DATA & MISSION LINKS
interface CategoryTag {
  name: string;
  linkedMission: string | null;
}

interface Category {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  mainTechs: string[];
  tags: CategoryTag[];
}

const CATEGORIES: Category[] = [{
  title: 'Low-Level & Systems',
  icon: Code2,
  mainTechs: ['Rust', 'Go'],
  tags: [{
    name: 'Memory Safety',
    linkedMission: null
  }, {
    name: 'Direct Syscalls',
    linkedMission: null
  }, {
    name: 'ECS Architecture',
    linkedMission: 'FPS'
  }, {
    name: 'Concurrency',
    linkedMission: null
  }, {
    name: 'Zero-dependency',
    linkedMission: null
  }, {
    name: 'Rust',
    linkedMission: 'FPS'
  }, {
    name: 'Bevy ECS',
    linkedMission: 'FPS'
  }, {
    name: 'UDP',
    linkedMission: 'FPS'
  }]
}, {
  title: 'Backend Architecture',
  icon: Server,
  mainTechs: ['Java', 'Node.js'],
  tags: [{
    name: 'Spring Boot',
    linkedMission: null
  }, {
    name: 'REST APIs',
    linkedMission: null
  }, {
    name: 'JWT Auth',
    linkedMission: null
  }, {
    name: 'Microservices',
    linkedMission: null
  }, {
    name: 'WebSocket Protocol',
    linkedMission: null
  }, {
    name: 'Concurrency Patterns (Goroutines)',
    linkedMission: null
  }]
}, {
  title: 'Frontend Engine',
  icon: Globe,
  mainTechs: ['TypeScript', 'Next.js'],
  tags: [{
    name: 'SPA',
    linkedMission: null
  }, {
    name: 'Real-time DOM',
    linkedMission: null
  }, {
    name: 'Tailwind CSS',
    linkedMission: null
  }, {
    name: 'Data Viz',
    linkedMission: null
  }]
}, {
  title: 'Cloud & Data',
  icon: Database,
  mainTechs: ['Docker', 'PostgreSQL', 'MongoDB'],
  tags: [{
    name: 'Containerization',
    linkedMission: null
  }, {
    name: 'Query Optimization',
    linkedMission: null
  }, {
    name: 'Schema Design',
    linkedMission: null
  }, {
    name: 'CI/CD Pipelines',
    linkedMission: null
  }, {
    name: 'Unit Testing',
    linkedMission: null
  }]
}];

// @component: Arsenal
export const Arsenal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px'
  });
  const [glitchActive, setGlitchActive] = useState(false);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Parallax effect for background - moves at 50% speed
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Glitch effect on header
  useEffect(() => {
    if (!isInView) return;
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, [isInView]);
  return <div ref={sectionRef} className="relative w-full min-h-screen py-20 px-6 overflow-hidden" style={{
    backgroundColor: COLORS.background
  }}>
    {/* Parallax Background Grid - 3% opacity - Moves at 50% speed */}
    <motion.div style={{
      y: backgroundY
    }} className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <div className="w-full h-full" style={{
        backgroundImage: `
            linear-gradient(rgba(255,205,0,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,205,0,1) 1px, transparent 1px)
          `,
        backgroundSize: '40px 40px'
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

    {/* Corner Brackets - Top Left */}
    <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#ffcd00]/40" />

    {/* Corner Brackets - Top Right */}
    <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#ffcd00]/40" />

    {/* Corner Brackets - Bottom Left */}
    <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#ffcd00]/40" />

    {/* Corner Brackets - Bottom Right */}
    <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#ffcd00]/40" />

    {/* Section Header with Glitch Effect */}
    <motion.div initial={{
      opacity: 0,
      y: -30
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.8
    }} className="text-center mb-20">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-[#ffcd00]/30 mb-4">
        <Code2 size={16} className="text-[#ffcd00]" />
        <span className="text-[#ffcd00] font-mono text-xs uppercase tracking-wider" style={{
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          Skills & Technologies
        </span>
      </div>

      <h2 className={`text-4xl md:text-6xl font-black text-white tracking-tight relative inline-block ${glitchActive ? 'glitch-text' : ''}`} style={{
        fontFamily: 'Inter, sans-serif'
      }}>
        02. <span style={{
          color: COLORS.accent
        }}>ARSENAL</span>
      </h2>

      <p className="text-slate-400 mt-4 max-w-2xl mx-auto" style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.875rem'
      }}>
        Cross-referencing tactical skills with completed field operations.
      </p>
    </motion.div>

    {/* Professional Grid Layout */}
    <div className="relative max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CATEGORIES.map((category, index) => <CategoryCard key={category.title} category={category} index={index} isInView={isInView} />)}
      </div>
    </div>

    {/* SYSTEM_LOAD Graphic - Bottom Right Corner */}
    <motion.div initial={{
      opacity: 0,
      scale: 0.8
    }} animate={isInView ? {
      opacity: 1,
      scale: 1
    } : {}} transition={{
      duration: 0.6,
      delay: 1
    }} className="absolute bottom-24 right-24 hidden lg:flex flex-col items-center gap-2">
      <div className="flex items-end gap-1.5">
        {[40, 60, 80, 50, 90, 70].map((height, i) => <motion.div key={i} animate={{
          height: [`${height * 0.7}%`, `${height}%`, `${height * 0.7}%`],
          opacity: [0.6, 1, 0.6]
        }} transition={{
          duration: 2 + i * 0.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.1
        }} className="w-2 bg-[#ffcd00] rounded-t" style={{
          maxHeight: '60px',
          boxShadow: '0 0 10px rgba(255, 205, 0, 0.5)'
        }} />)}
      </div>
      <span className="text-[#ffcd00] font-mono text-[10px] uppercase tracking-widest mt-2" style={{
        fontFamily: 'JetBrains Mono, monospace'
      }}>
        SYSTEM_LOAD
      </span>
    </motion.div>

    {/* Glitch Animation CSS */}
    <style>{`
        @keyframes glitch-text {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); text-shadow: 2px -2px 0 #ff0000, -2px 2px 0 #00ffff; }
          40% { transform: translate(-2px, -2px); text-shadow: 2px 2px 0 #ff0000, -2px -2px 0 #00ffff; }
          60% { transform: translate(2px, 2px); text-shadow: -2px -2px 0 #ff0000, 2px 2px 0 #00ffff; }
          80% { transform: translate(2px, -2px); text-shadow: -2px 2px 0 #ff0000, 2px -2px 0 #00ffff; }
          100% { transform: translate(0); text-shadow: none; }
        }

        .glitch-text {
          animation: glitch-text 0.2s ease-in-out;
        }

        @keyframes scanline {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .scanline {
          animation: scanline 1.5s ease-out forwards;
        }
      `}</style>
  </div>;
};

// Category Card Component with Scanline Effect
interface CategoryCardProps {
  category: typeof CATEGORIES[0];
  index: number;
  isInView: boolean;
}
const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index,
  isInView
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showScanline, setShowScanline] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, {
    once: true,
    margin: '-50px'
  });
  const Icon = category.icon;

  // Trigger scanline when card comes into view
  useEffect(() => {
    if (cardInView) {
      setShowScanline(true);
    }
  }, [cardInView]);
  return <motion.div ref={cardRef} initial={{
    opacity: 0,
    y: 30
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay: 0.2 + index * 0.1
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="group relative">
    {/* Card Container with increased blur to 15px */}
    <div className="relative bg-slate-800/30 backdrop-blur-[15px] rounded-lg p-8 border transition-all duration-300 overflow-hidden" style={{
      borderColor: isHovered ? COLORS.accent : 'rgba(100, 116, 139, 0.3)',
      boxShadow: isHovered ? `0 0 30px rgba(255, 205, 0, 0.3), inset 0 0 30px rgba(255, 205, 0, 0.05)` : 'none'
    }}>
      {/* Scanline Loading Effect */}
      {showScanline && <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scanline absolute left-0 right-0 h-[2px]" style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 205, 0, 0.8), transparent)',
          boxShadow: '0 0 10px rgba(255, 205, 0, 0.6)'
        }} />
      </div>}

      {/* Icon */}
      <motion.div animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? 5 : 0
      }} transition={{
        duration: 0.3
      }} className="mb-6">
        <Icon size={40} className="text-[#ffcd00]" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight" style={{
        fontFamily: 'JetBrains Mono, monospace'
      }}>
        {category.title}
      </h3>

      {/* Main Technologies */}
      <div className="flex flex-wrap gap-3 mb-6">
        {category.mainTechs.map(tech => <motion.div key={tech} animate={{
          y: isHovered ? -2 : 0
        }} transition={{
          duration: 0.3
        }} className="px-4 py-2 bg-[#ffcd00]/10 border border-[#ffcd00]/30 rounded-md">
          <span className="text-[#ffcd00] font-bold text-base" style={{
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            {tech}
          </span>
        </motion.div>)}
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6" />

      {/* Sub-tags with Float Effect and Mission Links */}
      <div className="flex flex-wrap gap-2">
        {category.tags.map((tag, tagIndex) => {
          const isLinked = tag.linkedMission !== null;
          return <motion.span key={tag.name} initial={{
            opacity: 0,
            scale: 0.8
          }} animate={isInView ? {
            opacity: 1,
            scale: 1,
            y: isHovered ? -5 : 0
          } : {}} transition={{
            duration: 0.4,
            delay: 0.4 + index * 0.1 + tagIndex * 0.05
          }} className={`px-3 py-1 bg-slate-700/50 border rounded text-xs transition-all duration-300 relative ${isLinked ? 'border-[#ffcd00]/40 text-slate-200' : 'border-slate-600/50 text-slate-300'}`}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              textDecoration: isLinked ? 'underline' : 'none',
              textDecorationColor: isLinked ? '#ffcd00' : 'transparent',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px'
            }}>
              {tag.name}
              {isLinked && <sup className="ml-1 text-[#ffcd00] text-[9px] font-bold">
                (Mission: {tag.linkedMission})
              </sup>}
            </span>
          </motion.span>;
        })}
      </div>

      {/* Pulsing Border on Hover */}
      <motion.div animate={{
        opacity: isHovered ? [0.3, 1, 0.3] : 0.3,
        scale: isHovered ? [0.8, 1, 0.8] : 0.8
      }} transition={{
        duration: isHovered ? 2 : 0.3,
        repeat: isHovered ? Infinity : 0,
        ease: "easeInOut"
      }} className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2" style={{
        borderColor: COLORS.accent
      }} />
    </div>
  </motion.div>;
};