
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accessibility, 
  Eye, 
  Volume2, 
  MousePointer, 
  Keyboard,
  Contrast,
  ZoomIn,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
}

export function AccessibilityEnhancer() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true
  });

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement;
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const accessibilityFeatures = [
    {
      key: 'highContrast' as keyof AccessibilitySettings,
      label: 'High Contrast',
      description: 'Increase contrast for better visibility',
      icon: Contrast
    },
    {
      key: 'largeText' as keyof AccessibilitySettings,
      label: 'Large Text',
      description: 'Increase font size throughout the app',
      icon: ZoomIn
    },
    {
      key: 'reducedMotion' as keyof AccessibilitySettings,
      label: 'Reduced Motion',
      description: 'Minimize animations and transitions',
      icon: MousePointer
    },
    {
      key: 'screenReader' as keyof AccessibilitySettings,
      label: 'Screen Reader Mode',
      description: 'Optimize for screen reader compatibility',
      icon: Volume2
    },
    {
      key: 'keyboardNavigation' as keyof AccessibilitySettings,
      label: 'Keyboard Navigation',
      description: 'Enhanced keyboard navigation support',
      icon: Keyboard
    }
  ];

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 rounded-full w-12 h-12 p-0 shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white"
        aria-label="Open accessibility settings"
      >
        <Accessibility className="h-5 w-5" />
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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Accessibility className="h-6 w-6 text-blue-600" />
                    Accessibility
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="p-2"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {accessibilityFeatures.map((feature) => (
                    <Card key={feature.key} className="p-4">
                      <CardContent className="p-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <feature.icon className="h-5 w-5 text-gray-600 mt-0.5" />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-gray-800">{feature.label}</h3>
                                {settings[feature.key] && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                    Active
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                          <Button
                            variant={settings[feature.key] ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSetting(feature.key)}
                            className="ml-2"
                          >
                            {settings[feature.key] ? 'On' : 'Off'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Tips */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-800 mb-2">Accessibility Tips</h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Use Tab key to navigate between elements</li>
                          <li>• Press Space or Enter to activate buttons</li>
                          <li>• Use Escape key to close dialogs</li>
                          <li>• Alt+text describes images for screen readers</li>
                        </ul>
                      </div>
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
