import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Search, Plus, MoreHorizontal, X } from 'lucide-react';
import { api } from '@/lib/api';

export default function Students() {
  const [q, setQ] = useState('');
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    password: 'TempPass123!', 
    password_confirmation: 'TempPass123!', 
    phone: '', 
    date_of_birth: '', 
    place_of_birth: '', 
    gender: 'M', 
    nationality: '', 
    address: 'Non renseigné', 
    guardian_name: null as string | null, 
    guardian_phone: null as string | null
  });
  const [error, setError] = useState('');
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState<{email: string, password: string} | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/students');
      setList(res.data.data ?? res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = list.filter(s => {
    const name = (s.user?.first_name + ' ' + s.user?.last_name).toLowerCase();
    const mat = String(s.matricule ?? s.id ?? '').toLowerCase();
    return name.includes(q.toLowerCase()) || mat.includes(q.toLowerCase());
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const submitData = {
        ...formData,
        password: 'TempPass123!',
        password_confirmation: 'TempPass123!',
        address: formData.address || 'Non renseigné',
        guardian_name: formData.guardian_name || null,
        guardian_phone: formData.guardian_phone || null,
      };
      const registerRes = await api.post('/auth/register', submitData);
      const studentId = registerRes.data?.user?.id;
      
      if (studentId) {
        // Find the student record by user_id and validate
        const studentsRes = await api.get('/students');
        const students = studentsRes.data.data ?? studentsRes.data;
        const student = students.find((s: any) => s.user_id === studentId || s.user?.id === studentId);
        
        if (student) {
          const validateRes = await api.post(`/admin/students/${student.id}/validate`, {});
          const creds = validateRes.data?.credentials;
          if (creds) {
            setCredentials({ email: creds.email, password: creds.password });
          }
        }
      }
      
      setIsModalOpen(false);
      setFormData({ 
        first_name: '', last_name: '', email: '', 
        password: 'TempPass123!', 
        password_confirmation: 'TempPass123!', 
        phone: '', date_of_birth: '', 
        place_of_birth: '', gender: 'M', nationality: '', 
        address: 'Non renseigné', 
        guardian_name: null, 
        guardian_phone: null 
      });
      fetchStudents();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Étudiants"
        description={`${filtered.length} étudiants enregistrés dans le système académique.`}
        actions={<Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>Ajouter</Button>}
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)} className="pl-10" />
          </div>
          <DataTable
            data={filtered}
            rowKey={(r) => r.id}
            columns={[
              { key: 'matricule', header: 'ID', cell: (r) => <span className="font-mono text-xs text-ink-soft">{r.id}</span> },
              { key: 'name', header: 'Nom', cell: (r) => <span className="font-medium text-ink">{r.user?.first_name + ' ' + r.user?.last_name}</span> },
              { key: 'program', header: 'Programme', cell: (r) => <span className="text-ink-soft">{r.filiere?.name ?? '—'}</span> },
              { key: 'level', header: 'Niveau', cell: (r) => <Badge tone="slate">{r.classe?.level ?? '—'}</Badge> },
              { key: 'status', header: 'Statut', cell: (r) => <Badge tone={r.status==='active'?'emerald':'accent'}>{r.status}</Badge> },
              { key: 'actions', header: <span className="sr-only">Actions</span>, headerClassName: 'w-10', cell: (s: any) => (
                <div className="relative">
                  <button
                    className="rounded-lg p-1.5 text-ink-soft transition hover:bg-white hover:text-ink"
                    aria-label="Actions étudiant"
                    onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === s.id ? null : s.id); }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {openMenu === s.id && (
                    <div className="absolute right-0 z-50 mt-1 w-40 rounded-lg border border-slate-200 bg-white shadow-lg">
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-slate-50"
                        onClick={async () => {
                          try {
                            await api.post(`/admin/students/${s.id}/validate`, {});
                            setOpenMenu(null);
                            fetchStudents();
                          } catch(e: any) {
                            alert(e.response?.data?.message || 'Erreur validation');
                          }
                        }}
                      >
                        ✓ Valider
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                        onClick={async () => {
                          const reason = prompt('Raison du rejet:');
                          if (!reason) return;
                          try {
                            await api.post(`/admin/students/${s.id}/reject`, { reason });
                            setOpenMenu(null);
                            fetchStudents();
                          } catch(e: any) {
                            alert(e.response?.data?.message || 'Erreur rejet');
                          }
                        }}
                      >
                        ✗ Rejeter
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                        onClick={async () => {
                          if (!confirm('Supprimer cet étudiant?')) return;
                          try {
                            await api.delete(`/students/${s.id}`);
                            setOpenMenu(null);
                            fetchStudents();
                          } catch(e: any) {
                            alert(e.response?.data?.message || 'Erreur suppression');
                          }
                        }}
                      >
                        🗑 Supprimer
                      </button>
                    </div>
                  )}
                </div>
              ) },
            ]}
          />
        </CardBody>
      </Card>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Ajouter un étudiant</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Prénom" required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} />
                  <Input label="Nom" required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} />
                </div>
                <Input label="Email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <Input label="Téléphone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <Input label="Date de naissance" type="date" required value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} />
                <Input label="Lieu de naissance" value={formData.place_of_birth} onChange={e => setFormData({...formData, place_of_birth: e.target.value})} />
                <div>
                  <label className="block text-sm font-medium mb-1">Genre</label>
                  <select className="w-full rounded-lg border border-slate-300 p-2" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                  </select>
                </div>
                <Input label="Nationalité" value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
                <Button type="submit" className="w-full">Enregistrer</Button>
              </form>
            </CardBody>
          </Card>
        </div>
      )}

      {credentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Étudiant ajouté avec succès</h2>
                <p className="text-sm text-slate-500">Les identifiants ont été générés automatiquement</p>
              </div>
            </div>
            <div className="space-y-3 rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Email académique</p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">{credentials.email}</p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Mot de passe temporaire</p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">{credentials.password}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">L'étudiant devra changer son mot de passe lors de la première connexion.</p>
            <button
              onClick={() => setCredentials(null)}
              className="mt-6 w-full rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-800"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {credentialsView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Informations de connexion</h2>
              <p className="text-sm text-slate-500">{credentialsView.name}</p>
            </div>
            <div className="space-y-3 rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Matricule</p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">{credentialsView.matricule}</p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Email académique</p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">{credentialsView.email}</p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Mot de passe</p>
                <p className="mt-1 text-sm text-slate-500 italic">Réinitialisable par l'administrateur</p>
              </div>
            </div>
            <button
              onClick={() => setCredentialsView(null)}
              className="mt-6 w-full rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-800"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
