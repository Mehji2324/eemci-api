import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SCHOOLS } from '@/lib/data';

export default function SchoolsBlock() {
  return (
    <Section id="schools" eyebrow="Nos écoles" title="Deux écoles, un même standard d'excellence"
      lead="Choisissez votre voie au sein d'institutions accréditées et reconnues à l'international.">
      <div className="grid md:grid-cols-2 gap-6">
        {SCHOOLS.map((s,i)=>(
          <motion.div key={s.slug} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.5,delay:i*.1}}
            className="group relative overflow-hidden rounded-4xl border border-slate-200/70 bg-white shadow-soft">
            <div className="relative h-64 overflow-hidden">
              <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className={`absolute inset-0 bg-gradient-to-t ${s.color==='primary' ? 'from-primary-900/80' : 'from-emerald-900/80'} via-transparent`} />
              <h3 className="absolute bottom-5 left-6 right-6 font-display text-2xl md:text-3xl text-white font-semibold">{s.name}</h3>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-ink-soft">{s.short}</p>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {s.bullets.map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${s.color==='primary'?'text-primary-600':'text-emerald-600'}`} />
                    <span className="text-ink">{b}</span>
                  </li>
                ))}
              </ul>
              <Link to={`/programs?school=${s.slug}`} className={`mt-8 inline-flex items-center gap-2 font-medium ${s.color==='primary'?'text-primary-700':'text-emerald-700'} hover:gap-3 transition-all`}>
                Découvrir l'école <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
