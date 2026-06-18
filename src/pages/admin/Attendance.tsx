import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const DATA = [
  { d:'Lun', present:92, absent:8 },{ d:'Mar', present:88, absent:12 },
  { d:'Mer', present:94, absent:6 },{ d:'Jeu', present:90, absent:10 },
  { d:'Ven', present:85, absent:15 }
];

export default function Attendance() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Présences</h1>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Assiduité hebdomadaire</CardTitle>
          <Badge tone="emerald">Moyenne : 89.8%</Badge>
        </CardHeader>
        <CardBody className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="d" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip />
              <Bar dataKey="present" stackId="a" fill="#10B981" radius={[0,0,0,0]} />
              <Bar dataKey="absent"  stackId="a" fill="#EF4444" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Présences récentes — Master Finance · M1</CardTitle></CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-ink-soft border-b border-slate-100">
                <tr><th className="py-3">Étudiant</th><th>Lun</th><th>Mar</th><th>Mer</th><th>Jeu</th><th>Ven</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {['Sofia Alami','Karim Naciri','Hicham Bennani','Imane El Idrissi','Yassine Berrada'].map(n => (
                  <tr key={n}><td className="py-3 font-medium">{n}</td>
                    {Array.from({length:5}).map((_,i)=>{
                      const p = Math.random() > 0.15;
                      return <td key={i}><span className={`inline-block w-3 h-3 rounded-full ${p?'bg-emerald-500':'bg-red-400'}`} /></td>;
                    })}
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
