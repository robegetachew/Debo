import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Users, Check, MessageSquareHeart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const API_BASE = import.meta.env.VITE_API_URL || '';

const RSVP = () => {
    const { lang, t } = useLanguage();
    const isAm = lang === 'am';

    const [formData, setFormData] = useState({
        names: [''],
        attending: 'yes',
        guests: 1,
        message: ''
    });
    const [guestsInput, setGuestsInput] = useState('1');

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleGuestChange = (rawValue) => {
        if (rawValue === '') {
            setGuestsInput('');
            return;
        }

        const parsed = Number(rawValue);
        if (!Number.isInteger(parsed)) {
            return;
        }

        const guestsCount = Math.max(1, Math.min(10, parsed));
        setGuestsInput(String(guestsCount));
        const newNames = [...formData.names];

        if (guestsCount > newNames.length) {
            for (let i = newNames.length; i < guestsCount; i++) {
                newNames.push('');
            }
        } else {
            newNames.length = guestsCount;
        }

        setFormData({ ...formData, guests: guestsCount, names: newNames });
    };

    const handleNameChange = (index, value) => {
        const newNames = [...formData.names];
        newNames[index] = value;
        setFormData({ ...formData, names: newNames });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const response = await fetch(`${API_BASE}/api/rsvp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    name: formData.names.join(', ')
                })
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    names: [''],
                    guests: 1,
                    attending: 'yes',
                    message: ''
                });
                setGuestsInput('1');
            } else {
                setStatus(t('rsvp.errorGeneric'));
            }
        } catch (error) {
            setStatus(t('rsvp.errorConnection'));
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '16px 16px 16px 45px',
        border: '1px solid rgba(92, 64, 51, 0.1)',
        borderRadius: '12px',
        background: 'white',
        fontSize: '1rem',
        color: 'var(--text)',
        transition: 'all 0.3s ease',
        outline: 'none',
        fontFamily: 'inherit'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '10px',
        fontSize: '0.9rem',
        color: 'var(--primary)',
        fontWeight: '600',
        letterSpacing: isAm ? '0' : '0.5px'
    };

    const InputField = ({ label, icon: Icon, children, margin = '25px' }) => (
        <div style={{ marginBottom: margin }}>
            <label style={labelStyle}>{label}</label>
            <div style={{ position: 'relative' }}>
                <Icon
                    size={18}
                    style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--primary-light)',
                        opacity: 0.6,
                        zIndex: 2
                    }}
                />
                {children}
            </div>
        </div>
    );

    const checkboxGroupStyle = {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px'
    };

    const checkboxStyle = (active) => ({
        flex: 1,
        padding: '14px',
        borderRadius: '12px',
        border: active ? '2px solid var(--primary)' : '2px solid rgba(92, 64, 51, 0.1)',
        background: active ? 'rgba(92, 64, 51, 0.05)' : 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontWeight: '600',
        color: active ? 'var(--primary)' : 'var(--text-light)'
    });

    const thankLines = t('rsvp.thankBody').split('\n');

    return (
        <section id="rsvp" className="rsvp" style={{ background: 'var(--bg)', padding: 'var(--section-padding)' }}>
            <div className="container" style={{ maxWidth: '750px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass"
                    style={{
                        padding: '40px 30px',
                        borderRadius: '32px',
                        background: 'white',
                        boxShadow: '0 30px 80px rgba(92, 64, 51, 0.08)',
                        border: '1px solid rgba(92, 64, 51, 0.05)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <div style={{
                            display: 'inline-flex',
                            padding: '12px',
                            background: 'rgba(212, 175, 55, 0.05)',
                            borderRadius: '20px',
                            marginBottom: '15px'
                        }}>
                            <MessageSquareHeart size={28} style={{ color: 'var(--gold)' }} />
                        </div>
                        <h2 className={`font-serif ${isAm ? 'font-ethiopic' : ''}`} style={{ fontSize: '2.4rem', color: 'var(--primary)', marginBottom: '10px' }}>
                            {t('rsvp.title')} <span style={{ color: 'var(--gold)' }}>{t('rsvp.titleAccent')}</span>
                        </h2>
                        <p className={isAm ? 'font-ethiopic' : ''} style={{ color: 'var(--text-light)', opacity: 0.8, fontSize: '1.1rem' }}>
                            {t('rsvp.subtitle')}
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            <label style={labelStyle}>{t('rsvp.willAttend')}</label>
                            <div style={checkboxGroupStyle}>
                                <div
                                    style={checkboxStyle(formData.attending === 'yes')}
                                    className={isAm ? 'font-ethiopic' : ''}
                                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                                >
                                    <Check size={20} style={{ opacity: formData.attending === 'yes' ? 1 : 0 }} />
                                    {t('rsvp.yes')}
                                </div>
                                <div
                                    style={checkboxStyle(formData.attending === 'no')}
                                    className={isAm ? 'font-ethiopic' : ''}
                                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                                >
                                    {t('rsvp.no')}
                                </div>
                            </div>

                            <InputField label={t('rsvp.numGuests')} icon={Users}>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={guestsInput}
                                    style={inputStyle}
                                    onChange={(e) => handleGuestChange(e.target.value)}
                                    onFocus={(e) => e.target.select()}
                                    onBlur={() => {
                                        if (guestsInput === '') {
                                            handleGuestChange('1');
                                        }
                                    }}
                                />
                            </InputField>

                            <div style={{ marginBottom: '30px' }}>
                                <label style={labelStyle}>{t('rsvp.guestNames')}</label>
                                <AnimatePresence mode="popLayout">
                                    {formData.names.map((name, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            style={{ position: 'relative', marginBottom: index === formData.names.length - 1 ? '0' : '15px' }}
                                        >
                                            <User
                                                size={18}
                                                style={{
                                                    position: 'absolute',
                                                    left: '15px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    color: 'var(--primary-light)',
                                                    opacity: 0.6,
                                                    zIndex: 2
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder={t('rsvp.guestPlaceholder', index + 1)}
                                                value={name}
                                                className={isAm ? 'font-ethiopic' : ''}
                                                style={inputStyle}
                                                onChange={(e) => handleNameChange(index, e.target.value)}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <label style={labelStyle}>{t('rsvp.message')}</label>
                                <textarea
                                    rows="5"
                                    placeholder={t('rsvp.messagePlaceholder')}
                                    className={isAm ? 'font-ethiopic' : ''}
                                    style={{ ...inputStyle, padding: '16px', height: '140px', resize: 'none' }}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            {status && <p className={isAm ? 'font-ethiopic' : ''} style={{ color: '#d32f2f', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>{status}</p>}

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`btn-primary ${isAm ? 'font-ethiopic' : ''}`}
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    height: '60px',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    fontSize: '1.1rem',
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading ? (
                                    t('rsvp.sending')
                                ) : (
                                    <>
                                        <Send size={20} />
                                        {t('rsvp.submit')}
                                    </>
                                )}
                            </motion.button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                padding: '80px 20px',
                                textAlign: 'center',
                                background: 'rgba(92, 64, 51, 0.03)',
                                borderRadius: '24px',
                                border: '2px dashed rgba(92, 64, 51, 0.1)'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 30px',
                                boxShadow: '0 10px 30px rgba(92, 64, 51, 0.2)'
                            }}>
                                <Check size={40} />
                            </div>
                            <h3 className={isAm ? 'font-ethiopic' : ''} style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '15px' }}>{t('rsvp.thankYou')}</h3>
                            <p className={isAm ? 'font-ethiopic' : ''} style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: '1.6' }}>
                                {thankLines.map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < thankLines.length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default RSVP;
