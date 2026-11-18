import { ArrowLeft, Bell, Lock, Globe, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="pb-32">
      <header className="py-4 flex align-center px-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold m-0 flex-1 text-center pr-10">Settings</h1>
      </header>

      <main className="p-4">
        <div className="premium-card mb-6">
          <SettingRow icon={<Bell size={20}/>} label="Notifications" />
          <SettingRow icon={<Lock size={20}/>} label="Privacy & Security" />
          <SettingRow icon={<Globe size={20}/>} label="Language & Region" />
          <SettingRow icon={<Moon size={20}/>} label="Appearance" borderBottom={false} />
        </div>

        <div className="premium-card mb-6">
          <SettingRow label="Help & Support" icon={null} />
          <SettingRow label="About Fashion Assistant" icon={null} borderBottom={false} />
        </div>
      </main>
    </div>
  );
}

function SettingRow({icon, label, borderBottom = true}) {
  return (
    <div className="flex align-center gap-3 p-4" style={{borderBottom: borderBottom ? '1px solid var(--color-border)' : 'none', cursor: 'pointer'}}>
      {icon && icon}
      <span className="font-medium flex-1">{label}</span>
      <span className="text-muted">&rsaquo;</span>
    </div>
  );
}
