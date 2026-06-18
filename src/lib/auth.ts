export type Role = 'admin' | 'student' | 'faculty';
export interface User { id: string; name: string; email: string; role: Role; avatar?: string; }

const KEY = 'eemci_user';

export const auth = {
  login(email: string, password: string): User | null {
    // Demo accounts
    const demo: Record<string, User> = {
      'admin@eemci.ma':   { id:'u1', name:'Admin EEMCI',   email:'admin@eemci.ma',   role:'admin' },
      'student@eemci.ma': { id:'u2', name:'Salma Kabbaj',  email:'student@eemci.ma', role:'student' }
    };
    if (demo[email] && password === 'demo1234') {
      localStorage.setItem(KEY, JSON.stringify(demo[email]));
      return demo[email];
    }
    return null;
  },
  logout() { localStorage.removeItem(KEY); },
  user(): User | null { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } }
};
