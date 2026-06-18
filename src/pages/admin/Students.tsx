import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

const ROWS = Array.from({length:14}, (_,i) => ({
  id: `STU-${1000+i}`,
  name: ['Sofia Alami','Karim Naciri','Hicham Bennani','Nadia Senhaji','Imane El Idrissi','Yassine Berrada','Sara Tazi','Anas Chraibi','Leila Saidi','Mehdi Lamrani','Khadija Fassi','Omar Tahiri','Fatima Zahra','Ali Bouzid'][i],
  program: ['Master Finance','Bachelor MD','Master RH','TS Comptable','Master IT','Master CI'][i%6],
  level: ['Bac+5','Bac+3','Bac+2'][i%3],
  status: ['active','active','warning','active'][i%4]
}));

export default function Students() {
  const [q, setQ] = useState('');
  const list = ROWS.filter(r => r.name.toLowerCase().includes(q.toLowerCase()) || r.id.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-semibold">Étudiants</h1>
          <p className="text-ink-soft">{list.length} étudiants enregistrés</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>Ajouter</Button>
      </div>

      <Card>
        <CardBody>
          <div className="relative max-w-sm mb-4">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)} className="pl-10" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-left text-xs uppercase tracking-wider text-ink-soft border-b border-slate-100">
                <tr>
                  <th className="py-3">ID</th>
                  <th className="py-3">Nom</th>
                  <th className="py-3">Programme</th>
                  <th className="py-3">Niveau</th>
                  <th className="py-3">Statut</th>
                  <th className="py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {list.map(r => (
                  <tr key={r.id} className="hover:bg-surface-muted transition">
                    <td className="py-3 font-mono text-xs">{r.id}</td>
                    <td className="py-3 font-medium">{r.name}</td>
                    <td className="py-3 text-ink-soft">{r.program}</td>
                    <td className="py-3"><Badge tone="slate">{r.level}</Badge></td>
                    <td className="py-3"><Badge tone={r.status==='warning'?'accent':'emerald'}>{r.status==='warning'?'À régulariser':'Actif'}</Badge></td>
                    <td className="py-3"><button className="p-1.5 hover:bg-white rounded-lg"><MoreHorizontal className="w-4 h-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
