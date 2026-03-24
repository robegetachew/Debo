import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--primary)',
            color: 'var(--cream)',
            padding: '100px 20px',
            textAlign: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <Heart size={40} style={{ color: 'var(--primary-light)', marginBottom: '2rem', fill: 'var(--primary-light)' }} />
                <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Closing Blessing</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem', opacity: 0.9 }}>
                    We look forward to celebrating this blessed day with you.<br />
                    May God bless you abundantly.
                </p>
                <div style={{
                    marginTop: '4rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(250, 243, 224, 0.2)',
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}>
                    Tesfatsion & Dibora • 2026
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
