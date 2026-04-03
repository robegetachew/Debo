import { motion } from 'framer-motion';
import { Clock, Users, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const icons = [Users, Heart, Sparkles, Heart, Sparkles, Sparkles, Clock];

const Program = () => {
    const { lang, t } = useLanguage();
    const items = translations[lang].program.items;

    return (
        <section id="program" className="program" style={{ background: 'var(--bg)', padding: 'var(--section-padding)' }}>
            <div className="container" style={{ maxWidth: 900 }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className={`font-serif ${lang === 'am' ? 'font-ethiopic' : ''}`} style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '10px' }}>{t('program.title')}</h2>
                    <div style={{ height: '2px', width: '60px', background: 'var(--gold)', margin: '0 auto' }}></div>
                </div>

                <div className="schedule-list">
                    {items.map((item, index) => {
                        const Icon = icons[index] || Clock;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                    padding: '25px',
                                    background: 'white',
                                    borderRadius: '16px',
                                    marginBottom: '15px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                                    border: '1px solid rgba(212, 175, 55, 0.1)'
                                }}
                            >
                                <div style={{
                                    minWidth: '100px',
                                    color: 'var(--gold-dark)',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>
                                    {item.time}
                                </div>
                                <div style={{ opacity: 0.5 }}><Icon size={20} className="text-gold" /></div>
                                <div className={lang === 'am' ? 'font-ethiopic' : ''} style={{ color: 'var(--text)', fontSize: '1.05rem' }}>
                                    {item.text}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Program;
