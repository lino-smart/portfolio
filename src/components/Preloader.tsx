
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
    const [showExit, setShowExit] = useState(false);

    useEffect(() => {
        // Sequence: Draw (0-1.5s) -> Fill (1.5-2.5s) -> Exit (2.5s+)


        const exitTimer = setTimeout(() => {
            setShowExit(true);
        }, 2500);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3500); // 2500ms + 1000ms exit transition

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    const strokeVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut"
            }
        }
    };

    const fillVariants: Variants = {
        hidden: { pathLength: 1, opacity: 0, fillOpacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            fillOpacity: 1,
            transition: {
                delay: 1.5,
                duration: 0.8
            }
        }
    };

    // Geometric Line Art Paths for "A" and "N"
    // Assuming a viewBox of 0 0 100 100 for simplicity scaling
    // A: Left slant, Right slant, Crossbar
    // N: Up, Diagonal down, Up

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#192230]"
            initial={{ opacity: 1 }}
            animate={showExit ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                <svg
                    viewBox="0 0 200 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    {/* Letter A */}
                    <motion.path
                        d="M40 90 L70 10 L100 90" // Outer triangle A
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={strokeVariants}
                        initial="hidden"
                        animate="visible"
                    />
                    <motion.path
                        d="M52 58 L88 58" // Crossbar A
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        variants={strokeVariants}
                        initial="hidden"
                        animate="visible"
                    />

                    {/* Letter N */}
                    <motion.path
                        d="M120 90 L120 10 L160 90 L160 10" // N path
                        stroke="#ffcd00"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={strokeVariants}
                        initial="hidden"
                        animate="visible"
                    />

                    {/* Fills (Fade in after strokes) */}
                    <motion.path
                        d="M40 90 L70 10 L100 90" // Fill A contour
                        fill="white"
                        fillOpacity="0"
                        stroke="none"
                        variants={fillVariants}
                        initial="hidden"
                        animate="visible"
                    />
                </svg>
            </div>
        </motion.div>
    );
};
