import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, MessageSquare, ShieldCheck, LogOut, ChevronLeft, Eye, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

const Admin = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState({ rsvps: [], stats: {} });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedBlessing, setSelectedBlessing] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        fetchData(password);
    };

    const fetchData = async (pwd) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE}/api/admin/rsvps`, {
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

    const attendingRows = data.rsvps
        .filter((r) => r.attending === 'yes')
        .flatMap((rsvp) => {
            const guestNames = String(rsvp.name || '')
                .split(',')
                .map((name) => name.trim())
                .filter(Boolean);

            const normalizedNames = guestNames.length ? guestNames : ['Guest'];

            return normalizedNames.map((guestName, idx) => ({
                ...rsvp,
                guestName,
                rowKey: `${rsvp.id || rsvp.timestamp || 'rsvp'}-${idx}`
            }));
        });

    const totalRows = attendingRows.length;
    const isShowingAll = rowsPerPage === 'all';
    const effectiveRowsPerPage = isShowingAll ? Math.max(totalRows, 1) : Number(rowsPerPage);
    const totalPages = isShowingAll ? 1 : Math.max(1, Math.ceil(totalRows / effectiveRowsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = isShowingAll ? 0 : (safeCurrentPage - 1) * effectiveRowsPerPage;
    const paginatedRows = isShowingAll
        ? attendingRows
        : attendingRows.slice(startIndex, startIndex + effectiveRowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage, data.rsvps.length]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

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
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', tableLayout: 'fixed' }}>
                            <colgroup>
                                <col style={{ width: '9%' }} />
                                <col style={{ width: '31%' }} />
                                <col style={{ width: '30%' }} />
                                <col style={{ width: '30%' }} />
                            </colgroup>
                            <thead>
                                <tr style={{ background: 'var(--primary)', color: 'white' }}>
                                    <th style={{ ...tableHeaderStyle, fontSize: '0.8rem' }}>No</th>
                                    <th style={{ ...tableHeaderStyle, paddingRight: '10px' }}>Guest Names</th>
                                    <th style={{ ...tableHeaderStyle, textAlign: 'center', paddingLeft: '10px' }}>Message / Blessing</th>
                                    <th style={tableHeaderStyle}>Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRows.map((row, i) => (
                                    <tr key={row.rowKey} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', background: i % 2 === 0 ? 'white' : 'rgba(255,255,255,0.5)' }}>
                                        <td style={{ ...tableCellStyle, fontSize: '0.88rem' }}>{startIndex + i + 1}</td>
                                        <td style={{ ...tableCellStyle, paddingRight: '10px' }}>{row.guestName}</td>
                                        <td style={{ ...tableCellStyle, maxWidth: '220px', textAlign: 'center', paddingLeft: '10px' }}>
                                            {row.message ? (
                                                <button
                                                    onClick={() => setSelectedBlessing({
                                                        guestName: row.guestName,
                                                        message: row.message,
                                                        timestamp: row.timestamp
                                                    })}
                                                    style={eyeButtonStyle}
                                                    aria-label={`View blessing from ${row.guestName}`}
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td style={{ ...tableCellStyle, fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                            {new Date(row.timestamp).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {attendingRows.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>No attending guests yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {attendingRows.length > 0 && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            padding: '14px 18px',
                            borderTop: '1px solid rgba(0,0,0,0.06)',
                            background: 'rgba(255,255,255,0.85)',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                                <span>Rows per page:</span>
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        const nextValue = e.target.value;
                                        setRowsPerPage(nextValue === 'all' ? 'all' : Number(nextValue));
                                    }}
                                    style={{
                                        border: '1px solid rgba(92, 64, 51, 0.2)',
                                        borderRadius: '8px',
                                        padding: '4px 8px',
                                        background: 'white',
                                        color: 'var(--text)'
                                    }}
                                >
                                    {[5, 10, 20, 50].map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                    <option value="all">All</option>
                                </select>
                            </div>

                            <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                                Showing {totalRows === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + effectiveRowsPerPage, totalRows)} of {totalRows}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={safeCurrentPage === 1}
                                    style={pagerButtonStyle}
                                >
                                    Prev
                                </button>
                                <span style={{ minWidth: '70px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                                    {safeCurrentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={safeCurrentPage === totalPages}
                                    style={pagerButtonStyle}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {selectedBlessing && (
                    <div
                        onClick={() => setSelectedBlessing(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(24, 16, 12, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px',
                            zIndex: 1400
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="glass"
                            style={{
                                width: '100%',
                                maxWidth: '560px',
                                background: 'white',
                                borderRadius: '16px',
                                border: '1px solid rgba(92, 64, 51, 0.12)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', borderBottom: '1px solid rgba(92, 64, 51, 0.1)' }}>
                                <div>
                                    <h3 className="font-serif" style={{ color: 'var(--primary)', fontSize: '1.3rem' }}>
                                        Blessing Message
                                    </h3>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                                        {selectedBlessing.guestName} • {new Date(selectedBlessing.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                                <button onClick={() => setSelectedBlessing(null)} style={closeButtonStyle} aria-label="Close blessing modal">
                                    <X size={16} />
                                </button>
                            </div>

                            <div style={{ padding: '20px 18px' }}>
                                <p style={{ color: 'var(--text)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                    {selectedBlessing.message}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
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
const pagerButtonStyle = {
    border: '1px solid rgba(92, 64, 51, 0.2)',
    background: 'white',
    color: 'var(--text)',
    borderRadius: '8px',
    padding: '6px 10px',
    fontSize: '0.85rem',
    cursor: 'pointer'
};
const eyeButtonStyle = {
    border: 'none',
    background: 'transparent',
    color: 'var(--primary)',
    borderRadius: '8px',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
};
const closeButtonStyle = {
    border: '1px solid rgba(92, 64, 51, 0.2)',
    background: 'white',
    color: 'var(--text-light)',
    borderRadius: '8px',
    width: '30px',
    height: '30px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
};

export default Admin;
