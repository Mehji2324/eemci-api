import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraduationCap, LogIn, Menu, X } from 'lucide-react';

export const Shell: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'ar' : 'fr';
    i18n.changeLanguage(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
                <GraduationCap size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-primary-900 leading-none">EEMCI</span>
                <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest leading-none mt-1">Meknès • Maroc</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/schools" className="text-neutral-500 hover:text-primary-500 font-medium transition-colors">Écoles</Link>
              <Link to="/programs" className="text-neutral-500 hover:text-primary-500 font-medium transition-colors">Programmes</Link>
              <Link to="/admissions" className="text-neutral-500 hover:text-primary-500 font-medium transition-colors">Admissions</Link>
              
              <div className="h-6 w-px bg-neutral-200 mx-2" />
              
              <button 
                onClick={toggleLanguage}
                className="text-neutral-500 hover:text-primary-500 font-bold px-2 py-1 rounded transition-colors"
              >
                {i18n.language === 'fr' ? 'AR' : 'FR'}
              </button>

              <Link to="/login" className="flex items-center gap-2 text-neutral-900 hover:text-primary-500 font-semibold transition-colors">
                <LogIn size={18} />
                <span>{t('login')}</span>
              </Link>
              
              <Link 
                to="/admissions/apply" 
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-6 py-2.5 rounded-md font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                {t('apply')}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-neutral-500">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-neutral-200 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/schools" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100">Écoles</Link>
              <Link to="/programs" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100">Programmes</Link>
              <Link to="/admissions" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100">Admissions</Link>
              <div className="pt-4 flex items-center gap-4 px-3">
                <Link to="/login" className="flex-1 text-center py-2.5 rounded-md border border-neutral-200 font-semibold">{t('login')}</Link>
                <Link to="/admissions/apply" className="flex-1 text-center py-2.5 rounded-md bg-accent-500 text-primary-900 font-bold">{t('apply')}</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="text-accent-400" size={32} />
                <span className="font-display font-bold text-2xl tracking-tight">EEMCI</span>
              </div>
              <p className="text-primary-100/70 max-w-sm mb-8">
                L'École Européenne de Management et de Commerce International forme les leaders de demain à Meknès depuis 2011.
              </p>
              <div className="flex gap-4">
                {/* Social links placeholder */}
                <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center hover:bg-accent-500 hover:text-primary-900 transition-all cursor-pointer">
                  f
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center hover:bg-accent-500 hover:text-primary-900 transition-all cursor-pointer">
                  in
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center hover:bg-accent-500 hover:text-primary-900 transition-all cursor-pointer">
                  ig
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-6">Navigation</h4>
              <ul className="space-y-4 text-primary-100/70">
                <li><Link to="/schools" className="hover:text-accent-400 transition-colors">Nos Écoles</Link></li>
                <li><Link to="/programs" className="hover:text-accent-400 transition-colors">Tous les Programmes</Link></li>
                <li><Link to="/admissions" className="hover:text-accent-400 transition-colors">Admissions</Link></li>
                <li><Link to="/alumni" className="hover:text-accent-400 transition-colors">Témoignages Alumni</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-primary-100/70">
                <li>Rue Accra Imm 14 ville nouvelle, Meknes, Maroc</li>
                <li>05354-00417 / 0661-337841</li>
                <li>contact@eemci.ma</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-100/50">
            <p>© 2026 EEMCI Platform. Tous droits réservés.</p>
            <div className="flex gap-8">
              <Link to="/legal" className="hover:text-white transition-colors">Mentions légales</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
