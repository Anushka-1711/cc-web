import { Post } from './Post';

const mockPosts = [
  {
    id: '1',
    category: 'Secret',
    caption: 'Sometimes I just walk around campus pretending I\'m in a music video.',
    username: 'Anon247',
    university: 'Amity University',
    reactions: { heart: 54, laugh: 12, shock: 0, cry: 1 },
    comments: [
      { username: 'Anon892', text: 'I do this literally every day 😂' },
      { username: 'Anon456', text: 'Which song though?' }
    ]
  },
  {
    id: '2',
    category: 'Complaint',
    caption: 'Mess food is getting worse every week. Can\'t survive on this anymore.',
    username: 'Anon891',
    university: 'Chandigarh University',
    reactions: { heart: 18, laugh: 0, shock: 0, cry: 9 },
    comments: [
      { username: 'Anon342', text: 'Same here, thinking of ordering outside everyday' }
    ]
  },
  {
    id: '3',
    category: 'Confession',
    caption: 'I confessed to my crush but now I regret it... they said they need time to think and it\'s been 2 weeks.',
    username: 'Anon523',
    university: 'Panjab University',
    reactions: { heart: 32, laugh: 0, shock: 5, cry: 8 },
    comments: [
      { username: 'Anon123', text: 'At least you were brave enough to say it!' },
      { username: 'Anon778', text: 'Give them space, maybe they\'re figuring things out' }
    ]
  },
  {
    id: '4',
    category: 'Confession',
    caption: 'I failed my exam but pretended to my parents that I aced it. Feeling guilty.',
    username: 'Anon156',
    university: 'Delhi University',
    reactions: { heart: 23, laugh: 5, shock: 2, cry: 8 },
    comments: [
      { username: 'Anon342', text: 'Same happened to me once... the guilt ate me alive' },
      { username: 'Anon667', text: 'You should tell them, they\'ll understand' }
    ]
  },
  {
    id: '5',
    category: 'Secret',
    caption: 'I have a huge crush on my lab partner but they have no idea. We work so well together but I\'m too scared to ruin it.',
    username: 'Anon889',
    university: 'Lovely Professional University',
    reactions: { heart: 41, laugh: 2, shock: 1, cry: 3 },
    comments: [
      { username: 'Anon445', text: 'Maybe start with being friends outside lab?' },
      { username: 'Anon234', text: 'Lab partners who date are either perfect or disaster, no in-between' }
    ]
  },
  {
    id: '6',
    category: 'Rant',
    caption: 'Why do professors think we have no other subjects? Assignment deadlines all in the same week!',
    username: 'Anon677',
    university: 'BHU Varanasi',
    reactions: { heart: 67, laugh: 15, shock: 1, cry: 12 },
    comments: [
      { username: 'Anon998', text: 'Final year problems 😭' },
      { username: 'Anon112', text: 'They probably planned it together' }
    ]
  }
];

export function HomeFeed() {
  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border z-10">
        <div className="max-w-sm mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground tracking-wide">Confess</h1>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-accent rounded-full transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-accent rounded-full transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-sm mx-auto">
        {mockPosts.map(post => (
          <Post key={post.id} {...post} timestamp="2h" />
        ))}
        
        {/* End of feed indicator */}
        <div className="text-center py-8 bg-card border-b border-border/30">
          <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-3 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-sm text-muted-foreground font-medium">You're all caught up!</p>
          <p className="text-xs text-muted-foreground mt-1">Check back later for new confessions</p>
        </div>
      </div>
    </div>
  );
}