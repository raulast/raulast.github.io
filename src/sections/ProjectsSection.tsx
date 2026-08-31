import { useTranslation } from 'react-i18next'
import ProjectCard from '@/components/ProjectCard'

interface ProjectItem {
  name: string
  description: string
  metric: string
  tags: string[]
}

export default function ProjectsSection() {
  const { t } = useTranslation()

  const items = t('projects.items', { returnObjects: true }) as Array<ProjectItem>

  return (
    <section
      id="projects"
      style={{
        background: 'var(--color-bg)',
        padding: '96px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* Section heading */}
        <h2
          style={{
            margin: '0 0 48px',
            fontSize: '36px',
            fontWeight: 700,
            color: 'var(--color-text)',
            textAlign: 'center',
          }}
        >
          {t('projects.heading')}
        </h2>

        {/* Responsive grid: 3 columns on desktop, 1 on mobile via CSS grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {items.map((item) => (
            <ProjectCard
              key={item.name}
              name={item.name}
              description={item.description}
              metric={item.metric}
              tags={item.tags}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
