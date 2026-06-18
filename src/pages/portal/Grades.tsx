import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const G = [
  { c:'Finance d\'entreprise', cc:14.5, exam:16.5, avg:15.5 },
  { c:'Marketing digital',     cc:13.0, exam:14.0, avg:13.5 },
  { c:'Anglais',               cc:17.0, exam:17.5, avg:17.25 },
  { c:'Contrôle de gestion',   cc:12.0, exam:13.5, avg:12.75 }
];
const tone = (g:number) => g>=16?'emerald':g>=12?'primary':'rose';

export default function PortalGrades() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Mes notes</h1>
      <Card>
        <CardHeader><CardTitle>Semestre 3 — Moyenne 15.8/20</CardTitle></CardHeader>
        <CardBody>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-ink-soft border-b border-slate-100">
              <tr><th className="py-3">Matière</th><th>CC</th><th>Examen</th><th>Moyenne</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {G.map(g => (
                <tr key={g.c} className="hover:bg-surface-muted">
                  <td className="py-3 font-medium">{g.c}</td>
                  <td>{g.cc}</td><td>{g.exam}</td>
                  <td><Badge tone={tone(g.avg)}>{g.avg}/20</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
