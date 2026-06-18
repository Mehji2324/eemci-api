import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, CalendarCheck,
  Award, CreditCard, BarChart3, Settings, LogOut, Menu, X, Bell, Search
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/cn';

const NAV = [
  { to:'/admin', label:'Tableau de bord', icon:LayoutDashboard, end:true },
  { to:'/admin/students', label:'Étudiants', icon:Users },
  { to:'/admin/teachers', label:'Enseignants', icon:GraduationCap },
  { to:'/admin/courses', label:'Cours', icon:BookOpen },
  { to:'/admin/attendance', label:'Présences', icon:CalendarCheck },
  { to:'/admin/grades', label:'Notes', icon:Award },
  { to:'/admin/payments', label:'Paiements', icon:CreditCard },
  { to:'/admin/reports', label:'Rapports', icon:BarChart3 },
  { to:'/admin/settings', label:'Paramètres', icon:Settings }
];

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const user = auth.user();

  return (
    <div className="min-h-screen bg-surface-muted">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200/70 transition-transform lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <Logo />
          <button onClick={()=>setOpen(false)} className="lg:hidden p-2"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-4 space-y-1">
          {NAV.map(({to,label,icon:Icon,end}) => (
            <NavLink key={to} to={to} end={end} onClick={()=>setOpen(false)}
              className={({isActive})=>cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition',
                isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-soft hover:bg-surface-subtle hover:text-ink')}>
              <Icon className="w-4 h-4" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-4 rounded-2xl bg-surface-muted border border-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white font-medium">
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-ink-soft truncate">{user?.email}</p>
              </div>
              <button onClick={()=>{auth.logout(); nav('/login');}} className="p-2 hover:bg-white rounded-lg" title="Déconnexion">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200/70 sticky top-0 z-30">
          <div className="h-full px-4 lg:px-8 flex items-center gap-4">
            <button onClick={()=>setOpen(true)} className="lg:hidden p-2"><Menu className="w-5 h-5" /></button>
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Rechercher étudiant, cours..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-muted border border-transparent focus:bg-white focus:border-slate-200 outline-none text-sm" />
            </div>
            <button className="relative p-2 hover:bg-surface-muted rounded-lg" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-500" />
            </button>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
