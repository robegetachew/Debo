import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, Gem } from 'lucide-react';

const renderAnimatedLetters = (text, startDelay = 0, stagger = 0.02, color) =>
    Array.from(text).map((char, index) => (
        <motion.span
            key={`${text}-${index}`}
            initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: startDelay + index * stagger, duration: 0.33, ease: 'easeOut' }}
            style={{
                display: 'inline-block',
                color: color || 'inherit'
            }}
        >
            {char === ' ' ? '\u00A0' : char}
        </motion.span>
    ));

const Hero = () => {
    const targetDate = '2026-05-03T00:00:00';

    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero" style={{
            minHeight: '100svh',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: 0,
            background: 'var(--bg)'
        }}>
            <div
                className="hero-top-image"
                style={{
                    width: '100%',
                    minHeight: '52svh',
                    background: 'url("https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1974&auto=format&fit=crop") center/cover no-repeat',
                    maskImage: 'linear-gradient(to bottom, black 82%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent)'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="container"
                id="hero-content"
                style={{ padding: '20px 5% 30px' }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className="hero-ring-wrap"
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

                <p className="italic hero-blessing" style={{ fontSize: 'clamp(0.95rem, 3.2vw, 1.2rem)', color: 'var(--primary-light)', marginBottom: '0.8rem' }}>
                    {renderAnimatedLetters('By the Grace of God', 0.22, 0.018)}
                    <br />
                    {renderAnimatedLetters('and with the blessing of our families', 0.6, 0.014)}
                </p>

                <h1 className="hero-names" style={{ fontSize: 'clamp(2.2rem, 9vw, 5rem)', margin: '0.7rem 0', fontWeight: '400', color: 'var(--text)', fontFamily: '"Allura", "Great Vibes", "Playfair Display", serif', letterSpacing: '0.01em' }}>
                    <span className="hero-name-part">{renderAnimatedLetters('Tesfatsion', 0.95, 0.045)}</span>{' '}
                    <span className="hero-name-amp" style={{ color: 'var(--gold)' }}>{renderAnimatedLetters('&', 1.46, 0.02, 'var(--gold)')}</span>{' '}
                    <span className="hero-name-part">{renderAnimatedLetters('Dibora', 1.55, 0.05)}</span>
                </h1>

                <p className="hero-invite" style={{ fontSize: 'clamp(0.95rem, 3.6vw, 1.1rem)', maxWidth: '1100px', margin: '0 auto 1.25rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>
                    {renderAnimatedLetters('Joyfully invite you to witness and celebrate the union of our marriage', 1.95, 0.011)}
                </p>

                <div className="hero-date-block" style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                    <p className="font-serif hero-date" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                        {renderAnimatedLetters('Sunday, May 3, 2026', 2.72, 0.022)}
                    </p>
                    <p className="hero-location" style={{ fontSize: '1rem', color: 'var(--text-light)' }}>
                        {renderAnimatedLetters('Adama Bethel MKC Church', 3.14, 0.018)}
                    </p>
                </div>

                <div className="hero-gap" style={{ height: '1rem' }} />

                <div className="hero-quote-wrapper" style={{ margin: '2.4rem auto 1.8rem', maxWidth: '600px', position: 'relative' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)', marginBottom: '1.2rem', opacity: 0.35 }} />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="hero-quote font-serif"
                        style={{
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.15rem, 4.2vw, 1.45rem)',
                            color: 'var(--text)',
                            lineHeight: 1.6,
                            letterSpacing: '0.01em',
                            fontWeight: '400'
                        }}
                    >
                        “What God has joined together, let no one separate.” <br />
                        <span style={{ fontSize: '0.85em', opacity: 0.85, marginTop: '0.6rem', display: 'block', fontStyle: 'normal', color: 'var(--primary-light)' }}>— Mark 10:9</span>
                    </motion.p>
                    <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)', marginTop: '1.2rem', opacity: 0.35 }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.45, duration: 0.6 }}
                    className="hero-counter"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                        gap: '10px',
                        width: '100%',
                        maxWidth: '440px',
                        margin: '0 auto',
                        padding: '20px 14px',
                        borderRadius: '16px',
                        border: 'none',
                        borderLeft: '1px solid rgba(92, 64, 51, 0.16)',
                        borderRight: '1px solid rgba(92, 64, 51, 0.16)',
                        background: 'rgba(255,255,255,0.48)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        aria-hidden
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop") center/cover no-repeat',
                            opacity: 0.26,
                            filter: 'blur(1px)',
                            transform: 'scale(1.05)',
                            zIndex: 0
                        }}
                    />
                    <div style={{ position: 'relative', zIndex: 1, display: 'contents' }}>
                        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                            <div key={unit} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--primary)', lineHeight: 1.1 }}>
                                    {timeLeft[unit]}
                                </div>
                                <div style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-light)' }}>
                                    {unit}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (max-width: 640px) {
                        .hero {
                            min-height: 100svh !important;
                        }
                        .hero-top-image { min-height: 34svh !important; }
                        #hero-content { padding: 14px 5% 18px !important; }
                        .hero-ring-wrap { margin-bottom: 0.6rem !important; transform: scale(0.88); }
                        .hero-blessing { font-size: 0.85rem !important; margin-bottom: 0.4rem !important; }
                        .hero-names {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.1rem;
                            font-size: clamp(1.8rem, 8.2vw, 2.35rem) !important;
                            margin: 0.3rem 0 !important;
                        }
                        .hero-name-part,
                        .hero-name-amp {
                            display: block;
                            line-height: 1.05;
                        }
                        .hero-invite { font-size: 0.88rem !important; margin: 0 auto 0.6rem !important; max-width: 95% !important; }
                        .hero-invite { white-space: normal !important; }
                        .hero-date-block { gap: 6px !important; }
                        .hero-date { font-size: 1.08rem !important; }
                        .hero-location { font-size: 0.84rem !important; }
                        .hero-gap { height: 0.35rem !important; }
                        .hero-quote-wrapper { margin: 1.6rem auto 1.2rem !important; }
                        .hero-quote { display: block !important; font-size: 1.1rem !important; line-height: 1.5 !important; }
                        .hero-counter {
                            max-width: none !important;
                            width: calc(100% + 10%) !important;
                            margin-left: -5% !important;
                            margin-right: -5% !important;
                            border-radius: 0 !important;
                            padding: 32px 10px !important;
                            gap: 6px !important;
                            border-top: none !important;
                            border-bottom: none !important;
                        }
                    }
                `
            }} />
        </section>
    );
};

export default Hero;
