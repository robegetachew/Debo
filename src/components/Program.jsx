import { motion } from 'framer-motion';
import { Clock, Users, Heart, Sparkles } from 'lucide-react';

const Program = () => {
    const schedule = [
        { time: "4:00 PM – 6:00 PM", program: "Guests gather separately at the Bride’s and Groom’s family homes", icon: <Users size={20} className="text-gold" /> },
        { time: "6:00 PM – 7:00 PM", program: "Groom proceeds to the Bride’s home", icon: <Heart size={20} className="text-gold" /> },
        { time: "7:00 PM – 8:00 PM", program: "Departure to Adama Bethel MKC Church", icon: <Sparkles size={20} className="text-gold" /> },
        { time: "8:00 PM – 10:00 PM", program: "Vow Ceremony & Worship Service", icon: <Heart size={20} className="text-gold" /> },
        { time: "10:00 PM – 10:30 PM", program: "Transfer to Kereyou Resort", icon: <Sparkles size={20} className="text-gold" /> },
        { time: "11:00 PM – 1:00 AM", program: "Cake Ceremony, Photoshoot & Worship", icon: <Sparkles size={20} className="text-gold" /> },
        { time: "1:00 AM", program: "Closing of the Ceremony", icon: <Clock size={20} className="text-gold" /> },
    ];

    return (
        <section id="program" className="program" style={{ background: 'var(--bg)', padding: 'var(--section-padding)' }}>
            <div className="container" style={{ maxWidth: 900 }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="font-serif" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '10px' }}>Wedding Program</h2>
                    <div style={{ height: '2px', width: '60px', background: 'var(--gold)', margin: '0 auto' }}></div>
                </div>

                <div className="schedule-list">
                    {schedule.map((item, index) => (
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
                            <div style={{ opacity: 0.5 }}>{item.icon}</div>
                            <div style={{ color: 'var(--text)', fontSize: '1.05rem' }}>
                                {item.program}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Program;
