import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search as SearchIcon, Heart, User, ShoppingBag } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const hideOnPaths = ['/ai-setup', '/ai-try-on', '/body-profile'];
  if (hideOnPaths.includes(location.pathname)) return null;

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: SearchIcon, label: 'Search' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' },
    { path: '/shops', icon: ShoppingBag, label: 'Shops' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="bottom-nav" style={{backgroundColor: 'var(--color-background)', borderTop: '1px solid var(--color-border)'}}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <button 
            key={tab.path}
            className={`nav-item ${isActive ? 'active' : ''}`} 
            onClick={() => navigate(tab.path)}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-caption" style={{ color: 'inherit' }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
