import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Users, Check, MessageSquareHeart } from 'lucide-react';

const RSVP = () => {
    const [formData, setFormData] = useState({
        names: [''], // Array of names
        attending: 'yes',
        guests: 1,
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleGuestChange = (count) => {
        const guestsCount = Math.max(1, parseInt(count) || 1);
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
            const response = await fetch('http://localhost:5001/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    name: formData.names.join(', ') // Combine multiple names for the backend
                })
            });

            if (response.ok) {
                setSubmitted(true);
                // Reset form
                setFormData({
                    names: [''],
                    guests: 1,
                    attending: 'yes',
                    message: ''
                });
            } else {
                setStatus('Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('Connection error. Please try again later.');
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
        letterSpacing: '0.5px'
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

    return (
        <section id="rsvp" className="rsvp" style={{ background: 'var(--bg)', padding: '120px 5%' }}>
            <div className="container" style={{ maxWidth: '750px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass"
                    style={{
                        padding: '60px 50px',
                        borderRadius: '32px',
                        background: 'white',
                        boxShadow: '0 30px 80px rgba(92, 64, 51, 0.08)',
                        border: '1px solid rgba(92, 64, 51, 0.05)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{
                            display: 'inline-flex',
                            padding: '15px',
                            background: 'rgba(212, 175, 55, 0.05)',
                            borderRadius: '20px',
                            marginBottom: '25px'
                        }}>
                            <MessageSquareHeart size={32} style={{ color: 'var(--gold)' }} />
                        </div>
                        <h2 className="font-serif" style={{ fontSize: '2.8rem', color: 'var(--primary)', marginBottom: '12px' }}>
                            Join Our <span style={{ color: 'var(--gold)' }}>Celebration</span>
                        </h2>
                        <p style={{ color: 'var(--text-light)', opacity: 0.8, fontSize: '1.1rem' }}>
                            Your presence is the greatest gift. Please RSVP by confirming below.
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            {/* Attendance */}
                            <label style={labelStyle}>Will you attend?</label>
                            <div style={checkboxGroupStyle}>
                                <div
                                    style={checkboxStyle(formData.attending === 'yes')}
                                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                                >
                                    <Check size={20} style={{ opacity: formData.attending === 'yes' ? 1 : 0 }} />
                                    Yes
                                </div>
                                <div
                                    style={checkboxStyle(formData.attending === 'no')}
                                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                                >
                                    No
                                </div>
                            </div>

                            {/* Guests Count */}
                            <InputField label="Number of Guests" icon={Users}>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formData.guests}
                                    style={inputStyle}
                                    onChange={(e) => handleGuestChange(e.target.value)}
                                />
                            </InputField>

                            {/* Dynamic Name Fields */}
                            <div style={{ marginBottom: '30px' }}>
                                <label style={labelStyle}>Guest Name(s)</label>
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
                                                placeholder={`Full Name of Guest ${index + 1}`}
                                                value={name}
                                                style={inputStyle}
                                                onChange={(e) => handleNameChange(index, e.target.value)}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Message / Blessing */}
                            <div style={{ marginBottom: '40px' }}>
                                <label style={labelStyle}>Message / Blessing</label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your heartfelt message here..."
                                    style={{ ...inputStyle, padding: '16px', height: '140px', resize: 'none' }}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            {status && <p style={{ color: '#d32f2f', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>{status}</p>}

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary"
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
                                    'Sending...'
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send RSVP
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
                            <h3 style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '15px' }}>Thank You!</h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: '1.6' }}>
                                Your blessing and confirmation have been received. <br />
                                We are so honored to have you with us.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default RSVP;
