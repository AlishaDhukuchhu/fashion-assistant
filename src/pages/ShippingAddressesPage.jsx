import { useState } from 'react';
import { ArrowLeft, MapPin, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RadioButton({ selected }) {
  return (
    <div 
      style={{
        width: 24, height: 24, borderRadius: '50%', 
        border: `2px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0
      }}
    >
      {selected && <div style={{width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary)'}} />}
    </div>
  )
}

export default function ShippingAddressesPage() {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(1);

  const addresses = [
    { id: 1, title: 'Home', address: '1901 Thornridge Cir. Shiloh, Hawaii 81063' },
    { id: 2, title: 'Office', address: '4517 Washington Ave. Manchester, Kentucky 39495' },
    { id: 3, title: 'Parent\'s House', address: '8502 Preston Rd. Inglewood, Maine 98380' },
    { id: 4, title: 'Friend\'s House', address: '2464 Royal Ln. Mesa, New Jersey 45463' },
  ];

  return (
    <div className="pb-32 bg-background min-h-screen">
      <header className="py-4 flex align-center px-4 bg-background z-50">
        <button onClick={() => navigate(-1)} className="icon-btn" style={{border: '1px solid var(--color-border)', background: 'transparent', width: 40, height: 40}}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold m-0 flex-1 text-center pr-10">Shipping Address</h1>
      </header>

      <main className="px-4 pb-20">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {addresses.map((addr, index) => (
            <div 
              key={addr.id} 
              className="flex align-start justify-between py-4" 
              style={{ 
                borderBottom: index < addresses.length - 1 ? '1px solid var(--color-border)' : 'none', 
                cursor: 'pointer' 
              }}
              onClick={() => setSelectedAddress(addr.id)}
            >
              <div className="flex align-start gap-3 flex-1 pr-4">
                <MapPin size={20} color="var(--color-text-muted)" style={{ marginTop: 2 }} />
                <div>
                  <h3 className="font-semibold m-0 text-sm mb-1">{addr.title}</h3>
                  <p className="text-muted text-sm m-0" style={{ lineHeight: '1.4' }}>{addr.address}</p>
                </div>
              </div>
              <RadioButton selected={selectedAddress === addr.id} />
            </div>
          ))}
        </div>

        <button 
          className="w-100 mt-6 py-4 flex align-center justify-center gap-2"
          style={{
            border: '1px dashed var(--color-primary)',
            borderRadius: 'var(--radius-lg)',
            background: 'transparent',
            color: 'var(--color-primary)',
            fontWeight: 500,
            fontSize: '0.875rem'
          }}
        >
          <Plus size={16} /> Add New Shipping Address
        </button>
      </main>

      <div className="pd-bottom-action bg-background" style={{ borderTop: '1px solid var(--color-border)', padding: '24px 16px' }}>
        <button className="btn-primary-large" onClick={() => navigate(-1)}>Apply</button>
      </div>
    </div>
  );
}
