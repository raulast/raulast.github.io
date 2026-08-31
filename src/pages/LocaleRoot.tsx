import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import StackSection from '../sections/StackSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'

const SUPPORTED_LOCALES = ['en', 'es']
const SITE_URL = 'https://raulast.github.io'

export default function LocaleRoot() {
  const { locale } = useParams<{ locale: string }>()
  const { t, i18n } = useTranslation()

  // Redirect unknown locales to /en
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    return <Navigate to="/en" replace />
  }

  // Sync i18next language with URL locale
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  const canonicalUrl = `${SITE_URL}/${locale}`

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:locale" content={t('meta.ogLocale')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/es`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />
      </Helmet>

      <main>
        {/* id="hero" lives inside HeroSection */}
        <HeroSection />

        {/* id="about" lives inside AboutSection */}
        <AboutSection />

        {/* id="stack" lives inside StackSection */}
        <StackSection />

        {/* id="projects" lives inside ProjectsSection */}
        <ProjectsSection />

        {/* id="contact" lives inside ContactSection */}
        <ContactSection />
      </main>
    </>
  )
}
