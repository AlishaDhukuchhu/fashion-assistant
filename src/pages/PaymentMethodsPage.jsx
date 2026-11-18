import { useState } from 'react';
import { ArrowLeft, Banknote, Wallet, CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RadioButton({ selected }) {
  return (
    <div 
      style={{
        width: 24, height: 24, borderRadius: '50%', 
        border: `2px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s'
      }}
    >
      {selected && <div style={{width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary)'}} />}
    </div>
  )
}

export default function PaymentMethodsPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('cash');

  return (
    <div className="pb-32 bg-background min-h-screen">
      <header className="py-4 flex align-center px-4 bg-background z-50">
        <button onClick={() => navigate(-1)} className="icon-btn" style={{border: '1px solid var(--color-border)', background: 'transparent', width: 40, height: 40}}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold m-0 flex-1 text-center pr-10">Payment Methods</h1>
      </header>

      <main className="px-4 pb-20">
        
        {/* Cash Section */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Cash</h3>
          <div 
            className="flex align-center justify-between p-4" 
            style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}
            onClick={() => setSelectedMethod('cash')}
          >
            <div className="flex align-center gap-3">
              <Banknote size={20} color="var(--color-primary)" />
              <span className="font-medium text-sm text-text-muted">Cash</span>
            </div>
            <RadioButton selected={selectedMethod === 'cash'} />
          </div>
        </section>

        {/* Wallet Section */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Wallet</h3>
          <div 
            className="flex align-center justify-between p-4" 
            style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}
            onClick={() => setSelectedMethod('wallet')}
          >
            <div className="flex align-center gap-3">
              <Wallet size={20} color="var(--color-primary)" />
              <span className="font-medium text-sm text-text-muted">Wallet</span>
            </div>
            <RadioButton selected={selectedMethod === 'wallet'} />
          </div>
        </section>

        {/* Credit & Debit Card Section */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Credit & Debit Card</h3>
          <div 
            className="flex align-center justify-between p-4" 
            style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}
            onClick={() => navigate('/profile/payment/add-card')}
          >
            <div className="flex align-center gap-3">
              <CreditCard size={20} color="var(--color-primary)" />
              <span className="font-medium text-sm text-text-muted">Add Card</span>
            </div>
            <ChevronRight size={20} color="var(--color-primary)" />
          </div>
        </section>

        {/* More Payment Options Section */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold mb-3">More Payment Options</h3>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {/* Paypal */}
            <div 
              className="flex align-center justify-between p-4" 
              style={{ borderBottom: '1px solid var(--color-border)', cursor: 'pointer', background: 'transparent' }}
              onClick={() => setSelectedMethod('paypal')}
            >
              <div className="flex align-center gap-3">
                <div style={{width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003087', fontWeight: 'bold', fontStyle: 'italic', fontSize: '18px'}}>P</div>
                <span className="font-medium text-sm text-text-muted">Paypal</span>
              </div>
              <RadioButton selected={selectedMethod === 'paypal'} />
            </div>
            
            {/* Apple Pay */}
            <div 
              className="flex align-center justify-between p-4" 
              style={{ borderBottom: '1px solid var(--color-border)', cursor: 'pointer', background: 'transparent' }}
              onClick={() => setSelectedMethod('apple_pay')}
            >
              <div className="flex align-center gap-3">
                <div style={{width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--color-text-main)'}}></div>
                <span className="font-medium text-sm text-text-muted">Apple Pay</span>
              </div>
              <RadioButton selected={selectedMethod === 'apple_pay'} />
            </div>

            {/* Google Pay */}
            <div 
              className="flex align-center justify-between p-4" 
              style={{ cursor: 'pointer', background: 'transparent' }}
              onClick={() => setSelectedMethod('google_pay')}
            >
              <div className="flex align-center gap-3">
                <div style={{width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4285F4', fontWeight: 'bold', fontSize: '18px'}}>G</div>
                <span className="font-medium text-sm text-text-muted">Google Pay</span>
              </div>
              <RadioButton selected={selectedMethod === 'google_pay'} />
            </div>
          </div>
        </section>
      </main>

      <div className="pd-bottom-action bg-background" style={{ borderTop: '1px solid var(--color-border)', padding: '24px 16px' }}>
        <button className="btn-primary-large" onClick={() => navigate(-1)}>Confirm Payment</button>
      </div>
    </div>
  );
}
