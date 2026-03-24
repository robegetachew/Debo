import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Gallery = () => {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
            caption: 'The Beginning of Forever',
            spanClass: 'feature'
        },
        {
            src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop',
            caption: 'Pure Radiance',
            spanClass: 'portrait'
        },
        {
            src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop',
            caption: 'In Union',
            spanClass: 'square'
        },
        {
            src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
            caption: 'Sacred Moments',
            spanClass: 'portrait'
        },
        {
            src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
            caption: 'Laughter & Love',
            spanClass: 'square'
        },
        {
            src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2070&auto=format&fit=crop',
            caption: 'A Journey of Faith',
            spanClass: 'wide'
        }
    ];

    return (
        <section
            className="gallery"
            style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #fffdf8 45%, #ffffff 100%)',
                padding: '150px 5%',
                borderTop: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            <div className="container" style={{ maxWidth: '1300px' }}>
                <div style={{ textAlign: 'center', marginBottom: '84px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ color: 'var(--primary)', marginBottom: '1rem' }}
                    >
                        <Heart size={20} fill="var(--primary)" style={{ opacity: 0.35 }} />
                    </motion.div>

                    <h2
                        className="font-serif"
                        style={{
                            fontSize: 'clamp(2.6rem, 8vw, 4.8rem)',
                            color: 'var(--primary)',
                            marginBottom: '1.1rem',
                            lineHeight: 1
                        }}
                    >
                        Moments of{' '}
                        <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>
                            Love & Grace
                        </span>
                    </h2>
                    <p
                        style={{
                            color: 'var(--text-light)',
                            maxWidth: '560px',
                            margin: '0 auto',
                            fontSize: '0.95rem',
                            letterSpacing: '1.2px',
                            textTransform: 'uppercase',
                            opacity: 0.72
                        }}
                    >
                        Captured grace, joyful vows, and timeless celebration
                    </p>
                </div>

                <div className="gallery-pro-grid">
                    {images.map((img, i) => (
                        <motion.article
                            key={img.caption}
                            className={`gallery-card ${img.spanClass}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -6 }}
                        >
                            <img src={img.src} alt={img.caption} />
                            <div className="gallery-overlay">
                                <h4 className="font-serif">{img.caption}</h4>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <p
                    style={{
                        textAlign: 'center',
                        marginTop: '70px',
                        color: 'var(--text-light)',
                        fontSize: '0.95rem',
                        fontStyle: 'italic',
                        opacity: 0.65
                    }}
                >
                    Future memories waiting to be captured.
                </p>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        .gallery-pro-grid {
                            display: grid;
                            grid-template-columns: repeat(12, 1fr);
                            gap: 18px;
                            grid-auto-rows: 130px;
                        }

                        .gallery-card {
                            position: relative;
                            overflow: hidden;
                            border-radius: 26px;
                            border: 1px solid rgba(255, 255, 255, 0.7);
                            box-shadow: 0 10px 30px rgba(62, 39, 35, 0.1);
                            background: #f5f3f0;
                        }

                        .gallery-card img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            display: block;
                            transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
                        }

                        .gallery-card:hover img {
                            transform: scale(1.05);
                        }

                        .gallery-card.feature {
                            grid-column: span 7;
                            grid-row: span 4;
                            border-radius: 36px;
                        }

                        .gallery-card.portrait {
                            grid-column: span 5;
                            grid-row: span 4;
                        }

                        .gallery-card.square {
                            grid-column: span 4;
                            grid-row: span 3;
                        }

                        .gallery-card.wide {
                            grid-column: span 8;
                            grid-row: span 3;
                        }

                        .gallery-overlay {
                            position: absolute;
                            inset: 0;
                            display: flex;
                            align-items: flex-end;
                            padding: 18px 20px;
                            background: linear-gradient(to top, rgba(41, 28, 22, 0.62) 0%, rgba(41, 28, 22, 0.22) 45%, rgba(41, 28, 22, 0) 72%);
                            color: white;
                            opacity: 0.92;
                            transition: opacity 0.3s ease;
                        }

                        .gallery-card:hover .gallery-overlay {
                            opacity: 1;
                        }

                        .gallery-overlay h4 {
                            font-size: 1.12rem;
                            font-weight: 500;
                            margin: 0;
                            letter-spacing: 0.2px;
                        }

                        @media (max-width: 1024px) {
                            .gallery-pro-grid {
                                grid-template-columns: repeat(2, 1fr);
                                grid-auto-rows: 260px;
                                gap: 16px;
                            }

                            .gallery-card,
                            .gallery-card.feature,
                            .gallery-card.portrait,
                            .gallery-card.square,
                            .gallery-card.wide {
                                grid-column: span 1;
                                grid-row: span 1;
                                border-radius: 22px;
                            }
                        }

                        @media (max-width: 640px) {
                            .gallery-pro-grid {
                                grid-template-columns: 1fr;
                                grid-auto-rows: 280px;
                            }

                            .gallery-overlay h4 {
                                font-size: 1rem;
                            }
                        }
                    `
                }}
            />
        </section>
    );
};

export default Gallery;
