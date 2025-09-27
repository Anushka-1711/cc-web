import {
  Heart,
  MessageCircle,
  UserPlus,
  ArrowUpRight,
  Bell,
} from "lucide-react";
import { Badge } from "./ui/badge";

const mockNotifications = [
  {
    id: "1",
    type: "reaction",
    icon: Heart,
    message: "Someone reacted ❤️ to your confession",
    post: "I had a crush on my lab partner but never...",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    icon: MessageCircle,
    message: "New comment on your post",
    post: "Sometimes I skip classes just to sit in...",
    comment:
      "Anon456: I do this too! Library is the best place to...",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "reshare",
    icon: ArrowUpRight,
    message: "Someone reshared your post",
    post: "Why do group projects always end up with...",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "private_confession",
    icon: MessageCircle,
    message: "You received a private confession",
    preview:
      "I think you have really good insights in class discussions...",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "reaction",
    icon: Heart,
    message: "Your post got 10 new reactions",
    post: "Great seminar on AI today! Really inspired...",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "6",
    type: "community",
    icon: UserPlus,
    message: 'New member joined "Exam Stress"',
    community: "Exam Stress",
    timestamp: "3 days ago",
    read: true,
  },
];

export function Notifications() {
  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border px-4 py-3 z-10">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Activity</h1>
            <button className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors">
              Mark all read
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-sm mx-auto">
        {mockNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`px-4 py-4 border-b border-border/30 hover:bg-accent/20 transition-all duration-200 cursor-pointer ${
                !notification.read ? "bg-primary/5" : "bg-background"
              }`}
            >
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-full flex items-center justify-center p-0.5 flex-shrink-0">
                  <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                    <Icon size={16} className="text-primary" strokeWidth={2} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>

                  {notification.post && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      "{notification.post}"
                    </p>
                  )}

                  {notification.comment && (
                    <div className="mt-2 p-2.5 bg-accent/50 rounded-lg">
                      <p className="text-xs text-foreground leading-relaxed">
                        {notification.comment}
                      </p>
                    </div>
                  )}

                  {notification.preview && (
                    <div className="mt-2 p-2.5 bg-primary/10 rounded-lg">
                      <p className="text-xs text-primary leading-relaxed">
                        "{notification.preview}"
                      </p>
                    </div>
                  )}

                  {notification.community && (
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className="text-xs border-border px-2 py-0.5"
                      >
                        {notification.community}
                      </Badge>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-2 font-medium">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {mockNotifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center px-6 max-w-sm mx-auto">
          <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
            <Bell size={28} className="text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">
            No notifications yet
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You'll see reactions, comments, and messages here
            when they arrive
          </p>
        </div>
      )}
    </div>
  );
}