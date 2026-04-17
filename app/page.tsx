'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { LogIn, User, ShieldCheck, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function LoginPage() {
  const [role, setRole] = useState<'customer' | 'seller'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (role === 'customer') {
      router.push('/customer');
    } else {
      router.push('/seller');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#f2f2f7]">
      {/* Background Orbs - Subtler for light theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white/40 shadow-sm mb-4"
          >
            <ShieldCheck size={14} className="text-[#007aff]" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#86868b]">Secure Verification</span>
          </motion.div>
          <motion.h1 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-display font-bold tracking-tight mb-2 text-[#1d1d1f]"
          >
            Verify<span className="text-[#007aff]">X</span>
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#86868b] text-sm font-medium"
          >
            Premium return management for modern brands.
          </motion.p>
        </div>

        <GlassCard className="p-8 border-white/60">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex p-1 bg-black/5 rounded-xl border border-black/5">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'customer' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <User size={14} />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'seller' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <ShieldCheck size={14} />
                Seller
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#86868b] ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/50 border border-black/5 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#007aff]/30 focus:ring-4 focus:ring-[#007aff]/5 transition-all placeholder:text-[#86868b]/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#86868b] ml-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/50 border border-black/5 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#007aff]/30 focus:ring-4 focus:ring-[#007aff]/5 transition-all placeholder:text-[#86868b]/50"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className="w-full bg-[#007aff] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group transition-all hover:bg-[#0071eb] shadow-lg shadow-blue-500/10"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                />
              ) : (
                <>
                  <span>Enter Dashboard</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </GlassCard>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-[9px] uppercase tracking-[0.3em] text-[#86868b] font-bold"
        >
          &copy; 2024 VerifyX Systems Inc.
        </motion.p>
      </motion.div>
    </main>
  );
}
