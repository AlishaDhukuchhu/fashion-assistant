import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Camera, Upload, CheckCircle, Info, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShapeVisual from '../components/ShapeVisual';
import { useProfile } from '../context/ProfileContext';

const TOTAL_STEPS = 10;

const shapes = [
  { id: 'rectangle', name: 'Rectangle' },
  { id: 'pear', name: 'Pear' },
  { id: 'apple', name: 'Apple' },
  { id: 'hourglass', name: 'Hourglass' },
  { id: 'athletic', name: 'Athletic' },
  { id: 'inverted_triangle', name: 'Inverted Triangle' }
];

const skinTones = [
  { id: 'very_fair', name: 'Very Fair', color: '#FCE6DE' },
  { id: 'fair', name: 'Fair', color: '#F5D0C5' },
  { id: 'light', name: 'Light', color: '#EAC0A6' },
  { id: 'medium', name: 'Medium', color: '#D4A373' },
  { id: 'tan', name: 'Tan', color: '#A06E4A' },
  { id: 'deep', name: 'Deep', color: '#6A4A3C' },
  { id: 'dark', name: 'Dark', color: '#442F29' }
];

const categories = ['Casual', 'Formal', 'Streetwear', 'Minimal', 'Luxury', 'Traditional', 'Party', 'Sport', 'Boho', 'Vintage'];
const fits = ['Slim Fit', 'Regular', 'Relaxed', 'Oversized'];

