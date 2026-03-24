import { MapPin, Calendar, Home, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const VenueCard = ({ title, location, detail, icon: Icon, mapUrl, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        style={{
            background: 'var(--bg)',
            padding: '40px',
            borderRadius: '24px',
            position: 'relative',
            border: '1px solid var(--gold-light)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 30px rgba(92, 64, 51, 0.05)'
        }}
    >
        <div>
            <Icon size={32} style={{ position: 'absolute', top: '30px', right: '30px', color: 'var(--gold)' }} />
            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '15px' }}>{title}</h3>
            <p style={{ color: 'var(--primary-light)', marginBottom: '10px', fontWeight: '500' }}>{location}</p>
            <p style={{ color: 'var(--text-light)', opacity: 0.8, fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.6' }}>{detail}</p>
        </div>

        <motion.a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px',
                background: 'white',
                border: '1px solid var(--gold)',
                borderRadius: '12px',
                color: 'var(--primary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
            }}
        >
            <Navigation size={16} style={{ color: 'var(--gold)' }} />
            View on Map
        </motion.a>
    </motion.div>
);

const VenueDetails = () => {
    const venues = [
        {
            title: "Bride's House",
            location: "Morning Gathering",
            detail: "The journey begins here with traditional blessings and gathering of families.",
            icon: Home,
            mapUrl: "https://maps.google.com/?q=Adama+Ethiopia",
            delay: 0.1
        },
        {
            title: "Groom's House",
            location: "Departure to Bride",
            detail: "The groom prepares to meet his bride with his family and best men.",
            icon: Home,
            mapUrl: "https://maps.google.com/?q=Adama+Ethiopia",
            delay: 0.2
        },
        {
            title: "The Church",
            location: "Adama Bethel MKC Church",
            detail: "The holy matrimony service will begin at 1:00 PM prompt. We ask you to be seated by 12:45 PM.",
            icon: MapPin,
            mapUrl: "https://maps.google.com/?q=Adama+Bethel+MKC+Church",
            delay: 0.3
        },
        {
            title: "The Resort",
            location: "Kereyou Resort",
            detail: "Join us for cocktails, dinner, and celebration under the stars following the service.",
            icon: Calendar,
            mapUrl: "https://maps.google.com/?q=Kereyou+Resort+Adama",
            delay: 0.4
        }
    ];

    return (
        <section id="venues" className="venues" style={{ background: '#ffffff', padding: '120px 5%' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 className="font-serif" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '15px' }}>Location Details</h2>
                    <div style={{ height: '2px', width: '60px', background: 'var(--gold)', margin: '0 auto' }}></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px',
                    maxWidth: '1300px',
                    margin: '0 auto'
                }}>
                    {venues.map((venue, i) => (
                        <VenueCard key={i} {...venue} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VenueDetails;
