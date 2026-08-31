import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LOCALES = ['en', 'es'] as const
type Locale = (typeof LOCALES)[number]

export default function LanguageSwitcher() {
  const navigate = useNavigate()
  const { locale } = useParams<{ locale: string }>()
  const { i18n } = useTranslation()

  function switchTo(target: Locale) {
    if (target === locale) return
    i18n.changeLanguage(target)
    // Preserve any hash when switching locale
    const hash = window.location.hash
    navigate(`/${target}${hash}`, { replace: true })
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '6px',
        padding: '6px 12px',
      }}
    >
      {LOCALES.map((lang, i) => (
        <>
          {i > 0 && (
            <span
              key={`sep-${lang}`}
              style={{ color: 'var(--color-border)', fontSize: '13px' }}
            >
              /
            </span>
          )}
          <button
            key={lang}
            onClick={() => switchTo(lang)}
            style={{
              background: 'none',
              border: 'none',
              cursor: locale === lang ? 'default' : 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              color: locale === lang ? 'var(--color-accent-red)' : 'var(--color-text-muted)',
              padding: 0,
              transition: 'color 0.2s',
            }}
            aria-label={`Switch language to ${lang.toUpperCase()}`}
            aria-current={locale === lang ? 'true' : undefined}
          >
            {lang.toUpperCase()}
          </button>
        </>
      ))}
    </div>
  )
}
