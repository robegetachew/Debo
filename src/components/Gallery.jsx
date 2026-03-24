import { motion } from 'framer-motion';
import { Heart, Maximize2 } from 'lucide-react';

const Gallery = () => {
    const images = [
        {
            src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
            span: "col-span-2 row-span-2",
            caption: "The Beginning of Forever"
        },
        {
            src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop",
            span: "col-span-1 row-span-1",
            caption: "Pure Radiance"
        },
        {
            src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
            span: "col-span-1 row-span-1",
            caption: "In Union"
        },
        {
            src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
            span: "col-span-1 row-span-2",
            caption: "Sacred Moments"
        },
        {
            src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
            span: "col-span-1 row-span-1",
            caption: "Laughter & Love"
        },
        {
            src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2070&auto=format&fit=crop",
            span: "col-span-2 row-span-1",
            caption: "A Journey of Faith"
        }
    ];

    return (
        <section className="gallery" style={{
            background: '#ffffff',
            padding: '160px 5%',
            borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}
                    >
                        <Heart size={20} fill="var(--primary)" style={{ opacity: 0.3 }} />
                    </motion.div>

                    <h2 className="font-serif" style={{
                        fontSize: 'clamp(3.5rem, 12vw, 6rem)',
                        color: 'var(--primary)',
                        marginBottom: '2rem',
                        lineHeight: '0.9',
                        letterSpacing: '-2px'
                    }}>
                        Moments of <br />
                        <span style={{ fontStyle: 'italic', fontWeight: '300', color: 'var(--gold)' }}>Love & Grace</span>
                    </h2>
                    <p style={{
                        color: 'var(--text-light)',
                        maxWidth: '500px',
                        margin: '0 auto',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        opacity: 0.6
                    }}>
                        Captured Grace & Eternal Vows
                    </p>
                </div>

                <div
                    className="gallery-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridAutoRows: '280px', // Slightly more compact
                        gap: '20px',
                        maxWidth: '1400px',
                        margin: '0 auto'
                    }}
                >
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                background: '#f8f8f8',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                // Use CSS classes for layout to handle mobile properly
                                gridColumn: img.span.includes('col-span-2') ? 'span 2' : 'span 1',
                                gridRow: img.span.includes('row-span-2') ? 'span 2' : 'span 1'
                            }}
                            className={img.span}
                        >
                            <motion.div
                                style={{ width: '100%', height: '100%' }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.caption}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to top, rgba(92, 64, 51, 0.7) 0%, transparent 60%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '24px',
                                        color: 'white'
                                    }}
                                >
                                    <h4 className="font-serif" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>
                                        {img.caption}
                                    </h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', opacity: 0.9 }}>
                                        <Maximize2 size={12} /> View Details
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.5 }}>
                        Future memories waiting to be captured.
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 1024px) {
                    .gallery-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 640px) {
                    .gallery-grid {
                        grid-template-columns: 1fr !important;
                        grid-auto-rows: 300px !important;
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 20px !important;
                    }
                    .gallery-grid > div {
                        width: 100% !important;
                        height: 300px !important;
                        grid-column: span 1 !important;
                        grid-row: span 1 !important;
                        margin: 0 !important;
                    }
                }
            `}} />
        </section>
    );
};

export default Gallery;
