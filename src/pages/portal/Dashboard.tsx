import { Card, CardBody } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import { Award, CalendarCheck, Wallet, Clock } from 'lucide-react';

export default function PortalDashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-8 bg-gradient-to-br from-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative">
          <p className="text-primary-100/80 text-sm">Semestre 3 · 2025-26</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mt-2">Bonjour Salma 👋</h1>
          <p className="text-primary-100/90 mt-2">Prochain cours : <strong>Marketing Digital</strong> · 10h00 · Salle B12</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <KpiCard label="Moyenne générale" value="15.8/20" icon={<Award className="w-4 h-4" />} tone="primary" />
        <KpiCard label="Assiduité" value="94%" icon={<CalendarCheck className="w-4 h-4" />} tone="emerald" />
        <KpiCard label="Solde" value="0 MAD" icon={<Wallet className="w-4 h-4" />} tone="emerald" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardBody>
            <h3 className="font-display text-xl font-semibold mb-4">Aujourd'hui</h3>
            <div className="space-y-3">
              {[
                { t:'10:00', c:'Marketing Digital', r:'Salle B12' },
                { t:'13:30', c:'Analyse financière', r:'Salle A05' },
                { t:'15:30', c:'Anglais des affaires', r:'Salle C03' }
              ].map((s,i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-muted transition">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 grid place-items-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{s.c}</p>
                    <p className="text-xs text-ink-soft">{s.t} · {s.r}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-display text-xl font-semibold mb-4">Dernières notes</h3>
            <div className="space-y-3">
              {[
                { c:'Finance d\'entreprise', g:16.5 },
                { c:'Marketing digital', g:14.0 },
                { c:'Anglais', g:17.0 }
              ].map((g,i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span>{g.c}</span>
                  <Badge tone={g.g>=16?'emerald':g.g>=12?'primary':'red'}>{g.g}/20</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
