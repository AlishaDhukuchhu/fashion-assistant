import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Active');

  const tabs = ['Active', 'Completed', 'Cancelled'];

  const orders = [
    { id: 1, title: 'Canon Camera', category: 'Electronics', qty: 2, price: 180.00, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80' },
    { id: 2, title: 'Arm Chair', category: 'Furniture', qty: 2, price: 120.00, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80' },
    { id: 3, title: 'Nike Pegasus 39', category: 'Shoes', qty: 2, price: 90.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { id: 4, title: 'Light Brown Coat', category: 'Clothes', qty: 2, price: 120.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80' },
    { id: 5, title: 'Wood Chair', category: 'Furniture', qty: 2, price: 120.00, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500&q=80' },
  ];

  return (
    <div className="pb-32 bg-background min-h-screen">
      <header className="py-4 flex align-center px-4 bg-background">
        <button onClick={() => navigate(-1)} className="icon-btn" style={{border: '1px solid var(--color-border)', background: 'transparent', width: 40, height: 40}}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold m-0 flex-1 text-center pr-10" style={{ fontSize: '1.25rem' }}>My Orders</h1>
      </header>

      {/* Tabs */}
      <div className="flex justify-between px-4" style={{ borderBottom: '1px solid var(--color-border)', paddingTop: '16px' }}>
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="font-medium"
            style={{
              fontSize: '16px',
              paddingBottom: '16px',
              borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
              background: 'transparent',
              marginBottom: '-1px'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <main className="px-4 py-4">
        {orders.map((order, index) => (
          <div key={order.id}>
            <div className="flex gap-5" style={{ padding: '24px 0' }}>
              <div 
                style={{
                  width: '90px', 
                  height: '90px', 
                  borderRadius: 'var(--radius-lg)', 
                  background: 'var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  flexShrink: 0
                }}
              >
                <img src={order.image} alt={order.title} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
              
              <div className="flex flex-col flex-1 pl-2" style={{ minWidth: 0 }}>
                <div style={{ minWidth: 0 }}>
                  <h3 className="font-semibold m-0 mb-1 text-text-main" style={{ fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.title}</h3>
                  <p className="text-sm text-text-muted m-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.category} | Qty. : {order.qty < 10 ? `0${order.qty}` : order.qty} pcs</p>
                </div>
                
                <div className="flex flex-wrap justify-between w-100" style={{ alignItems: 'center', marginTop: 'auto', gap: '8px' }}>
                  <span className="font-bold" style={{ fontSize: '18px' }}>${order.price.toFixed(2)}</span>
                  <button 
                    className="btn-primary-small" 
                    style={{ padding: '8px 16px', fontSize: '0.875rem', height: 'auto', borderRadius: '100px', lineHeight: 1 }}
                    onClick={() => navigate(`/track-order/${order.id}`)}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
            
            {index < orders.length - 1 && (
              <div style={{ height: 1, width: '100%', background: 'var(--color-border)', opacity: 0.5 }} />
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
