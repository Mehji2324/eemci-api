import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, GraduationCap } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PROGRAMS } from '@/lib/data';
import { cn } from '@/lib/cn';

const LEVELS = ['Tous','Bac+2','Bac+3','Bac+5','Bac+8'] as const;

export default function ProgramsShowcase() {
  const [filter, setFilter] = useState<typeof LEVELS[number]>('Tous');
  const items = useMemo(() => filter==='Tous' ? PROGRAMS.slice(0,8) : PROGRAMS.filter(p=>p.level===filter).slice(0,8), [filter]);

  return (
    <Section id="programs" eyebrow="Programmes" title="Une formation pour chaque ambition"
      lead="Bac+2 à Bac+8 — choisissez parmi nos parcours accrédités et reconnus en Europe." className="bg-surface-muted">
      <div className="flex flex-wrap gap-2 mb-10">
        {LEVELS.map(l => (
          <button key={l} onClick={()=>setFilter(l)}
            className={cn('px-4 py-2 rounded-full text-sm font-medium transition',
              filter===l ? 'bg-primary-600 text-white shadow-glow-primary' : 'bg-white text-ink-soft border border-slate-200 hover:bg-surface-subtle')}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((p,i)=>(
          <motion.div key={p.slug} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.4,delay:i*.05}}>
            <Link to={`/programs/${p.slug}`} className="group block h-full">
              <div className="h-full p-6 bg-white rounded-2xl border border-slate-200/70 hover:border-primary-300 hover:shadow-glow-primary transition-all">
                <Badge tone={p.school==='hospitality-tourism'?'emerald':'primary'}>{p.domain}</Badge>
                <h3 className="font-display text-lg font-semibold mt-3 leading-snug group-hover:text-primary-700 transition">{p.title}</h3>
                <p className="text-sm text-ink-soft mt-2 line-clamp-2">{p.summary}</p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-ink-soft">
                  <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" />{p.level}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{p.duration}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/programs"><Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>Tous les programmes</Button></Link>
      </div>
    </Section>
  );
}
