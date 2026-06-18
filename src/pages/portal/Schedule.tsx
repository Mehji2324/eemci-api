import { Card, CardBody } from '@/components/ui/Card';

const DAYS = ['Lun','Mar','Mer','Jeu','Ven'];
const HOURS = ['08:00','10:00','13:30','15:30'];
const SLOTS: Record<string,{c:string;color:string}|null> = {
  'Lun-10:00':{ c:'Marketing', color:'primary' },
  'Lun-13:30':{ c:'Finance', color:'accent' },
  'Mar-08:00':{ c:'Anglais', color:'emerald' },
  'Mar-15:30':{ c:'Contrôle', color:'primary' },
  'Mer-10:00':{ c:'Marketing', color:'primary' },
  'Jeu-13:30':{ c:'Finance', color:'accent' },
  'Ven-08:00':{ c:'Anglais', color:'emerald' }
};
const colorMap:Record<string,string> = {
  primary:'bg-primary-50 text-primary-700 border-primary-200',
  accent:'bg-accent-50 text-accent-700 border-accent-300',
  emerald:'bg-emerald-50 text-emerald-700 border-emerald-200'
};

export default function PortalSchedule() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Mon planning</h1>
      <Card><CardBody>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="p-2 text-xs text-ink-soft text-left"></th>
                {DAYS.map(d => <th key={d} className="p-2 text-xs text-ink-soft text-left">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {HOURS.map(h => (
                <tr key={h} className="border-t border-slate-100">
                  <td className="p-2 text-xs text-ink-soft font-medium">{h}</td>
                  {DAYS.map(d => {
                    const slot = SLOTS[`${d}-${h}`];
                    return <td key={d} className="p-1.5">
                      {slot
                        ? <div className={`p-2.5 rounded-lg border text-xs font-medium ${colorMap[slot.color]}`}>{slot.c}</div>
                        : <div className="h-10" />
                      }
                    </td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody></Card>
    </div>
  );
}
