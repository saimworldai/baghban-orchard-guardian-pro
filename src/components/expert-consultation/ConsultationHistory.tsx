
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Video, MessageSquare, Download, Clock, Calendar } from "lucide-react";

const mockConsultations = [
  {
    id: '1',
    expertName: 'Dr. Sarah Khan',
    date: '2025-04-15',
    time: '10:30 AM',
    duration: '22 min',
    type: 'video',
    topic: 'Pest Control for Apples',
    summary: 'Identified aphid infestation on apple trees. Recommended organic neem-based spray twice weekly. Follow-up in 10 days.',
    hasReport: true
  },
  {
    id: '2',
    expertName: 'Dr. Rajesh Kumar',
    date: '2025-04-10',
    time: '2:15 PM',
    duration: '15 min',
    type: 'chat',
    topic: 'Soil Testing Results',
    summary: 'Analyzed soil test report. Nitrogen levels low. Recommended adding compost and organic fertilizer. Will need to retest in one month.',
    hasReport: true
  },
  {
    id: '3',
    expertName: 'Dr. Sarah Khan',
    date: '2025-03-25',
    time: '11:45 AM',
    duration: '18 min',
    type: 'video',
    topic: 'Weather Impact on Crops',
    summary: 'Discussed upcoming rainfall patterns and potential impact on harvest timing. Recommended delaying harvest by 5-7 days.',
    hasReport: false
  }
];

export function ConsultationHistory() {
  return (
    <div className="space-y-4">
      {mockConsultations.length === 0 ? (
        <Card className="bg-gray-50 border-gray-200 text-center p-8">
          <p className="text-gray-500">No consultation history yet.</p>
        </Card>
      ) : (
        mockConsultations.map((consultation) => (
          <Collapsible key={consultation.id} className="w-full">
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CollapsibleTrigger className="w-full text-left">
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    {consultation.type === 'video' ? (
                      <Video className="h-5 w-5 text-purple-600" />
                    ) : (
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    )}
                    <div>
                      <CardTitle className="text-base">{consultation.topic}</CardTitle>
                      <div className="text-sm text-gray-500">{consultation.expertName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {consultation.date}
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {consultation.duration}
                    </Badge>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="border-t border-gray-100 pt-4 pb-2 bg-gray-50/50">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Summary</h4>
                      <p className="text-sm text-gray-700">{consultation.summary}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="link" className="text-purple-600 p-0 h-auto">
                        Rate this consultation
                      </Button>
                      {consultation.hasReport && (
                        <Button variant="outline" size="sm" className="text-green-700 bg-green-50 border-green-200">
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))
      )}
    </div>
  );
}
