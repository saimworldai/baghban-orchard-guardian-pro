
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

type SprayFormProps = {
  selectedDate: Date;
  editTaskId?: string;
  onClose: () => void;
};

export const SprayForm: React.FC<SprayFormProps> = ({ selectedDate, editTaskId, onClose }) => {
  const [date, setDate] = useState<Date>(selectedDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [pesticide, setPesticide] = useState('fungicide');
  const [product, setProduct] = useState('');
  const [dose, setDose] = useState('');
  const [priority, setPriority] = useState('medium');
  const [target, setTarget] = useState('');
  const [notes, setNotes] = useState('');
  const [reminder, setReminder] = useState('1d');
  const [weatherAware, setWeatherAware] = useState(true);
  const [useVoiceInput, setUseVoiceInput] = useState(false);
  const [language, setLanguage] = useState('english');
  
  // Check if there's weather risk for the selected date
  const hasWeatherRisk = false; // Normally would check with weather API
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!product.trim() || !dose.trim() || !target) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to a database
    console.log('Form submitted', {
      date,
      pesticide,
      product,
      dose,
      priority,
      target,
      notes,
      reminder,
      weatherAware
    });
    
    toast({
      title: editTaskId ? "Spray task updated" : "Spray task scheduled",
      description: `Task has been ${editTaskId ? 'updated' : 'scheduled'} for ${format(date, 'MMMM d, yyyy')}`,
    });
    
    onClose();
  };
  
  // AI-based recommendation (mock)
  const aiRecommendation = {
    dose: target === 'apple_scab' ? '2.5 g/L' : '3.0 g/L',
    product: target === 'apple_scab' ? 'Mancozeb' : 
             target === 'fire_blight' ? 'Streptomycin' : 
             target === 'powdery_mildew' ? 'Sulfur-based fungicide' : '',
    optimalTime: 'Early morning (6-8 AM)',
    waitPeriod: target === 'fire_blight' ? '14 days' : '7 days'
  };
  
  const applyAiRecommendation = () => {
    if (aiRecommendation.product) {
      setProduct(aiRecommendation.product);
      setDose(aiRecommendation.dose);
      toast({
        title: "AI Recommendation Applied",
        description: `Dosage and product set based on ${target} treatment best practices`,
      });
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editTaskId ? 'Edit Spray Task' : 'Schedule Spray Task'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Language Selection */}
            <div className="grid gap-2">
              <Label htmlFor="language">Language / भाषा / زبان</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="urdu">اردو (Urdu)</SelectItem>
                  <SelectItem value="kashmiri">कॉशुर (Kashmiri)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Voice Input Option */}
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-input">Voice Input</Label>
              <Switch 
                id="voice-input" 
                checked={useVoiceInput}
                onCheckedChange={setUseVoiceInput}
              />
            </div>
            
            <Separator />
            
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      if (date) {
                        setDate(date);
                        setShowCalendar(false);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="pesticide">Pesticide Type</Label>
              <Select value={pesticide} onValueChange={setPesticide}>
                <SelectTrigger id="pesticide">
                  <SelectValue placeholder="Select pesticide type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fungicide">Fungicide</SelectItem>
                  <SelectItem value="insecticide">Insecticide</SelectItem>
                  <SelectItem value="herbicide">Herbicide</SelectItem>
                  <SelectItem value="bactericide">Bactericide</SelectItem>
                  <SelectItem value="bio-pesticide">Bio-pesticide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="target">Target Disease/Pest</Label>
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger id="target">
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple_scab">Apple Scab</SelectItem>
                  <SelectItem value="fire_blight">Fire Blight</SelectItem>
                  <SelectItem value="cedar_apple_rust">Cedar Apple Rust</SelectItem>
                  <SelectItem value="powdery_mildew">Powdery Mildew</SelectItem>
                  <SelectItem value="aphids">Aphids</SelectItem>
                  <SelectItem value="codling_moth">Codling Moth</SelectItem>
                  <SelectItem value="mites">Mites</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {target && (
              <div className="bg-blue-50 p-3 rounded-md text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-700">AI Recommendation</span>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    className="h-7 px-2 text-xs"
                    onClick={applyAiRecommendation}
                  >
                    Apply
                  </Button>
                </div>
                <div className="space-y-1 text-blue-800">
                  <p>Product: {aiRecommendation.product}</p>
                  <p>Dose: {aiRecommendation.dose}</p>
                  <p>Best time: {aiRecommendation.optimalTime}</p>
                  <p>Safety period: {aiRecommendation.waitPeriod}</p>
                </div>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="product">Product Name</Label>
              <Input 
                id="product" 
                placeholder="e.g., Mancozeb, Copper Oxychloride" 
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dose">Dose</Label>
                <Input 
                  id="dose" 
                  placeholder="e.g., 2.5 g/L" 
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional details or instructions"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reminder">Reminder</Label>
              <Select value={reminder} onValueChange={setReminder}>
                <SelectTrigger id="reminder">
                  <SelectValue placeholder="Set reminder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hour before</SelectItem>
                  <SelectItem value="6h">6 hours before</SelectItem>
                  <SelectItem value="12h">12 hours before</SelectItem>
                  <SelectItem value="1d">1 day before</SelectItem>
                  <SelectItem value="2d">2 days before</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="weather-aware">Adjust for weather automatically</Label>
              <Switch 
                id="weather-aware" 
                checked={weatherAware}
                onCheckedChange={setWeatherAware}
              />
            </div>
            
            {hasWeatherRisk && (
              <div className="bg-amber-50 p-3 rounded-md flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Weather risk detected</p>
                  <p>Rain forecast within 24 hours of your scheduled spray. Consider rescheduling.</p>
                </div>
              </div>
            )}
            
            <div className="bg-green-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-green-800 mb-2">Safety Checklist</h4>
              <ul className="text-xs text-green-700 space-y-1">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1" /> Wear gloves and mask
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1" /> Avoid spraying in high wind
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1" /> Keep children away from spray area
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1" /> Check equipment for leaks
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
