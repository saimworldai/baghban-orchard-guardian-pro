import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthProvider';
import { Send, Paperclip, Image as ImageIcon, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

interface ChatInterfaceProps {
  consultationId: string;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export function ChatInterface({ consultationId, isMinimized = false, onToggleMinimize }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m here to help with your plant care questions. Feel free to share any concerns or photos.',
      sender_id: 'expert',
      sender_name: 'Dr. Smith',
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender_id: user.id,
      sender_name: user.email || 'You',
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate expert typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const expertReply: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message. I\'ll help you with that right away.',
        sender_id: 'expert',
        sender_name: 'Dr. Smith',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, expertReply]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={onToggleMinimize}
          className="bg-primary hover:bg-primary/90 shadow-lg rounded-full w-14 h-14"
        >
          <Send className="h-6 w-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="h-[500px] flex flex-col bg-background/95 backdrop-blur-sm border-primary/20">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-primary">Chat with Expert</CardTitle>
          {onToggleMinimize && (
            <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
              ─
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender_id === user?.id ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.sender_id === user?.id ? '' : '/placeholder.svg'} />
                      <AvatarFallback className="text-xs">
                        {message.sender_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`rounded-lg p-3 ${
                      message.sender_id === user?.id 
                        ? 'bg-primary text-primary-foreground ml-2' 
                        : 'bg-muted mr-2'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.sender_id === user?.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-xs">E</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={handleFileUpload}>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleFileUpload}>
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-input focus:border-primary"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Handle file upload logic here
              console.log('File selected:', file.name);
            }
          }}
        />
      </CardContent>
    </Card>
  );
}