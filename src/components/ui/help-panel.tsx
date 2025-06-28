
import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { 
  HelpCircle, 
  X, 
  Keyboard, 
  Search, 
  Navigation, 
  Zap,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const shortcuts = [
  { key: 'Ctrl + K', description: 'Open search', icon: Search },
  { key: 'Ctrl + H', description: 'Open help panel', icon: HelpCircle },
  { key: 'Ctrl + D', description: 'Go to dashboard', icon: Navigation },
  { key: 'Esc', description: 'Close modals/panels', icon: X },
];

const quickTips = [
  'Use voice commands by clicking the microphone icon',
  'Upload images directly to get instant disease detection',
  'Schedule consultations during off-peak hours for faster response',
  'Enable notifications for weather alerts in your area',
  'Use the mobile app for field work - it works offline too!'
];

export function HelpPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full w-12 h-12 p-0 shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white"
        aria-label="Open help panel"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-green-600" />
                    Help Center
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="p-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Keyboard Shortcuts */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Keyboard className="h-5 w-5 text-blue-600" />
                      Keyboard Shortcuts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {shortcuts.map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <shortcut.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{shortcut.description}</span>
                        </div>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {shortcut.key}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Tips */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      Quick Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Contact Support */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-green-800 mb-2">Need More Help?</h3>
                      <p className="text-sm text-green-700 mb-3">
                        Our expert team is available 24/7 to assist you
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          setIsOpen(false);
                          // Navigate to expert consultation
                          window.location.href = '/expert-consultation';
                        }}
                      >
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
