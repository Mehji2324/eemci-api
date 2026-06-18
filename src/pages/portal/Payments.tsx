import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

const P = [
  { ref:'INV-2025-0142', label:'Tranche 1 - Sept 2025', amt:12000, status:'paid' },
  { ref:'INV-2025-0287', label:'Tranche 2 - Déc 2025',  amt:12000, status:'paid' },
  { ref:'INV-2026-0011', label:'Tranche 3 - Mars 2026', amt:12000, status:'pending' }
];

export default function PortalPayments() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Paiements</h1>
      <Card>
        <CardHeader><CardTitle>Historique des paiements</CardTitle></CardHeader>
        <CardBody>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-ink-soft border-b border-slate-100">
              <tr><th className="py-3">Référence</th><th>Libellé</th><th>Montant</th><th>Statut</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {P.map(p => (
                <tr key={p.ref} className="hover:bg-surface-muted">
                  <td className="py-3 font-mono text-xs">{p.ref}</td>
                  <td>{p.label}</td>
                  <td className="font-display font-semibold">{p.amt.toLocaleString('fr-FR')} MAD</td>
                  <td><Badge tone={p.status==='paid'?'emerald':'accent'}>{p.status==='paid'?'Payé':'À régler'}</Badge></td>
                  <td>
                    {p.status==='paid'
                      ? <Button variant="ghost" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>Reçu</Button>
                      : <Button variant="accent" size="sm">Payer</Button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
