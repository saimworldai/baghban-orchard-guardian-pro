
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceCommandProps {
  onCommand: (command: string) => void;
  isListening?: boolean;
}

export function VoiceCommand({ onCommand, isListening = false }: VoiceCommandProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const command = event.results[0][0].transcript;
        onCommand(command);
        setListening(false);
        toast.success(`Voice command received: "${command}"`);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
        toast.error('Voice recognition failed. Please try again.');
      };
      
      recognitionInstance.onend = () => {
        setListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onCommand]);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
      toast.info('Listening for voice commands...');
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant={listening ? "destructive" : "outline"}
        size="sm"
        onClick={toggleListening}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {listening ? (
            <motion.div
              key="listening"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <MicOff className="h-4 w-4" />
              </motion.div>
              Stop
            </motion.div>
          ) : (
            <motion.div
              key="not-listening"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              Voice
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs whitespace-nowrap"
          >
            <Volume2 className="h-3 w-3 inline mr-1" />
            Listening...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
