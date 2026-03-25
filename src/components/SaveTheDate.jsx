import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const SaveTheDate = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const daysInMay = Array.from({ length: 31 }, (_, i) => i + 1);
    const startDayOffset = 5; // May 1, 2026 is a Friday (5)

    const addToCalendar = () => {
        const event = {
            title: "Tesfatsion & Dibora's Wedding",
            start: '20260503T080000Z',
            end: '20260504T010000Z',
            location: 'Adama Bethel MKC Church & Kereyou Resort',
            details: 'Celebrate the union of marriage with us.'
        };

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: event.title,
            dates: `${event.start}/${event.end}`,
            location: event.location,
            details: event.details
        });

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;
        window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="save-the-date text-center" style={{ background: 'white' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="container save-date-container"
            >
                <h2 className="save-date-title" style={{ fontSize: 'clamp(2rem, 5.4vw, 3rem)', marginBottom: '0.8rem', color: 'var(--primary)' }}>Save the Date</h2>
                <p className="save-date-subtitle" style={{ color: 'var(--text-light)', marginBottom: '2.5rem', letterSpacing: '1.4px', textTransform: 'uppercase', fontSize: 'clamp(0.78rem, 2vw, 0.94rem)' }}>Sunday, May 03, 2026</p>

                {/* Calendar Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass save-date-card"
                    style={{
                        width: '100%',
                        maxWidth: '350px',
                        margin: '0 auto 3rem',
                        padding: '2.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(92, 64, 51, 0.15)',
                        background: 'rgba(255, 255, 255, 0.62)',
                        boxShadow: '0 20px 40px rgba(62, 39, 35, 0.08)',
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
                            filter: 'blur(0px)',
                            transform: 'scale(1.1)',
                            opacity: 0.2,
                            zIndex: 0
                        }}
                    />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <h3 className="font-serif" style={{ fontSize: 'clamp(1.4rem, 4.4vw, 1.8rem)', color: 'var(--primary)' }}>May 2026</h3>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '10px',
                            fontSize: '0.9rem'
                        }}>
                            {daysOfWeek.map((day, i) => (
                                <div key={i} style={{ fontWeight: '600', color: 'var(--secondary)', marginBottom: '10px' }}>{day}</div>
                            ))}

                            {/* Empty cells for offset */}
                            {Array.from({ length: startDayOffset }).map((_, i) => (
                                <div key={`empty-${i}`}></div>
                            ))}

                            {daysInMay.map((day) => (
                                <div
                                    key={day}
                                    style={{
                                        padding: '12px 0',
                                        position: 'relative',
                                        color: 'var(--text)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    {day === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 15,
                                            }}
                                        >
                                            <motion.svg
                                                viewBox="0 0 100 100"
                                                style={{
                                                    position: 'absolute',
                                                    top: '-15%',
                                                    left: '-15%',
                                                    width: '130%',
                                                    height: '130%',
                                                    zIndex: 1,
                                                    pointerEvents: 'none',
                                                    rotate: -15
                                                }}
                                            >
                                                <motion.path
                                                    d="M50 85 C20 65, 5 45, 5 25 A20 20 0 0 1 45 25 A20 20 0 0 1 85 25 C85 45, 70 65, 50 85"
                                                    fill="transparent"
                                                    stroke="var(--gold)"
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    initial={{ pathLength: 0, opacity: 0 }}
                                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
                                                />
                                            </motion.svg>
                                        </motion.div>
                                    )}
                                    <span style={{
                                        fontWeight: day === 3 ? '700' : '400',
                                        zIndex: 2,
                                        fontSize: day === 3 ? '1.1rem' : '0.9rem',
                                        color: day === 3 ? 'var(--primary)' : 'inherit'
                                    }}>
                                        {day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <p className="save-date-description" style={{ maxWidth: '560px', margin: '0 auto 2.2rem', color: 'var(--text-light)', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)' }}>
                    Please reserve this special day and celebrate with us as we begin our new life together in Christ.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    onClick={addToCalendar}
                >
                    Add to Calendar
                </motion.button>
            </motion.div>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (max-width: 640px) {
                        .save-the-date {
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                        }
                        .save-date-container {
                            max-width: 100% !important;
                        }
                        .save-date-card {
                            max-width: 100% !important;
                            margin: 0 0 2rem !important;
                            padding: 1.2rem !important;
                            border-radius: 0 !important;
                        }
                        .save-date-title { font-size: 1.9rem !important; }
                        .save-date-subtitle { letter-spacing: 1px !important; margin-bottom: 1.8rem !important; }
                        .save-date-description { font-size: 0.92rem !important; line-height: 1.7 !important; }
                    }
                `
            }} />
        </section>
    );
};

export default SaveTheDate;
