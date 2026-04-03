import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StoryCountdown = () => {
    const { lang, t } = useLanguage();
    const isAm = lang === 'am';

    return (
        <section className="story-countdown" style={{
            background: 'linear-gradient(rgba(250, 243, 224, 0.82), rgba(250, 243, 224, 0.82)), url("https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1974&auto=format&fit=crop") center/cover no-repeat',
            padding: '60px 0'
        }}>
            <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
                <div style={{ margin: '20px 0' }}>
                    <Heart size={20} fill="var(--secondary)" style={{ color: 'var(--secondary)', opacity: 0.5 }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{ padding: '0 30px' }}
                >
                    <h2 className={`story-title ${isAm ? 'font-ethiopic' : ''}`} style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '1.2rem', color: 'var(--primary)' }}>{t('story.title')}</h2>

                    <div className={`story-copy ${isAm ? 'font-ethiopic' : ''}`} style={{ fontSize: 'clamp(0.98rem, 2.8vw, 1.12rem)', color: 'var(--text-light)', textAlign: 'justify', lineHeight: '1.85' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {t('story.p1')}
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {t('story.p2')}
                        </p>
                        <p>
                            {t('story.p3')}
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
