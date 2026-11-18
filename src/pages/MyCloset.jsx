import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Plus, Share2, Trash2, Columns, LayoutGrid, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import FilterChip from '../components/FilterChip';
import ProductCard from '../components/ProductCard';

const TABS = ['All', 'AI Try-Ons', 'Wishlist', 'Summer Collection'];

const initialSavedItems = [
  { id: 1, type: 'try-on', name: 'Satin Midi Dress', brand: 'Zara', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80', originalImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80', score: '96%' },
  { id: 2, type: 'wishlist', name: 'Classic Trench', brand: 'Burberry', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80', originalImg: null, score: null },
  { id: 3, type: 'try-on', name: 'Oversized Blazer', brand: 'COS', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&q=80', originalImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80', score: '92%' },
];

export default function MyCloset() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [items, setItems] = useState(initialSavedItems);
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = items.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'AI Try-Ons') return item.type === 'try-on';
    if (activeTab === 'Wishlist') return item.type === 'wishlist';
    return false;
  });

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
    setActiveItem(null);
  };

  return (
    <div className="closet-page pb-32">
      <Navigation 
        title="My Closet" 
        rightAction={<button className="icon-btn" style={{ marginRight: -8 }}><Plus size={20}/></button>} 
      />

      <div className="setup-content mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="categories-scroll" style={{ margin: '0 calc(-1 * var(--spacing-3))', padding: '4px var(--spacing-3) 8px var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
          {TABS.map(tab => (
            <FilterChip 
              key={tab} 
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {items.length === 0 ? (
          <div className="empty-state text-center mt-8">
            <div className="illustration-wrapper mx-auto">
              <Heart size={48} className="text-muted" />
            </div>
            <h3 className="font-semibold mt-4">Your closet is empty</h3>
            <p className="text-muted text-sm mt-2 mb-6">Save items you love or try them on with AI to build your digital wardrobe.</p>
            <button className="btn-primary-large" onClick={() => navigate('/search')}>Explore Fashion</button>
          </div>
        ) : (
          <div className="search-results-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-2)' }}>
            {filteredItems.map(item => (
              <div key={item.id} className="relative">
                <ProductCard 
                  id={item.id}
                  image={item.img}
                  brand={item.brand}
                  name={item.name}
                  aiScore={item.type === 'try-on' ? item.score : null}
                  imageHeight="240px"
                  onClick={() => setActiveItem(item)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div 
            className="bottom-sheet-overlay flex align-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            style={{ zIndex: 2000, padding: '20px' }}
          >
            <motion.div 
              className="premium-card p-4 w-100 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="icon-btn absolute right-1 top-1" style={{ zIndex: 10 }} onClick={() => setActiveItem(null)}>
                <X size={16} />
              </button>
              
              <div className="flex gap-4 mb-4">
                <div style={{ width: 80, height: 100, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <img src={activeItem.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="flex-1 pt-2">
                  <span className="brand text-xs">{activeItem.brand}</span>
                  <h4 className="m-0 text-sm">{activeItem.name}</h4>
                  {activeItem.type === 'try-on' && <span className="text-accent text-xs font-semibold block mt-1">AI Try-On</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button className="btn-secondary text-sm">
                  <Columns size={16} /> Compare
                </button>
                <button className="btn-secondary text-sm">
                  <Share2 size={16} /> Share
                </button>
                <button className="btn-secondary text-sm text-error" onClick={() => handleRemove(activeItem.id)}>
                  <Trash2 size={16} /> Remove
                </button>
                <button className="btn-secondary text-sm" onClick={() => navigate(`/product/${activeItem.id}`)}>
                  <LayoutGrid size={16} /> View Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
