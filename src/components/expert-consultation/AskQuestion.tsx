
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Mic, 
  Upload, 
  Image as ImageIcon, 
  HelpCircle, 
  Info, 
  Tags, 
  Languages, 
  Calendar
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const mockFaqs = [
  {
    question: "How do I identify apple leaf blight?",
    answer: "Apple leaf blight typically shows as brown or black spots on leaves that gradually expand. Edges may appear water-soaked or have yellow halos around dark patches. For accurate identification, send photos."
  },
  {
    question: "When is the best time to spray insecticides?",
    answer: "For most pests, early morning or evening is optimal when beneficial insects are less active and temperatures are cooler. Avoid spraying during windy conditions or before expected rainfall."
  },
  {
    question: "How can I improve soil fertility naturally?",
    answer: "Incorporate compost, plant cover crops, use crop rotation, apply well-rotted manure, and consider adding beneficial microorganisms. Mulching also helps retain moisture and adds organic matter as it breaks down."
  }
];

const suggestionTags = [
  { name: "Pest", color: "bg-red-100 text-red-800" },
  { name: "Disease", color: "bg-orange-100 text-orange-800" },
  { name: "Watering", color: "bg-blue-100 text-blue-800" },
  { name: "Nutrition", color: "bg-green-100 text-green-800" },
  { name: "Harvest", color: "bg-amber-100 text-amber-800" },
  { name: "Pruning", color: "bg-purple-100 text-purple-800" },
];

