import { ReactNode } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from '@/components/LogoutButton';
import { UserCircle } from 'lucide-react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col h-screen sticky top-0">
        <div className="font-bold text-2xl text-slate-900 mb-8">Smart QR Studio</div>
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/dashboard" className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md font-medium">My QR Codes</Link>
          <Link href="/dashboard/create" className="px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md font-medium">Create QR Code</Link>
        </nav>
        
        {user && (
          <div className="mt-auto pt-4 border-t border-slate-200 flex flex-col gap-2">
            <div className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 truncate">
              <UserCircle className="w-5 h-5 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <LogoutButton />
          </div>
        )}
      </aside>
      <main className="flex-1 p-6 md:p-12 overflow-auto">
        {children}
      </main>
    </div>
  );
}
