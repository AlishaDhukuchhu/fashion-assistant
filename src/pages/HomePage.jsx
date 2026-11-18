import { Search, Sparkles, MapPin, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterChip from '../components/FilterChip';
import AICard from '../components/AICard';

const categories = ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'];
const products = [
  { id: 1, name: 'Minimalist Overcoat', brand: 'ZARA', price: 129, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80', tag: 'AI Recommend' },
  { id: 2, name: 'Silk Blend Blouse', brand: 'Aritzia', price: 89, image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500&q=80', tag: 'Trending' },
  { id: 3, name: 'Wool Trousers', brand: 'COS', price: 110, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80', tag: 'New Arrival' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="header header-solid">
        <div className="header-top">
          <h2 className="text-page-title m-0">Discover</h2>
          <div className="avatar">A</div>
        </div>
        <div className="search-bar" onClick={() => navigate('/search')}>
          <Search size={20} className="text-white" />
          <input type="text" placeholder="Search brands, styles, items..." readOnly className="text-body" />
        </div>
      </header>

      <main className="main-content">
        {/* AI Recommendations */}
        <section className="section">
          <div className="section-header">
            <h3 className="text-section-title flex align-center gap-2"><Sparkles size={20} color="var(--color-accent)"/> For You</h3>
          </div>
          <AICard 
            title="Virtual Try-On" 
            subtitle="See how it fits your body profile instantly."
            onClick={() => navigate('/ai-try-on')}
          >
            <button className="btn-primary-small">✨ Try On Me</button>
          </AICard>
        </section>

        {/* Categories */}
        <section className="section">
          <div className="categories-scroll" style={{ margin: '0 calc(-1 * var(--spacing-3))', padding: '4px var(--spacing-3) 8px var(--spacing-3)' }}>
            {categories.map((cat, i) => (
              <FilterChip key={i} label={cat} isActive={i === 0} />
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="section">
          <div className="section-header">
            <h3 className="text-section-title m-0">Trending Now</h3>
            <button className="text-button text-muted">See all</button>
          </div>
          <div className="product-carousel" style={{ margin: '0 calc(-1 * var(--spacing-3))', padding: '0 var(--spacing-3)' }}>
            {products.map(p => (
              <div key={p.id} style={{ minWidth: 160, width: 160 }}>
                <ProductCard 
                  id={p.id}
                  image={p.image}
                  brand={p.brand}
                  name={p.name}
                  price={p.price}
                  aiScore={p.tag === 'AI Recommend' ? '98%' : null}
                  imageHeight="220px"
                  onSave={() => {}}
                  isSaved={false}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Flash Sales */}
        <section className="section flash-sale-section">
           <div className="section-header">
            <h3 className="text-section-title flex align-center gap-2 m-0"><Zap size={20} color="var(--color-warning)"/> Flash Sales</h3>
            <span className="timer text-warning text-caption font-semibold">02:15:30</span>
          </div>
           <div className="product-carousel" style={{ margin: '0 calc(-1 * var(--spacing-3))', padding: '0 var(--spacing-3)' }}>
            {products.slice().reverse().map(p => (
              <div key={`flash-${p.id}`} style={{ minWidth: 160, width: 160 }}>
                <ProductCard 
                  id={p.id}
                  image={p.image}
                  brand={p.brand}
                  name={p.name}
                  price={Math.floor(p.price * 0.7)}
                  originalPrice={p.price}
                  imageHeight="220px"
                />
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
