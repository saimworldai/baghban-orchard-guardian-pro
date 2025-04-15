
import { Link } from 'react-router-dom';
import { 
  Camera, 
  CloudSun, 
  Leaf, 
  BookOpen, 
  UserCheck, 
  ShoppingCart 
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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Baghban: Your Orchard Guardian
        </h1>
        <p className="text-xl text-muted-foreground">
          Smart solutions for apple orchard management
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link 
            key={feature.name} 
            to={feature.link} 
            className="group"
          >
            <div className="bg-secondary/10 p-6 rounded-lg text-center hover:bg-secondary/20 transition-colors">
              <feature.icon 
                size={48} 
                className="mx-auto mb-4 text-primary group-hover:scale-110 transition" 
              />
              <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
