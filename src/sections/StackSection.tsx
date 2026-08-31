import { useTranslation } from 'react-i18next'
import StackBadge from '../components/StackBadge'

type CategoryKey = 'frontend' | 'backend' | 'ai' | 'devops' | 'telecom' | 'db'

// Map of typed translation keys per category — avoids template-literal TS errors
const CATEGORY_I18N_KEY: Record<CategoryKey, 'stack.categories.frontend' | 'stack.categories.backend' | 'stack.categories.ai' | 'stack.categories.devops' | 'stack.categories.telecom' | 'stack.categories.db'> = {
  frontend: 'stack.categories.frontend',
  backend: 'stack.categories.backend',
  ai: 'stack.categories.ai',
  devops: 'stack.categories.devops',
  telecom: 'stack.categories.telecom',
  db: 'stack.categories.db',
}

interface StackCategory {
  categoryKey: CategoryKey
  tags: string[]
}

const STACK: StackCategory[] = [
  { categoryKey: 'frontend', tags: ['React.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
  { categoryKey: 'backend', tags: ['Node.js', 'Laravel (PHP)', 'REST APIs', 'WebSockets'] },
  { categoryKey: 'ai', tags: ['AWS Bedrock', 'Anthropic Claude', 'Prompt Engineering'] },
  { categoryKey: 'devops', tags: ['Docker', 'Ubuntu VPS', 'CI/CD', 'n8n'] },
  { categoryKey: 'telecom', tags: ['Asterisk PBX', 'WhatsApp API', 'ESP32-C3', 'MQTT'] },
  { categoryKey: 'db', tags: ['MySQL', 'NoSQL'] },
]

export default function StackSection() {
  const { t } = useTranslation()

  return (
    <section
      id="stack"
      style={{
        width: '100%',
        background: 'var(--color-surface)',
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
          {t('stack.heading')}
        </h2>

        {/* Stack grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '32px',
          }}
        >
          {STACK.map(({ categoryKey, tags }) => (
            <div key={categoryKey}>
              {/* Category label */}
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  color: 'var(--color-accent-red)',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {t(CATEGORY_I18N_KEY[categoryKey])}
              </p>

              {/* Badges row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {tags.map((tag) => (
                  <StackBadge key={tag} name={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
