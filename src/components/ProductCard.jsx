import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ 
  id,
  image, 
  brand, 
  name, 
  price, 
  originalPrice,
  aiScore,
  onSave,
  isSaved,
  onClick,
  style = {},
  imageHeight = '240px' // Unified image height
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) onClick();
    else if (id) navigate(`/product/${id}`);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (onSave) onSave();
  };

  return (
    <div 
      className="product-card" 
      style={{ width: '100%', position: 'relative', ...style }}
      onClick={handleCardClick}
    >
      <div className="product-image" style={{ height: imageHeight, width: '100%' }}>
        {aiScore && (
          <span className="product-tag bg-accent text-white flex align-center gap-1" style={{ top: 8, left: 8, zIndex: 10 }}>
            <Sparkles size={12} /> {aiScore}
          </span>
        )}
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {onSave && (
          <button 
            className="icon-btn absolute" 
            style={{ bottom: 8, right: 8, width: 32, height: 32, background: 'rgba(255,255,255,0.8)', zIndex: 10 }}
            onClick={handleSaveClick}
          >
            <Heart size={16} fill={isSaved ? "var(--color-primary)" : "none"} stroke={isSaved ? "var(--color-primary)" : "currentColor"} />
          </button>
        )}
      </div>
      
      <div className="product-info mt-2">
        <span className="text-brand">{brand}</span>
        <h4 className="text-card-title m-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</h4>
        
        {price && (
          <div className="flex align-center gap-1 mt-1">
            <span className="text-price">${price}</span>
            {originalPrice && (
              <span className="text-caption" style={{ textDecoration: 'line-through' }}>${originalPrice}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
