import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, Mail } from 'lucide-react';

const TEACHERS = [
  { name:'Dr. Hicham Alaoui',     dept:'Finance',      courses:4, email:'h.alaoui@eemci.ma' },
  { name:'Pr. Nadia Berrada',     dept:'Marketing',    courses:3, email:'n.berrada@eemci.ma' },
  { name:'M. Karim Boutaleb',     dept:'IT',           courses:5, email:'k.boutaleb@eemci.ma' },
  { name:'Mme Salma Cherkaoui',   dept:'RH',           courses:3, email:'s.cherkaoui@eemci.ma' },
  { name:'Dr. Younes El Mansouri',dept:'Commerce Int.',courses:4, email:'y.elmansouri@eemci.ma' },
  { name:'Pr. Imane Filali',      dept:'Tourisme',     courses:3, email:'i.filali@eemci.ma' }
];

export default function Teachers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Enseignants</h1>
          <p className="text-ink-soft">Corps professoral EEMCI</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>Inviter</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEACHERS.map(t => (
          <Card key={t.email}><CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 grid place-items-center text-white font-medium">
                {t.name.split(' ').slice(-2).map(s=>s[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{t.name}</p>
                <p className="text-xs text-ink-soft">{t.dept}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge tone="primary">{t.courses} cours</Badge>
              <a href={`mailto:${t.email}`} className="text-ink-soft hover:text-primary-600"><Mail className="w-4 h-4" /></a>
            </div>
          </CardBody></Card>
        ))}
      </div>
    </div>
  );
}
