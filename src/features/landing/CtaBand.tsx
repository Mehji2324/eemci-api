import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function CtaBand() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 p-10 md:p-16 text-white">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent-500/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight">Prêt à donner un nouveau cap à votre avenir ?</h2>
              <p className="mt-4 text-primary-100/90 text-lg">Rentrée 2026 ouverte. Déposez votre candidature en moins de 10 minutes.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <Link to="/admissions/apply"><Button size="xl" variant="accent" rightIcon={<ArrowRight className="w-5 h-5" />}>Candidater</Button></Link>
              <Link to="/contact"><Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">Nous contacter</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
