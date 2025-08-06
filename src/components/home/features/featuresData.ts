
import { 
  Brain, 
  CloudRain, 
  Users, 
  Calendar,
  TrendingUp,
  Shield,
  Smartphone,
  BarChart3,
  Zap,
  Scan,
  AlertTriangle,
  MessageCircle,
  Clock,
  Target,
  Lock,
  Download,
  PieChart,
  Cpu
} from 'lucide-react';
import { Feature } from './types';

export const features: Feature[] = [
  {
    icon: Brain,
    secondaryIcon: Scan,
    title: "Plant Doctor AI",
    description: "Snap a photo of your plant and get instant diagnosis. Perfect for home gardeners and plant lovers - no expertise needed!",
    benefits: ["Instant plant diagnosis", "Simple treatment plans", "Prevention tips"],
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50",
    accentColor: "border-purple-200",
    thumbnailBg: "from-purple-500 to-indigo-600",
    link: "/disease-detection"
  },
  {
    icon: Users,
    secondaryIcon: MessageCircle,
    title: "Expert Consultation",
    description: "Get professional advice from agricultural experts. Video calls, chat support, and personalized farming guidance.",
    benefits: ["Live video calls", "Expert advice", "Personalized solutions"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    accentColor: "border-emerald-200",
    thumbnailBg: "from-emerald-500 to-teal-600",
    link: "/expert-consultation"
  },
  {
    icon: CloudRain,
    secondaryIcon: AlertTriangle,
    title: "Smart Weather",
    description: "Get weather forecasts tailored for your farm. Know when to water, spray, and protect crops with precision timing.",
    benefits: ["Farm-specific forecasts", "Spray timing", "Crop protection alerts"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    accentColor: "border-blue-200",
    thumbnailBg: "from-blue-500 to-cyan-600",
    link: "/weather-alerts"
  },
  {
    icon: TrendingUp,
    secondaryIcon: Target,
    title: "Crop Care Guide",
    description: "Comprehensive growing guides for crops and vegetables. Learn modern farming techniques and best practices.",
    benefits: ["Growing techniques", "Soil management", "Harvest optimization"],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    accentColor: "border-green-200",
    thumbnailBg: "from-green-500 to-emerald-600",
    link: "/plant-care"
  }
];
