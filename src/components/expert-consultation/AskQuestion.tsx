
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mic, Upload, Image, HelpCircle, Info } from "lucide-react";
import { toast } from "@/components/ui/sonner";

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

export function AskQuestion() {
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [suggestedQuestion, setSuggestedQuestion] = useState<string | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    
    // Simple AI suggestion based on keywords
    if (e.target.value.toLowerCase().includes('blight') || e.target.value.toLowerCase().includes('spots')) {
      setSuggestedQuestion(mockFaqs[0].question);
    } else if (e.target.value.toLowerCase().includes('spray') || e.target.value.toLowerCase().includes('insecticide')) {
      setSuggestedQuestion(mockFaqs[1].question);
    } else if (e.target.value.toLowerCase().includes('soil') || e.target.value.toLowerCase().includes('fertility')) {
      setSuggestedQuestion(mockFaqs[2].question);
    } else {
      setSuggestedQuestion(null);
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
      }, 1000);
    } else {
      setIsRecording(true);
      toast.info("Recording started... Speak now");
    }
  };

  const handleImageUpload = () => {
    toast.info("Image uploaded successfully");
    setImageUploaded(true);
  };

  const handleSubmit = () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    toast.success("Question submitted to experts");
    setQuestion('');
    setImageUploaded(false);
    setSuggestedQuestion(null);
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
          <CardTitle className="text-green-800">Ask a Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium text-gray-700">
              Your Question
            </label>
            <div className="flex gap-2">
              <Textarea 
                id="question"
                placeholder="Type your farming question here..."
                className="min-h-32 bg-white"
                value={question}
                onChange={handleQuestionChange}
              />
              <Button
                variant="outline"
                className={isRecording ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : ""}
                onClick={handleRecordToggle}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
            
            {suggestedQuestion && (
              <div className="rounded-md bg-blue-50 p-3 border border-blue-100">
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
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleImageUpload}>
              <Image className="h-4 w-4 mr-2" />
              {imageUploaded ? "Image Added ✓" : "Add Image"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.info("Please record your voice using the mic button")}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Voice
            </Button>
          </div>
          
          <Button 
            className="w-full bg-green-600 hover:bg-green-700" 
            size="lg"
            onClick={handleSubmit}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Submit Question
          </Button>
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
