import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const VenueCard = ({ title, mapUrl, delay }) => (
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
            justifyContent: 'center',
            minHeight: '120px',
            boxShadow: '0 10px 30px rgba(92, 64, 51, 0.05)'
        }}
    >
        <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} on map`}
            style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                color: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s ease'
            }}
        >
            <MapPin size={32} />
        </a>
        <h3 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--primary)', margin: 0, paddingRight: '48px' }}>{title}</h3>
    </motion.div>
);

const VenueDetails = () => {
    const venues = [
        { title: "Bride's House", mapUrl: 'https://maps.google.com/?q=Adama+Ethiopia', delay: 0.1 },
        { title: "Groom's House", mapUrl: 'https://maps.google.com/?q=Adama+Ethiopia', delay: 0.2 },
        { title: 'The Church', mapUrl: 'https://maps.google.com/?q=Adama+Bethel+MKC+Church', delay: 0.3 },
        { title: 'The Reception', mapUrl: 'https://maps.google.com/?q=Kereyou+Resort+Adama', delay: 0.4 }
    ];

    return (
        <section id="venues" className="venues" style={{ background: '#ffffff', padding: 'var(--section-padding)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="font-serif" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '10px' }}>Location Details</h2>
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
