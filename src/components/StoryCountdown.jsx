import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const StoryCountdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (interval === 'isPassed') return;

        timerComponents.push(
            <div key={interval} className="timer-item" style={{ textAlign: 'center', minWidth: '0' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: '400', color: 'var(--primary)', marginBottom: '5px' }}>
                    {timeLeft[interval]}
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {interval}
                </div>
            </div>
        );
    });

    return (
        <section className="story-countdown" style={{
            background: 'linear-gradient(rgba(250, 243, 224, 0.93), rgba(250, 243, 224, 0.93)), url("https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1974&auto=format&fit=crop") center/cover no-repeat',
            padding: '120px 0'
        }}>
            <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
                {/* Countdown Part */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '80px', padding: '0 10px' }}
                >
                    <h2 className="font-serif countdown-title" style={{
                        fontSize: 'clamp(1rem, 4.2vw, 2.2rem)',
                        marginBottom: '2.5rem',
                        color: 'var(--text)',
                        lineHeight: '1.2',
                        padding: '0 12px'
                    }}>
                        {timeLeft.isPassed ? "Celebrating Our Married Life Together" : "Counting Down to Our Special Day"}
                    </h2>

                    {!timeLeft.isPassed && (
                        <div className="countdown-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '15px',
                            background: 'white',
                            padding: '30px 20px',
                            borderRadius: '24px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            border: '1px solid rgba(92, 64, 51, 0.05)',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            {timerComponents}
                        </div>
                    )}

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media (max-width: 480px) {
                            .countdown-title {
                                font-size: 1.35rem !important;
                                line-height: 1.25 !important;
                                white-space: normal !important;
                                overflow-wrap: anywhere !important;
                                padding: 0 16px !important;
                                margin-bottom: 1.5rem !important;
                            }
                            .countdown-grid {
                                grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
                                gap: 10px !important;
                                padding: 20px 12px !important;
                            }
                            .timer-item { min-width: 0 !important; }
                            .timer-item div:first-child {
                                font-size: 1.35rem !important;
                                margin-bottom: 4px !important;
                            }
                            .timer-item div:last-child {
                                font-size: 0.6rem !important;
                                letter-spacing: 0.6px !important;
                            }
                        }
                    `}} />

                    {timeLeft.isPassed && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ fontSize: '1.1rem', color: 'var(--primary-light)', fontStyle: 'italic' }}
                        >
                            🕊️ "Therefore what God has joined together, let no one separate." 🕊️
                        </motion.div>
                    )}
                </motion.div>

                {/* Separator Heart */}
                <div style={{ margin: '40px 0' }}>
                    <Heart size={24} fill="var(--secondary)" style={{ color: 'var(--secondary)', opacity: 0.5 }} />
                </div>

                {/* Story Part */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{ padding: '0 30px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', color: 'var(--primary)' }}>Our Story</h2>

                    <div style={{ fontSize: '1.2rem', color: 'var(--text-light)', textAlign: 'justify', lineHeight: '1.8' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Our story is a testimony of God’s faithfulness and the beauty of a promise kept.
                            What began as a simple connection grew into a journey built on trust, prayer, and integrity.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            With God at the center, we have held onto His word and to each other with sincerity and purpose.
                            Now we are going to step into this covenant of marriage, not only in love, but in the strength of promises we are committed to keep for a lifetime.
                        </p>
                        <p>
                            This love is not our doing, but God’s only, to Him alone be all the glory.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StoryCountdown;
