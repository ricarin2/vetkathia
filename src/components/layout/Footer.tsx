import {
  Camera,
  HeartPulse,
  Mail,
  Music2,
  Play,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

import {
  legalNavigation,
  mainNavigation,
  siteConfig,
  type SiteSocialLink,
} from '../../data/site'
import {
  hasDemoTestimonialCases,
  hasPublicTestimonialCases,
} from '../../data/testimonials'
import { cn } from '../../lib/cn'
import { Button, Container, Input } from '../ui'

type FooterSocialItem = {
  href: string
  label: SiteSocialLink['label']
}

const socialIcons: Partial<Record<SiteSocialLink['label'], LucideIcon>> = {
  Email: Mail,
  Instagram: Camera,
  TikTok: Music2,
  YouTube: Play,
}

export function Footer() {
  const showCasesLink = hasPublicTestimonialCases || hasDemoTestimonialCases
  const footerNavigation = [
    ...mainNavigation.map((item) =>
      item.label === 'Planes' ? { ...item, href: '/planes' } : item,
    ),
    ...(showCasesLink
      ? [
          {
            href: '/casos',
            label: hasPublicTestimonialCases ? 'Casos reales' : 'Casos demo',
          },
        ]
      : []),
  ]
  const availableSocialLinks = (siteConfig.socialLinks ?? []).filter(
    (item) => item.href && item.href !== '#',
  )
  const hasSocialLinks = availableSocialLinks.length > 0
  const newsletter = siteConfig.newsletter
  const showNewsletter = Boolean(newsletter?.enabled && newsletter.providerUrl)
  const contactEmail = siteConfig.contact.email.trim()

  return (
    <footer className="border-t border-vetkathia-border/55 bg-[linear-gradient(180deg,#FFFDFB_0%,#FFF1F5_100%)]">
      <Container className="py-6 sm:py-10 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1.25fr] lg:gap-9">
          <div className="col-span-2 max-w-md lg:col-span-1">
            <Link
              className="inline-flex items-center gap-3 rounded-2xl focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
              to="/"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-vetkathia-primary text-white shadow-[0_14px_34px_rgba(232,62,115,0.2)]">
                <HeartPulse className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-serif text-2xl font-semibold leading-none text-vetkathia-text">
                  {siteConfig.name}
                </span>
                <span className="mt-1 block text-xs font-semibold text-vetkathia-muted">
                  Nutrición natural veterinaria
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-vetkathia-muted sm:text-base sm:leading-7">
              Nutrición natural veterinaria para perros y gatos, con pautas
              personalizadas, realistas y planteadas con criterio profesional.
            </p>
            <p className="mt-3 max-w-sm border-l-2 border-vetkathia-primary/24 pl-4 text-sm leading-6 text-vetkathia-muted">
              No sustituye urgencias ni seguimiento clínico habitual.
            </p>
          </div>

          <div className="col-span-2 lg:col-span-1 lg:order-4">
            <div className="grid gap-5">
              {hasSocialLinks ? <FooterSocialLinks links={availableSocialLinks} /> : null}

              <FooterContact email={contactEmail} />

              {showNewsletter && newsletter ? (
                <NewsletterBlock
                  hasSocialLinks={hasSocialLinks}
                  newsletter={newsletter}
                />
              ) : null}
            </div>
          </div>

          <FooterColumn title="Enlaces">
            {footerNavigation.map((item) => (
              <FooterLink href={item.href} key={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            {legalNavigation.map((item) => (
              <FooterLink href={item.href} key={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>
      </Container>

      <div className="border-t border-vetkathia-border/45">
        <Container className="py-4 sm:py-5">
          <p className="max-w-4xl text-xs leading-5 text-vetkathia-muted sm:text-sm sm:leading-6">
            © {new Date().getFullYear()} VetKathia. Contenido informativo; no
            sustituye una urgencia veterinaria ni el seguimiento clínico
            habitual.
          </p>
        </Container>
      </div>
    </footer>
  )
}

function FooterContact({ email }: { email: string }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
        Contacto
      </h2>
      {email ? (
        <a
          className="mt-3 inline-flex w-fit rounded-xl px-2 py-1 text-sm font-semibold text-vetkathia-muted transition-[background-color,color] duration-200 hover:bg-white/80 hover:text-vetkathia-primary-dark focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      ) : (
        <p className="mt-3 max-w-xs text-sm leading-6 text-vetkathia-muted">
          {siteConfig.contact.fallback}
        </p>
      )}
    </div>
  )
}

function FooterColumn({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
        {title}
      </h2>
      <div className="mt-3 grid gap-2 lg:mt-4 lg:gap-2.5">{children}</div>
    </div>
  )
}

function FooterLink({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) {
  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <a
        className="w-fit rounded-xl px-2 py-1 text-sm font-semibold text-vetkathia-muted transition-[background-color,color] duration-200 hover:bg-white/80 hover:text-vetkathia-primary-dark focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      className="w-fit rounded-xl px-2 py-1 text-sm font-semibold text-vetkathia-muted transition-[background-color,color] duration-200 hover:bg-white/80 hover:text-vetkathia-primary-dark focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
      to={href}
    >
      {children}
    </Link>
  )
}

function FooterSocialLinks({
  links,
}: {
  links: FooterSocialItem[]
}) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
        Redes
      </h2>
      <div className="mt-3 flex flex-wrap gap-2 lg:mt-4">
        {links.map((item) => {
          const Icon = socialIcons[item.label]
          const isExternal = item.href?.startsWith('http') ?? false
          const iconContent = Icon ? (
            <Icon className="h-4.5 w-4.5" aria-hidden="true" />
          ) : item.label === 'Facebook' ? (
            <span className="text-xs font-black" aria-hidden="true">
              Fb
            </span>
          ) : (
            <span className="text-xs font-bold">{item.label}</span>
          )
          const classes =
            'inline-flex h-11 w-11 items-center justify-center rounded-full border border-vetkathia-border/45 bg-white/78 text-vetkathia-text shadow-[0_10px_24px_rgba(59,39,36,0.045)] transition-[background-color,border-color,color,transform] duration-200 focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25'

          return (
            <a
              aria-label={item.label}
              className={`${classes} hover:-translate-y-0.5 hover:border-vetkathia-primary/45 hover:bg-white hover:text-vetkathia-primary-dark`}
              href={item.href}
              key={item.href}
              rel={isExternal ? 'noreferrer' : undefined}
              target={isExternal ? '_blank' : undefined}
            >
              {iconContent}
            </a>
          )
        })}
      </div>
    </div>
  )
}

function NewsletterBlock({
  hasSocialLinks,
  newsletter,
}: {
  hasSocialLinks: boolean
  newsletter: NonNullable<typeof siteConfig.newsletter>
}) {
  const hasProvider = Boolean(newsletter.providerUrl)

  if (!hasProvider) return null

  return (
    <div
      className={cn(
        'rounded-[1.45rem] border border-vetkathia-border/36 bg-white/74 p-4 shadow-[0_16px_42px_rgba(59,39,36,0.045)] sm:p-5',
        !hasSocialLinks && 'lg:mt-0',
      )}
    >
      <h2 className="font-sans text-lg font-black leading-tight text-vetkathia-text">
        {newsletter.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-vetkathia-muted">
        {newsletter.description}
      </p>

      <form
        action={newsletter.providerUrl}
        className="mt-4 grid gap-3"
        method="post"
      >
        <Input
          autoComplete="email"
          label="Email"
          name="email"
          placeholder={newsletter.placeholder}
          required
          type="email"
        />
        <Button fullWidth type="submit">
          Recibir guía
        </Button>
        <p className="text-xs leading-5 text-vetkathia-muted">
          Aceptas recibir comunicaciones de VetKathia. Puedes darte de baja
          cuando quieras. Consulta la{' '}
          <Link
            className="font-semibold text-vetkathia-primary-dark underline-offset-4 hover:underline focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
            to="/privacidad"
          >
            privacidad
          </Link>
          .
        </p>
      </form>
    </div>
  )
}
