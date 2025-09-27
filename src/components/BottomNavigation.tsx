import { Home, Users, Plus, Bell, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'communities', icon: Users, label: 'Explore' },
    { id: 'create', icon: Plus, label: 'Create' },
    { id: 'notifications', icon: Bell, label: 'Activity' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl shadow-black/10">
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-around px-2 py-1 safe-area-pb">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-3 px-3 transition-all duration-200 min-w-0 flex-1 ${
                activeTab === id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground active:scale-95'
              }`}
            >
              {id === 'create' ? (
                <div className={`p-2 rounded-lg transition-all duration-200 ${
                  activeTab === id 
                    ? 'bg-primary text-primary-foreground scale-105' 
                    : 'bg-transparent hover:bg-accent'
                }`}>
                  <Icon 
                    size={20} 
                    strokeWidth={2}
                  />
                </div>
              ) : (
                <Icon 
                  size={26} 
                  className={`transition-all duration-200 ${
                    activeTab === id ? 'scale-105' : ''
                  }`}
                  strokeWidth={activeTab === id ? 2.5 : 1.5}
                  fill={activeTab === id ? 'currentColor' : 'none'}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}