import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const IMAGE_SRCS = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2070&auto=format&fit=crop'
];

const Gallery = () => {
    const { lang, t } = useLanguage();
    const isAm = lang === 'am';

    const images = useMemo(
        () =>
            IMAGE_SRCS.map((src, i) => ({
                src,
                caption: translations[lang].gallery.captions[i]
            })),
        [lang]
    );

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [progress, setProgress] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setProgress(0);
    }, [images.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setProgress(0);
    }, [images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + 1;
            });
        }, 60); // ~6 seconds per slide
        return () => clearInterval(interval);
    }, [nextSlide]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        })
    };

    return (
        <section
            className="gallery"
            style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #fffdf8 45%, #ffffff 100%)',
                padding: 'var(--section-padding)',
                borderTop: '1px solid rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}
        >
            <div className="container" style={{ maxWidth: '1200px', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}
                    >
                        <Heart size={18} fill="var(--primary)" style={{ opacity: 0.35 }} />
                    </motion.div>

                    <h2
                        className={`font-serif gallery-title ${isAm ? 'font-ethiopic' : ''}`}
                        style={{
                            fontSize: 'clamp(2rem, 6vw, 3.8rem)',
                            color: 'var(--primary)',
                            marginBottom: '0.8rem',
                            lineHeight: 1
                        }}
                    >
                        {t('gallery.title')}{' '}
                        <span style={{ color: 'var(--gold)', fontStyle: isAm ? 'normal' : 'italic', fontWeight: 400 }}>
                            {t('gallery.titleAccent')}
                        </span>
                    </h2>
                </div>

                {/* Carousel Container */}
                <div style={{
                    position: 'relative',
                    height: 'clamp(300px, 60svh, 600px)',
                    width: '100%',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(62, 39, 35, 0.12)',
                    background: '#f5f3f0'
                }}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                cursor: 'grab'
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) > 50;
                                if (swipe) {
                                    if (offset.x > 0) prevSlide();
                                    else nextSlide();
                                }
                            }}
                        >
                            <img
                                src={images[currentIndex].src}
                                alt={images[currentIndex].caption}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    pointerEvents: 'none'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '40px'
                            }}>
                                <motion.h4
                                    className={`font-serif ${isAm ? 'font-ethiopic' : ''}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ color: 'white', fontSize: '1.5rem', fontWeight: 400 }}
                                >
                                    {images[currentIndex].caption}
                                </motion.h4>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Bar (Time) */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'rgba(255,255,255,0.2)',
                        zIndex: 10
                    }}>
                        <motion.div
                            style={{
                                height: '100%',
                                background: 'var(--gold)',
                                width: `${progress}%`
                            }}
                        />
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            padding: '12px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.25)',
                            backdropFilter: 'blur(8px)',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            padding: '12px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.25)',
                            backdropFilter: 'blur(8px)',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots / Indicators */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '20px'
                }}>
                    {images.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                setDirection(i > currentIndex ? 1 : -1);
                                setCurrentIndex(i);
                                setProgress(0);
                            }}
                            style={{
                                width: i === currentIndex ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: i === currentIndex ? 'var(--gold)' : 'rgba(92, 64, 51, 0.2)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
