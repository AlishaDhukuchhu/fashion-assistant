import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Navigation({ 
  title, 
  showBack = false, 
  rightAction, 
  centerContent,
  className = '' 
}) {
  const navigate = useNavigate();

  return (
    <header className={`setup-header glass ${className}`} style={{ padding: '0 var(--spacing-3)' }}>
      {showBack ? (
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
      ) : (
        <div style={{ width: 40 }} /> // Spacer for flex-between alignment
      )}

      {centerContent || (title && <h3 className="text-page-title m-0 text-center flex-1">{title}</h3>)}

      {rightAction ? (
        rightAction
      ) : (
        <div style={{ width: 40 }} /> // Spacer
      )}
    </header>
  );
}
