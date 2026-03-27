import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--primary)',
            color: 'var(--cream)',
            padding: '60px 20px 40px',
            textAlign: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div style={{ marginBottom: '3rem' }}>
                    <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--gold-light)' }}>
                        Photo Sharing & Livestream
                    </h3>
                    <div style={{
                        display: 'inline-block',
                        padding: '10px',
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                        marginBottom: '1rem'
                    }}>
                        <a href="https://t.me/+eLoPp2qdlQU1MGVk" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/telegram-qr.png"
                                alt="Telegram QR"
                                style={{ width: '130px', height: '130px', display: 'block' }}
                            />
                        </a>
                    </div>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, letterSpacing: '0.5px' }}>
                        Scan or <a href="https://t.me/+eLoPp2qdlQU1MGVk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>click here</a> to join our Telegram channel
                    </p>
                </div>

                <div style={{
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(250, 243, 224, 0.1)',
                    fontSize: '0.8rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    opacity: 0.6
                }}>
                    Tesfatsion & Dibora • 2026
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
