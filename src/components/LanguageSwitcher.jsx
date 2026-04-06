import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { lang, setLang } = useLanguage();

    return (
        <nav
            aria-label="Language"
            style={{
                position: 'absolute',
                top: 'max(26px, calc(12px + env(safe-area-inset-top)))',
                left: 'max(16px, env(safe-area-inset-left))',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                padding: '4px',
                borderRadius: '100px',
                background: 'rgba(255, 255, 255, 0.78)',
                border: '1px solid rgba(212, 175, 55, 0.28)',
                boxShadow: '0 4px 24px rgba(62, 39, 35, 0.07)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
            }}
        >
            <button
                type="button"
                aria-pressed={lang === 'en'}
                aria-label="English"
                onClick={() => setLang('en')}
                style={btn(lang === 'en')}
            >
                Eng
            </button>
            <span
                aria-hidden
                style={{
                    width: '2px',
                    alignSelf: 'stretch',
                    minHeight: '22px',
                    margin: '4px 6px',
                    borderRadius: '1px',
                    background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.35), var(--gold) 45%, var(--gold) 55%, rgba(212, 175, 55, 0.35))',
                    boxShadow: '0 0 0 1px rgba(212, 175, 55, 0.25)',
                    flexShrink: 0
                }}
            />
            <button
                type="button"
                aria-pressed={lang === 'am'}
                aria-label="አማርኛ"
                onClick={() => setLang('am')}
                className="font-ethiopic"
                style={btn(lang === 'am')}
            >
                አማ
            </button>
            <style dangerouslySetInnerHTML={{
                __html: `
                    nav[aria-label="Language"] button:focus-visible {
                        outline: none;
                        box-shadow: inset 0 0 0 2px rgba(212, 175, 55, 0.55);
                        border-radius: 100px;
                    }
                    nav[aria-label="Language"] button:hover {
                        color: #4a3429 !important;
                    }
                `
            }} />
        </nav>
    );
};

function btn(active) {
    return {
        border: 'none',
        background: active ? 'rgba(92, 64, 51, 0.1)' : 'transparent',
        padding: '10px 16px',
        minWidth: '48px',
        fontSize: '0.78rem',
        fontWeight: active ? 600 : 500,
        letterSpacing: '0.06em',
        fontFamily: 'inherit',
        color: active ? '#4a3328' : '#7d6358',
        cursor: 'pointer',
        borderRadius: '100px',
        transition: 'color 0.2s ease, background 0.2s ease',
        lineHeight: 1.2,
        WebkitFontSmoothing: 'antialiased'
    };
}

export default LanguageSwitcher;
