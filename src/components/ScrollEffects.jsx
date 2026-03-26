import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollEffects = () => {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 26,
        mass: 0.2
    });

    const glowY = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const glowX = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const secondaryGlowY = useTransform(scrollYProgress, [0, 1], [0, 140]);

    return (
        <>
            <motion.div
                aria-hidden
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    transformOrigin: '0%',
                    scaleX: progress,
                    background: 'linear-gradient(90deg, var(--gold), var(--primary), var(--gold-light))',
                    zIndex: 1200,
                    pointerEvents: 'none',
                    boxShadow: '0 0 18px rgba(212, 175, 55, 0.55)'
                }}
            />

            <motion.div
                aria-hidden
                style={{
                    position: 'fixed',
                    top: '22%',
                    left: '-110px',
                    width: '280px',
                    height: '280px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16), rgba(212, 175, 55, 0))',
                    y: glowY,
                    x: glowX,
                    filter: 'blur(6px)',
                    pointerEvents: 'none',
                    zIndex: 9
                }}
            />

            <motion.div
                aria-hidden
                style={{
                    position: 'fixed',
                    bottom: '8%',
                    right: '-120px',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(92, 64, 51, 0.15), rgba(92, 64, 51, 0))',
                    y: secondaryGlowY,
                    filter: 'blur(8px)',
                    pointerEvents: 'none',
                    zIndex: 9
                }}
            />
        </>
    );
};

export default ScrollEffects;
