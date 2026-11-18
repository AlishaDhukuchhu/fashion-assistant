import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Heart, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';

export default function AITryOn() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('front');
  const [showOriginal, setShowOriginal] = useState(false);

  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function generateTryOn() {
      try {
        const response = await fetch('/api/try-on', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userImage: profile?.userImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            garmentImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
            category: "upper_body"
          })
        });
        
        const data = await response.json();
        if (response.ok && data.resultImage) {
          setGeneratedImage(Array.isArray(data.resultImage) ? data.resultImage[0] : data.resultImage);
        } else {
          setError(data.error || 'Something went wrong');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    generateTryOn();
  }, []);

  if (loading) {
    return (
      <div className="ai-loading-screen">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="loading-sparkle"
        >
          ✨
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Creating your personalized virtual fitting...
        </motion.h2>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3 }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ai-loading-screen">
        <AlertTriangle size={48} className="text-error mb-4" />
        <h3>Failed to generate try-on</h3>
        <p className="text-muted mt-2">{error}</p>
        <button className="btn-secondary mt-4 px-4" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="ai-try-on">
      <header className="try-on-header header-solid">
        <button onClick={() => navigate(-1)} className="icon-btn" style={{background: 'rgba(255,255,255,0.2)', color: 'var(--color-background)'}}><ChevronLeft /></button>
        <h3 className="m-0 text-white" style={{color: 'var(--color-background)'}}>AI Fitting Room</h3>
        <button className="icon-btn" style={{background: 'rgba(255,255,255,0.2)', color: 'var(--color-background)'}} onClick={() => setShowOriginal(!showOriginal)}>
          <RefreshCw size={20} />
        </button>
      </header>

      <div className="try-on-viewer">
        <AnimatePresence mode="wait">
          <motion.img 
            key={showOriginal ? 'original' : `ai-${view}`}
            src={showOriginal 
              ? "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80" 
              : (generatedImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80")}
            alt="Virtual Try On"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="main-image"
          />
        </AnimatePresence>
        
        <div className="view-selector glass">
          <button className={view === 'front' ? 'active' : ''} onClick={() => setView('front')}>Front</button>
          <button className={view === 'side' ? 'active' : ''} onClick={() => setView('side')}>Side</button>
          <button className={view === 'back' ? 'active' : ''} onClick={() => setView('back')}>Back</button>
        </div>

        {showOriginal && <div className="original-badge glass">Original Model</div>}
        {!showOriginal && (
          <div className="ai-badge glass">
            ✨ AI Generated {profile?.shape ? `(${profile.shape})` : ''}
          </div>
        )}
      </div>

      <div className="try-on-analysis">
        <div className="score-card">
          <div className="score-header">
            <h4>Confidence Score</h4>
            <span className="score-number text-success">92%</span>
          </div>
          <div className="analysis-list">
            <div className="analysis-item"><CheckCircle size={16} className="text-success"/> Perfect shoulder fit</div>
            <div className="analysis-item"><AlertTriangle size={16} className="text-warning"/> Waist slightly loose</div>
            <div className="analysis-item"><CheckCircle size={16} className="text-success"/> Sleeve length ideal</div>
          </div>
          <p className="recommendation"><strong>AI Suggests:</strong> You are currently trying Size M. Size S might offer a more tailored fit at the waist.</p>
        </div>

        <div className="style-recommendations">
          <h4>Complete The Look</h4>
          <div className="product-carousel">
             <div className="product-card" style={{minWidth: '120px'}}>
                <div className="product-image" style={{height: '140px'}}>
                  <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" alt="Shoes" />
                </div>
                <div className="product-info">
                  <h4>Leather Boots</h4>
                  <span className="price">$150</span>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="try-on-actions" style={{background: 'var(--color-background)', borderTop: '1px solid var(--color-border)'}}>
        <button className="btn-secondary"><Heart size={20} /> Save</button>
        <button className="btn-secondary"><Share2 size={20} /> Share</button>
        <button className="btn-primary-large" style={{flex: 2, padding: '0 16px'}}>Buy Now</button>
      </div>
    </div>
  );
}
