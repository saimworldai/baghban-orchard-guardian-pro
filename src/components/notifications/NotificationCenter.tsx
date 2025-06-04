
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock,
  Settings,
  Filter
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type NotificationType = 'alert' | 'info' | 'success' | 'warning';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'weather' | 'disease' | 'schedule' | 'expert' | 'system';
  actionable?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High Wind Alert',
    message: 'Wind speeds will exceed 15 km/h tomorrow morning. Consider rescheduling spray applications.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    priority: 'high',
    category: 'weather',
    actionable: true,
    actionLabel: 'View Weather',
    onAction: () => toast.info('Opening weather details...')
  },
  {
    id: '2',
    type: 'info',
    title: 'Perfect Spray Window',
    message: 'Optimal conditions detected for today 2:00 PM - 4:00 PM. Temperature: 22°C, Wind: 8 km/h',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    priority: 'medium',
    category: 'weather',
    actionable: true,
    actionLabel: 'Schedule Spray',
    onAction: () => toast.info('Opening spray scheduler...')
  },
  {
    id: '3',
    type: 'alert',
    title: 'Disease Detection Alert',
    message: 'Potential apple scab detected in Block A. Immediate attention recommended.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    read: true,
    priority: 'high',
    category: 'disease',
    actionable: true,
    actionLabel: 'View Details',
    onAction: () => toast.info('Opening disease analysis...')
  },
  {
    id: '4',
    type: 'success',
    title: 'Expert Consultation Confirmed',
    message: 'Dr. Sarah Johnson has confirmed your consultation for tomorrow at 3:00 PM.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    read: true,
    priority: 'medium',
    category: 'expert'
  },
  {
    id: '5',
    type: 'info',
    title: 'Weekly Report Ready',
    message: 'Your orchard performance summary for this week is available for review.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    priority: 'low',
    category: 'system'
  }
];

type NotificationCenterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'alert': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.read;
      case 'high': return notification.priority === 'high';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success('All notifications marked as read');
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Notification dismissed');
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="shadow-2xl border-0 max-h-[80vh] overflow-hidden">
            <CardHeader className="pb-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-blue-600" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark All Read
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant={filter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className="text-xs"
                >
                  All ({notifications.length})
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('unread')}
                  className="text-xs"
                >
                  Unread ({unreadCount})
                </Button>
                <Button
                  variant={filter === 'high' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('high')}
                  className="text-xs"
                >
                  High Priority ({highPriorityCount})
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 max-h-[60vh] overflow-y-auto">
              <div className="space-y-1">
                {filteredNotifications.map((notification, index) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`p-4 border-l-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-blue-50/30' : ''
                      } ${getNotificationColor(notification.type)}`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {notification.category}
                                </Badge>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissNotification(notification.id);
                              }}
                              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {notification.actionable && (
                            <div className="mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  notification.onAction?.();
                                }}
                                className="text-xs"
                              >
                                {notification.actionLabel}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                
                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="font-medium text-gray-700 mb-2">No notifications</h3>
                    <p className="text-sm">
                      {filter === 'unread' 
                        ? "All caught up! No unread notifications." 
                        : filter === 'high'
                        ? "No high priority notifications."
                        : "You're all set! No notifications to show."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
