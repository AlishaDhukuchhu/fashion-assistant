import React from 'react';

export default function FilterChip({ label, isActive, onClick, className = '' }) {
  return (
    <button 
      className={`category-pill ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
      style={{
        background: isActive ? 'var(--color-primary)' : 'var(--color-secondary)',
        color: isActive ? 'var(--color-background)' : 'var(--color-text-main)',
        padding: '12px 24px', // 8-point system (1.5x / 3x)
        borderRadius: 'var(--radius-full)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        border: 'none',
        transition: 'all 0.2s ease',
        boxShadow: isActive ? 'var(--shadow-md)' : 'none',
      }}
    >
      <span className="text-button" style={{ fontSize: '0.875rem' }}>{label}</span>
    </button>
  );
}
