import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SUPPORTED_LOCALES = ['es', 'en'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

function detectLocale(): Locale {
  const browserLang = navigator.language?.toLowerCase() ?? ''
  return browserLang.startsWith('es') ? 'es' : 'en'
}

export default function RootRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const locale = detectLocale()
    navigate(`/${locale}`, { replace: true })
  }, [navigate])

  return null
}
