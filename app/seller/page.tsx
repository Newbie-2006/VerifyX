'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import TrustScore from '@/components/TrustScore';
import Chatbot from '@/components/Chatbot';
import Link from 'next/link';

const MOCK_RETURNS = [
  {
    id: 'RET-001',
    product: 'Nike Air Max 270',
    customer: 'Alex Johnson',
    reason: 'Wrong item received',
    status: 'Pending',
    trustScore: 38,
    image: 'https://picsum.photos/seed/nike/100/100',
    date: '2h ago'
  },
  {
    id: 'RET-002',
    product: 'Levi\'s 501 Original',
    customer: 'Sarah Miller',
    reason: 'Size issue',
    status: 'Reviewing',
    trustScore: 82,
    image: 'https://picsum.photos/seed/levis/100/100',
    date: '5h ago'
  },
  {
    id: 'RET-003',
    product: 'Zara Linen Shirt',
    customer: 'Michael Chen',
    reason: 'Defective',
    status: 'Pending',
    trustScore: 55,
    image: 'https://picsum.photos/seed/zara/100/100',
    date: '1d ago'
  }
];

import SellerLayout from '@/components/SellerLayout';

export default function SellerDashboard() {
  return (
    <SellerLayout>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#86868b] mb-1">Return Management / Overview</div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" size={16} />
            <input 
              type="text" 
              placeholder="Search returns..." 
              className="bg-white/50 border border-white/60 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#007aff]/30 w-[240px] shadow-sm"
            />
          </div>
          <button className="p-2 glass rounded-full hover:bg-white/80 transition-all">
            <Filter size={18} className="text-[#1d1d1f]" />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Returns', value: '1,284', icon: Package, trend: '+12%', color: 'blue' },
          { label: 'Replacements', value: '432', icon: TrendingUp, trend: '+5%', color: 'green' },
          { label: 'Pending Review', value: '28', icon: Clock, trend: '-2%', color: 'yellow' },
        ].map((stat, i) => (
          <GlassCard key={i} delay={i * 0.1} className="border-white/60">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-white/50 shadow-sm text-[#1d1d1f]">
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-500/10 text-[#34c759] flex items-center gap-1">
                <ArrowUpRight size={10} /> {stat.trend}
              </span>
            </div>
            <h3 className="text-[#86868b] text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Recent Returns List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1d1d1f]">Recent Return Requests</h2>
          <button className="text-[11px] font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors uppercase tracking-widest">View All</button>
        </div>

        <div className="space-y-3">
          {MOCK_RETURNS.map((ret, i) => (
            <Link key={ret.id} href={`/seller/return/${ret.id}`}>
              <GlassCard 
                delay={0.3 + i * 0.1} 
                className="flex items-center gap-6 p-4 border-white/60 hover:border-[#007aff]/20 transition-all cursor-pointer group mb-3"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/50 flex-shrink-0 relative shadow-sm">
                  <Image 
                    src={ret.image} 
                    alt={ret.product} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-bold text-[#007aff] bg-[#007aff]/10 px-2 py-0.5 rounded-full">{ret.id}</span>
                    <span className="text-[9px] font-bold text-[#86868b] uppercase tracking-tighter">{ret.date}</span>
                  </div>
                  <h4 className="font-bold text-[#1d1d1f] truncate">{ret.product}</h4>
                  <p className="text-[11px] text-[#86868b] font-medium">{ret.customer} • {ret.reason}</p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-1">
                  <span className={`text-[9px] font-bold px-3 py-1 rounded-full border ${
                    ret.status === 'Pending' ? 'border-[#ffcc00]/30 text-[#ffcc00] bg-[#ffcc00]/5' : 'border-[#007aff]/30 text-[#007aff] bg-[#007aff]/5'
                  }`}>
                    {ret.status}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  <TrustScore score={ret.trustScore} size={50} strokeWidth={4} showLabel={false} />
                </div>

                <ChevronRight className="text-[#86868b] group-hover:text-[#1d1d1f] group-hover:translate-x-1 transition-all" size={18} />
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <Chatbot role="seller" />
    </SellerLayout>
  );
}
