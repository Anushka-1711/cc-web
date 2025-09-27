import { useState, useEffect } from 'react';
import { BottomNavigation } from './components/BottomNavigation';
import { HomeFeed } from './components/HomeFeed';
import { Communities } from './components/Communities';
import { CreatePost } from './components/CreatePost';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';

type AppState = 'auth' | 'main';
type AuthState = 'login' | 'signup';

export default function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [authState, setAuthState] = useState<AuthState>('login');
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    // In a real app, you'd check localStorage, cookies, or API for auth state
    const checkAuthState = () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

        if (isAuthenticated) {
          setAppState('main');
        } else {
          setAppState('auth');
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        // Default to auth state if localStorage fails
        setAppState('auth');
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to prevent flickering
    const timeoutId = setTimeout(checkAuthState, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleLogin = () => {
    try {
      localStorage.setItem('isAuthenticated', 'true');
      setAppState('main');
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  const handleSignup = () => {
    try {
      localStorage.setItem('isAuthenticated', 'true');
      setAppState('main');
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeFeed />;
      case 'communities':
        return <Communities />;
      case 'create':
        return <CreatePost onBack={() => setActiveTab('home')} />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      default:
        return <HomeFeed />;
    }
  };

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <div className="h-screen max-w-sm mx-auto bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">C</span>
          </div>
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Render authentication screens
  if (appState === 'auth') {
    if (authState === 'login') {
      return (
        <div className="h-screen max-w-sm mx-auto bg-background">
          <Login 
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthState('signup')}
          />
        </div>
      );
    } else {
      return (
        <div className="h-screen max-w-sm mx-auto bg-background">
          <Signup 
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthState('login')}
          />
        </div>
      );
    }
  }



  // Render main app
  return (
    <div className="h-screen max-w-sm mx-auto bg-background flex flex-col relative">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {renderActiveTab()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}