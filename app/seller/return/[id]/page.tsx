'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldAlert, 
  History, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Maximize2,
  AlertCircle,
  User,
  Package,
  Calendar
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import TrustScore from '@/components/TrustScore';
import Chatbot from '@/components/Chatbot';
import Link from 'next/link';

import SellerLayout from '@/components/SellerLayout';

export default function ReturnDetailPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [decision, setDecision] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f2f7]">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 rounded-full border-2 border-[#007aff]/10 border-t-[#007aff] mb-8"
        />
        <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">Analyzing return authenticity...</h2>
        <p className="text-[#86868b] text-xs mt-2 font-medium">Checking customer history and image metadata</p>
      </div>
    );
  }

  return (
    <SellerLayout>
      <Link href="/seller" className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors mb-8 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[11px] font-bold uppercase tracking-widest">Return Management / ID: VX-8892</span>
      </Link>

      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Review Request</h1>
        <div className="px-3 py-1 rounded-full bg-[#ff3b30]15 text-[#ff3b30] text-[11px] font-bold uppercase tracking-widest">High Alert</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT PANEL: EVIDENCE */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="border-white/60 evidence-panel flex flex-col gap-6" hover={false}>
            <div className="flex gap-6 pb-6 border-b border-black/5">
              <div className="w-24 h-24 bg-black/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner">👟</div>
              <div>
                <h3 className="text-lg font-bold text-[#1d1d1f]">Nike Air Max Pulse</h3>
                <p className="text-xs text-[#86868b] font-medium mt-1">Order ID: #ORD-99021 • SKU: NK-AM-01</p>
                <p className="mt-3 text-xs font-bold">Reason: <span className="text-[#ff3b30]">Wrong item received</span></p>
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest mb-4">Customer Uploaded Evidence</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] bg-black/5 rounded-2xl overflow-hidden relative group">
                  <Image 
                    src="https://picsum.photos/seed/nike-front/800/600" 
                    alt="Front View" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/50 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest backdrop-blur-md">FRONT_VIEW.JPG</span>
                </div>
                <div className="aspect-[4/3] bg-black/5 rounded-2xl overflow-hidden relative group">
                  <Image 
                    src="https://picsum.photos/seed/nike-back/800/600" 
                    alt="Back View" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/50 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest backdrop-blur-md">BACK_VIEW.JPG</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-black/5">
              <p className="text-sm leading-relaxed text-[#1d1d1f]">
                <strong className="font-bold">Seller Note:</strong> AI Analysis detected a visual mismatch between the original SKU and the image provided. Box pattern does not match 2023 release profile.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* RIGHT PANEL: INTELLIGENCE ZONE */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="border-white/60 flex flex-col gap-8" hover={false}>
            <div className="text-center">
              <TrustScore score={38} size={140} strokeWidth={10} />
              <div className="mt-4 px-3 py-1 inline-block rounded-full bg-[#ff3b30]15 text-[#ff3b30] text-[11px] font-bold uppercase tracking-widest">High Fraud Risk</div>
            </div>

            <div className="bg-black/5 rounded-2xl p-4 space-y-3">
              {[
                { label: '8 returns in last 10 days', icon: AlertCircle },
                { label: 'Frequent device switching', icon: ShieldAlert },
                { label: 'Return ratio: 82%', icon: AlertCircle },
              ].map((flag, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-medium text-[#1d1d1f]">
                  <flag.icon size={16} className="text-[#ff3b30]" />
                  <span>{flag.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Customer Insight</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#86868b]">Total Orders</span>
                  <span className="text-[#1d1d1f]">12</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#86868b]">Account Age</span>
                  <span className="text-[#1d1d1f]">14 Days</span>
                </div>
              </div>
              <div className="p-3 bg-[#ff3b30]05 text-[#ff3b30] text-xs font-bold rounded-xl border border-[#ff3b30]10">
                Suspicious activity detected: Rapid return cycling.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button
                onClick={() => setDecision('approved')}
                className="py-3.5 rounded-2xl bg-[#34c759] text-white text-sm font-bold shadow-lg shadow-green-500/10 hover:bg-[#2eb04f] transition-all"
              >
                Approve
              </button>
              <button
                onClick={() => setDecision('rejected')}
                className="py-3.5 rounded-2xl bg-[#ff3b30] text-white text-sm font-bold shadow-lg shadow-red-500/10 hover:bg-[#e6352b] transition-all"
              >
                Reject Request
              </button>
              <button className="col-span-2 py-3.5 rounded-2xl bg-black/5 text-[#1d1d1f] text-sm font-bold hover:bg-black/10 transition-all">
                Request Video Proof
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Decision Feedback */}
      <AnimatePresence>
        {decision && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full glass border-${decision === 'approved' ? '[#34c759]' : '[#ff3b30]'}/50 flex items-center gap-3 z-50`}
          >
            {decision === 'approved' ? (
              <CheckCircle2 className="text-[#34c759]" />
            ) : (
              <XCircle className="text-[#ff3b30]" />
            )}
            <span className="font-bold text-[#1d1d1f]">
              Return {decision === 'approved' ? 'Approved' : 'Rejected due to High Risk'}
            </span>
            <button onClick={() => setDecision(null)} className="ml-4 opacity-50 hover:opacity-100 text-[#1d1d1f]">
              <XCircle size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Chatbot role="seller" />
    </SellerLayout>
  );
}
