import { Heart, MessageCircle, Share, MoreHorizontal, Smile } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface PostProps {
  id: string;
  category: string;
  caption: string;
  username: string;
  university: string;
  reactions: {
    heart: number;
    laugh: number;
    shock: number;
    cry: number;
  };
  comments: Array<{
    username: string;
    text: string;
  }>;
  timestamp?: string;
}

export function Post({ category, caption, username, university, reactions, comments, timestamp = "2h" }: PostProps) {
  const [liked, setLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  
  const categoryColors = {
    'Confession': 'bg-rose-100 text-rose-700',
    'Secret': 'bg-purple-100 text-purple-700',
    'Complaint': 'bg-orange-100 text-orange-700',
    'Rant': 'bg-amber-100 text-amber-700',
  };

  const totalReactions = reactions.heart + reactions.laugh + reactions.shock + reactions.cry;

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-card border-0 rounded-none border-b border-border/30">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-full flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {username.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{username}</span>
              <Badge 
                variant="secondary" 
                className={`${categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700'} 
                  text-xs px-2 py-0.5 rounded-full font-medium border-0`}
              >
                {category}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{university}</span>
              <span>•</span>
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-accent rounded-full transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground leading-relaxed">{caption}</p>
      </div>

      {/* Reaction Summary */}
      {totalReactions > 0 && (
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {reactions.heart > 0 && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-sm border-2 border-card">
                    ❤️
                  </div>
                )}
                {reactions.laugh > 0 && (
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-sm border-2 border-card">
                    😂
                  </div>
                )}
                {reactions.shock > 0 && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm border-2 border-card">
                    😮
                  </div>
                )}
                {reactions.cry > 0 && (
                  <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-sm border-2 border-card">
                    😢
                  </div>
                )}
              </div>
              <span className="font-medium text-foreground">{totalReactions}</span>
            </div>
            {comments.length > 0 && (
              <button className="hover:underline">
                {comments.length} comment{comments.length !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Action Bar - Moved outside */}
      <div className="border-t border-border/30 bg-card">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center">
            <div className="relative">
              <button 
                onClick={handleLike}
                className={`p-3 rounded-full transition-all duration-200 hover:bg-accent ${
                  liked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
                }`}
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                <Heart 
                  size={24} 
                  fill={liked ? 'currentColor' : 'none'} 
                  strokeWidth={liked ? 0 : 1.5}
                />
              </button>
              
              {/* Reaction Picker */}
              {showReactions && (
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-full px-4 py-2 shadow-xl z-20 flex gap-2">
                  <button className="hover:scale-125 transition-transform text-lg">❤️</button>
                  <button className="hover:scale-125 transition-transform text-lg">😂</button>
                  <button className="hover:scale-125 transition-transform text-lg">😮</button>
                  <button className="hover:scale-125 transition-transform text-lg">😢</button>
                </div>
              )}
            </div>
            
            <button className="p-3 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              <MessageCircle size={24} strokeWidth={1.5} />
            </button>
            
            <button className="p-3 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              <Share size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {comments.length > 0 && (
        <div className="px-4 pb-4 bg-card">
          <div className="space-y-2">
            {comments.slice(0, 2).map((comment, index) => (
              <div key={index} className="text-sm leading-relaxed">
                <span className="font-semibold text-foreground mr-2">{comment.username}</span>
                <span className="text-foreground">{comment.text}</span>
              </div>
            ))}
          </div>
          {comments.length > 2 && (
            <button className="text-sm text-muted-foreground hover:text-foreground mt-2 transition-colors">
              View all {comments.length} comments
            </button>
          )}
        </div>
      )}
    </div>
  );
}