import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Moon, Sun, ChevronDown, GraduationCap, Building2, BookOpen, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { cn } from '@/lib/cn';
import { useUiStore } from '@/lib/store';
import { useTranslation } from 'react-i18next';

const MEGA_LINKS = [
  {
    to: '/about',
    label: 'L\'École',
    dropdown: [
      { to: '/about', label: 'À propos', icon: Building2, desc: 'Notre histoire et notre mission' },
      { to: '/alumni', label: 'Alumni', icon: GraduationCap, desc: '1 200+ diplômés actifs' },
    ],
  },
  { to: '/schools', label: 'Nos Écoles' },
  {
    to: '/programs',
    label: 'Formations',
    dropdown: [
      { to: '/programs?level=Technicien', label: 'Technicien (Bac)', icon: BookOpen, desc: 'Formation courte opérationnelle' },
      { to: '/programs?level=Bac%2B2', label: 'Technicien Spécialisé (Bac+2)', icon: BookOpen, desc: 'Diplôme d\'État marocain' },
      { to: '/programs?level=Bac%2B3', label: 'Bachelor (Bac+3)', icon: BookOpen, desc: 'Double diplôme franco-marocain' },
      { to: '/programs?level=Bac%2B5', label: 'Master (Bac+5)', icon: BookOpen, desc: 'Master européen expert' },
      { to: '/programs?level=Bac%2B8', label: 'Doctorat (Bac+8)', icon: BookOpen, desc: 'Recherche avancée' },
    ],
  },
  { to: '/news', label: 'Actualités' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme, lang, setLang } = useUiStore();
  const { i18n } = useTranslation();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const changeLang = (l: 'fr' | 'en' | 'ar') => {
    setLang(l);
    i18n.changeLanguage(l);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 dark:bg-primary-950/90 backdrop-blur-xl border-b border-surface-border/70 dark:border-white/8 shadow-soft'
            : 'bg-transparent'
        )}
      >
        {/* Top bar – phone & social */}
        {!scrolled && (
          <div className="hidden lg:flex border-b border-surface-border/40 dark:border-white/5">
            <div className="container h-9 flex items-center justify-between text-xs text-ink-muted dark:text-primary-300/50">
              <div className="flex items-center gap-4">
                <a href="tel:+212535400417" className="flex items-center gap-1.5 hover:text-primary-600 transition">
                  <Phone className="w-3 h-3" /> +212 535 40 04 17
                </a>
                <span>·</span>
                <a href="mailto:contact@eemci.ma" className="hover:text-primary-600 transition">contact@eemci.ma</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent-600 font-semibold">✓ Accrédité État marocain</span>
                <span>·</span>
                <span>Double diplôme FR–MA</span>
                <span>·</span>
                <span>Membre FEDE</span>
              </div>
            </div>
          </div>
        )}

        <div className="container h-16 md:h-[70px] flex items-center justify-between gap-4">
          <Logo variant={scrolled ? 'dark' : 'dark'} size="md" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
            {MEGA_LINKS.map((link) => (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.to)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'nav-link inline-flex items-center gap-1',
                      isActive && 'nav-link-active'
                    )
                  }
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === link.to ? 'rotate-180' : ''
                      )}
                    />
                  )}
                </NavLink>

                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.to && (
                  <div className="absolute top-full left-0 mt-2 w-64 glass rounded-2xl shadow-lg border border-white/50 dark:border-white/10 dark:bg-primary-900/90 py-2 animate-fade-up">
                    {link.dropdown.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-primary-50/80 dark:hover:bg-white/5 transition rounded-xl mx-1"
                        >
                          <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-800 grid place-items-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-primary-600 dark:text-primary-300" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink dark:text-white">{item.label}</span>
                            <span className="block text-xs text-ink-muted dark:text-primary-300 mt-0.5">{item.desc}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl grid place-items-center text-ink-soft dark:text-primary-200 hover:bg-surface-subtle dark:hover:bg-white/8 transition"
              aria-label="Basculer thème"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Language picker */}
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-sm text-ink-soft dark:text-primary-200 hover:bg-surface-subtle dark:hover:bg-white/8 transition font-medium">
                <Globe className="w-4 h-4" />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-36 glass dark:bg-primary-900/95 rounded-xl shadow-md border border-white/50 dark:border-white/10 py-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                {(['fr', 'en', 'ar'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLang(l)}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm hover:bg-primary-50 dark:hover:bg-white/8 transition rounded-lg mx-auto',
                      lang === l ? 'text-primary-700 font-semibold' : 'text-ink-soft dark:text-primary-200'
                    )}
                  >
                    {l === 'fr' ? 'Français' : l === 'en' ? 'English' : 'العربية'}
                  </button>
                ))}
              </div>
            </div>

            <Link to="/login" className="hidden md:block">
              <Button variant="ghost" size="sm" className="dark:text-white">
                Connexion
              </Button>
            </Link>
            <Link to="/admissions/apply" className="hidden md:block">
              <Button variant="accent" size="sm">
                S'inscrire
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 rounded-xl grid place-items-center text-ink dark:text-white hover:bg-surface-subtle dark:hover:bg-white/8 transition"
              aria-label="Ouvrir menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <aside className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-primary-950 shadow-2xl flex flex-col animate-fade-up">
            <div className="flex items-center justify-between p-5 border-b border-surface-border dark:border-white/8">
              <Logo size="md" />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl grid place-items-center text-ink-soft hover:bg-surface-subtle dark:text-white dark:hover:bg-white/8 transition"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {MEGA_LINKS.map((link) => (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition',
                        isActive
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-ink dark:text-white hover:bg-surface-subtle dark:hover:bg-white/5'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                  {link.dropdown && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-surface-border dark:border-white/10 pl-4">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block py-2 text-sm text-ink-soft dark:text-primary-300 hover:text-primary-600 dark:hover:text-white transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-4 space-y-3 border-t border-surface-border dark:border-white/8">
              <div className="flex gap-2">
                {(['fr', 'en', 'ar'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLang(l)}
                    className={cn(
                      'flex-1 py-2 rounded-xl text-sm font-semibold border transition',
                      lang === l
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-surface-border text-ink-soft dark:border-white/15 dark:text-primary-200 hover:border-primary-300'
                    )}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link to="/login" className="block">
                <Button variant="secondary" size="lg" className="w-full">Connexion</Button>
              </Link>
              <Link to="/admissions/apply" className="block">
                <Button variant="accent" size="lg" className="w-full">S'inscrire maintenant</Button>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
