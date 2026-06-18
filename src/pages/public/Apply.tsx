import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { PROGRAMS } from '@/lib/data';
import { cn } from '@/lib/cn';

const STEPS = ['Identité','Cursus','Programme','Confirmation'];

export default function Apply() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', bac:'', city:'', program:'' });

  if (done) return (
    <Section title="Candidature envoyée 🎉" lead="Merci ! Un conseiller EEMCI vous recontactera sous 48h.">
      <Button onClick={()=>{setDone(false); setStep(0);}}>Nouvelle candidature</Button>
    </Section>
  );

  return (
    <Section eyebrow="Candidature en ligne" title="Démarrez votre admission">
      <div className="max-w-3xl mx-auto">
        <ol className="flex items-center gap-2 mb-10">
          {STEPS.map((s,i)=>(
            <li key={s} className="flex-1 flex items-center gap-2">
              <span className={cn('w-8 h-8 grid place-items-center rounded-full text-sm font-medium',
                i<=step ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500')}>
                {i<step ? <Check className="w-4 h-4" /> : i+1}
              </span>
              <span className={cn('text-sm', i<=step?'text-ink font-medium':'text-slate-400')}>{s}</span>
              {i<STEPS.length-1 && <span className="flex-1 h-px bg-slate-200" />}
            </li>
          ))}
        </ol>

        <motion.div key={step} initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} transition={{duration:.3}}
          className="bg-white p-8 rounded-2xl border border-slate-200/70">
          {step===0 && (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Prénom" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} />
              <Input label="Nom" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} />
              <Input label="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
              <Input label="Téléphone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            </div>
          )}
          {step===1 && (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Série du Baccalauréat" value={form.bac} onChange={e=>setForm({...form,bac:e.target.value})} />
              <Input label="Ville de résidence" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} />
            </div>
          )}
          {step===2 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Programme souhaité</label>
              <select value={form.program} onChange={e=>setForm({...form,program:e.target.value})}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white">
                <option value="">-- Choisir --</option>
                {PROGRAMS.map(p => <option key={p.slug} value={p.slug}>{p.title} · {p.level}</option>)}
              </select>
            </div>
          )}
          {step===3 && (
            <div className="space-y-2 text-ink-soft">
              <p>Vérifiez vos informations puis envoyez votre candidature.</p>
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div><span className="text-slate-400">Nom :</span> {form.firstName} {form.lastName}</div>
                <div><span className="text-slate-400">Email :</span> {form.email}</div>
                <div><span className="text-slate-400">Téléphone :</span> {form.phone}</div>
                <div><span className="text-slate-400">Bac :</span> {form.bac}</div>
                <div><span className="text-slate-400">Ville :</span> {form.city}</div>
                <div><span className="text-slate-400">Programme :</span> {form.program}</div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            <Button variant="ghost" disabled={step===0} onClick={()=>setStep(s=>s-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>Précédent</Button>
            {step<STEPS.length-1
              ? <Button onClick={()=>setStep(s=>s+1)} rightIcon={<ArrowRight className="w-4 h-4" />}>Suivant</Button>
              : <Button variant="accent" onClick={()=>setDone(true)}>Envoyer ma candidature</Button>}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
