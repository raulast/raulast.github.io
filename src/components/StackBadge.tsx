interface Props {
  name: string
}

export default function StackBadge({ name }: Props) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: 'var(--color-tag-bg)',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        borderRadius: '6px',
        padding: '6px 12px',
        lineHeight: '1',
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </span>
  )
}
