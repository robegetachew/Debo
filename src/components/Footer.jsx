import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { lang, t } = useLanguage();
    const isAm = lang === 'am';

    return (
        <footer style={{
            background: 'var(--primary)',
            color: 'var(--cream)',
            padding: '60px 20px 40px',
            textAlign: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div style={{ marginBottom: '3rem' }}>
                    <h3 className={`font-serif ${isAm ? 'font-ethiopic' : ''}`} style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--gold-light)' }}>
                        {t('footer.title')}
                    </h3>
                    {t('footer.tagline') ? (
                        <p className={isAm ? 'font-ethiopic' : ''} style={{ fontSize: '0.95rem', color: 'var(--gold-light)', opacity: 0.95, marginBottom: '1rem', lineHeight: 1.5 }}>
                            {t('footer.tagline')}
                        </p>
                    ) : null}
                    <div style={{
                        display: 'inline-block',
                        padding: '10px',
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                        marginBottom: '1rem'
                    }}>
                        <a href="https://t.me/+eLoPp2qdlQU1MGVk" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/telegram-qr.png"
                                alt="Telegram QR"
                                style={{ width: '130px', height: '130px', display: 'block' }}
                            />
                        </a>
                    </div>
                    <p className={isAm ? 'font-ethiopic' : ''} style={{ fontSize: '0.9rem', opacity: 0.8, letterSpacing: isAm ? '0' : '0.5px', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
                        {t('footer.scanLine')}
                        <a href="https://t.me/+eLoPp2qdlQU1MGVk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>{t('footer.clickHere')}</a>
                        {' '}{t('footer.joinTelegram')}
                    </p>
                </div>

                <div style={{
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(250, 243, 224, 0.1)',
                    fontSize: '0.8rem',
                    letterSpacing: isAm ? '0' : '2px',
                    textTransform: isAm ? 'none' : 'uppercase',
                    opacity: 0.6
                }} className={isAm ? 'font-ethiopic' : ''}>
                    {t('footer.closing')}
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
