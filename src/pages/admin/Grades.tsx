import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const GRADES = [
  { student:'Sofia Alami',   course:'Finance d\'entreprise', grade:16.5 },
  { student:'Karim Naciri',  course:'Marketing digital',     grade:14.0 },
  { student:'Hicham Bennani',course:'Cybersécurité',         grade:18.0 },
  { student:'Imane El Idrissi', course:'Stratégie RH',       grade:15.5 },
  { student:'Yassine Berrada', course:'Logistique globale',  grade:12.5 }
];
const tone = (g:number) => g>=16 ? 'emerald' : g>=12 ? 'primary' : 'rose';

export default function Grades() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Notes</h1>
      <Card>
        <CardHeader><CardTitle>Dernières notes saisies</CardTitle></CardHeader>
        <CardBody>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-ink-soft border-b border-slate-100">
              <tr><th className="py-3">Étudiant</th><th>Matière</th><th>Note /20</th><th>Mention</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {GRADES.map(g => (
                <tr key={g.student} className="hover:bg-surface-muted">
                  <td className="py-3 font-medium">{g.student}</td>
                  <td className="text-ink-soft">{g.course}</td>
                  <td className="font-display font-semibold">{g.grade}</td>
                  <td><Badge tone={tone(g.grade)}>
                    {g.grade>=16?'Très bien':g.grade>=14?'Bien':g.grade>=12?'Assez bien':'Insuffisant'}
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
