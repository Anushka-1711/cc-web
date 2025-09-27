import { Users, ChevronRight, Plus } from 'lucide-react';
import { Badge } from './ui/badge';

const mockCommunities = [
  {
    id: '1',
    name: 'PU Confessions',
    description: 'Anonymous confessions from Panjab University students',
    memberCount: '2.3k',
    icon: '🏫',
    coverColor: 'bg-blue-100',
    posts: 156
  },
  {
    id: '2',
    name: 'Hostel Life',
    description: 'Share your hostel experiences and stories',
    memberCount: '1.8k',
    icon: '🏠',
    coverColor: 'bg-green-100',
    posts: 89
  },
  {
    id: '3',
    name: 'Exam Stress',
    description: 'Support group for dealing with academic pressure',
    memberCount: '3.1k',
    icon: '📚',
    coverColor: 'bg-orange-100',
    posts: 234
  },
  {
    id: '4',
    name: 'Campus Crushes',
    description: 'Anonymous crush confessions and dating advice',
    memberCount: '4.2k',
    icon: '💕',
    coverColor: 'bg-pink-100',
    posts: 312
  },
  {
    id: '5',
    name: 'Mess Food Reviews',
    description: 'Rate and review your campus mess food',
    memberCount: '987',
    icon: '🍽️',
    coverColor: 'bg-yellow-100',
    posts: 67
  },
  {
    id: '6',
    name: 'Late Night Thoughts',
    description: '3 AM philosophical discussions and random thoughts',
    memberCount: '1.5k',
    icon: '🌙',
    coverColor: 'bg-purple-100',
    posts: 198
  }
];

export function Communities() {
  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border px-4 py-3 z-10">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Explore</h1>
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Communities List */}
      <div className="max-w-sm mx-auto">
        {mockCommunities.map(community => (
          <div key={community.id} className="bg-card border-b border-border/30 hover:bg-accent/20 transition-colors cursor-pointer">
            {/* Cover */}
            <div className={`${community.coverColor} h-24 flex items-center justify-center relative`}>
              <span className="text-4xl">{community.icon}</span>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-foreground text-lg">{community.name}</h3>
                <ChevronRight size={20} className="text-muted-foreground mt-1 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {community.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users size={16} />
                    <span className="font-semibold">{community.memberCount}</span>
                  </div>
                  <div className="font-semibold">{community.posts} posts</div>
                </div>
                
                <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Community CTA */}
      <div className="p-4 max-w-sm mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus size={24} className="text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">Start Your Community</h3>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Create a safe space for anonymous discussions
          </p>
          <button className="bg-gradient-to-r from-primary to-purple-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-200 active:scale-95">
            Create Now
          </button>
        </div>
      </div>
    </div>
  );
}