
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
    icon: CloudRain,
    secondaryIcon: AlertTriangle,
    title: "Garden Weather",
    description: "Get weather forecasts tailored for your garden. Know when to water, when to protect plants, and when to harvest.",
    benefits: ["Garden-specific forecasts", "Watering reminders", "Frost alerts"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    accentColor: "border-blue-200",
    thumbnailBg: "from-blue-500 to-cyan-600",
    link: "/weather-alerts"
  },
  {
    icon: Users,
    secondaryIcon: MessageCircle,
    title: "Plant Community",
    description: "Connect with fellow plant enthusiasts. Share photos, ask questions, and learn from experienced gardeners worldwide.",
    benefits: ["Share experiences", "Get advice", "Learn together"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    accentColor: "border-emerald-200",
    thumbnailBg: "from-emerald-500 to-teal-600",
    link: "/community"
  },
  {
    icon: Calendar,
    secondaryIcon: Clock,
    title: "Garden Calendar",
    description: "Never forget when to plant, water, or harvest again. Smart reminders based on your location and plant types.",
    benefits: ["Planting reminders", "Care schedules", "Seasonal tips"],
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50",
    accentColor: "border-amber-200",
    thumbnailBg: "from-amber-500 to-orange-600",
    link: "/garden-calendar"
  },
  {
    icon: TrendingUp,
    secondaryIcon: Target,
    title: "Plant Care Guide",
    description: "Comprehensive guides for popular houseplants and garden plants. Learn how to care for each plant properly.",
    benefits: ["Care instructions", "Growing tips", "Problem solving"],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    accentColor: "border-green-200",
    thumbnailBg: "from-green-500 to-emerald-600",
    link: "/plant-care"
  },
  {
    icon: Smartphone,
    secondaryIcon: Download,
    title: "Mobile First",
    description: "Works perfectly on your phone. Take photos in your garden and get instant help, even with poor internet connection.",
    benefits: ["Works offline", "Camera integration", "Quick access"],
    color: "from-indigo-500 to-purple-500",
    bgColor: "from-indigo-50 to-purple-50",
    accentColor: "border-indigo-200",
    thumbnailBg: "from-indigo-500 to-purple-600",
    link: "/disease-detection"
  }
];
