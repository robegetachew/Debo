import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle, MessageSquare, ShieldCheck, LogOut, ChevronLeft } from 'lucide-react';

const Admin = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState({ rsvps: [], stats: {} });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetchData(password);
    };

    const fetchData = async (pwd) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:5001/api/admin/rsvps', {
                headers: { 'x-admin-password': pwd }
            });
            if (response.ok) {
                const result = await response.json();
                setData(result);
                setIsAuthenticated(true);
            } else {
                setError('Invalid password. Please try again.');
            }
        } catch (err) {
            setError('Connection error. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass"
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                        padding: '40px',
                        textAlign: 'center',
                        border: '1px solid var(--gold)'
                    }}
                >
                    <ShieldCheck size={48} style={{ color: 'var(--gold)', marginBottom: '20px' }} />
                    <h2 className="font-serif" style={{ color: 'var(--primary)', marginBottom: '10px' }}>Admin Login</h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '30px' }}>
                        Enter the password to access the RSVP dashboard.
                    </p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '1px solid var(--secondary)',
                                marginBottom: '20px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                        {error && <p style={{ color: '#d32f2f', fontSize: '0.85rem', marginBottom: '20px' }}>{error}</p>}
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Access Dashboard'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 5%' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <a href="/" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: 'var(--text-light)',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            marginBottom: '10px'
                        }}>
                            <ChevronLeft size={16} /> Back to Invitation
                        </a>
                        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>
                            RSVP <span style={{ color: 'var(--gold)' }}>Dashboard</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        style={{
                            background: 'none',
                            border: '1px solid var(--secondary)',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            color: 'var(--text-light)'
                        }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    <StatCard icon={Users} label="Total Guests Confirmed" value={data.stats.totalGuests} color="var(--primary)" />
                    <StatCard icon={CheckCircle} label="Attending Parties" value={data.stats.attendingCount} color="#43a047" />
                    <StatCard icon={MessageSquare} label="Latest Blessings" value={data.rsvps.filter(r => r.message).length} color="var(--gold)" />
                </div>

                {/* Table */}
                <div className="glass" style={{ overflow: 'hidden', padding: '0', borderRadius: '20px', border: '1px solid var(--gold-light)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'var(--primary)', color: 'white' }}>
                                    <th style={tableHeaderStyle}>Guest Names</th>
                                    <th style={tableHeaderStyle}>Size</th>
                                    <th style={tableHeaderStyle}>Message / Blessing</th>
                                    <th style={tableHeaderStyle}>Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.rsvps.filter(r => r.attending === 'yes').map((rsvp, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', background: i % 2 === 0 ? 'white' : 'rgba(255,255,255,0.5)' }}>
                                        <td style={tableCellStyle}>{rsvp.name}</td>
                                        <td style={tableCellStyle}>{rsvp.guests}</td>
                                        <td style={{ ...tableCellStyle, maxWidth: '400px' }}>{rsvp.message || '-'}</td>
                                        <td style={{ ...tableCellStyle, fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                            {new Date(rsvp.timestamp).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {data.rsvps.filter(r => r.attending === 'yes').length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>No attending guests yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="glass" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', border: 'none' }}>
        <div style={{ background: `${color}15`, padding: '12px', borderRadius: '15px' }}>
            <Icon size={24} style={{ color: color }} />
        </div>
        <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '600', color: 'var(--text)' }}>{value || 0}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', opacity: 0.7 }}>{label}</div>
        </div>
    </div>
);

const tableHeaderStyle = { padding: '16px 20px', fontSize: '0.9rem', fontWeight: '500' };
const tableCellStyle = { padding: '16px 20px', fontSize: '1rem', color: 'var(--text)' };

export default Admin;
