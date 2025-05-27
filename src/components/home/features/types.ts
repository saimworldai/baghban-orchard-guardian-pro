
import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  secondaryIcon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  bgColor: string;
  accentColor: string;
  thumbnailBg: string;
  link: string;
}
