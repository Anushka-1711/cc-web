import { useState, useEffect } from 'react';
import { Settings, Lock, Eye, Plus } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const anonymousPosts = [
  {
    id: '1',
    category: 'Secret',
    caption: 'I had a crush on my lab partner but never said it.',
    university: 'Lovely Professional University',
    reactions: { heart: 12, laugh: 2, shock: 1, cry: 0 },
    timestamp: '2 days ago'
  },
  {
    id: '2',
    category: 'Confession',
    caption: 'Sometimes I skip classes just to sit in the library and read random books.',
    university: 'Lovely Professional University',
    reactions: { heart: 8, laugh: 5, shock: 0, cry: 1 },
    timestamp: '1 week ago'
  },
  {
    id: '3',
    category: 'Rant',
    caption: 'Why do group projects always end up with one person doing all the work?',
    university: 'Lovely Professional University',
    reactions: { heart: 23, laugh: 7, shock: 2, cry: 3 },
    timestamp: '2 weeks ago'
  }
];

const nonAnonymousPosts = [
  {
    id: '1',
    caption: 'Great seminar on AI today! Really inspired by the guest speaker.',
    likes: 15,
    comments: 3,
    timestamp: '1 day ago'
  },
  {
    id: '2',
    caption: 'Anyone up for a study group for the upcoming data structures exam?',
    likes: 8,
    comments: 12,
    timestamp: '3 days ago'
  }
];

const privateConfessions = [
  {
    id: '1',
    text: 'Your presentation skills are really impressive. I wish I could be that confident.',
    recipient: 'Alex',
    timestamp: '1 day ago',
    status: 'sent'
  },
  {
    id: '2',
    text: 'I think you have great taste in music. Always curious about your playlists.',
    recipient: 'Sarah',
    timestamp: '3 days ago',
    status: 'read'
  }
];

export function Profile() {
  const [activeTab, setActiveTab] = useState('anonymous');
  const [selectedSchool, setSelectedSchool] = useState<any>(null);

  useEffect(() => {
    // Load selected school from localStorage
    try {
      const savedSchool = localStorage.getItem('selectedSchool');
      if (savedSchool) {
        setSelectedSchool(JSON.parse(savedSchool));
      }
    } catch (error) {
      console.error('Error loading school from localStorage:', error);
    }
  }, []);

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border px-4 py-3 z-10">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">anon_user123</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-accent rounded-full transition-colors">
                <Plus size={24} strokeWidth={2} />
              </button>
              <button className="p-2 hover:bg-accent rounded-full transition-colors">
                <Settings size={24} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-card border-b border-border px-4 py-6 max-w-sm mx-auto">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-full flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">JD</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <div className="text-lg font-bold text-foreground">12</div>
                <div className="text-xs text-muted-foreground">posts</div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">3</div>
                <div className="text-xs text-muted-foreground">confessions</div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">7d</div>
                <div className="text-xs text-muted-foreground">streak</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="font-bold text-foreground">Anonymous User</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sharing thoughts anonymously ✨
          </p>
          <Badge variant="outline" className="text-xs mt-2 border-border px-2 py-1">
            {selectedSchool?.name || 'Lovely Professional University'}
          </Badge>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
            Edit Profile
          </button>
          <button className="flex-1 bg-accent text-accent-foreground py-2 px-4 rounded-lg font-semibold text-sm hover:bg-accent/80 transition-colors">
            Share Profile
          </button>
        </div>
        
        {/* Logout button for testing */}
        <button 
          onClick={() => {
            try {
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('hasCompletedOnboarding');
              localStorage.removeItem('selectedSchool');
              window.location.reload();
            } catch (error) {
              console.error('Error during logout:', error);
              // Force reload even if localStorage fails
              window.location.reload();
            }
          }}
          className="w-full bg-destructive text-destructive-foreground py-2 px-4 rounded-lg font-semibold text-sm hover:bg-destructive/90 transition-colors mt-4"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="w-full bg-card border-b border-border/50 rounded-none h-14 max-w-sm mx-auto px-6">
          <TabsTrigger value="anonymous" className="flex-1 gap-2 py-3 data-[state=active]:bg-primary/8 data-[state=active]:text-primary rounded-xl font-medium">
            <Lock size={16} />
            Anonymous
          </TabsTrigger>
          <TabsTrigger value="public" className="flex-1 gap-2 py-3 data-[state=active]:bg-primary/8 data-[state=active]:text-primary rounded-xl font-medium">
            <Eye size={16} />
            Public
          </TabsTrigger>
        </TabsList>

        <TabsContent value="anonymous" className="px-4 py-2 space-y-4 max-w-sm mx-auto">
          {anonymousPosts.map(post => (
            <div key={post.id} className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
              <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1.5 text-xs font-medium">
                {post.category}
              </Badge>
              <p className="text-foreground mb-4 leading-relaxed text-[15px]">{post.caption}</p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-medium">Anon</span>
                  <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
                  <span>{post.university}</span>
                </div>
                <span className="text-muted-foreground font-medium">{post.timestamp}</span>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <span className="flex items-center gap-1">❤️ <span className="font-medium">{post.reactions.heart}</span></span>
                <span className="flex items-center gap-1">😂 <span className="font-medium">{post.reactions.laugh}</span></span>
                <span className="flex items-center gap-1">😮 <span className="font-medium">{post.reactions.shock}</span></span>
                <span className="flex items-center gap-1">😢 <span className="font-medium">{post.reactions.cry}</span></span>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="public" className="px-4 py-2 space-y-4 max-w-sm mx-auto">
          {nonAnonymousPosts.map(post => (
            <div key={post.id} className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">John Doe</div>
                  <div className="text-xs text-muted-foreground font-medium">{post.timestamp}</div>
                </div>
              </div>
              <p className="text-foreground mb-4 leading-relaxed text-[15px]">{post.caption}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">❤️ <span className="font-medium">{post.likes}</span></span>
                <span className="flex items-center gap-1">💬 <span className="font-medium">{post.comments}</span></span>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Private Confessions Section */}
      <div className="px-4 py-6 max-w-sm mx-auto">
        <h3 className="font-semibold text-[16px] mb-4 flex items-center gap-2">
          <Lock size={18} />
          Private Confessions
        </h3>
        <div className="space-y-4">
          {privateConfessions.map(confession => (
            <div key={confession.id} className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">To {confession.recipient}</span>
                <Badge 
                  variant={confession.status === 'read' ? 'default' : 'secondary'} 
                  className={`text-xs px-2.5 py-1 font-medium ${
                    confession.status === 'read' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {confession.status}
                </Badge>
              </div>
              <p className="text-sm text-foreground mb-3 leading-relaxed">{confession.text}</p>
              <span className="text-xs text-muted-foreground font-medium">{confession.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}