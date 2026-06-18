import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Award, Calendar, CreditCard, LogOut } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/cn';

const NAV = [
  { to:'/portal', label:'Accueil', icon:LayoutDashboard, end:true },
  { to:'/portal/courses', label:'Cours', icon:BookOpen },
  { to:'/portal/schedule', label:'Planning', icon:Calendar },
  { to:'/portal/grades', label:'Notes', icon:Award },
  { to:'/portal/payments', label:'Paiements', icon:CreditCard }
];

export default function PortalLayout() {
  const nav = useNavigate();
  const user = auth.user();
  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-white border-b border-slate-200/70 sticky top-0 z-30">
        <div className="container h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({to,label,icon:Icon,end}) => (
              <NavLink key={to} to={to} end={end}
                className={({isActive})=>cn('flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium',
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-soft hover:bg-surface-subtle')}>
                <Icon className="w-4 h-4" />{label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-ink-soft">Étudiant</p>
            </div>
            <button onClick={()=>{auth.logout(); nav('/login');}} className="p-2 hover:bg-surface-muted rounded-lg">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <nav className="md:hidden container pb-3 flex gap-1 overflow-x-auto">
          {NAV.map(({to,label,icon:Icon,end}) => (
            <NavLink key={to} to={to} end={end}
              className={({isActive})=>cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap',
                isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-soft')}>
              <Icon className="w-3.5 h-3.5" />{label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  );
}
