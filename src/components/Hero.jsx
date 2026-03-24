import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Hero = () => {
    return (
        <section className="hero" style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
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
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{ marginBottom: '2rem', color: 'var(--primary)' }}
                >
                    <Leaf size={40} />
                </motion.div>

                <p className="italic" style={{ fontSize: '1.2rem', color: 'var(--primary-light)', marginBottom: '1rem' }}>
                    By the Grace of God<br />
                    and with the blessing of our families
                </p>

                <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', margin: '1rem 0', fontWeight: '400', color: 'var(--text)' }}>
                    Tesfatsion <span style={{ color: 'var(--gold)' }}>&</span> Dibora
                </h1>

                <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-light)' }}>
                    Joyfully invite you to witness and celebrate the Union of Marriage
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                    <p className="font-serif" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                        Sunday, May 3, 2026
                    </p>
                    <p style={{ fontSize: '1rem', color: 'var(--text-light)' }}>
                        Adama Bethel MKC Church & Kereyou Resort
                    </p>
                </div>

                <div className="spacer" />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    style={{ fontStyle: 'italic', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}
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
