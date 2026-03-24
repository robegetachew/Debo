import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Heart } from 'lucide-react';

const Decoration = () => {
    const { scrollYProgress } = useScroll();

    // Parallax values
    const leaf1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const leaf2Y = useTransform(scrollYProgress, [0, 1], [0, 500]);
    const heartY = useTransform(scrollYProgress, [0.3, 0.7], [0, -200]);
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
            {/* Top Left Leaf */}
            <motion.div
                style={{ position: 'absolute', top: '10%', left: '5%', y: leaf1Y, rotate: rotation, opacity: 0.1, color: 'var(--primary)' }}
            >
                <Leaf size={120} />
            </motion.div>

            {/* Bottom Right Leaf */}
            <motion.div
                style={{ position: 'absolute', bottom: '15%', right: '5%', y: leaf2Y, rotate: -rotation, opacity: 0.08, color: 'var(--primary-light)' }}
            >
                <Leaf size={150} />
            </motion.div>

            {/* Mid Left Heart */}
            <motion.div
                style={{ position: 'absolute', top: '50%', left: '2%', y: heartY, opacity: 0.05, color: 'var(--primary)' }}
            >
                <Heart size={80} fill="var(--primary)" />
            </motion.div>

            {/* Mid Right Leaf */}
            <motion.div
                style={{ position: 'absolute', top: '30%', right: '10%', y: leaf1Y, opacity: 0.1, color: 'var(--secondary)' }}
            >
                <Leaf size={60} />
            </motion.div>
        </div>
    );
};

export default Decoration;