export function AskQuestion() {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [suggestedQuestion, setSuggestedQuestion] = useState<string | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [submissionType, setSubmissionType] = useState<"immediate" | "scheduled">("immediate");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    
    // Simple AI suggestion based on keywords
    if (e.target.value.toLowerCase().includes('blight') || e.target.value.toLowerCase().includes('spots')) {
      setSuggestedQuestion(mockFaqs[0].question);
      suggestTags(["Disease", "Pest"]);
    } else if (e.target.value.toLowerCase().includes('spray') || e.target.value.toLowerCase().includes('insecticide')) {
      setSuggestedQuestion(mockFaqs[1].question);
      suggestTags(["Pest"]);
    } else if (e.target.value.toLowerCase().includes('soil') || e.target.value.toLowerCase().includes('fertility')) {
      setSuggestedQuestion(mockFaqs[2].question);
      suggestTags(["Nutrition"]);
    } else {
      setSuggestedQuestion(null);
    }
  };

  const suggestTags = (tags: string[]) => {
    // Only suggest tags if user hasn't selected them already
    if (tags.some(tag => !selectedTags.includes(tag))) {
      toast.info("We've suggested some tags based on your question", {
        description: "Click to add them",
        action: {
          label: "Add Tags",
          onClick: () => setSelectedTags(prev => [...new Set([...prev, ...tags])])
        }
      });
    }
  };

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.info("Recording stopped");
      // Simulate transcription
      setTimeout(() => {
        setQuestion("My apple trees have small bugs on the leaves. What should I do?");
        setSuggestedQuestion(mockFaqs[1].question);
        suggestTags(["Pest"]);
      }, 1000);
    } else {
      setIsRecording(true);
      toast.info("Recording started... Speak now");
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // In a real app, you would upload this file to a server
      // For now, we'll just simulate it
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages(prev => [...prev, imageUrl]);
      setImageUploaded(true);
      toast.info("Image uploaded successfully");
    }
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!user) {
      toast.error("Please log in to submit a question");
      return;
    }

    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    if (submissionType === "scheduled" && !scheduledDate) {
      toast.error("Please select a date for your scheduled question");
      return;
    }

    if (submissionType === "scheduled") {
      toast.success(`Question scheduled for ${new Date(scheduledDate).toLocaleString()}`);
    } else {
      toast.success("Question submitted to experts");
    }
    
    // Reset form
    setQuestion('');
    setImageUploaded(false);
    setUploadedImages([]);
    setSuggestedQuestion(null);
    setSelectedTags([]);
    setScheduledDate("");
  };

  const useSuggestedQuestion = () => {
    if (suggestedQuestion) {
      setQuestion(suggestedQuestion);
      setSuggestedQuestion(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-100">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center justify-between">
            <span>Ask a Question</span>
            {user && (
              <Badge variant="outline" className="bg-green-100 text-green-800">
                1 Free Question Available
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="text">
                <MessageSquare className="h-4 w-4 mr-2" /> Text
              </TabsTrigger>
              <TabsTrigger value="voice">
                <Mic className="h-4 w-4 mr-2" /> Voice
              </TabsTrigger>
              <TabsTrigger value="image">
                <ImageIcon className="h-4 w-4 mr-2" /> Image
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="question" className="text-sm font-medium text-gray-700">
                  Your Question
                </label>
                <Textarea 
                  id="question"
                  placeholder="Type your farming question here..."
                  className="min-h-32 bg-white"
                  value={question}
                  onChange={handleQuestionChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="voice" className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-md border border-dashed">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="lg"
                  className={isRecording ? "animate-pulse" : ""}
                  onClick={handleRecordToggle}
                >
                  <Mic className="h-6 w-6 mr-2" />
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  {isRecording 
                    ? "Recording your question... Speak clearly" 
                    : "Click to record your question using your microphone"}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <div 
                className="flex flex-col items-center justify-center p-8 bg-white rounded-md border border-dashed cursor-pointer"
                onClick={handleImageUploadClick}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
                <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload an image of your plant or issue
                </p>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Uploaded ${index + 1}`} 
                        className="w-full h-20 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedImages(prev => prev.filter((_, i) => i !== index));
                        }}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Describe the issue
                </label>
                <Textarea 
                  id="description"
                  placeholder="Provide more details about the image..."
                  className="min-h-20 bg-white"
                  value={question}
                  onChange={handleQuestionChange}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          {suggestedQuestion && (
            <motion.div 
              className="rounded-md bg-blue-50 p-3 border border-blue-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="flex gap-2 items-start">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Similar question found:</p>
                  <p className="text-sm text-blue-600">{suggestedQuestion}</p>
                  <Button 
                    variant="link" 
                    className="text-blue-700 p-0 h-auto text-sm mt-1"
                    onClick={useSuggestedQuestion}
                  >
                    Use this question
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Tags className="h-4 w-4" /> Tags
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestionTags.map(tag => (
                <Badge 
                  key={tag.name}
                  variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                  className={`cursor-pointer ${selectedTags.includes(tag.name) ? tag.color : ""}`}
                  onClick={() => handleToggleTag(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Languages className="h-4 w-4" /> Preferred Language
              </label>
              <ToggleGroup type="single" value={selectedLanguage} onValueChange={(value) => value && setSelectedLanguage(value)}>
                <ToggleGroupItem value="English">English</ToggleGroupItem>
                <ToggleGroupItem value="Hindi">Hindi</ToggleGroupItem>
                <ToggleGroupItem value="Urdu">Urdu</ToggleGroupItem>
                <ToggleGroupItem value="Kashmiri">Kashmiri</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> When to Ask
              </label>
              <ToggleGroup type="single" value={submissionType} onValueChange={(value) => value && setSubmissionType(value as "immediate" | "scheduled")}>
                <ToggleGroupItem value="immediate">Ask Now</ToggleGroupItem>
                <ToggleGroupItem value="scheduled">Schedule</ToggleGroupItem>
              </ToggleGroup>
              
              {submissionType === "scheduled" && (
                <input 
                  type="datetime-local" 
                  className="mt-2 w-full rounded-md border border-input p-2"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              )}
            </div>
          </div>
          
          <Button 
            className="w-full bg-green-600 hover:bg-green-700" 
            size="lg"
            onClick={handleSubmit}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            {submissionType === "scheduled" ? "Schedule Question" : "Submit Question"}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            {user ? "1 free question left this month" : "Sign in to submit questions to our experts"}
          </p>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <HelpCircle className="h-5 w-5 text-green-600" />
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-3">
          {mockFaqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <h4 className="font-medium text-green-800 mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
                <div className="mt-2 flex justify-between">
                  <Button 
                    variant="link" 
                    className="text-green-600 p-0 h-auto text-sm"
                    onClick={() => setQuestion(faq.question)}
                  >
                    Ask this question
                  </Button>
                  <Button 
                    variant="link" 
                    className="text-purple-600 p-0 h-auto text-sm"
                  >
                    See expert answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
