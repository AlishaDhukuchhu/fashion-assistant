import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Heart, Share2, Star, ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import AICard from '../components/AICard';

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  
  const product = {
    brand: 'ZARA',
    name: 'Minimalist Overcoat',
    price: 129,
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
    ],
    colors: ['black', 'beige', 'navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Wool Blend',
    description: 'Elevate your winter wardrobe with this minimalist overcoat. Featuring a sleek silhouette, hidden buttons, and crafted from a premium wool blend for ultimate warmth and style.',
  };

  return (
    <div className="product-detail">
      {/* Header */}
      <Navigation 
        showBack={true}
        rightAction={
          <div className="flex gap-2">
            <button className="icon-btn"><Share2 size={20} /></button>
            <button className="icon-btn"><Heart size={20} /></button>
          </div>
        }
      />

      {/* 360 Gallery */}
      <div className="relative bg-secondary pt-16 flex flex-col align-center" style={{ minHeight: '400px' }}>
        <img src={product.images[0]} alt={product.name} style={{ width: '90%', height: '300px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
        
        {/* 360 Control Overlay */}
        <div className="absolute w-full flex justify-center" style={{ bottom: '100px' }}>
          <div className="relative" style={{ width: '280px', height: '40px' }}>
            <svg viewBox="0 0 280 40" className="w-100 h-100" style={{ overflow: 'visible', color: '#ff4d4f' }}>
              <ellipse cx="140" cy="20" rx="130" ry="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <path d="M 90 36.5 A 130 18 0 0 0 190 36.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div 
              className="absolute flex justify-center align-center shadow-md" 
              style={{ 
                width: 40, height: 22, 
                backgroundColor: '#ff4d4f', 
                color: 'white',
                borderRadius: '11px',
                bottom: '-3px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <div style={{ width: 12, height: 8, border: '2px solid white', borderRadius: '50%', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 4, height: 4, backgroundColor: 'white', borderRadius: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="w-100 px-4 mt-auto pb-4 pt-8">
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {[1,2,3,4,5].map((_, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0" 
                style={{ width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--color-background)', opacity: idx === 0 ? 1 : 0.6 }}
              >
                <img src={product.images[0]} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            <div 
              className="flex-shrink-0 flex justify-center align-center" 
              style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: '#ff4d4f', color: 'white' }}
            >
              <span className="font-semibold text-sm">+10</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pd-content">
        {/* Title & Price */}
        <div className="pd-title-row">
          <div>
            <span className="brand">{product.brand}</span>
            <h1>{product.name}</h1>
          </div>
          <div className="price-container">
            <span className="price">${product.price}</span>
          </div>
        </div>

        <div className="rating-row">
          <div className="stars">
            <Star size={16} fill="var(--color-warning)" color="var(--color-warning)" />
            <span>{product.rating}</span>
          </div>
          <span className="reviews text-muted">({product.reviews} reviews)</span>
        </div>

        {/* AI Try On CTA */}
        <div className="mb-6 mt-4">
          <AICard 
            title="Try On Me"
            subtitle="AI Virtual Fitting"
            onClick={() => navigate('/ai-try-on')}
          >
            <div className="flex align-center justify-between">
              <span className="text-sm font-medium">See how this fits your body profile</span>
              <ChevronRight size={16} />
            </div>
          </AICard>
        </div>

        {/* Colors */}
        <div className="pd-section">
          <h3>Color</h3>
          <div className="color-selector">
            {product.colors.map(c => (
              <button 
                key={c} 
                className={`color-btn ${selectedColor === c ? 'active' : ''}`}
                style={{ backgroundColor: c === 'beige' ? '#F5F5DC' : c === 'navy' ? '#000080' : c }}
                onClick={() => setSelectedColor(c)}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="pd-section">
          <div className="size-header">
            <h3>Size</h3>
            <span className="size-guide">Size Guide</span>
          </div>
          <div className="size-selector">
            {product.sizes.map(s => (
              <button 
                key={s} 
                className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Details Accordions (Simulated) */}
        <div className="pd-accordion">
          <div className="accordion-item">
            <h3>Description</h3>
            <p className="text-muted">{product.description}</p>
          </div>
          <div className="accordion-item">
            <h3>Material & Care</h3>
            <p className="text-muted">{product.material}. Dry clean only.</p>
          </div>
          <div className="accordion-item">
            <h3>Delivery & Returns</h3>
            <p className="text-muted">Free standard delivery on orders over $50. Free returns within 30 days.</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="pd-bottom-action glass">
        <button className="btn-primary-large">Add to Bag - ${product.price}</button>
      </div>
    </div>
  );
}
