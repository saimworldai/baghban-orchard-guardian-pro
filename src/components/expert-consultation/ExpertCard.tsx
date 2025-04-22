
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Video, MessageSquare, Calendar, Star, ShieldCheck } from "lucide-react";

interface ExpertProps {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  imageUrl: string;
  verified: boolean;
  available: boolean;
}

export function ExpertCard({ expert }: { expert: ExpertProps }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={expert.imageUrl} />
            <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{expert.name}</h3>
              {expert.verified && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">{expert.specialty}</p>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{expert.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {expert.languages.map((lang) => (
                <Badge key={lang} variant="secondary" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 bg-gray-50/50 mt-4">
        <Button variant="outline" size="sm" className="flex-1">
          <Video className="h-4 w-4 mr-2" /> Call
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <MessageSquare className="h-4 w-4 mr-2" /> Chat
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Calendar className="h-4 w-4 mr-2" /> Schedule
        </Button>
      </CardFooter>
    </Card>
  );
}
