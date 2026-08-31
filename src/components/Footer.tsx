import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-muted)',
          }}
        >
          {t('nav.copyright', { year })}
        </span>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a
            href="mailto:raulast.dev@gmail.com"
            style={{
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLAnchorElement).style.color = 'var(--color-text)'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLAnchorElement).style.color = 'var(--color-text-muted)'
            }}
          >
            raulast.dev@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/raulast"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-accent-red)',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLAnchorElement).style.opacity = '0.75'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLAnchorElement).style.opacity = '1'
            }}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
