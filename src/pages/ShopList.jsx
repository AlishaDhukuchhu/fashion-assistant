import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import FilterChip from '../components/FilterChip';
import { Search } from 'lucide-react';

const CATEGORIES = ['All', 'Minimalist', 'Streetwear', 'Luxury', 'Sustainable'];

const SHOPS = [
  {
    id: 's1',
    name: 'Aesthetic Atelier',
    category: 'Minimalist',
    followers: '24K',
    coverImg: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80',
    logoImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80',
    description: 'Curated minimalist basics for everyday wear.'
  },
  {
    id: 's2',
    name: 'Neon District',
    category: 'Streetwear',
    followers: '89K',
    coverImg: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80',
    logoImg: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100&q=80',
    description: 'Premium streetwear and exclusive drops.'
  },
  {
    id: 's3',
    name: 'Maison Luxe',
    category: 'Luxury',
    followers: '1.2M',
    coverImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
    logoImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    description: 'High-end designer fashion and accessories.'
  }
];

export default function ShopList() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredShops = SHOPS.filter(shop => 
    activeCategory === 'All' ? true : shop.category === activeCategory
  );

  return (
    <div className="page-wrapper">
      <Navigation title="Discover Shops" />
      
      <main className="main-content">
        {/* Search Bar */}
        <div className="search-bar mb-4" onClick={() => navigate('/search')}>
          <Search size={20} className="text-muted" />
          <input type="text" placeholder="Search brands and boutiques..." readOnly className="text-body" />
        </div>

        {/* Categories */}
        <div className="categories-scroll" style={{ margin: '0 calc(-1 * var(--spacing-3))', padding: '4px var(--spacing-3) var(--spacing-2) var(--spacing-3)' }}>
          {CATEGORIES.map((cat, i) => (
            <FilterChip 
              key={i} 
              label={cat} 
              isActive={activeCategory === cat} 
              onClick={() => setActiveCategory(cat)} 
            />
          ))}
        </div>

        {/* Shop Grid */}
        <div className="flex flex-col gap-4 mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredShops.map(shop => (
            <div key={shop.id} className="premium-card relative overflow-hidden" style={{ cursor: 'pointer' }}>
              {/* Cover Image */}
              <div style={{ width: '100%', height: '140px', background: 'var(--color-secondary)' }}>
                <img src={shop.coverImg} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              {/* Content */}
              <div className="p-4 relative">
                {/* Logo */}
                <div 
                  className="absolute" 
                  style={{ 
                    top: -24, 
                    left: 'var(--spacing-3)', 
                    width: 48, 
                    height: 48, 
                    borderRadius: 'var(--radius-full)', 
                    border: '2px solid var(--color-background)',
                    overflow: 'hidden',
                    background: 'var(--color-secondary)'
                  }}
                >
                  <img src={shop.logoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div className="mt-4 flex justify-between align-center">
                  <div>
                    <h4 className="text-card-title m-0">{shop.name}</h4>
                    <span className="text-caption">{shop.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-brand block">{shop.followers} Followers</span>
                    <button className="text-accent text-button mt-1" style={{ fontSize: '0.875rem' }}>Explore →</button>
                  </div>
                </div>
                
                <p className="text-body mt-2 m-0 text-muted">{shop.description}</p>
              </div>
            </div>
          ))}
          
          {filteredShops.length === 0 && (
            <div className="text-center py-8 text-muted">
              No shops found in this category.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
