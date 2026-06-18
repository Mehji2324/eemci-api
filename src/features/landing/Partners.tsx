import { PARTNERS } from '@/lib/data';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'Académique':     { bg: 'bg-primary-50',  text: 'text-primary-700',  dot: 'bg-primary-400' },
  'Entreprise':     { bg: 'bg-accent-50',   text: 'text-accent-700',   dot: 'bg-accent-400' },
  'Certification':  { bg: 'bg-teal-500/10', text: 'text-teal-700',     dot: 'bg-teal-500' },
  'Institutionnel': { bg: 'bg-slate-100',   text: 'text-slate-600',    dot: 'bg-slate-400' },
};

// Duplicate the list to create a seamless infinite marquee
const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS];

export default function Partners() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-muted via-white to-surface-muted pointer-events-none" />
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">Nos Partenaires</p>
          <h2 className="section-title mb-4">
            Un réseau{' '}
            <span className="gradient-text">européen & professionnel</span>
          </h2>
          <p className="section-lead max-w-2xl mx-auto">
            Des partenariats académiques, industriels et institutionnels qui
            valident la qualité de nos formations et ouvrent des portes à
            l'international.
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
            <span
              key={cat}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-current/10 ${colors.bg} ${colors.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── Infinite marquee ── */}
      <div className="relative w-full overflow-hidden group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-surface-muted to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-surface-muted to-transparent pointer-events-none" />

        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {MARQUEE_ITEMS.map((p, i) => {
            const colors = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS['Institutionnel'];
            return (
              <a
                key={`${p.name}-${i}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Partenaire : ${p.name}`}
                className={`
                  flex-shrink-0 w-56 rounded-2xl border border-surface-border bg-white
                  shadow-xs hover:shadow-md hover:border-primary-200
                  transition-all duration-300 hover:-translate-y-1
                  flex flex-col items-center gap-3 p-6 group/card
                `}
              >
                {/* Logo */}
                <div className="h-14 w-full flex items-center justify-center">
                  <img
                    src={p.logo}
                    alt={`Logo ${p.name}`}
                    className="max-h-14 max-w-[8rem] w-auto object-contain
                               grayscale group-hover/card:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to text if image fails
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (next) next.style.display = 'block';
                    }}
                  />
                  {/* Text fallback (hidden by default) */}
                  <span
                    className="font-display text-xl font-bold text-primary-700 hidden"
                    aria-hidden="true"
                  >
                    {p.name}
                  </span>
                </div>

                {/* Name */}
                <p className="font-semibold text-sm text-ink text-center leading-tight">
                  {p.name}
                </p>

                {/* Category badge */}
                <span
                  className={`
                    inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
                    text-[10px] font-bold uppercase tracking-wide
                    ${colors.bg} ${colors.text}
                  `}
                >
                  <span className={`w-1 h-1 rounded-full ${colors.dot}`} />
                  {p.category}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom accreditation strip */}
      <div className="container mt-14">
        <div className="rounded-2xl border border-surface-border bg-white p-6 md:p-8 shadow-xs
                        flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-1">
              Accréditations &amp; Reconnaissances
            </p>
            <h3 className="font-display text-lg font-bold text-ink mb-1">
              Diplômes reconnus par l'État marocain et l'Europe
            </h3>
            <p className="text-sm text-ink-soft">
              Nos programmes sont accrédités par le Ministère de l'Éducation Nationale du Maroc
              et reconnus en Europe via nos partenaires de la FEDE.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'Accrédité Maroc',    emoji: '🇲🇦' },
              { label: 'Reconnu Europe',      emoji: '🇪🇺' },
              { label: 'Membre FEDE',         emoji: '🎓' },
              { label: 'Double Diplôme FR–MA',emoji: '📜' },
            ].map(({ label, emoji }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                           bg-surface-subtle border border-surface-border
                           text-xs font-semibold text-ink-soft"
              >
                <span>{emoji}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
