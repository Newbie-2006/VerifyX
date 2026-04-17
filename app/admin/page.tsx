'use client';

import { motion } from 'motion/react';
import { 
  BarChart, 
  PieChart, 
  Users, 
  ShieldAlert, 
  TrendingDown, 
  TrendingUp,
  Globe,
  Zap,
  ArrowLeft
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-[#f2f2f7]">
      <Link href="/seller" className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[11px] font-bold uppercase tracking-widest">Back to Seller View</span>
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-2 text-[#007aff] mb-1">
          <Zap size={16} />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Platform Intelligence</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Global Insights</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Volume', value: '$2.4M', icon: Globe, color: '#007aff' },
          { label: 'Fraud Prevented', value: '$184K', icon: ShieldAlert, color: '#ff3b30' },
          { label: 'Active Sellers', value: '142', icon: Users, color: '#5856d6' },
          { label: 'Avg Trust Score', value: '74', icon: Zap, color: '#ffcc00' },
        ].map((stat, i) => (
          <GlassCard key={i} delay={i * 0.1} className="border-white/60">
            <div className="w-10 h-10 rounded-xl bg-white/50 shadow-sm flex items-center justify-center mb-4" style={{ color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <p className="text-[#86868b] text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tight text-[#1d1d1f]">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="h-[400px] flex flex-col border-white/60" hover={false}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#1d1d1f]">
            <BarChart size={20} className="text-[#007aff]" />
            Return Trends (30 Days)
          </h3>
          <div className="flex-1 flex items-end justify-between gap-2 px-4">
            {[40, 70, 45, 90, 65, 80, 50, 60, 85, 40, 55, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 1 }}
                className="flex-1 bg-[#007aff]/80 rounded-t-lg relative group shadow-sm"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass px-2 py-1 rounded-lg text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  {h}%
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[9px] uppercase tracking-widest text-[#86868b] font-bold">
            <span>Mar 16</span>
            <span>Apr 16</span>
          </div>
        </GlassCard>

        <GlassCard className="h-[400px] flex flex-col border-white/60" hover={false}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#1d1d1f]">
            <ShieldAlert size={20} className="text-[#ff3b30]" />
            Risk Distribution
          </h3>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-48 h-48 rounded-full border-[20px] border-black/5 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96" cy="96" r="76"
                  fill="transparent"
                  stroke="#ff3b30"
                  strokeWidth="20"
                  strokeDasharray="477"
                  strokeDashoffset="350"
                  strokeLinecap="round"
                />
                <circle
                  cx="96" cy="96" r="76"
                  fill="transparent"
                  stroke="#ffcc00"
                  strokeWidth="20"
                  strokeDasharray="477"
                  strokeDashoffset="400"
                  strokeLinecap="round"
                  className="opacity-60"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold tracking-tight text-[#1d1d1f]">24%</p>
                <p className="text-[9px] uppercase tracking-widest text-[#86868b] font-bold">High Risk</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
              <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffcc00]" />
              <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#34c759]" />
              <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Low</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
