import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { PILLARS } from '@/lib/data';

export default function WhyChoose() {
  return (
    <Section eyebrow="Pourquoi EEMCI" title="L'excellence à portée de tous"
      lead="Six engagements concrets qui structurent notre pédagogie et our accompagnement.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PILLARS.map((p,i)=>{
          const Icon = (Icons as Record<string, React.ElementType>)[p.icon] ?? Icons.Star;
          return (
            <motion.div key={p.title} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.4,delay:i*.06}}
              className="p-7 rounded-2xl bg-white border border-slate-200/70 hover:border-primary-200 hover:shadow-soft transition group">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 grid place-items-center group-hover:bg-primary-600 group-hover:text-white transition">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mt-5">{p.title}</h3>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">{p.text}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
