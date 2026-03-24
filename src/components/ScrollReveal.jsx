import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ScrollReveal = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const blur = useTransform(scrollYProgress, [0, 1], ["8px", "0px"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    return (
        <motion.div
            ref={ref}
            style={{
                filter: `blur(${blur})`,
                opacity,
                scale,
                transition: 'filter 0.3s ease'
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
