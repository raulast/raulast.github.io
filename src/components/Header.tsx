import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

interface NavLink {
  key: 'about' | 'stack' | 'projects' | 'contact'
  href: string
}

const NAV_LINKS: NavLink[] = [
  { key: 'about', href: '#about' },
  { key: 'stack', href: '#stack' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
]

export default function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: 'var(--color-bg)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontSize: '18px',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text)',
            letterSpacing: '-0.3px',
          }}
        >
          Raúl Salazar
        </span>

        {/* Desktop nav links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={(e) => handleAnchorClick(e, href)}
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '14px',
                fontFamily: 'var(--font-sans)',
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
              {t(`nav.${key}`)}
            </a>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text)',
            fontSize: '24px',
            padding: 0,
          }}
          className="show-mobile"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={(e) => handleAnchorClick(e, href)}
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '16px',
                fontFamily: 'var(--font-sans)',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <LanguageSwitcher />
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
