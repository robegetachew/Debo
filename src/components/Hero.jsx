import { motion } from 'framer-motion';
import { Circle, Gem } from 'lucide-react';

const Hero = () => {
    return (
        <section className="hero" style={{
            minHeight: '100svh',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '72px 5% 42px',
            background: 'linear-gradient(rgba(250, 243, 224, 0.85), rgba(250, 243, 224, 0.85)), url("https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1974&auto=format&fit=crop") center/cover no-repeat'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="container"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    style={{ marginBottom: '1.7rem', display: 'flex', justifyContent: 'center' }}
                >
                    <div style={{ position: 'relative', width: '90px', height: '64px' }}>
                        <Circle
                            size={38}
                            strokeWidth={2.2}
                            style={{ position: 'absolute', left: 14, top: 24, color: 'rgba(60, 51, 47, 0.9)' }}
                        />
                        <Circle
                            size={38}
                            strokeWidth={2.2}
                            style={{ position: 'absolute', left: 38, top: 20, color: 'rgba(212, 175, 55, 0.96)' }}
                        />
                        <Gem
                            size={15}
                            strokeWidth={2.1}
                            style={{
                                position: 'absolute',
                                left: 54,
                                top: 8,
                                transform: 'rotate(8deg)',
                                color: 'rgba(212, 175, 55, 0.96)'
                            }}
                        />
                    </div>
                </motion.div>

                <p className="italic" style={{ fontSize: 'clamp(0.95rem, 3.2vw, 1.2rem)', color: 'var(--primary-light)', marginBottom: '0.8rem' }}>
                    By the Grace of God<br />
                    and with the blessing of our families
                </p>

                <h1 style={{ fontSize: 'clamp(2.2rem, 9vw, 5rem)', margin: '0.7rem 0', fontWeight: '400', color: 'var(--text)' }}>
                    Tesfatsion <span style={{ color: 'var(--gold)' }}>&</span> Dibora
                </h1>

                <p style={{ fontSize: 'clamp(0.95rem, 3.6vw, 1.1rem)', maxWidth: '600px', margin: '0 auto 1.25rem', color: 'var(--text-light)' }}>
                    Joyfully invite you to witness and celebrate the Union of Marriage
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                    <p className="font-serif" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                        Sunday, May 3, 2026
                    </p>
                    <p style={{ fontSize: '1rem', color: 'var(--text-light)' }}>
                        Adama Bethel MKC Church 
                    </p>
                </div>

                <div style={{ height: '1rem' }} />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    style={{ fontStyle: 'italic', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}
                >
                    “What God has joined together, let no one separate.” <br />
                    — Mark 10:9
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    onClick={() => document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth' })}
                >
                    Join Us / RSVP
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
