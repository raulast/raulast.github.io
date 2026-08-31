import { useTranslation } from 'react-i18next'

export default function AboutSection() {
  const { t } = useTranslation()

  const highlights = t('about.highlights', { returnObjects: true }) as Array<{
    icon: string
    label: string
    detail: string
  }>

  return (
    <section
      id="about"
      style={{
        width: '100%',
        background: 'var(--color-bg)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Section heading */}
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '48px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {t('about.heading')}
        </h2>

        {/* Two-column layout: bio left, cards right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Bio */}
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {t('about.bio')}
          </p>

          {/* Highlight cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {highlights.slice(0, 3).map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {/* Icon */}
                <span
                  style={{
                    fontSize: '28px',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                {/* Text */}
                <div>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: '2px',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
