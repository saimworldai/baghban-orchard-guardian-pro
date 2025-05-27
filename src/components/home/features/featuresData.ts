
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
    title: "AI Disease Detection",
    description: "Upload photos to instantly identify plant diseases with 98% accuracy. Get treatment recommendations within seconds.",
    benefits: ["Instant diagnosis", "Treatment plans", "Prevention tips"],
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50",
    accentColor: "border-purple-200",
    thumbnailBg: "from-purple-500 to-indigo-600",
    link: "/disease-detection"
  },
  {
    icon: CloudRain,
    secondaryIcon: AlertTriangle,
    title: "Weather Intelligence",
    description: "Hyper-local weather forecasts and alerts help you make informed decisions about irrigation and protection.",
    benefits: ["7-day forecasts", "Smart alerts", "Irrigation guidance"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    accentColor: "border-blue-200",
    thumbnailBg: "from-blue-500 to-cyan-600",
    link: "/weather-alerts"
  },
  {
    icon: Users,
    secondaryIcon: MessageCircle,
    title: "Expert Consultation",
    description: "Connect with certified agricultural experts via video calls, chat, or scheduled consultations.",
    benefits: ["24/7 availability", "Certified experts", "Multi-language support"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    accentColor: "border-emerald-200",
    thumbnailBg: "from-emerald-500 to-teal-600",
    link: "/expert-consultation"
  },
  {
    icon: Calendar,
    secondaryIcon: Clock,
    title: "Smart Scheduling",
    description: "AI-optimized spray schedules based on weather, crop stage, and disease pressure for maximum effectiveness.",
    benefits: ["Weather integration", "Cost optimization", "Automated reminders"],
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50",
    accentColor: "border-amber-200",
    thumbnailBg: "from-amber-500 to-orange-600",
    link: "/spray-schedule"
  },
  {
    icon: TrendingUp,
    secondaryIcon: Target,
    title: "Yield Analytics",
    description: "Track and analyze your orchard's performance with detailed insights and recommendations for improvement.",
    benefits: ["Performance tracking", "Yield predictions", "ROI analysis"],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    accentColor: "border-green-200",
    thumbnailBg: "from-green-500 to-emerald-600",
    link: "/profile"
  },
  {
    icon: Shield,
    secondaryIcon: Lock,
    title: "Risk Management",
    description: "Advanced monitoring systems to predict and prevent crop losses from diseases, pests, and weather.",
    benefits: ["Early warnings", "Risk assessment", "Insurance support"],
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
    accentColor: "border-red-200",
    thumbnailBg: "from-red-500 to-pink-600",
    link: "/weather-alerts"
  },
  {
    icon: Smartphone,
    secondaryIcon: Download,
    title: "Mobile Optimized",
    description: "Full-featured mobile app that works offline, perfect for use in the field with poor connectivity.",
    benefits: ["Offline capability", "GPS tracking", "Photo sync"],
    color: "from-indigo-500 to-purple-500",
    bgColor: "from-indigo-50 to-purple-50",
    accentColor: "border-indigo-200",
    thumbnailBg: "from-indigo-500 to-purple-600",
    link: "/disease-detection"
  },
  {
    icon: BarChart3,
    secondaryIcon: PieChart,
    title: "Business Intelligence",
    description: "Comprehensive reports and analytics to help you make data-driven decisions and improve profitability.",
    benefits: ["Custom reports", "Export data", "Trend analysis"],
    color: "from-slate-500 to-gray-500",
    bgColor: "from-slate-50 to-gray-50",
    accentColor: "border-slate-200",
    thumbnailBg: "from-slate-500 to-gray-600",
    link: "/profile"
  },
  {
    icon: Zap,
    secondaryIcon: Cpu,
    title: "Automation Hub",
    description: "Connect with IoT devices and automate irrigation, monitoring, and data collection across your orchard.",
    benefits: ["IoT integration", "Smart sensors", "Automated workflows"],
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50",
    accentColor: "border-yellow-200",
    thumbnailBg: "from-yellow-500 to-amber-600",
    link: "/spray-schedule"
  }
];
