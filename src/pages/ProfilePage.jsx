import { useNavigate } from 'react-router-dom';
import { User, Zap, Settings, Package, Heart, LogOut, CreditCard, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import AICard from '../components/AICard';

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="profile-page pb-32">
      <header className="header header-solid" style={{position: 'static', transform: 'none', width: '100%', padding: '16px'}}>
        <h1 className="text-lg font-semibold text-center m-0">Profile</h1>
      </header>

      <main className="p-4">
        {/* User Info */}
        <div className="flex gap-4 align-center mb-6">
          <div className="avatar" style={{width: 72, height: 72, fontSize: '1.5rem'}}>A</div>
          <div>
            <h2 className="text-lg font-semibold m-0">Alisha Smith</h2>
            <p className="text-muted text-sm m-0">alisha@example.com</p>
          </div>
        </div>

        {/* AI Profile CTA */}
        {/* AI Profile CTA */}
        <div className="mb-6">
          <AICard 
            title="My Body Profile"
            subtitle="Manage your AI avatar and measurements"
            onClick={() => navigate('/body-profile')}
            iconSize={20}
          >
            <button className="btn-primary-small">View</button>
          </AICard>
        </div>

        {/* Menu Items */}
        <div className="premium-card mb-6">
          <MenuRow icon={<Package size={20}/>} label="My Orders" onClick={() => navigate('/profile/orders')} />
          <MenuRow icon={<Heart size={20}/>} label="Wishlist" onClick={() => navigate('/wishlist')} />
          <MenuRow icon={<MapPin size={20}/>} label="Shipping Addresses" onClick={() => navigate('/profile/addresses')} />
          <MenuRow icon={<CreditCard size={20}/>} label="Payment Methods" borderBottom={false} onClick={() => navigate('/profile/payment')} />
        </div>

        <div className="premium-card mb-6">
          <MenuRow icon={<Settings size={20}/>} label="Settings" onClick={() => navigate('/profile/settings')} />
          <MenuRow icon={<LogOut size={20} className="text-error"/>} label="Log Out" textColor="var(--color-error)" borderBottom={false} onClick={() => console.log('logout')} />
        </div>
      </main>
    </div>
  );
}

function MenuRow({icon, label, textColor, borderBottom = true, onClick}) {
  return (
    <div className="flex align-center gap-3 p-4" onClick={onClick} style={{borderBottom: borderBottom ? '1px solid var(--color-border)' : 'none', color: textColor || 'inherit', cursor: 'pointer'}}>
      {icon}
      <span className="font-medium flex-1">{label}</span>
      <span className="text-muted">&rsaquo;</span>
    </div>
  );
}
