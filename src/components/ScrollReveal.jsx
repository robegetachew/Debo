import { motion } from 'framer-motion';

const ScrollReveal = ({ children, amount = 0.2 }) => {
    const clampedAmount = Math.max(0.1, Math.min(0.7, amount));

    return (
        <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: clampedAmount }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, filter, opacity' }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
