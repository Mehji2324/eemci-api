import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { KpiCard } from '@/components/ui/KpiCard';
import { CreditCard, Clock, CheckCircle2 } from 'lucide-react';

const PAY = [
  { student:'Sofia Alami',   amt:12000, status:'paid' },
  { student:'Karim Naciri',  amt:8500,  status:'pending' },
  { student:'Hicham Bennani',amt:18000, status:'paid' },
  { student:'Imane El Idrissi', amt:6200, status:'overdue' },
  { student:'Yassine Berrada', amt:9000, status:'paid' }
];

export default function Payments() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Paiements</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <KpiCard label="Encaissé ce mois" value="3.1M MAD" trend={8} icon={<CheckCircle2 className="w-4 h-4" />} tone="emerald" />
        <KpiCard label="En attente" value="450K MAD" icon={<Clock className="w-4 h-4" />} tone="accent" />
        <KpiCard label="En retard" value="120K MAD" trend={-3} icon={<CreditCard className="w-4 h-4" />} tone="red" />
      </div>
      <Card>
        <CardHeader><CardTitle>Transactions récentes</CardTitle></CardHeader>
        <CardBody>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-ink-soft border-b border-slate-100">
              <tr><th className="py-3">Étudiant</th><th>Montant</th><th>Statut</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAY.map(p => (
                <tr key={p.student} className="hover:bg-surface-muted">
                  <td className="py-3 font-medium">{p.student}</td>
                  <td className="font-display font-semibold">{p.amt.toLocaleString('fr-FR')} MAD</td>
                  <td><Badge tone={p.status==='paid'?'emerald':p.status==='pending'?'accent':'red'}>
                    {p.status==='paid'?'Payé':p.status==='pending'?'En attente':'En retard'}
                  </Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
