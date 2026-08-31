import StackBadge from '@/components/StackBadge'

interface Props {
  name: string        // NOT translated (proper noun)
  description: string // locale-aware, passed as already-resolved string
  metric: string      // NOT translated
  tags: string[]      // NOT translated
}

export default function ProjectCard({ name, description, metric, tags }: Props) {
  return (
    <article
      style={{
        background: 'var(--color-surface)',
        borderRadius: '12px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Project name */}
      <h3
        style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--color-text)',
          lineHeight: '1.3',
        }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--color-text-muted)',
        }}
      >
        {description}
      </p>

      {/* Metric badge */}
      <span
        style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          background: '#1e2a4a',
          borderRadius: '6px',
          padding: '6px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-accent-red)',
          lineHeight: '1.4',
        }}
      >
        {metric}
      </span>

      {/* Tags */}
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
    </article>
  )
}
