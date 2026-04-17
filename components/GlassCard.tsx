'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={hover ? { scale: 1.01, translateY: -2 } : undefined}
      className={cn(
        "glass rounded-[20px] p-6 transition-all duration-300",
        hover && "hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
