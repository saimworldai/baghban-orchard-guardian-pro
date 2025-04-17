
import { Link } from 'react-router-dom';
import { 
  Camera, 
  CloudSun, 
  Leaf, 
  BookOpen, 
  UserCheck, 
  ShoppingCart,
  TreeDeciduous
} from 'lucide-react';

const features = [
  { 
    name: 'Disease Detection', 
    icon: Camera, 
    description: 'AI-powered image analysis',
    link: '/disease-detection'
  },
  { 
    name: 'Weather Alerts', 
    icon: CloudSun, 
    description: 'Location-based forecasts',
    link: '/weather-alerts'
  },
  { 
    name: 'Spray Schedule', 
    icon: Leaf, 
    description: 'Smart scheduling system',
    link: '#'
  },
  { 
    name: 'Knowledge Hub', 
    icon: BookOpen, 
    description: 'Orchard guides & tutorials',
    link: '#'
  },
  { 
    name: 'Expert Consultation', 
    icon: UserCheck, 
    description: 'Connect with agriculture experts',
    link: '#'
  },
  { 
    name: 'Shop', 
    icon: ShoppingCart, 
    description: 'Orchard tools & supplies',
    link: '#'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgZD0iTTk5IDEzOWMtNDAuMzE4IDAtNzMtMzIuNjgyLTczLTczUzU4LjY4Mi03IDk5LTdjNDAuMzE4IDAgNzMgMzIuNjgyIDczIDczcy0zMi42ODIgNzMtNzMgNzN6bTAtMTBjMzQuNzQyIDAgNjMtMjguMjU4IDYzLTYzUzEzMy43NDIgMTcgOTkgMTcgMzYgNDUuMjU4IDM2IDgwczI4LjI1OCA2MyA2MyA2M3oiLz48cGF0aCBkPSJNMTE1IDExNWE4IDggMCAxMCAwLTE2IDggOCAwIDAwMCAxNnoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-20 -z-10"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center mb-12 relative">
          <TreeDeciduous className="absolute text-green-600/20 -z-10" size={200} />
          <h1 className="text-5xl font-bold bg-gradient-to-br from-green-800 to-blue-700 bg-clip-text text-transparent mb-6 text-center">
            Baghban: Your Orchard Guardian
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl">
            Smart solutions for apple orchard management with advanced AI-powered tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => (
            <Link 
              key={feature.name} 
              to={feature.link} 
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl bg-white bg-opacity-80 backdrop-blur-sm border border-primary/10 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10 group-hover:opacity-100 opacity-0 transition-opacity"></div>
                <div className="mb-6 p-3 rounded-full bg-primary/10 inline-block group-hover:bg-primary/20 transition-colors">
                  <feature.icon 
                    size={32} 
                    className="text-primary group-hover:scale-110 transition-all" 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.name}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
