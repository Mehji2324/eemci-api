import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display text-3xl font-semibold">Paramètres</h1>
      <Card>
        <CardHeader><CardTitle>Profil de l'institution</CardTitle></CardHeader>
        <CardBody className="space-y-4">
          <Input label="Nom de l'institution" defaultValue="EEMCI" />
          <Input label="Email de contact" defaultValue="contact@eemci.ma" />
          <Input label="Téléphone" defaultValue="05354-00417" />
          <Input label="Adresse" defaultValue="Rue Accra Imm 14, Ville Nouvelle, Meknès" />
          <div className="flex justify-end pt-2"><Button>Enregistrer</Button></div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader><CardTitle>Préférences</CardTitle></CardHeader>
        <CardBody className="space-y-4">
          {['Notifications email','Notifications SMS','Mode sombre','Authentification 2FA'].map(p => (
            <label key={p} className="flex items-center justify-between py-2">
              <span>{p}</span>
              <input type="checkbox" className="w-11 h-6 rounded-full appearance-none bg-slate-200 checked:bg-primary-600 transition relative cursor-pointer" />
            </label>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
