import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe2, BadgeCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const TRUST_PILLS = [
  { icon: BadgeCheck, text: 'Accrédité État marocain' },
  { icon: Globe2,     text: 'Double diplôme FR–MA' },
  { icon: Award,      text: 'Membre FEDE' },
];

const containerVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVar = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden">
      {/* ── Background ────────────────────────────────── */}
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: 'var(--gradient-hero)' }}
      />
      <div className="absolute inset-0 -z-10 dot-bg opacity-60" />

      {/* Blurred orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-400/8 blur-[100px] -z-10" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-accent-400/10 blur-[100px] -z-10" />

      {/* ── Content ───────────────────────────────────── */}
      <div className="container flex-1 flex items-center py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          {/* Left column */}
          <motion.div
            className="lg:col-span-6 xl:col-span-7"
            variants={containerVar}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={itemVar}>
              <Badge tone="accent" className="text-sm px-4 py-1.5 gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
                </span>
                Rentrée 2026 — Candidatures ouvertes
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVar}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-ink mt-6"
            >
              L'école supérieure{' '}
              <br className="hidden sm:block" />
              qui fait la{' '}
              <span className="relative inline-block">
                <span className="gradient-text">différence</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 220 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6 C60 2 160 2 218 6"
                    stroke="#D4A017"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={itemVar}
              className="mt-6 text-lg md:text-xl text-ink-soft leading-relaxed max-w-xl"
            >
              De Meknès au monde — Management, Commerce, IT et Hôtellerie & Tourisme. Diplômes accrédités par l'État marocain, reconnus en Europe.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVar} className="mt-8 flex flex-wrap gap-3">
              <Link to="/programs">
                <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explorer les formations
                </Button>
              </Link>
              <Link to="/admissions/apply">
                <Button size="xl" variant="accent">
                  Candidater maintenant
                </Button>
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div variants={itemVar} className="mt-10 flex flex-wrap gap-3">
              {TRUST_PILLS.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 text-sm text-ink-soft bg-white/80 border border-surface-border rounded-full px-4 py-2 shadow-xs"
                >
                  <Icon className="w-4 h-4 text-primary-600" />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column – image */}
          <motion.div
            className="lg:col-span-6 xl:col-span-5 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary-100 to-accent-100/40 -z-10" />
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-primary-50 to-transparent -z-20 opacity-60" />

              {/* Main image */}
              <div className="relative rounded-4xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src="/hero-ai.png"
                  alt="Étudiants EEMCI en cours"
                  className="w-full h-[480px] md:h-[560px] object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent" />
              </div>

              {/* Floating card – graduates */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-5 -left-5 md:-left-8 glass rounded-2xl p-4 shadow-md border border-white/60 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      'from-primary-300 to-primary-600',
                      'from-accent-300 to-accent-500',
                      'from-teal-400 to-teal-600',
                    ].map((g, i) => (
                      <div
                        key={i}
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} border-2 border-white shadow-sm`}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-ink leading-none">1 200+</p>
                    <p className="text-xs text-ink-soft mt-0.5">Diplômés actifs</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card – experience */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-5 -right-5 md:-right-8 rounded-2xl bg-accent-500 px-5 py-3.5 shadow-glow-accent hidden md:block"
              >
                <p className="font-display text-3xl font-extrabold text-primary-900 leading-none">
                  14<span className="text-base font-bold">ans</span>
                </p>
                <p className="text-xs text-primary-800/80 font-medium mt-0.5">d'excellence</p>
              </motion.div>

              {/* Floating card – programs */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute top-1/2 -translate-y-1/2 -right-5 md:-right-10 glass rounded-xl px-4 py-3 shadow-md border border-white/60 hidden lg:block"
              >
                <p className="font-display text-xl font-bold text-primary-700 leading-none">25+</p>
                <p className="text-xs text-ink-muted mt-0.5">Programmes</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden md:flex justify-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-ink-muted hover:text-primary-600 transition animate-float"
          aria-label="Défiler vers le bas"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Découvrir</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
