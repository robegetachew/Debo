import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, Gem } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

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
    const { lang, t } = useLanguage();
    const isAm = lang === 'am';
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

    const countdownUnits = ['days', 'hours', 'minutes', 'seconds'];

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
                    maskImage: 'linear-gradient(to bottom, black 0%, black 52%, rgba(0,0,0,0.97) 62%, rgba(0,0,0,0.82) 72%, rgba(0,0,0,0.5) 84%, rgba(0,0,0,0.18) 94%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 52%, rgba(0,0,0,0.97) 62%, rgba(0,0,0,0.82) 72%, rgba(0,0,0,0.5) 84%, rgba(0,0,0,0.18) 94%, transparent 100%)'
                }}
            />
            <div
                className="hero-transition-blend"
                aria-hidden
                style={{
                    height: '140px',
                    marginTop: '-140px',
                    background: 'linear-gradient(to bottom, rgba(250, 243, 224, 0) 0%, rgba(250, 243, 224, 0.12) 22%, rgba(250, 243, 224, 0.38) 48%, rgba(250, 243, 224, 0.72) 72%, var(--bg) 100%)',
                    pointerEvents: 'none'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="container"
                id="hero-content"
                style={{ padding: '14px 5% 30px' }}
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

                {(t('hero.blessingLine1') || t('hero.blessingLine2')) && (
                    <p className={`italic hero-blessing ${isAm ? 'font-ethiopic' : ''}`} style={{ fontSize: 'clamp(0.95rem, 3.2vw, 1.2rem)', color: 'var(--primary-light)', marginBottom: '0.8rem' }}>
                        {isAm ? (
                            <>
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>{t('hero.blessingLine1')}</motion.span>
                                <br />
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }}>{t('hero.blessingLine2')}</motion.span>
                            </>
                        ) : (
                            <>
                                {renderAnimatedLetters(t('hero.blessingLine1'), 0.22, 0.018)}
                                <br />
                                {renderAnimatedLetters(t('hero.blessingLine2'), 0.6, 0.014)}
                            </>
                        )}
                    </p>
                )}

                <h1
                    className={`hero-names ${isAm ? 'hero-names-am' : 'hero-names-en'}`}
                    style={{
                        margin: '0.7rem 0',
                        fontWeight: isAm ? 600 : 400,
                        color: 'var(--text)',
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isAm ? '0.12em' : '0.06em',
                        textAlign: 'center'
                    }}
                >
                    <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{ display: 'block', width: '100%', lineHeight: 1.2 }}
                    >
                        {t('hero.name1')}
                    </motion.span>
                    <motion.span
                        className="hero-name-amp"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.58, duration: 0.5 }}
                        style={{
                            display: 'block',
                            width: '100%',
                            color: 'var(--gold)',
                            fontWeight: isAm ? 700 : 500,
                            lineHeight: 1.1,
                            fontSize: isAm ? undefined : 'clamp(2rem, 8vw, 3.2rem)'
                        }}
                    >
                        {t('hero.nameJoin')}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.66, duration: 0.5 }}
                        style={{ display: 'block', width: '100%', lineHeight: 1.2 }}
                    >
                        {t('hero.name2')}
                    </motion.span>
                </h1>

                <p
                    className={`hero-invite ${isAm ? 'font-ethiopic' : ''}`}
                    style={{
                        fontSize: 'clamp(0.95rem, 3.6vw, 1.1rem)',
                        maxWidth: '1100px',
                        margin: '0 auto 1.25rem',
                        color: 'var(--text-light)',
                        whiteSpace: isAm ? 'normal' : 'nowrap',
                        lineHeight: isAm ? 1.75 : undefined
                    }}
                >
                    {isAm ? (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.6 }}>{t('hero.invite')}</motion.span>
                    ) : (
                        renderAnimatedLetters(t('hero.invite'), 1.95, 0.011)
                    )}
                </p>

                <div className="hero-date-block" style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                    <p className={`font-serif hero-date ${isAm ? 'font-ethiopic' : ''}`} style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                        {isAm ? (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}>{t('hero.date')}</motion.span>
                        ) : (
                            renderAnimatedLetters(t('hero.date'), 2.72, 0.022)
                        )}
                    </p>
                    <p className={`hero-location ${isAm ? 'font-ethiopic' : ''}`} style={{ fontSize: '1rem', color: 'var(--text-light)' }}>
                        {isAm ? (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.5 }}>{t('hero.location')}</motion.span>
                        ) : (
                            renderAnimatedLetters(t('hero.location'), 3.14, 0.018)
                        )}
                    </p>
                </div>

                <div className="hero-gap" style={{ height: '1rem' }} />

                <div className="hero-quote-wrapper" style={{ margin: '2.4rem auto 1.8rem', maxWidth: '600px', position: 'relative' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)', marginBottom: '1.2rem', opacity: 0.35 }} />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className={`hero-quote font-serif ${isAm ? 'font-ethiopic' : ''}`}
                        style={{
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.15rem, 4.2vw, 1.45rem)',
                            color: 'var(--text)',
                            lineHeight: 1.6,
                            letterSpacing: '0.01em',
                            fontWeight: '400'
                        }}
                    >
                        {t('hero.quote')} <br />
                        <span style={{ fontSize: '0.85em', opacity: 0.85, marginTop: '0.6rem', display: 'block', fontStyle: 'normal', color: 'var(--primary-light)' }}>{t('hero.quoteRef')}</span>
                    </motion.p>
                    <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)', marginTop: '1.2rem', opacity: 0.35 }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.45, duration: 0.6 }}
                    className={`hero-counter ${isAm ? 'font-ethiopic' : ''}`}
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
                        {countdownUnits.map((unit) => (
                            <div key={unit} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--primary)', lineHeight: 1.1 }}>
                                    {timeLeft[unit]}
                                </div>
                                <div style={{ fontSize: isAm ? '0.62rem' : '0.66rem', textTransform: isAm ? 'none' : 'uppercase', letterSpacing: isAm ? '0' : '0.8px', color: 'var(--text-light)' }}>
                                    {t(`hero.countdown.${unit}`)}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <LanguageSwitcher />

            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (max-width: 640px) {
                        .hero {
                            min-height: 100svh !important;
                        }
                        .hero-top-image { min-height: 34svh !important; }
                        .hero-transition-blend { height: 100px !important; margin-top: -100px !important; }
                        #hero-content { padding: 14px 5% 18px !important; }
                        .hero-ring-wrap { margin-bottom: 0.6rem !important; transform: scale(0.88); }
                        .hero-blessing { font-size: 0.85rem !important; margin-bottom: 0.4rem !important; }
                        .hero-names {
                            display: flex;
                            flex-direction: column !important;
                            align-items: center;
                            gap: 0.1rem;
                            font-size: clamp(1.8rem, 8.2vw, 2.35rem) !important;
                            margin: 0.3rem 0 !important;
                        }
                        .hero-names.hero-names-am {
                            flex-direction: column !important;
                            flex-wrap: nowrap !important;
                            align-items: center !important;
                            gap: 0.1rem !important;
                            font-size: clamp(1.4rem, 6vw, 2rem) !important;
                        }
                        .hero-names.hero-names-en {
                            flex-direction: column !important;
                            font-size: clamp(1.7rem, 7vw, 2.35rem) !important;
                            gap: 0.05rem !important;
                        }
                        .hero-names.hero-names-en .hero-name-amp {
                            font-size: clamp(1.85rem, 7.5vw, 2.5rem) !important;
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
