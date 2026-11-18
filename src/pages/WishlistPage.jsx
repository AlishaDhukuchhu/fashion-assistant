import { useState } from 'react';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FilterChip from '../components/FilterChip';

export default function WishlistPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Shoes');

  const filters = ['All', 'Shoes', 'Clothes', 'Electronics'];

  const wishlistProducts = [
    { id: 1, name: 'Nike Pegasus 39', price: 90.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { id: 2, name: 'Nike Pegasus F...', price: 120.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80' },
    { id: 3, name: 'Nike Pegasus 4...', price: 110.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80' },
    { id: 4, name: 'Nike Pegasus 3...', price: 85.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&q=80' },
    { id: 5, name: 'Nike Pegasus 5', price: 95.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80' },
    { id: 6, name: 'Nike Zoom', price: 130.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&q=80' },
  ];

  return (
    <div className="pb-32 bg-background min-h-screen">
      <header className="py-4 flex align-center px-4">
        <button onClick={() => navigate(-1)} className="icon-btn" style={{border: '1px solid var(--color-border)', background: 'transparent'}}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold m-0 flex-1 text-center pr-10">My Wishlist</h1>
      </header>

      <div className="px-4 mb-6 mt-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {filters.map(filter => (
          <FilterChip 
            key={filter} 
            label={filter} 
            isActive={activeFilter === filter} 
            onClick={() => setActiveFilter(filter)}
          />
        ))}
      </div>

      <main className="px-4">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {wishlistProducts.map(p => (
            <div key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                style={{ 
                  background: 'var(--color-secondary)', 
                  borderRadius: 'var(--radius-lg)', 
                  height: '160px', 
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px'
                }}
              >
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                
                <button 
                  className="icon-btn absolute" 
                  style={{ top: 8, right: 8, width: 28, height: 28, background: 'white', zIndex: 10, border: 'none', boxShadow: 'var(--shadow-sm)' }}
                >
                  <Heart size={14} fill="var(--color-error)" stroke="var(--color-error)" />
                </button>
              </div>
              
              <div className="mt-3 flex flex-col">
                <div className="flex justify-between align-start">
                  <h4 className="text-sm font-medium m-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>{p.name}</h4>
                  <div className="flex align-center gap-1 pt-1">
                    <Star size={12} fill="var(--color-warning)" stroke="var(--color-warning)" />
                    <span className="text-xs text-muted font-medium">{p.rating}</span>
                  </div>
                </div>
                <span className="font-semibold mt-1">${p.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
