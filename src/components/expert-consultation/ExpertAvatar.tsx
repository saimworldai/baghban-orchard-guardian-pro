
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ExpertAvatarProps {
  imageUrl: string;
  name: string;
}

export function ExpertAvatar({ imageUrl, name }: ExpertAvatarProps) {
  return (
    <Avatar className="h-16 w-16 ring-2 ring-offset-2 ring-primary/20">
      <AvatarImage src={imageUrl} />
      <AvatarFallback className="bg-gradient-to-br from-green-100 to-blue-100 text-lg font-semibold text-primary">
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
