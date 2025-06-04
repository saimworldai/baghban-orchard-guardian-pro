
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { 
  Cloud, 
  Satellite, 
  Truck, 
  Settings, 
  Check, 
  AlertCircle,
  ExternalLink,
  Key,
  Zap
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type Integration = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'weather' | 'equipment' | 'marketplace' | 'analytics';
  connected: boolean;
  premium: boolean;
  status: 'active' | 'inactive' | 'error';
  features: string[];
};

export const ThirdPartyIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'weather-api',
      name: 'Advanced Weather Pro',
      description: 'Enhanced weather forecasting with satellite imagery and precision agriculture data',
      icon: Satellite,
      category: 'weather',
      connected: true,
      premium: true,
      status: 'active',
      features: ['10-day forecasts', 'Satellite imagery', 'Micro-climate data', 'Storm tracking']
    },
    {
      id: 'john-deere',
      name: 'John Deere Operations Center',
      description: 'Connect your John Deere equipment for automated spray logging and field mapping',
      icon: Truck,
      category: 'equipment',
      connected: false,
      premium: false,
      status: 'inactive',
      features: ['Equipment tracking', 'Automated logging', 'Field mapping', 'Usage analytics']
    },
    {
      id: 'farmobile',
      name: 'Farmobile Data Engine',
      description: 'Comprehensive farm data collection and machine connectivity platform',
      icon: Cloud,
      category: 'analytics',
      connected: false,
      premium: true,
      status: 'inactive',
      features: ['Machine data', 'Field analytics', 'Yield mapping', 'ROI tracking']
    },
    {
      id: 'agrian',
      name: 'Agrian Field Manager',
      description: 'Professional crop management and compliance tracking system',
      icon: Settings,
      category: 'analytics',
      connected: true,
      premium: true,
      status: 'error',
      features: ['Compliance tracking', 'Record keeping', 'Regulatory reporting', 'Audit trails']
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState('');

  const toggleIntegration = async (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;

    if (!integration.connected) {
      // Show connection dialog
      setSelectedIntegration(integration);
      return;
    }

    // Disconnect
    setIntegrations(prev =>
      prev.map(int =>
        int.id === integrationId
          ? { ...int, connected: false, status: 'inactive' as const }
          : int
      )
    );
    
    toast.success(`${integration.name} disconnected successfully`);
  };

  const connectIntegration = async () => {
    if (!selectedIntegration) return;

    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    // Simulate API connection
    setTimeout(() => {
      setIntegrations(prev =>
        prev.map(int =>
          int.id === selectedIntegration.id
            ? { ...int, connected: true, status: 'active' as const }
            : int
        )
      );
      
      toast.success(`${selectedIntegration.name} connected successfully`);
      setSelectedIntegration(null);
      setApiKey('');
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'weather': return 'bg-blue-100 text-blue-800';
      case 'equipment': return 'bg-orange-100 text-orange-800';
      case 'marketplace': return 'bg-purple-100 text-purple-800';
      case 'analytics': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Third-Party Integrations</h2>
          <p className="text-gray-600">Connect with external services to enhance your orchard management</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          {integrations.filter(i => i.connected).length} Connected
        </Badge>
      </motion.div>

      {/* Integration Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <integration.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {integration.name}
                        {integration.premium && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                            <Zap className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getCategoryColor(integration.category)}>
                          {integration.category}
                        </Badge>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={integration.connected}
                    onCheckedChange={() => toggleIntegration(integration.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {integration.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="h-3 w-3 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {integration.connected && integration.status === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Connection Error</span>
                    </div>
                    <p className="text-xs text-red-600 mt-1">
                      Unable to sync data. Check your API credentials or contact support.
                    </p>
                  </div>
                )}

                {integration.connected && integration.status === 'active' && (
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Configure Settings
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Connection Dialog */}
      {selectedIntegration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <selectedIntegration.icon className="h-6 w-6 text-gray-600" />
              <h3 className="text-lg font-semibold">Connect {selectedIntegration.name}</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              Enter your API key to connect with {selectedIntegration.name}. You can find this in your account settings.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedIntegration(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={connectIntegration}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Connect
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
