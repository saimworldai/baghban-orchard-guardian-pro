import { Link } from 'react-router-dom';
import { 
  Camera, 
  CloudSun, 
  Sprout, 
  BookOpen, 
  UserCheck, 
  ShoppingCart,
  TreeDeciduous,
  CalendarDays,
  Leaf,
  Sun,
  Tree,  // Replace Plant with Tree
  Droplet,
  BarChart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';

const features = [
  { 
    name: 'Disease Detection', 
    icon: Camera, 
    description: 'AI-powered image analysis for early detection of common apple tree diseases',
    color: 'from-red-500/20 to-orange-500/20',
    textColor: 'text-red-700',
    link: '/disease-detection'
  },
  { 
    name: 'Weather Alerts', 
    icon: CloudSun, 
    description: 'Real-time weather forecasts and frost warnings for your orchard location',
    color: 'from-blue-500/20 to-cyan-500/20',
    textColor: 'text-blue-700',
    link: '/weather-alerts'
  },
  { 
    name: 'Spray Schedule', 
    icon: Sprout, 
    description: 'Smart spray scheduling system based on disease risk and weather conditions',
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-700',
    link: '#'
  },
  { 
    name: 'Knowledge Hub', 
    icon: BookOpen, 
    description: 'Comprehensive guides and tutorials for optimal orchard management',
    color: 'from-amber-500/20 to-yellow-500/20',
    textColor: 'text-amber-700',
    link: '#'
  },
  { 
    name: 'Expert Consultation', 
    icon: UserCheck, 
    description: 'Connect with agriculture experts for personalized guidance and advice',
    color: 'from-purple-500/20 to-violet-500/20',
    textColor: 'text-purple-700',
    link: '#'
  },
  { 
    name: 'Shop', 
    icon: ShoppingCart, 
    description: 'Quality tools, equipment, and supplies for professional orchard care',
    color: 'from-teal-500/20 to-cyan-500/20',
    textColor: 'text-teal-700',
    link: '#'
  },
  {
    name: 'Tree Health', // Updated name to match Tree icon
    icon: Tree, // Replaced Plant with Tree
    description: 'Comprehensive tree growth and health monitoring',
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-700',
    link: '#'
  }
];

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgZD0iTTk5IDEzOWMtNDAuMzE4IDAtNzMtMzIuNjgyLTczLTczUzU4LjY4Mi03IDk5LTdjNDAuMzE4IDAgNzMgMzIuNjgyIDczIDczcy0zMi42ODIgNzMtNzMgNzN6bTAtMTBjMzQuNzQyIDAgNjMtMjguMjU4IDYzLTYzUzEzMy43NDIgMTcgOTkgMTcgMzYgNDUuMjU4IDM2IDgwczI4LjI1OCA2MyA2MyA2M3oiLz48cGF0aCBkPSJNMTE1IDExNWE4IDggMCAxMCAwLTE2IDggOCAwIDAwMCAxNnoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-20 -z-10"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center mb-12 relative">
          <div className="absolute -z-10 opacity-20">
            <TreeDeciduous size={120} className="text-green-600" />
            <Tree size={80} className="text-green-700 absolute -right-20 top-10" /> {/* Replaced Plant with Tree */}
            <Leaf size={60} className="text-green-500 absolute -left-16 top-16" />
            <Droplet size={40} className="text-blue-500 absolute right-10 -top-10" />
            <Sun size={50} className="text-yellow-500 absolute -left-24 -top-5" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-green-800 to-blue-700 bg-clip-text text-transparent mb-6 text-center">
            Baghban: Your Orchard Guardian
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl">
            Smart solutions for apple orchard management with advanced AI-powered tools
          </p>
          
          {!user && (
            <div className="mt-8">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => (
            <Link 
              key={feature.name} 
              to={feature.link} 
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl bg-white bg-opacity-80 backdrop-blur-sm border border-primary/10 p-8 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} -z-10 opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                <div className="mb-6 p-4 rounded-full bg-primary/10 inline-flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon 
                    size={32} 
                    className={`${feature.textColor} group-hover:scale-110 transition-all`} 
                  />
                </div>
                <h3 className={`text-xl font-semibold mb-2 group-hover:${feature.textColor} transition-colors`}>{feature.name}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-green-100 shadow-md">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-green-700 h-40">
                  <CalendarDays size={40} className="mb-2" />
                  <h3 className="text-lg font-semibold">Seasonal Tips</h3>
                  <p className="text-sm text-center">Timely advice for each season</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-blue-700 h-40">
                  <Droplet size={40} className="mb-2" />
                  <h3 className="text-lg font-semibold">Water Management</h3>
                  <p className="text-sm text-center">Irrigation planning & tracking</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg flex flex-col items-center justify-center text-amber-700 h-40">
                  <BarChart size={40} className="mb-2" />
                  <h3 className="text-lg font-semibold">Yield Tracking</h3>
                  <p className="text-sm text-center">Monitor & improve production</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg flex flex-col items-center justify-center text-purple-700 h-40">
                  <Tree size={40} className="mb-2" />
                  <h3 className="text-lg font-semibold">Growth Analysis</h3>
                  <p className="text-sm text-center">Track tree health & growth</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold bg-gradient-to-br from-green-800 to-blue-700 bg-clip-text text-transparent mb-4">
                Complete Orchard Management
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our comprehensive suite of tools helps you manage every aspect of your apple orchard, 
                from disease detection to harvest planning. Stay ahead with data-driven insights and 
                expert recommendations tailored to your specific needs.
              </p>
              <Button 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Explore All Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
