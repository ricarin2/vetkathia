import { CalendarClock } from 'lucide-react'

import { trackCTAClick } from '../../lib/analytics'
import { integrations } from '../../lib/integrations'
import { Badge, Button, Card } from '../ui'

export function CalendlyPlaceholder() {
  return (
    <Card className="bg-white/90 shadow-none ring-1 ring-vetkathia-border/45">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-vetkathia-border bg-vetkathia-surface text-vetkathia-primary-dark">
          <CalendarClock className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <Badge tone="soft">Agenda</Badge>
          <h2 className="mt-4 font-sans text-xl font-semibold leading-tight text-vetkathia-text">
            Reserva online próximamente
	          </h2>
	          <p className="mt-3 leading-7 text-vetkathia-muted">
	            La reserva forma parte del inicio del servicio. Más adelante podrás
	            elegir horario online cuando la agenda esté conectada.
	          </p>
        </div>
      </div>

      <p className="mt-5 rounded-3xl border border-dashed border-vetkathia-border bg-vetkathia-surface/70 px-4 py-3 text-sm leading-6 text-vetkathia-muted">
        Cuando la agenda esté activa, este espacio podrá abrir la reserva online.
      </p>

      {/* Integrar Calendly aquí cuando `integrations.calendlyUrl` tenga la URL final. */}
      {integrations.calendlyUrl ? (
        <Button
          className="mt-5"
          href={integrations.calendlyUrl}
          onClick={() => trackCTAClick('Abrir agenda', 'calendly placeholder')}
          rel="noreferrer"
          target="_blank"
          variant="outline"
        >
          Abrir agenda
        </Button>
      ) : null}
    </Card>
  )
}
