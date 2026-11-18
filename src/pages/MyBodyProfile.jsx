import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit3, Image as ImageIcon, Ruler, Zap, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShapeVisual from '../components/ShapeVisual';
import { useProfile } from '../context/ProfileContext';

export default function MyBodyProfile() {
  const navigate = useNavigate();
  const { profile, updateProfile, clearProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  
  const [measurements, setMeasurements] = useState({
    height: profile?.height || '170',
    weight: profile?.weight || '60',
    chest: profile?.measurements?.chest || '92',
    waist: profile?.measurements?.waist || '76',
    hip: profile?.measurements?.hip || '96',
    shape: profile?.shape || 'athletic'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setMeasurements(prev => {
      const next = { ...prev, [name]: value };
      
      // Auto-calculate shape if a core measurement changes
      if (['chest', 'waist', 'hip'].includes(name)) {
        const c = parseFloat(next.chest) || 0;
        const w = parseFloat(next.waist) || 0;
        const h = parseFloat(next.hip) || 0;
        
        if (c > 0 && w > 0 && h > 0) {
          if (w > c && w > h) {
            next.shape = 'Apple';
          } else if (h - c >= 8) {
            next.shape = 'Pear';
          } else if (c - h >= 8) {
            next.shape = 'Inverted_Triangle';
          } else if (h - w >= 12 && c - w >= 12 && Math.abs(c - h) <= 10) {
            next.shape = 'Hourglass';
          } else if (Math.abs(c - w) <= 10 && Math.abs(h - w) <= 10) {
            next.shape = 'Rectangle';
          } else {
            next.shape = 'Athletic';
          }
        }
      }
      return next;
    });
  };

  const handleSave = () => {
    updateProfile({
      height: measurements.height,
      weight: measurements.weight,
      shape: measurements.shape,
      measurements: {
        chest: measurements.chest,
        waist: measurements.waist,
        hip: measurements.hip
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container pb-32">
      <header className="setup-header glass">
        <button onClick={() => navigate(-1)} className="icon-btn"><ChevronLeft /></button>
        <h3 className="font-semibold text-lg">My Body Profile</h3>
        <div style={{width: 40}}></div>
      </header>

      <div className="setup-content">
        {/* Header Summary */}
        <div className="premium-card p-4 flex gap-4 align-center mb-6" style={{ background: 'linear-gradient(135deg, #000, #333)', color: 'white' }}>
          <div className="avatar-preview-small" style={{ width: 60, height: 60, borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
             <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80" alt="Avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold m-0">AI Stylist Active</h2>
            <p className="text-sm text-gray-300 opacity-80" style={{color: '#ccc'}}>Confidence: 96%</p>
          </div>
          <Zap size={24} className="text-accent" />
        </div>

        {/* Sections */}
        <div className="section mb-6">
          <div className="flex justify-between align-center mb-3">
            <h3 className="font-semibold text-lg flex align-center gap-2"><Ruler size={20}/> Measurements</h3>
            <button 
              className="text-accent text-sm font-medium flex align-center gap-1"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 size={16}/> Edit
            </button>
          </div>
          <div className="premium-card p-4 flex gap-5 align-center">
             <div style={{width: 100, height: 160, flexShrink: 0, background: 'var(--color-secondary)', borderRadius: 'var(--radius-lg)', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               <ShapeVisual shape={measurements.shape} />
             </div>
             <div className="measurements-grid flex-1" style={{gap: '16px', gridTemplateColumns: '1fr 1fr'}}>
                <div className="m-item">
                  <span className="text-muted text-xs">Height</span> 
                  <strong style={{fontSize: '1rem'}}>{measurements.height} cm</strong>
                </div>
                <div className="m-item">
                  <span className="text-muted text-xs">Weight</span> 
                  <strong style={{fontSize: '1rem'}}>{measurements.weight} kg</strong>
                </div>
                <div className="m-item">
                  <span className="text-muted text-xs">Chest</span> 
                  <strong style={{fontSize: '1rem'}}>{measurements.chest} cm</strong>
                </div>
                <div className="m-item">
                  <span className="text-muted text-xs">Waist</span> 
                  <strong style={{fontSize: '1rem'}}>{measurements.waist} cm</strong>
                </div>
                <div className="m-item">
                  <span className="text-muted text-xs">Hip</span> 
                  <strong style={{fontSize: '1rem'}}>{measurements.hip} cm</strong>
                </div>
                <div className="m-item">
                  <span className="text-muted text-xs">Shape</span> 
                  <strong style={{fontSize: '1rem'}}>{measurements.shape.replace('_', ' ')}</strong>
                </div>
              </div>
          </div>
        </div>

        <div className="section mb-6">
          <div className="flex justify-between align-center mb-3">
            <h3 className="font-semibold text-lg flex align-center gap-2"><ImageIcon size={20}/> Scanned Photos</h3>
            <button className="text-accent text-sm font-medium flex align-center gap-1"><Edit3 size={16}/> Replace</button>
          </div>
          <div className="flex gap-2">
            <div className="premium-card flex-1 relative" style={{height: 120}}>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
              <span className="absolute bottom-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">Face</span>
            </div>
            <div className="premium-card flex-1 relative" style={{height: 120}}>
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
              <span className="absolute bottom-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">Body</span>
            </div>
          </div>
        </div>

        <div className="section mb-6">
          <h3 className="font-semibold text-lg mb-3">Preferences</h3>
          <div className="premium-card p-4">
             <div className="mb-3">
               <span className="text-muted text-sm block mb-1">Skin Tone</span>
               <strong>Medium</strong>
             </div>
             <div className="mb-3">
               <span className="text-muted text-sm block mb-1">Preferred Fit</span>
               <strong>Relaxed, Oversized</strong>
             </div>
             <div>
               <span className="text-muted text-sm block mb-1">Style</span>
               <div className="pill-grid mt-1">
                 <span className="pill active" style={{padding: '4px 12px', fontSize: '0.75rem'}}>Minimal</span>
                 <span className="pill active" style={{padding: '4px 12px', fontSize: '0.75rem'}}>Streetwear</span>
               </div>
             </div>
          </div>
        </div>

        {/* Actions */}
         <div className="flex flex-col gap-3 mt-8">
           <button className="btn-secondary w-100 flex justify-center align-center gap-2 text-primary" style={{border: '1px solid var(--color-border)'}} onClick={() => navigate('/ai-setup')}>
             <Zap size={18}/> Retake AI Scan
           </button>
           <button 
             className="btn-text text-error w-100 flex justify-center align-center mt-2"
             onClick={() => { clearProfile(); navigate('/ai-setup'); }}
           >
             Delete Body Profile
           </button>
        </div>

        <div className="text-center mt-8 text-sm text-muted flex justify-center align-center gap-1">
          <ShieldCheck size={16}/> Last updated: Today
        </div>
      </div>

      {/* Edit Measurements Bottom Sheet */}
      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div 
              className="bottom-sheet-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
            />
            <motion.div 
              className="bottom-sheet glass"
              initial={{ y: '100%', x: '-50%' }}
              animate={{ y: 0, x: '-50%' }}
              exit={{ y: '100%', x: '-50%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="bottom-sheet-handle"></div>
              <div className="flex justify-between align-center mb-6">
                <h3 className="font-bold text-lg m-0">Edit Measurements</h3>
                <button onClick={() => setIsEditing(false)} className="text-muted"><X size={24} /></button>
              </div>
              
              <div className="measurements-grid mb-6">
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input type="number" name="height" value={measurements.height} onChange={handleChange} className="input-premium" />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input type="number" name="weight" value={measurements.weight} onChange={handleChange} className="input-premium" />
                </div>
                <div className="form-group">
                  <label>Chest (cm)</label>
                  <input type="number" name="chest" value={measurements.chest} onChange={handleChange} className="input-premium" />
                </div>
                <div className="form-group">
                  <label>Waist (cm)</label>
                  <input type="number" name="waist" value={measurements.waist} onChange={handleChange} className="input-premium" />
                </div>
                <div className="form-group">
                  <label>Hip (cm)</label>
                  <input type="number" name="hip" value={measurements.hip} onChange={handleChange} className="input-premium" />
                </div>
                <div className="form-group">
                  <label>Shape</label>
                  <input type="text" name="shape" value={measurements.shape} onChange={handleChange} className="input-premium" />
                </div>
              </div>

              <button className="btn-primary-large" onClick={handleSave}>Save Changes</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
