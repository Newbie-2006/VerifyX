'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Package, ChevronRight, CheckCircle2, Image as ImageIcon, X } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import Chatbot from '@/components/Chatbot';

export default function CustomerReturnPage() {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageUpload = () => {
    const mockUrl = `https://picsum.photos/seed/${Date.now()}/400/400`;
    setImages(prev => [...prev, mockUrl]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-[#f2f2f7]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-[#34c759]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#34c759]/20">
            <CheckCircle2 size={40} className="text-[#34c759]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-2">Return Submitted!</h1>
          <p className="text-[#86868b] mb-8 max-w-xs mx-auto font-medium">Your request is being analyzed by our AI verification system. You&apos;ll receive an update shortly.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-[#007aff] text-white rounded-full font-bold hover:bg-[#0071eb] transition-all shadow-lg shadow-blue-500/10"
          >
            Back to Home
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f2f2f7] p-4 md:p-10 flex items-center justify-center">
      <div className="w-full max-w-[600px]">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white/40 shadow-sm mb-4">
            <Package size={14} className="text-[#007aff]" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#86868b]">Return Portal</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Submit Return Request</h1>
          <p className="text-[#86868b] text-sm font-medium mt-2">Step {step} of 3: {step === 1 ? 'Select Product' : step === 2 ? 'Reason & Evidence' : 'Review'}</p>
        </header>

        <GlassCard className="p-8 border-white/60">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Select an item from your recent order</h3>
              <div className="space-y-3">
                {['Nike Air Max', 'Levi\'s 501 Jeans', 'Zara Linen Shirt'].map((p, i) => (
                  <button
                    key={p}
                    onClick={() => setSelectedProduct(p)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      selectedProduct === p 
                        ? 'bg-[#007aff]/5 border-[#007aff]/30 shadow-sm' 
                        : 'bg-white/50 border-black/5 hover:border-black/10'
                    }`}
                  >
                    <div className="w-16 h-16 bg-black/5 rounded-xl flex items-center justify-center text-2xl">
                      {i === 0 ? '👟' : i === 1 ? '👖' : '👕'}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[#1d1d1f]">{p}</p>
                      <p className="text-xs text-[#86868b] font-medium">Order #8829 • Size: M</p>
                    </div>
                    {selectedProduct === p && (
                      <div className="ml-auto text-[#007aff]">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                disabled={!selectedProduct}
                onClick={() => setStep(2)}
                className="w-full bg-[#007aff] text-white font-bold py-4 rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-blue-500/10"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Reason for Return</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Wrong Size', 'Defective Item', 'Not as Described', 'Changed Mind'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setReason(r)}
                      className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        reason === r 
                          ? 'bg-[#007aff]/5 border-[#007aff]/30 text-[#007aff]' 
                          : 'bg-white/50 border-black/5 text-[#1d1d1f] hover:border-black/10'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Upload Evidence (Photos)</label>
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, i) => (
                    <div key={i} className="aspect-square bg-black/5 rounded-xl border border-black/5 flex items-center justify-center relative overflow-hidden group">
                      <Image src={img} alt="Evidence" fill className="object-cover" referrerPolicy="no-referrer" />
                      <button 
                        onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {images.length < 3 && (
                    <button 
                      onClick={handleImageUpload}
                      className="aspect-square bg-white/50 border border-dashed border-black/10 rounded-xl flex flex-col items-center justify-center gap-2 text-[#86868b] hover:bg-white/80 hover:border-[#007aff]/30 transition-all"
                    >
                      <ImageIcon size={20} />
                      <span className="text-[10px] font-bold uppercase">Add Photo</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-xl bg-black/5 text-[#1d1d1f] font-bold">Back</button>
                <button
                  disabled={!reason || images.length === 0}
                  onClick={() => setStep(3)}
                  className="flex-[2] bg-[#007aff] text-white font-bold py-4 rounded-xl disabled:opacity-50 shadow-lg shadow-blue-500/10"
                >
                  Review Request
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-[#34c759]/10 text-[#34c759] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f]">Ready to Submit</h3>
              <p className="text-sm text-[#86868b] font-medium leading-relaxed">
                Your return request for <strong className="text-[#1d1d1f]">{selectedProduct}</strong> will be reviewed by our team. You will receive an update within 24 hours.
              </p>
              
              <div className="bg-black/5 rounded-2xl p-4 text-left space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#86868b]">Reason</span>
                  <span className="text-[#1d1d1f]">{reason}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#86868b]">Evidence</span>
                  <span className="text-[#1d1d1f]">{images.length} Photos</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl bg-black/5 text-[#1d1d1f] font-bold">Edit</button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[2] bg-[#007aff] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
                </button>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>

      <Chatbot role="customer" />
    </main>
  );
}
