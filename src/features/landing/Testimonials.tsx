import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { TESTIMONIALS } from '@/lib/data';

export default function Testimonials() {
  return (
    <Section eyebrow="Alumni" title="Ils racontent leur réussite"
      lead="Nos diplômés témoignent de leur parcours et de leur insertion professionnelle." className="bg-primary-900 text-white">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.map((t,i)=>(
          <motion.div key={t.name} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.4,delay:i*.08}}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
            <Quote className="w-7 h-7 text-accent-400 mb-3" />
            <p className="text-sm leading-relaxed text-primary-50/90">"{t.quote}"</p>
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="font-medium text-white">{t.name}</p>
              <p className="text-xs text-primary-100/70">{t.role}</p>
              <p className="text-xs text-accent-300 mt-1">{t.program} · Promo {t.promo}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
