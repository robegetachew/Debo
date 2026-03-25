import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Decoration = () => {
    const { scrollYProgress } = useScroll();

    // Parallax values
    const ring1Y = useTransform(scrollYProgress, [0, 1], [0, -260]);
    const ring2Y = useTransform(scrollYProgress, [0, 1], [0, 420]);
    const sparkleY = useTransform(scrollYProgress, [0.3, 0.7], [0, -180]);
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
            {/* Top Left Interlocked Rings */}
            <motion.div
                style={{ position: 'absolute', top: '10%', left: '5%', y: ring1Y, rotate: rotation, opacity: 0.12 }}
            >
                <div style={{ position: 'relative', width: '140px', height: '100px' }}>
                    <div style={{ position: 'absolute', left: 10, top: 18, width: 60, height: 60, borderRadius: '50%', border: '5px solid rgba(92, 64, 51, 0.35)' }} />
                    <div style={{ position: 'absolute', left: 54, top: 18, width: 60, height: 60, borderRadius: '50%', border: '5px solid rgba(212, 175, 55, 0.5)' }} />
                </div>
            </motion.div>

            {/* Bottom Right Interlocked Rings */}
            <motion.div
                style={{ position: 'absolute', bottom: '15%', right: '6%', y: ring2Y, rotate: -rotation, opacity: 0.1 }}
            >
                <div style={{ position: 'relative', width: '165px', height: '110px' }}>
                    <div style={{ position: 'absolute', left: 18, top: 20, width: 70, height: 70, borderRadius: '50%', border: '6px solid rgba(92, 64, 51, 0.25)' }} />
                    <div style={{ position: 'absolute', left: 72, top: 20, width: 70, height: 70, borderRadius: '50%', border: '6px solid rgba(212, 175, 55, 0.35)' }} />
                </div>
            </motion.div>

            {/* Mid Left Sparkle */}
            <motion.div
                style={{ position: 'absolute', top: '48%', left: '3%', y: sparkleY, opacity: 0.12, color: 'var(--gold)' }}
            >
                <Sparkles size={62} />
            </motion.div>

            {/* Mid Right Sparkle */}
            <motion.div
                style={{ position: 'absolute', top: '30%', right: '10%', y: ring1Y, opacity: 0.1, color: 'var(--primary-light)' }}
            >
                <Sparkles size={44} />
            </motion.div>
        </div>
    );
};

export default Decoration;
