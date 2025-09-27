import { useState } from 'react';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const categories = ['Confession', 'Secret', 'Complaint', 'Rant', 'Question', 'Advice'];
const universities = [
  'Delhi University',
  'Panjab University', 
  'Chandigarh University',
  'Amity University',
  'Lovely Professional University',
  'BHU Varanasi'
];

interface CreatePostProps {
  onBack: () => void;
}

export function CreatePost({ onBack }: CreatePostProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [caption, setCaption] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSubmit = () => {
    // Handle post submission
    console.log({
      category: selectedCategory,
      university: selectedUniversity,
      caption,
      isAnonymous
    });
    onBack();
  };

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/50 px-6 py-4 z-10">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack} 
              className="p-2 hover:bg-accent/60 rounded-xl transition-all duration-200 active:scale-95"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </button>
            <h1 className="text-lg font-semibold">Create Post</h1>
            <Button 
              onClick={handleSubmit}
              disabled={!selectedCategory || !caption.trim()}
              size="sm"
              className="px-5 py-2 rounded-xl font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 space-y-8 max-w-sm mx-auto">
        {/* Anonymous Toggle */}
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[16px]">Anonymous Post</h3>
              <p className="text-sm text-muted-foreground mt-1">Hide your identity from others</p>
            </div>
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`w-14 h-7 rounded-full transition-all duration-200 relative ${
                isAnonymous ? 'bg-primary shadow-sm' : 'bg-switch-background'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-all duration-200 absolute top-1 shadow-sm ${
                isAnonymous ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Category Selection */}
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <h3 className="font-semibold text-[16px] mb-4">Category</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                  selectedCategory === category 
                    ? 'border-primary bg-primary/8 text-primary' 
                    : 'border-border/60 hover:border-border text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* University Selection */}
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <h3 className="font-semibold text-[16px] mb-4">University</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {universities.map(university => (
              <button
                key={university}
                onClick={() => setSelectedUniversity(university)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm ${
                  selectedUniversity === university
                    ? 'border-primary bg-primary/8 text-primary font-medium'
                    : 'border-border/60 hover:border-border text-foreground hover:bg-accent/50'
                }`}
              >
                {university}
              </button>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <h3 className="font-semibold text-[16px] mb-4">What's on your mind?</h3>
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Share your thoughts anonymously..."
            className="min-h-32 resize-none border-border/60 rounded-xl bg-input-background focus:bg-background transition-colors"
          />
          <div className="flex justify-between items-center mt-4">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent/50">
              <ImageIcon size={18} />
              <span className="text-sm font-medium">Add image</span>
            </button>
            <span className={`text-xs font-medium ${
              caption.length > 450 ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {caption.length}/500
            </span>
          </div>
        </div>

        {/* Preview */}
        {selectedCategory && caption && (
          <div className="bg-accent/30 border border-accent rounded-2xl p-6">
            <h3 className="font-semibold text-[16px] mb-4">Preview</h3>
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1.5 text-xs font-medium">
                {selectedCategory}
              </Badge>
              <p className="text-foreground mb-4 leading-relaxed text-[15px]">{caption}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-muted-foreground">
                  {isAnonymous ? 'Anon123' : 'Your Name'}
                </span>
                {selectedUniversity && (
                  <>
                    <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
                    <Badge variant="outline" className="text-xs rounded-full border-border/60 text-muted-foreground px-2.5 py-0.5">
                      {selectedUniversity}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}