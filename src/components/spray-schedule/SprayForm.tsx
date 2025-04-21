
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
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
import { toast } from '@/components/ui/use-toast';

type SprayFormProps = {
  selectedDate: Date;
  onClose: () => void;
};

export const SprayForm: React.FC<SprayFormProps> = ({ selectedDate, onClose }) => {
  const [date, setDate] = useState<Date>(selectedDate);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    console.log('Form submitted');
    
    toast({
      title: "Spray task scheduled",
      description: `Task has been scheduled for ${format(date, 'MMMM d, yyyy')}`,
    });
    
    onClose();
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Spray Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
              <Select defaultValue="fungicide">
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
              <Label htmlFor="product">Product Name</Label>
              <Input id="product" placeholder="e.g., Mancozeb, Copper Oxychloride" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dose">Dose</Label>
                <Input id="dose" placeholder="e.g., 2.5 g/L" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
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
              <Label htmlFor="target">Target Disease/Pest</Label>
              <Select>
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
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional details or instructions"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reminder">Reminder</Label>
              <Select defaultValue="1d">
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