export default function AIProfileSetup() {
  const navigate = useNavigate();
  const { updateProfile } = useProfile();
  const [step, setStep] = useState(1);
  const [loadingMessages, setLoadingMessages] = useState('Analyzing body proportions...');

  // Form State
  const [data, setData] = useState(() => ({
    unit: profile?.unit || 'metric',
    shape: profile?.shape || '',
    skinTone: profile?.skinTone || '',
    preferences: profile?.preferences || [],
    fit: profile?.fit || '',
    name: profile?.name || '',
    gender: profile?.gender || 'Female',
    height: profile?.height || '',
    weight: profile?.weight || '',
    measurements: profile?.measurements || {}
  }));

  const nextStep = () => {
    updateProfile(data);
    setStep(s => Math.min(s + 1, TOTAL_STEPS));
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  useEffect(() => {
    if (step === 7) {
      const messages = ['Analyzing body proportions...', 'Estimating measurements...', 'Building AI avatar...', 'Preparing virtual fitting...'];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingMessages(messages[i]);
      }, 2000);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
        nextStep(); // auto proceed to step 8
      }, 8000);
      return () => { clearInterval(interval); clearTimeout(timeout); };
    }
  }, [step]);

  const updateData = (fields) => setData(prev => ({ ...prev, ...fields }));

  const togglePreference = (cat) => {
    const prefs = data.preferences.includes(cat) 
      ? data.preferences.filter(c => c !== cat) 
      : [...data.preferences, cat];
    updateData({ preferences: prefs });
  };

  const getShapeName = () => {
    const s = shapes.find(x => x.id === data.shape);
    return s ? s.name : (data.shape === 'auto' ? 'AI Estimated Shape' : '');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="onboarding-step text-center">
            <div className="illustration-wrapper">
              <Zap size={64} className="text-accent" />
            </div>
            <h2>Create Your Digital Body Profile</h2>
            <p className="text-muted mt-2">Upload your body details once and instantly visualize how clothes look on you before buying.</p>
            
            <div className="privacy-card glass mt-4">
              <ShieldCheck size={20} className="text-success" />
              <p>Your photos are encrypted and used only to generate your private AI body model.</p>
            </div>

            <div className="fixed-bottom-actions glass">
              <button className="btn-primary-large mb-2" onClick={nextStep}>Create My Profile</button>
              <button className="btn-text w-100" onClick={() => navigate('/')}>Skip for now</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="onboarding-step">
            <h2>Personal Information</h2>
            <div className="form-group mt-4">
              <label>Name</label>
              <input type="text" className="input-premium" placeholder="Enter your name" value={data.name} onChange={e => updateData({name: e.target.value})} />
            </div>
            <div className="form-group mt-3">
              <label>Gender</label>
              <div className="pill-selector">
                <button className={`pill ${data.gender === 'Female' ? 'active' : ''}`} onClick={() => updateData({gender: 'Female'})}>Female</button>
                <button className={`pill ${data.gender === 'Male' ? 'active' : ''}`} onClick={() => updateData({gender: 'Male'})}>Male</button>
                <button className={`pill ${data.gender === 'Other' ? 'active' : ''}`} onClick={() => updateData({gender: 'Other'})}>Other</button>
              </div>
            </div>
            <div className="form-row mt-3">
              <div className="form-group flex-1">
                <label>Height ({data.unit === 'metric' ? 'cm' : 'in'})</label>
                <input type="number" className="input-premium" placeholder="170" value={data.height} onChange={e => updateData({height: e.target.value})} />
              </div>
              <div className="form-group flex-1">
                <label>Weight ({data.unit === 'metric' ? 'kg' : 'lbs'})</label>
                <input type="number" className="input-premium" placeholder="60" value={data.weight} onChange={e => updateData({weight: e.target.value})} />
              </div>
            </div>
            <div className="unit-toggle mt-4 glass p-2 rounded-xl flex justify-between">
              <button className={`w-50 py-2 rounded-lg ${data.unit === 'metric' ? 'bg-black text-white' : ''}`} onClick={() => updateData({unit: 'metric'})}>Metric</button>
              <button className={`w-50 py-2 rounded-lg ${data.unit === 'imperial' ? 'bg-black text-white' : ''}`} onClick={() => updateData({unit: 'imperial'})}>Imperial</button>
            </div>
            <FixedNext prev={prevStep} next={nextStep} />
          </div>
        );
      case 3:
        return (
          <div className="onboarding-step">
            <h2>Body Shape</h2>
            <p className="text-muted mb-4">Select the shape that best matches you, or let AI decide.</p>
            <div className="shape-grid">
              {shapes.map(s => (
                <div key={s.id} className={`shape-card ${data.shape === s.id ? 'active' : ''}`} onClick={() => updateData({shape: s.id})}>
                  <div className="shape-svg-wrapper">
                    <ShapeVisual shape={s.id} />
                  </div>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
            <button className="btn-secondary w-100 mt-4" onClick={() => {updateData({shape: 'auto'}); nextStep();}}>
              Not Sure (Let AI estimate)
            </button>
            <FixedNext prev={prevStep} next={nextStep} disabled={!data.shape} />
          </div>
        );
      case 4:
        return (
          <div className="onboarding-step pb-32">
            <h2>Body Measurements</h2>
            <p className="text-muted mb-4">Enter exact measurements for perfect sizing.</p>

            {data.shape && data.shape !== 'auto' && (
              <div className="premium-card mb-4 flex gap-4 p-4 align-center">
                <div style={{width: 60, height: 80, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--color-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{width: 40, height: 80}}><ShapeVisual shape={data.shape} /></div>
                </div>
                <div>
                  <h4 className="font-semibold">{getShapeName()}</h4>
                  <span className="text-xs text-muted">Selected Body Shape</span>
                </div>
              </div>
            )}

            <button className="btn-secondary w-100 mb-4" onClick={nextStep}>
              ✨ I don't know, let AI estimate
            </button>
            {['Neck', 'Shoulder Width', 'Chest/Bust', 'Natural Waist', 'Hip', 'Inseam'].map(m => (
              <div key={m} className="form-group mb-3 relative">
                <label className="flex justify-between w-100">
                  {m}
                  <a href="#" className="text-accent text-sm flex align-center gap-1"><Info size={14}/> How to measure</a>
                </label>
                <input 
                  type="number" 
                  className="input-premium" 
                  placeholder={`e.g. 90 ${data.unit === 'metric'?'cm':'in'}`}
                  value={data.measurements?.[m] || ''}
                  onChange={e => updateData({ measurements: { ...(data.measurements || {}), [m]: e.target.value } })}
                />
              </div>
            ))}
            <FixedNext prev={prevStep} next={nextStep} />
          </div>
        );
      case 5:
        return (
          <div className="onboarding-step">
            <h2>Skin Tone</h2>
            <p className="text-muted mb-4">Helps in recommending complementary colors.</p>
            <div className="skintone-list">
              {skinTones.map(st => (
                <div key={st.id} className={`skintone-card ${data.skinTone === st.id ? 'active' : ''}`} onClick={() => updateData({skinTone: st.id})}>
                  <div className="skintone-color" style={{backgroundColor: st.color}}></div>
                  <span>{st.name}</span>
                </div>
              ))}
            </div>
            <FixedNext prev={prevStep} next={nextStep} disabled={!data.skinTone} />
          </div>
        );
      case 6:
        return (
          <div className="onboarding-step">
            <h2>Upload Photos</h2>
            <ul className="photo-instructions text-muted mb-4 text-sm list-disc pl-4">
              <li>Wear fitted clothing for the body scan.</li>
              <li>Include a clear face photo for the avatar.</li>
              <li>Stand naturally in good lighting.</li>
            </ul>
            <div className="photo-upload-grid">
              <label className="upload-card" style={{ cursor: 'pointer' }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} />
                <div className="upload-placeholder"><Camera size={24}/></div>
                <span>Face Photo</span>
              </label>
              <label className="upload-card" style={{ cursor: 'pointer' }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} />
                <div className="upload-placeholder"><Camera size={24}/></div>
                <span>Body Front</span>
              </label>
              <label className="upload-card optional" style={{ cursor: 'pointer' }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} />
                <div className="upload-placeholder"><Upload size={24}/></div>
                <span>Body Side (Optional)</span>
              </label>
            </div>
            <FixedNext prev={prevStep} next={nextStep} />
          </div>
        );
      case 7:
        return (
          <div className="onboarding-step ai-processing-step text-center">
            <div className="scanner-animation">
              <div className="scanner-line"></div>
              <div className="silhouette" style={{height: 200, display: 'flex', justifyContent: 'center', opacity: 0.8}}>
                <ShapeVisual shape={data.shape || 'hourglass'} />
              </div>
            </div>
            <h2 className="mt-4">Creating Your AI Body Model</h2>
            <AnimatePresence mode="wait">
              <motion.p key={loadingMessages} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="text-accent mt-2 font-medium">
                {loadingMessages}
              </motion.p>
            </AnimatePresence>
            <p className="text-muted text-sm mt-4">Estimated time: 15–30 seconds</p>
          </div>
        );
      case 8:
        return (
          <div className="onboarding-step">
            <h2 className="text-center mb-4">AI Review</h2>
            <div className="ai-review-card premium-card mb-4">
              <div className="avatar-preview bg-secondary" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem'}}>
                <div style={{height: 180}}>
                  <ShapeVisual shape={data.shape || 'athletic'} />
                </div>
                <div className="confidence-badge">96% Confidence</div>
              </div>
              <div className="measurements-grid p-4">
                <div className="m-item"><span className="text-muted">Height</span> <strong>170 cm</strong></div>
                <div className="m-item"><span className="text-muted">Chest</span> <strong>92 cm</strong></div>
                <div className="m-item"><span className="text-muted">Waist</span> <strong>76 cm</strong></div>
                <div className="m-item"><span className="text-muted">Hip</span> <strong>96 cm</strong></div>
                <div className="m-item"><span className="text-muted">Shape</span> <strong>{getShapeName() || 'Athletic'}</strong></div>
                <div className="m-item"><span className="text-muted">Skin</span> <strong>Medium</strong></div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn-secondary flex-1" onClick={() => setStep(4)}>Edit</button>
              <button className="btn-secondary flex-1" onClick={() => setStep(6)}>Retake</button>
            </div>
            <button className="btn-primary-large w-100 mt-4" onClick={nextStep}>Looks Good</button>
          </div>
        );
      case 9:
        return (
          <div className="onboarding-step pb-32">
            <h2>Style Preferences</h2>
            <p className="text-muted mb-4">Select your favorite styles</p>
            <div className="pill-grid mb-6">
              {categories.map(c => (
                <button key={c} className={`pill ${data.preferences.includes(c) ? 'active' : ''}`} onClick={() => togglePreference(c)}>
                  {c}
                </button>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-3">Preferred Fit</h3>
            <div className="pill-grid">
              {fits.map(f => (
                <button key={f} className={`pill ${data.fit === f ? 'active' : ''}`} onClick={() => updateData({fit: f})}>
                  {f}
                </button>
              ))}
            </div>
            <FixedNext prev={prevStep} next={nextStep} />
          </div>
        );
      case 10:
        return (
          <div className="onboarding-step text-center pt-10">
            <motion.div initial={{scale: 0}} animate={{scale: 1}} className="success-icon mb-6">
              <CheckCircle size={80} className="text-success mx-auto" />
            </motion.div>
            <h2>Your AI Stylist is Ready!</h2>
            <p className="text-muted mt-3 mb-8">You can now virtually try on any outfit, receive personalized size recommendations, and discover styles curated specifically for you.</p>
            
            <button className="btn-primary-large w-100 mb-3" onClick={() => {
              updateProfile(data);
              navigate('/');
            }}>Start Shopping</button>
            <button className="btn-secondary w-100" style={{height: 56, borderRadius: 'var(--radius-full)'}} onClick={() => {
              updateProfile(data);
              navigate('/ai-try-on');
            }}>Explore AI Try-On</button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="ai-setup-container">
      {/* Header */}
      <header className="setup-header glass">
        <button onClick={prevStep} className="icon-btn" style={{visibility: step > 1 && step < 7 ? 'visible' : 'hidden'}}><ChevronLeft /></button>
        <div className="progress-indicator">
          <div className="progress-bar-bg">
            <motion.div 
              className="progress-bar-fill" 
              initial={{width: 0}}
              animate={{width: `${(step / TOTAL_STEPS) * 100}%`}} 
            />
          </div>
          <span className="text-xs text-muted font-medium mt-1 inline-block">Step {step} of {TOTAL_STEPS}</span>
        </div>
        <div style={{width: 40}}></div>
      </header>

      {/* Main Content */}
      <main className="setup-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Subcomponent for fixed next/prev buttons
function FixedNext({prev, next, disabled}) {
  return (
    <div className="fixed-bottom-actions glass flex gap-3">
      <button className="btn-primary-large flex-1" onClick={next} disabled={disabled}>Continue</button>
    </div>
  );
}
