'use client';

import { motion } from 'motion/react';
import { LayoutDashboard, Package, Users, Settings, LogOut, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/seller' },
    { label: 'Returns', icon: Package, href: '/seller', active: true },
    { label: 'Inventory', icon: Package, href: '#' },
    { label: 'Customers', icon: Users, href: '#' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f2f2f7] text-[#1d1d1f]">
      {/* Sidebar */}
      <nav className="w-[240px] bg-white/30 border-r border-white/40 p-8 flex flex-col gap-8 sticky top-0 h-screen">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <ShieldCheck className="text-[#007aff]" size={24} />
          <span>Verify<span className="text-[#007aff]">X</span></span>
        </div>
        
        <div className="flex flex-col gap-2">
          {navItems.map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                item.active 
                  ? 'bg-white/60 text-[#007aff] shadow-sm' 
                  : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-white/20'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-[#86868b] hover:text-[#1d1d1f] hover:bg-white/20 transition-all">
            <Settings size={18} />
            Settings
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-[#ff3b30] hover:bg-red-50 transition-all">
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
