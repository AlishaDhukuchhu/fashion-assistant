import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, Mic, X, ChevronRight, TrendingUp, Sparkles, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FilterChip from '../components/FilterChip';
import AICard from '../components/AICard';

const trendingTags = ['Summer Dresses', 'Minimalist Sneakers', 'Y2K Cargo Pants', 'Linen Shirts', 'Oversized Blazers', 'Vintage Denim'];
const recentSearches = ['Black Leather Jacket', 'Nike Air Force 1', 'Floral Maxi Dress'];

const searchResults = [
  { id: 1, name: 'Satin Midi Dress', brand: 'Zara', price: '$49.99', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80', isNew: true },
  { id: 2, name: 'Oversized Linen Shirt', brand: 'Mango', price: '$35.00', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80', isNew: false },
  { id: 3, name: 'Wide Leg Trousers', brand: 'COS', price: '$89.00', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&q=80', isNew: false },
  { id: 4, name: 'Classic Trench Coat', brand: 'Burberry', price: '$1200.00', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80', isNew: false }
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [priceRange, setPriceRange] = useState(500);
  const [selectedColor, setSelectedColor] = useState('black');

  const showResults = query.length > 0;

  return (
    <div className="search-page pb-32">
      <header className="setup-header glass">
        <div className="w-100 flex align-center gap-2 relative">
          <SearchIcon className="absolute left-1 ml-3 text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Ask AI: 'Summer outfits for hourglass'" 
            className="input-premium pl-10 pr-10 w-100"
            style={{ paddingLeft: '44px', paddingRight: '44px', height: '48px', borderRadius: 'var(--radius-full)', background: 'var(--color-secondary)' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
             <button className="absolute right-1 mr-2 icon-btn" style={{width: 32, height: 32}} onClick={() => setQuery('')}>
               <X size={16}/>
             </button>
          ) : (
             <button className="absolute right-1 mr-2 icon-btn" style={{width: 32, height: 32}}>
               <Mic size={16}/>
             </button>
          )}
        </div>
      </header>

      <div className="setup-content">
        {!showResults ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            {/* AI Suggestion Banner */}
            <div className="mb-6">
              <AICard 
                title="AI Stylist Tip"
                subtitle="Try searching for 'Boho chic festival wear' to match your saved body profile."
                iconSize={20}
              />
            </div>

            <div className="section mb-6">
              <h3 className="text-section-title mb-3 flex align-center gap-2"><TrendingUp size={18}/> Trending Now</h3>
              <div className="categories-scroll" style={{ margin: '0 calc(-1 * var(--spacing-3))', padding: '4px var(--spacing-3) 8px var(--spacing-3)' }}>
                {trendingTags.map(tag => (
                  <FilterChip key={tag} label={tag} isActive={false} onClick={() => setQuery(tag)} />
                ))}
              </div>
            </div>

            <div className="section">
              <div className="flex justify-between align-center mb-3">
                <h3 className="font-semibold text-muted text-sm">Recent Searches</h3>
                <button className="text-xs text-accent">Clear</button>
              </div>
              <ul className="list-none">
                {recentSearches.map(s => (
                  <li key={s} className="flex justify-between align-center py-2 border-b" onClick={() => setQuery(s)} style={{cursor: 'pointer', borderBottom: '1px solid var(--color-border)'}}>
                    <div className="flex align-center gap-3">
                      <SearchIcon size={16} className="text-muted" />
                      <span className="font-medium text-sm">{s}</span>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div className="flex justify-between align-center mb-4">
              <p className="text-sm text-muted">Found {searchResults.length} results for "<strong>{query}</strong>"</p>
              <button className="btn-secondary px-4 py-2 flex align-center gap-2" style={{height: 36}} onClick={() => setIsFilterOpen(true)}>
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>

            <div className="search-results-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-2)' }}>
              {searchResults.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard 
                    id={product.id}
                    image={product.img}
                    brand={product.brand}
                    name={product.name}
                    price={parseFloat(product.price.replace('$', ''))}
                    imageHeight="240px"
                    aiScore={product.isNew ? 'NEW' : null}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              className="bottom-sheet-overlay"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div 
              className="bottom-sheet"
              initial={{y: '100%'}}
              animate={{y: 0}}
              exit={{y: '100%'}}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="bottom-sheet-handle"></div>
              <div className="flex justify-between align-center mb-4">
                <h3 className="font-semibold text-lg m-0">Filters</h3>
                <button className="icon-btn" onClick={() => setIsFilterOpen(false)}><X size={20}/></button>
              </div>

              <div className="filter-section mb-6">
                <h4 className="font-medium mb-3">Price Range: Up to ${priceRange}</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="10" 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-100 accent-primary" 
                />
              </div>

              <div className="filter-section mb-6">
                <h4 className="font-medium mb-3">Color</h4>
                <div className="flex gap-3">
                  {['black', 'white', '#7C3AED', '#EF4444', '#F59E0B', '#22C55E'].map(color => (
                    <button 
                      key={color} 
                      className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                      style={{ 
                        backgroundColor: color, 
                        width: 40, height: 40, 
                        borderRadius: '50%', 
                        border: selectedColor === color ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        padding: 2,
                        backgroundClip: 'content-box'
                      }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="filter-section mb-8">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="pill-grid">
                  {['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'].map(cat => (
                    <button key={cat} className="pill bg-secondary text-sm">{cat}</button>
                  ))}
                </div>
              </div>

              <button className="btn-primary-large" onClick={() => setIsFilterOpen(false)}>Apply Filters</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
