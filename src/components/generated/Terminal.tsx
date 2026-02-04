"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

// Color Palette Constants
const COLORS = {
  background: '#192230',
  accent: '#ffcd00',
  text: '#ffffff',
  textMuted: '#94a3b8'
};

// Social Links Data
interface SocialLink {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  url: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [{
  name: 'GitHub',
  icon: FaGithub,
  url: 'https://github.com/lino-smart',
  label: '[CODE_REPOSITORY]'
}, {
  name: 'LinkedIn',
  icon: FaLinkedin,
  url: 'https://linkedin.com/in/aliouniang',
  label: '[PROFESSIONAL_INTEL]'
}, {
  name: 'X',
  icon: FaXTwitter,
  url: 'https://x.com/Linosmart10',
  label: '[PUBLIC_TRANSMISSION]'
}];

// External Node Component with Glitch Effect
interface ExternalNodeProps {
  icon: React.ElementType;
  label: string;
  url: string;
  index: number;
  isInView: boolean;
}
const ExternalNode: React.FC<ExternalNodeProps> = ({
  icon: Icon,
  label,
  url,
  index,
  isInView
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  useEffect(() => {
    if (isHovered) {
      const glitchInterval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }, 300);
      return () => clearInterval(glitchInterval);
    }
  }, [isHovered]);
  return <motion.a href={url} target="_blank" rel="noopener noreferrer" initial={{
    opacity: 0,
    y: 20
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.5,
    delay: 1.4 + index * 0.1
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="group relative flex flex-col items-center">
    {/* Icon Container with Yellow Border */}
    <motion.div whileHover={{
      scale: 1.1
    }} className={`relative p-6 rounded-lg border-2 transition-all duration-300 ${glitchActive ? 'glitch-node' : ''}`} style={{
      borderColor: isHovered ? COLORS.accent : 'rgba(255, 205, 0, 0.3)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      boxShadow: isHovered ? `0 0 30px rgba(255, 205, 0, 0.5)` : '0 0 0px transparent'
    }}>
      <Icon size={32} className="text-slate-400 group-hover:text-[#ffcd00] transition-colors" style={{
        filter: isHovered ? 'drop-shadow(0 0 10px rgba(255, 205, 0, 0.8))' : 'drop-shadow(0 0 0px transparent)'
      }} />
    </motion.div>

    {/* Label */}
    <div className="mt-3 text-[#ffcd00] text-xs font-mono uppercase tracking-wider" style={{
      fontFamily: 'JetBrains Mono, monospace'
    }}>
      {label}
    </div>

    {/* URL Display on Hover */}
    <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : -10
    }} transition={{
      duration: 0.2
    }} className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap" style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '10px',
      color: COLORS.textMuted,
      pointerEvents: 'none'
    }}>
      {url}
    </motion.div>

    {/* Glitch Animation Styles */}
    <style>{`
        .glitch-node {
          animation: glitch-border 0.1s ease-in-out;
        }

        @keyframes glitch-border {
          0% { transform: translate(0); }
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(-2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
  </motion.a>;
};

// @component: Terminal
export const Terminal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px'
  });
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [blinkVisible, setBlinkVisible] = useState(true);
  const [latency, setLatency] = useState(15);

  // Blinking cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkVisible(prev => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Random latency fluctuation
  useEffect(() => {
    const latencyInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 10) + 10); // 10-20ms
    }, 2000);
    return () => clearInterval(latencyInterval);
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form
      setFormData({
        email: '',
        message: ''
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };
  return <div ref={sectionRef} className="relative w-full min-h-screen py-20 px-6 overflow-hidden" style={{
    backgroundColor: COLORS.background
  }}>
    {/* Background Grid - 3% opacity */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <div className="w-full h-full" style={{
        backgroundImage: `
              linear-gradient(rgba(255,205,0,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,205,0,1) 1px, transparent 1px)
            `,
        backgroundSize: '40px 40px'
      }} />
    </div>

    {/* Corner Brackets */}
    <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#ffcd00]/40" />
    <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#ffcd00]/40" />
    <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#ffcd00]/40" />
    <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#ffcd00]/40" />

    {/* Section Header */}
    <motion.div initial={{
      opacity: 0,
      y: -30
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.8
    }} className="text-center mb-20">
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight" style={{
        fontFamily: 'Inter, sans-serif'
      }}>
        03. <span style={{
          color: COLORS.accent
        }}>TERMINAL</span>
      </h2>

      <motion.p initial={{
        opacity: 0
      }} animate={isInView ? {
        opacity: 1
      } : {}} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="text-slate-400 mt-4 flex items-center justify-center gap-2" style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.875rem'
      }}>
        <span className="text-green-400">[SYSTEM]:</span>
        <span>AWAITING_CONNECTION</span>
        <span className="inline-block w-2 h-4 bg-green-400" style={{
          opacity: blinkVisible ? 1 : 0,
          transition: 'opacity 0.1s'
        }} />
      </motion.p>
    </motion.div>

    {/* Main Content Container */}
    <div className="relative max-w-5xl mx-auto">
      {/* Terminal Form - Full Width */}
      <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.4
      }}>
        <div className="relative bg-slate-800/30 backdrop-blur-[15px] rounded-lg p-8 border border-slate-600/50" style={{
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Terminal Header Bar */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-600/50">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-slate-400 text-xs uppercase tracking-wider" style={{
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              contact_protocol.sh
            </span>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-[#ffcd00] font-mono text-sm mb-2 tracking-wider" style={{
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                &gt; SOURCE_ENCRYPT:
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="[Enter your email]" className="w-full bg-black/40 border border-slate-600 rounded px-4 py-3 text-white focus:border-[#ffcd00] focus:outline-none transition-all" style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.875rem'
              }} />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-[#ffcd00] font-mono text-sm mb-2 tracking-wider" style={{
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                &gt; ENCODE_MESSAGE:
              </label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={6} placeholder="[Enter your message]" className="w-full bg-black/40 border border-slate-600 rounded px-4 py-3 text-white focus:border-[#ffcd00] focus:outline-none transition-all resize-none" style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.875rem'
              }} />
            </div>

            {/* Submit Button with Glitch Animation - ALWAYS ACTIVE */}
            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#ffcd00] text-[#192230] border-[4px] border-[#192230] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all relative overflow-hidden group hover:bg-[#ffcd00]/90 hover:scale-105 shadow-2xl hover:shadow-[#ffcd00]/50" style={{
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              {isSubmitting ? <>
                <motion.div animate={{
                  rotate: 360
                }} transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: 'linear'
                }} className="w-5 h-5 border-2 border-[#192230] border-t-transparent rounded-full" />
                <span>TRANSMITTING...</span>
              </> : <>
                <Send size={20} className="relative z-10 transition-transform group-hover:translate-x-0" />
                <span className="relative z-10">ESTABLISH_CONNECTION</span>
              </>}

              {/* Glitch effect layers - ALWAYS ACTIVE */}
              {!isSubmitting && <>
                <span className="absolute inset-0 z-0 bg-[#ff0000] opacity-30 mix-blend-multiply animate-[glitch_0.15s_infinite]" style={{
                  transform: 'translate(-2px, 2px)'
                }}></span>
                <span className="absolute inset-0 z-0 bg-[#00ffff] opacity-30 mix-blend-multiply animate-[glitch_0.2s_infinite]" style={{
                  transform: 'translate(2px, -2px)'
                }}></span>
              </>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>

    {/* External Communication Nodes - Centered Section */}
    <motion.div initial={{
      opacity: 0,
      y: 50
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.8,
      delay: 1.2
    }} className="mt-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-[#ffcd00]/30">
          <div className="h-[2px] w-4 bg-[#ffcd00]" />
          <span className="text-[#ffcd00] font-mono text-xs uppercase tracking-wider" style={{
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            EXTERNAL_NODES
          </span>
          <div className="h-[2px] w-4 bg-[#ffcd00]" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {SOCIAL_LINKS.map((social, index) => <ExternalNode key={social.name} icon={social.icon} label={social.label} url={social.url} index={index} isInView={isInView} />)}
      </div>
    </motion.div>

    {/* Footer Signature */}
    <motion.div initial={{
      opacity: 0,
      y: 30
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.8,
      delay: 1.6
    }} className="relative max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-700/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-xs uppercase tracking-widest" style={{
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          © 2026 ALIOU_NIANG // DESIGNED_FOR_PERFORMANCE
        </p>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 uppercase tracking-wider" style={{
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            LATENCY: <span className="text-green-400 font-bold">{latency}ms</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500 uppercase tracking-wider" style={{
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            STATUS: <span className="text-green-400 font-bold">ONLINE</span>
          </span>
        </div>
      </div>
    </motion.div>

    {/* Matrix-Style Success Notification */}
    <AnimatePresence>
      {showSuccess && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}>
        <motion.div initial={{
          scale: 0.8,
          y: 50
        }} animate={{
          scale: 1,
          y: 0
        }} exit={{
          scale: 0.8,
          y: 50
        }} transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20
        }} className="bg-green-900/90 backdrop-blur-xl border-2 border-green-400 rounded-lg p-8 max-w-md mx-4" style={{
          boxShadow: '0 0 50px rgba(34, 197, 94, 0.5)'
        }}>
          <div className="text-center">
            <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 200
            }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-400 mb-4">
              <Send size={32} className="text-green-900" />
            </motion.div>

            <h3 className="text-2xl font-black text-green-400 mb-2 uppercase tracking-wider" style={{
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              TRANSMISSION_SUCCESS
            </h3>

            <p className="text-green-300 text-sm" style={{
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              Your message has been encrypted and transmitted successfully.
            </p>

            {/* Code Rain Effect */}
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(20)].map((_, i) => <motion.div key={i} initial={{
                y: -20,
                opacity: 0
              }} animate={{
                y: 100,
                opacity: [0, 1, 0]
              }} transition={{
                duration: 1,
                delay: i * 0.05,
                repeat: 2,
                ease: 'linear'
              }} className="text-green-400 text-xs" style={{
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                {Math.random() > 0.5 ? '1' : '0'}
              </motion.div>)}
            </div>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>

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