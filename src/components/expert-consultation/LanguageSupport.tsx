
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Globe, Languages, Mic, Volume, Info } from "lucide-react";
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const supportedLanguages = [
  { code: 'en', name: 'English', supported: true, voiceSupported: true },
  { code: 'hi', name: 'हिन्दी (Hindi)', supported: true, voiceSupported: true },
  { code: 'ur', name: 'اردو (Urdu)', supported: true, voiceSupported: true },
  { code: 'ks', name: 'کٲشُر (Kashmiri)', supported: true, voiceSupported: false },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', supported: true, voiceSupported: false }
];

export function LanguageSupport() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [voiceInputEnabled, setVoiceInputEnabled] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(false);
  
  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    
    // In a real app, this would change the UI language
    toast.success(`Language set to ${supportedLanguages.find(l => l.code === langCode)?.name}`);
  };
  
  const toggleVoiceInput = () => {
    const newState = !voiceInputEnabled;
    setVoiceInputEnabled(newState);
    
    if (newState) {
      const selectedLang = supportedLanguages.find(l => l.code === selectedLanguage);
      
      if (selectedLang && !selectedLang.voiceSupported) {
        toast.warning(`Voice input not fully supported for ${selectedLang.name} yet`);
      } else {
        toast.success("Voice input enabled");
      }
    } else {
      toast.info("Voice input disabled");
    }
  };
  
  const toggleVoiceOutput = () => {
    const newState = !voiceOutputEnabled;
    setVoiceOutputEnabled(newState);
    
    if (newState) {
      const selectedLang = supportedLanguages.find(l => l.code === selectedLanguage);
      
      if (selectedLang && !selectedLang.voiceSupported) {
        toast.warning(`Voice output not fully supported for ${selectedLang.name} yet`);
      } else {
        toast.success("Voice output enabled");
      }
    } else {
      toast.info("Voice output disabled");
    }
  };
  
  const getVoiceFeatureStatus = () => {
    const selectedLang = supportedLanguages.find(l => l.code === selectedLanguage);
    
    if (selectedLang && !selectedLang.voiceSupported) {
      return (
        <Alert className="bg-amber-50 text-amber-800 border-amber-200 mt-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Limited Support</AlertTitle>
          <AlertDescription>
            Voice features for {selectedLang.name} are still in development. Text support is fully available.
          </AlertDescription>
        </Alert>
      );
    }
    
    return null;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Language & Voice Settings
          </h3>
          <Badge variant="outline" className="bg-primary/10">
            Beta
          </Badge>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
              <Languages className="h-4 w-4" /> Preferred Language
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {supportedLanguages.map((language) => (
                <Button
                  key={language.code}
                  variant={selectedLanguage === language.code ? "default" : "outline"}
                  className={`justify-start ${selectedLanguage === language.code ? "" : "text-gray-700"}`}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {selectedLanguage === language.code && (
                    <Check className="h-4 w-4 mr-1" />
                  )}
                  {language.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-3">Voice Features</h4>
            <div className="space-y-3">
              <Button
                variant="outline"
                className={`w-full justify-start ${voiceInputEnabled ? "bg-primary/10" : ""}`}
                onClick={toggleVoiceInput}
              >
                <Mic className={`mr-2 h-4 w-4 ${voiceInputEnabled ? "text-primary" : ""}`} />
                Voice Input
                <Badge className={`ml-auto ${voiceInputEnabled ? "bg-green-100 text-green-800" : "bg-gray-100"}`}>
                  {voiceInputEnabled ? "On" : "Off"}
                </Badge>
              </Button>
              
              <Button
                variant="outline"
                className={`w-full justify-start ${voiceOutputEnabled ? "bg-primary/10" : ""}`}
                onClick={toggleVoiceOutput}
              >
                <Volume className={`mr-2 h-4 w-4 ${voiceOutputEnabled ? "text-primary" : ""}`} />
                Voice Output
                <Badge className={`ml-auto ${voiceOutputEnabled ? "bg-green-100 text-green-800" : "bg-gray-100"}`}>
                  {voiceOutputEnabled ? "On" : "Off"}
                </Badge>
              </Button>
            </div>
            
            {getVoiceFeatureStatus()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
