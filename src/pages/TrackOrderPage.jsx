import { ArrowLeft, ClipboardList, Package, Truck, PackageCheck, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TrackOrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = { 
    title: 'Arm Chair', 
    category: 'Chair', 
    qty: 2, 
    price: 180.00, 
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80' 
  };

  const steps = [
    { title: 'Order Placed', time: '23 Sep 2023, 04:25 PM', icon: ClipboardList, completed: true },
    { title: 'In Progress', time: '23 Sep 2023, 03:54 PM', icon: Package, completed: true },
    { title: 'Shipped', time: 'Expected 24 Sep 2023', icon: Truck, completed: false },
    { title: 'Delivered', time: '24 Sep 2023, 2023', icon: PackageCheck, completed: false },
  ];

  return (
    <div className="pb-16 bg-background min-h-screen">
      <header className="py-4 flex align-center px-4 bg-background z-50">
        <button onClick={() => navigate(-1)} className="icon-btn" style={{border: '1px solid var(--color-border)', background: 'transparent', width: 40, height: 40}}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold m-0 flex-1 text-center pr-10">Track Order</h1>
      </header>

      <main className="px-4 py-2">
        {/* Item Summary */}
        <div className="flex gap-4 py-2">
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
            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          
          <div className="flex flex-col justify-center flex-1">
            <h3 className="text-sm font-semibold m-0 mb-1 text-text-main">{item.title}</h3>
            <p className="text-xs text-text-muted m-0 mb-2">{item.category} | Qty. : {item.qty < 10 ? `0${item.qty}` : item.qty} pcs</p>
            <span className="font-bold text-sm">${item.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="my-6" style={{ height: 1, width: '100%', background: 'var(--color-border)', opacity: 0.5 }} />

        {/* Order Details */}
        <section className="mb-6">
          <h3 className="text-base font-semibold mb-4">Order Details</h3>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-text-muted font-medium">Expected Delivery Date</span>
            <span className="text-sm font-semibold">03 Sep 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-muted font-medium">Tracking ID</span>
            <span className="text-sm font-bold">TRK452126542</span>
          </div>
        </section>

        <div className="my-6" style={{ height: 1, width: '100%', background: 'var(--color-border)', opacity: 0.5 }} />

        {/* Order Status */}
        <section>
          <h3 className="text-base font-semibold mb-6">Order Status</h3>
          
          <div className="relative pl-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex mb-8 relative">
                  {/* Vertical Line */}
                  {index < steps.length - 1 && (
                    <div 
                      style={{
                        position: 'absolute',
                        left: '11px',
                        top: '24px',
                        bottom: '-32px',
                        width: '3px',
                        background: step.completed ? 'var(--color-primary)' : 'var(--color-border)',
                        zIndex: 0
                      }}
                    />
                  )}

                  {/* Dot */}
                  <div className="relative z-10 mr-4 flex flex-col align-center mt-1">
                    <div 
                      style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: step.completed ? 'var(--color-primary)' : 'var(--color-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-background)'
                      }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex justify-between align-start">
                    <div>
                      <h4 className="m-0 text-sm font-semibold mb-1" style={{ color: 'var(--color-text-main)' }}>{step.title}</h4>
                      <p className="m-0 text-xs text-text-muted">{step.time}</p>
                    </div>
                    <div style={{ color: step.completed ? 'var(--color-primary)' : 'var(--color-text-muted)', opacity: step.completed ? 1 : 0.6 }}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
