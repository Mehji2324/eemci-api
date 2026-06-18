import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const COURSES = [
  { code:'FIN-501', title:'Finance d\'entreprise', teacher:'Dr. Alaoui', progress:65 },
  { code:'MKT-301', title:'Marketing digital',     teacher:'Pr. Berrada', progress:80 },
  { code:'ENG-201', title:'Anglais des affaires',  teacher:'Mrs. Smith', progress:45 },
  { code:'CTL-302', title:'Contrôle de gestion',   teacher:'M. Tahiri', progress:55 }
];

export default function PortalCourses() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Mes cours</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {COURSES.map(c => (
          <Card key={c.code}><CardBody>
            <div className="flex items-center justify-between">
              <Badge tone="primary">{c.code}</Badge>
              <span className="text-xs text-ink-soft">{c.progress}% complété</span>
            </div>
            <h3 className="font-display text-lg font-semibold mt-3">{c.title}</h3>
            <p className="text-sm text-ink-soft mt-1">{c.teacher}</p>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500" style={{width:`${c.progress}%`}} />
            </div>
          </CardBody></Card>
        ))}
      </div>
    </div>
  );
}
