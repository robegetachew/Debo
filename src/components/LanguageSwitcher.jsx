import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { lang, setLang } = useLanguage();

    return (
        <div
            aria-label="Language selector"
            style={{
                position: 'fixed',
                top: 'max(24px, calc(8px + env(safe-area-inset-top)))',
                right: 'max(16px, env(safe-area-inset-right))',
                zIndex: 2000,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.78)',
                border: '1px solid rgba(212, 175, 55, 0.28)',
                boxShadow: '0 4px 24px rgba(62, 39, 35, 0.07)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
            }}
        >
            <select
                aria-label="Language"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className={lang === 'am' ? 'font-ethiopic' : ''}
                style={{
                    border: 'none',
                    background: 'transparent',
                    padding: '7px 12px 7px 10px',
                    minWidth: '60px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    color: '#4a3328',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    outline: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                }}
            >
                <option value="en">Eng</option>
                <option value="am">አማ</option>
            </select>
            <span
                aria-hidden
                style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '6px solid rgba(92, 64, 51, 0.85)',
                    transform: 'translateY(-20%)',
                    pointerEvents: 'none'
                }}
            />
            <style dangerouslySetInnerHTML={{
                __html: `
                    [aria-label="Language selector"] select:focus-visible {
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.55);
                    }
                `
            }} />
        </div>
    );
};

export default LanguageSwitcher;
