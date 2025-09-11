import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing, X, CheckCircle, AlertTriangle, Info, Cloud, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'weather' | 'disease' | 'reminder' | 'expert' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  actionable?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'weather',
    title: 'Weather Alert',
    message: 'Heavy rain expected tomorrow. Consider covering sensitive crops.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    priority: 'high',
    read: false,
    actionable: true
  },
  {
    id: '2',
    type: 'disease',
    title: 'Disease Detection',
    message: 'Potential blight detected in your tomato plants. Review diagnosis.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    priority: 'high',
    read: false,
    actionable: true
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Watering Reminder',
    message: 'Time to water your greenhouse plants.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    priority: 'medium',
    read: true,
    actionable: false
  },
  {
    id: '4',
    type: 'expert',
    title: 'Expert Response',
    message: 'Dr. Smith responded to your consultation about pest control.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    priority: 'medium',
    read: false,
    actionable: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'weather': return Cloud;
    case 'disease': return Bug;
    case 'reminder': return CheckCircle;
    case 'expert': return Info;
    default: return Bell;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-destructive border-destructive/20';
    case 'medium': return 'text-warning border-warning/20';
    case 'low': return 'text-muted-foreground border-muted/20';
    default: return 'text-muted-foreground border-muted/20';
  }
};

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="icon"
        className="relative hover:bg-primary/10"
      >
        {unreadCount > 0 ? (
          <BellRing className="h-4 w-4" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
        
        {unreadCount > 0 && (
          <Badge
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Notifications Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-12 z-50 w-80 max-h-96 overflow-hidden"
            >
              <Card className="p-0 glass border-primary/20 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-primary/10">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        onClick={markAllAsRead}
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        Mark all read
                      </Button>
                    )}
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex border-b border-primary/10">
                  {[
                    { key: 'all', label: 'All', count: notifications.length },
                    { key: 'unread', label: 'Unread', count: unreadCount },
                    { key: 'high', label: 'Priority', count: highPriorityCount }
                  ].map(({ key, label, count }) => (
                    <button
                      key={key}
                      onClick={() => setFilter(key as any)}
                      className={cn(
                        "flex-1 px-3 py-2 text-xs font-medium transition-colors",
                        filter === key
                          ? "text-primary border-b-2 border-primary bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      {label} {count > 0 && `(${count})`}
                    </button>
                  ))}
                </div>

                {/* Notifications List */}
                <div className="max-h-64 overflow-y-auto">
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-1 p-2">
                      {filteredNotifications.map((notification) => {
                        const Icon = getNotificationIcon(notification.type);
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn(
                              "relative p-3 rounded-lg border cursor-pointer transition-all hover:bg-accent/50",
                              !notification.read ? "bg-primary/5 border-primary/20" : "bg-background/50",
                              getPriorityColor(notification.priority)
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm font-medium truncate">
                                    {notification.title}
                                  </p>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeNotification(notification.id);
                                    }}
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  {notification.actionable && (
                                    <Badge variant="outline" className="text-xs">
                                      Action required
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}