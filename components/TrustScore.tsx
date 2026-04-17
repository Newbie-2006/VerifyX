'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface TrustScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export default function TrustScore({ score, size = 120, strokeWidth = 8, showLabel = true }: TrustScoreProps) {
  const [count, setCount] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (count / 100) * circumference;

  useEffect(() => {
    const duration = 1500;
    const start = 0;
    const end = score;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      setCount(Math.floor(easeProgress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  const getColor = (s: number) => {
    if (s < 40) return '#ff3b30'; // risk-high
    if (s < 70) return '#ffcc00'; // risk-med
    return '#34c759'; // risk-low
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(0,0,0,0.05)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-display font-bold text-[#1d1d1f]">{count}</span>
          <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Score</span>
        </div>
      </div>
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ 
            color: getColor(score),
            backgroundColor: `${getColor(score)}15`
          }}
        >
          {score < 40 ? 'High Risk' : score < 70 ? 'Medium Risk' : 'Low Risk'}
        </motion.div>
      )}
    </div>
  );
}
