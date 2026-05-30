import {
  HeartPulse,
} from 'lucide-react'
import type { ComponentType, ReactNode, SVGProps } from 'react'
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

type SocialIconComponent = ComponentType<SVGProps<SVGSVGElement>>

const socialIcons: Partial<Record<SiteSocialLink['label'], SocialIconComponent>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  YouTube: YouTubeIcon,
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
            label: hasPublicTestimonialCases ? 'Historias reales' : 'Casos demo',
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
    <footer className="border-t border-vetkathia-border/55 bg-[linear-gradient(180deg,#FFFDFB_0%,#FFF5F0_100%)]">
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
              VetKathia ofrece nutrición natural veterinaria para perros y
              gatos, con planes de alimentación personalizados, realistas y
              planteados desde un enfoque profesional.
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
            © {new Date().getFullYear()} VetKathia. Contenido informativo y
            servicio online de nutrición. No sustituye urgencias veterinarias ni
            seguimiento clínico habitual.
          </p>
        </Container>
      </div>
    </footer>
  )
}

function FooterContact({ email }: { email: string }) {
  if (!email) return null

  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-vetkathia-primary-dark">
        Contacto
      </h2>
      <a
        className="mt-3 inline-flex w-fit rounded-xl px-2 py-1 text-sm font-semibold text-vetkathia-muted transition-[background-color,color] duration-200 hover:bg-white/80 hover:text-vetkathia-primary-dark focus:outline-none focus:ring-4 focus:ring-vetkathia-primary-dark/25"
        href={`mailto:${email}`}
      >
        {email}
      </a>
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
            <Icon className="h-5 w-5" aria-hidden="true" />
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

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        height="14.8"
        rx="4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        width="14.8"
        x="4.6"
        y="4.6"
      />
      <circle
        cx="12"
        cy="12"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="16.45" cy="7.55" fill="currentColor" r="1.15" />
    </svg>
  )
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.35 21v-7.3h2.48l.4-3.08h-2.88V8.94c0-.83.24-1.4 1.47-1.4h1.55V4.78A20.4 20.4 0 0 0 14.1 4c-2.25 0-3.8 1.35-3.8 3.86v2.76H7.75v3.08h2.55V21h3.05Z"
        fill="currentColor"
      />
    </svg>
  )
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.1 8.05a3.25 3.25 0 0 0-2.3-2.28C16.78 5.25 12 5.25 12 5.25s-4.78 0-6.8.52A3.25 3.25 0 0 0 2.9 8.05 33.95 33.95 0 0 0 2.38 12c0 1.34.17 2.66.52 3.95a3.25 3.25 0 0 0 2.3 2.28c2.02.52 6.8.52 6.8.52s4.78 0 6.8-.52a3.25 3.25 0 0 0 2.3-2.28c.35-1.29.52-2.61.52-3.95 0-1.34-.17-2.66-.52-3.95Z"
        fill="currentColor"
      />
      <path d="m10.15 15.05 4.85-3.04-4.85-3.06v6.1Z" fill="#FFFDFB" />
    </svg>
  )
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.15 4c.27 2.17 1.55 3.63 3.65 4.08v3.05a7.34 7.34 0 0 1-3.52-.95v5.42A5.38 5.38 0 0 1 9.9 21a5.13 5.13 0 0 1-4.7-3.07 5.05 5.05 0 0 1 1.1-5.54 5.36 5.36 0 0 1 5.18-1.3v3.16a2.2 2.2 0 0 0-2.24.3 2.08 2.08 0 0 0-.83 2.03A2.2 2.2 0 0 0 10.6 18.3a2.16 2.16 0 0 0 2.13-2.23V4h2.42Z"
        fill="currentColor"
      />
    </svg>
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
