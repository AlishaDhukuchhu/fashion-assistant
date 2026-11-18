import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddCardPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('Esther Howard');
  const [number, setNumber] = useState('4716 9627 1635 8047');
  const [expiry, setExpiry] = useState('02/30');
  const [cvv, setCvv] = useState('000');
  const [saveCard, setSaveCard] = useState(true);

  return (
    <div className="pb-32 bg-background min-h-screen">
      <header className="py-4 flex align-center px-4 bg-background z-50">
        <button onClick={() => navigate(-1)} className="icon-btn" style={{border: '1px solid var(--color-border)', background: 'transparent', width: 40, height: 40}}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold m-0 flex-1 text-center pr-10">Add Card</h1>
      </header>

      <main className="px-4 pb-20 mt-4">
        
        {/* Virtual Card Graphic */}
        <div 
          className="mb-6 relative overflow-hidden" 
          style={{ 
            background: 'var(--color-primary)', 
            borderRadius: '16px', 
            padding: '24px', 
            color: 'white',
            boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Decorative Circles */}
          <div style={{ position: 'absolute', top: '-50px', right: '-20px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          
          <div className="flex justify-end relative z-10">
            <span className="font-bold text-xl italic tracking-wider">VISA</span>
          </div>

          <div className="relative z-10 mt-8">
            <div className="text-2xl font-medium tracking-widest mb-6" style={{ wordSpacing: '8px' }}>
              {number || 'XXXX XXXX XXXX XXXX'}
            </div>
            
            <div className="flex justify-between align-end">
              <div>
                <p className="text-xs mb-1 opacity-80" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Card holder name</p>
                <p className="font-medium text-sm">{name || 'Name'}</p>
              </div>
              <div>
                <p className="text-xs mb-1 opacity-80" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Expiry date</p>
                <p className="font-medium text-sm">{expiry || 'MM/YY'}</p>
              </div>
              <div style={{ width: 40, height: 25, border: '1px solid rgba(255,255,255,0.5)', borderRadius: 4, display: 'flex', flexDirection: 'column', padding: '3px 0' }}>
                 <div style={{ height: '1px', background: 'rgba(255,255,255,0.5)', width: '100%', marginBottom: 3 }} />
                 <div style={{ height: '1px', background: 'rgba(255,255,255,0.5)', width: '100%', marginBottom: 3 }} />
                 <div style={{ height: '1px', background: 'rgba(255,255,255,0.5)', width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="form-group mb-4">
          <label className="text-sm font-semibold mb-2 block text-text-muted">Card Holder Name</label>
          <input 
            type="text" 
            className="w-100 p-3" 
            style={{ background: 'var(--color-secondary)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }} 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>

        <div className="form-group mb-4">
          <label className="text-sm font-semibold mb-2 block text-text-muted">Card Number</label>
          <input 
            type="text" 
            className="w-100 p-3" 
            style={{ background: 'var(--color-secondary)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }} 
            value={number} 
            onChange={e => setNumber(e.target.value)} 
          />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="form-group flex-1">
            <label className="text-sm font-semibold mb-2 block text-text-muted">Expiry Date</label>
            <input 
              type="text" 
              className="w-100 p-3" 
              style={{ background: 'var(--color-secondary)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }} 
              value={expiry} 
              onChange={e => setExpiry(e.target.value)} 
            />
          </div>
          <div className="form-group flex-1">
            <label className="text-sm font-semibold mb-2 block text-text-muted">CVV</label>
            <input 
              type="text" 
              className="w-100 p-3" 
              style={{ background: 'var(--color-secondary)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }} 
              value={cvv} 
              onChange={e => setCvv(e.target.value)} 
            />
          </div>
        </div>

        <div className="flex align-center gap-3 cursor-pointer" onClick={() => setSaveCard(!saveCard)}>
          <div 
            style={{ 
              width: 20, height: 20, borderRadius: 4, 
              background: saveCard ? 'var(--color-primary)' : 'transparent',
              border: `2px solid ${saveCard ? 'var(--color-primary)' : 'var(--color-border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {saveCard && <Check size={14} color="var(--color-background)" strokeWidth={3} />}
          </div>
          <span className="text-sm font-medium">Save Card</span>
        </div>

      </main>

      <div className="pd-bottom-action bg-background" style={{ borderTop: '1px solid var(--color-border)', padding: '24px 16px' }}>
        <button className="btn-primary-large" onClick={() => navigate(-1)}>Add Card</button>
      </div>
    </div>
  );
}
