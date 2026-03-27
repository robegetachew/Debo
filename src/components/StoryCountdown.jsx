import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const StoryCountdown = () => {
    return (
        <section className="story-countdown" style={{
            background: 'linear-gradient(rgba(250, 243, 224, 0.82), rgba(250, 243, 224, 0.82)), url("https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1974&auto=format&fit=crop") center/cover no-repeat',
            padding: '60px 0'
        }}>
            <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
                {/* Separator Heart */}
                <div style={{ margin: '20px 0' }}>
                    <Heart size={20} fill="var(--secondary)" style={{ color: 'var(--secondary)', opacity: 0.5 }} />
                </div>

                {/* Story Part */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{ padding: '0 30px' }}
                >
                    <h2 className="story-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '1.2rem', color: 'var(--primary)' }}>Our Story</h2>

                    <div className="story-copy" style={{ fontSize: 'clamp(0.98rem, 2.8vw, 1.12rem)', color: 'var(--text-light)', textAlign: 'justify', lineHeight: '1.85' }}>
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
            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (max-width: 480px) {
                        .story-title {
                            font-size: 1.85rem !important;
                            margin-bottom: 1.2rem !important;
                        }
                        .story-copy {
                            font-size: 0.94rem !important;
                            line-height: 1.72 !important;
                            text-align: left !important;
                        }
                    }
                `
            }} />
        </section>
    );
};

export default StoryCountdown;
