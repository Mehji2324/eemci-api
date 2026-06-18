import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, Users, FileStack, 
  LogOut, GraduationCap, Menu,
  UserCheck, BookOpenCheck, ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

const ADMIN_MENU = [
  { label: 'Vue d\'ensemble', icon: BarChart3, path: '/admin' },
  { label: 'Candidatures', icon: FileStack, path: '/admin/admissions' },
  { label: 'Étudiants', icon: Users, path: '/admin/students' },
  { label: 'Programmes', icon: BookOpenCheck, path: '/admin/programs' },
  { label: 'Équipe', icon: ShieldCheck, path: '/admin/team' },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-200 transition-transform duration-300 transform lg:relative lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-neutral-100">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-primary-900 leading-none">EEMCI</span>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Console Admin</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-6 space-y-1">
            {ADMIN_MENU.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                  location.pathname === item.path 
                    ? "bg-primary-900 text-white shadow-lg shadow-primary-900/10" 
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-primary-900"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-neutral-100">
            <button className="w-full flex items-center gap-4 px-4 py-3 text-neutral-500 hover:bg-danger-50 hover:text-danger-500 rounded-xl transition-all font-bold text-sm">
              <LogOut size={20} />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8 shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-neutral-500">
            <Menu size={24} />
          </button>
          
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            {/* Search bar placeholder */}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold text-primary-900">Admin Central</div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Super Administrateur</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center border-2 border-neutral-200">
              <UserCheck size={20} className="text-primary-500" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
