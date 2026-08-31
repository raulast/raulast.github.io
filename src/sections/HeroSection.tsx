import { useTranslation } from 'react-i18next'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      style={{
        width: '100%',
        background: 'var(--color-bg)',
        paddingTop: '96px',
        paddingBottom: '96px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Greeting */}
        <p
          style={{
            fontSize: '14px',
            letterSpacing: '3px',
            color: 'var(--color-accent-red)',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {t('hero.greeting')}
        </p>

        {/* Name */}
        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 80px)',
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: 1.1,
            marginBottom: '16px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {t('hero.name')}
        </h1>

        {/* Title */}
        <p
          style={{
            fontSize: '22px',
            color: 'var(--color-text-muted)',
            marginBottom: '24px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {t('hero.title')}
        </p>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '16px',
            color: 'var(--color-text-muted)',
            maxWidth: '640px',
            lineHeight: 1.7,
            marginBottom: '48px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* Primary CTA — scrolls to #projects */}
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            style={{
              background: 'var(--color-accent-red)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            {t('hero.ctaWork')}
          </button>

          {/* Secondary CTA — scrolls to #contact */}
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            {t('hero.ctaContact')}
          </button>
        </div>
      </div>
    </section>
  )
}
