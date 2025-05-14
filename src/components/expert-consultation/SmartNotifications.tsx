
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, AlertTriangle, Calendar, Clock, MessageSquare, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from '@/components/ui/sonner';
import { Switch } from "@/components/ui/switch";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'reminder' | 'tip' | 'followup';
  priority: 'high' | 'medium' | 'low';
  date: string;
  read: boolean;
  actionText?: string;
  actionFn?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Disease Alert: Apple Scab',
    message: 'Apple Scab has been reported in your region. Consider consulting an expert for preventive measures.',
    type: 'alert',
    priority: 'high',
    date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: false,
    actionText: 'Consult Now',
    actionFn: () => toast.info("Connecting you with a plant pathology expert")
  },
  {
    id: '2',
    title: 'Consultation Reminder',
    message: 'Your scheduled consultation with Dr. Sarah Khan is tomorrow at 10:30 AM.',
    type: 'reminder',
    priority: 'medium',
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true,
    actionText: 'View Details',
    actionFn: () => toast.info("Viewing your upcoming consultation details")
  },
  {
    id: '3',
    title: 'Follow-up: Pest Control',
    message: 'It\'s been 7 days since your consultation about aphid control. How are your trees responding to the treatment?',
    type: 'followup',
    priority: 'medium',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    read: false,
    actionText: 'Report Back',
    actionFn: () => toast.info("Reporting back on your treatment results")
  },
  {
    id: '4',
    title: 'Seasonal Tip: Winter Preparation',
    message: 'Now is the ideal time to prepare your apple trees for the upcoming winter season. Check out our expert tips.',
    type: 'tip',
    priority: 'low',
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    read: true,
    actionText: 'View Tips',
    actionFn: () => toast.info("Showing winter preparation tips")
  }
];

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showAll, setShowAll] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const displayedNotifications = showAll ? notifications : notifications.filter(n => !n.read);
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };
  
  const handleNotificationAction = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionFn) {
      notification.actionFn();
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'reminder':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'followup':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'tip':
        return <Star className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    
    return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-700">Smart Notifications</h3>
          {unreadCount > 0 && (
            <Badge className="bg-red-100 text-red-800">{unreadCount} new</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Notifications</span>
            <Switch 
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {!notificationsEnabled ? (
        <Card>
          <CardContent className="p-8 flex flex-col items-center text-center text-gray-500">
            <BellOff className="h-12 w-12 mb-3 text-gray-400" />
            <p>Notifications are currently disabled</p>
            <Button 
              variant="link"
              onClick={() => setNotificationsEnabled(true)}
            >
              Enable notifications
            </Button>
          </CardContent>
        </Card>
      ) : displayedNotifications.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {displayedNotifications.map(notification => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500">
                              {getTimeAgo(notification.date)}
                            </span>
                            {notification.priority === 'high' && (
                              <Badge className="ml-2 bg-red-100 text-red-800">Urgent</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm my-1">
                          {notification.message}
                        </p>
                        {notification.actionText && (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-sm"
                            onClick={() => handleNotificationAction(notification)}
                          >
                            {notification.actionText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {notifications.length > displayedNotifications.length ? (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowAll(true)}
            >
              Show {notifications.length - displayedNotifications.length} more notifications
            </Button>
          ) : showAll && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowAll(false)}
            >
              Show only unread
            </Button>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 flex flex-col items-center text-center text-gray-500">
            <Bell className="h-12 w-12 mb-3 text-gray-400" />
            <p>No new notifications</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
