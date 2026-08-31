import { useTranslation } from 'react-i18next'

export default function ContactSection() {
  const { t } = useTranslation()

  return (
    <section
      id="contact"
      style={{
        background: 'var(--color-surface)',
        padding: '96px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <h2
        style={{
          fontSize: '36px',
          fontWeight: 700,
          color: 'var(--color-text)',
          textAlign: 'center',
          margin: 0,
        }}
      >
        {t('contact.heading')}
      </h2>

      <p
        style={{
          fontSize: '16px',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 0 8px',
          lineHeight: 1.6,
        }}
      >
        {t('contact.subheading')}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '8px',
        }}
      >
        <a
          href="mailto:raulast.dev@gmail.com"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '15px',
            textDecoration: 'none',
            background: 'var(--color-accent-red)',
            color: '#ffffff',
          }}
        >
          {t('contact.emailLabel')}
        </a>

        <a
          href="https://linkedin.com/in/raulast"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '15px',
            textDecoration: 'none',
            background: 'var(--color-surface-2)',
            color: 'var(--color-text)',
          }}
        >
          {t('contact.linkedinLabel')}
        </a>
      </div>
    </section>
  )
}
