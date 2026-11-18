import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AICard({ 
  title, 
  subtitle, 
  onClick, 
  className = '', 
  children,
  iconSize = 24
}) {
  return (
    <motion.div 
      className={`premium-card ai-banner ${className}`}
      onClick={onClick}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: 'linear-gradient(135deg, #F3E8FF, #FCE7F3)', // Light theme
        padding: 'var(--spacing-3)',
        borderRadius: 'var(--radius-xl)',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0 8px 24px rgba(124, 58, 237, 0.15)', // Subtle purple glow
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative gradient overlay */}
      <div 
        style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      
      <div className="flex align-center gap-2 mb-2">
        <Sparkles size={iconSize} className="text-accent" />
        <h4 className="text-section-title m-0">{title}</h4>
      </div>
      
      {subtitle && <p className="text-body text-muted m-0">{subtitle}</p>}
      
      {children && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </motion.div>
  );
}
