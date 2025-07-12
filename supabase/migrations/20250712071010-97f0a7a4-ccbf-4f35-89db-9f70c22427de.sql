-- Create consultations table for expert consultations
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL,
  consultant_id UUID,
  topic TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Create policies for consultations
CREATE POLICY "Users can view their own consultations as farmer" 
ON public.consultations 
FOR SELECT 
USING (auth.uid() = farmer_id);

CREATE POLICY "Users can view their own consultations as consultant" 
ON public.consultations 
FOR SELECT 
USING (auth.uid() = consultant_id);

CREATE POLICY "Farmers can create consultations" 
ON public.consultations 
FOR INSERT 
WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Consultants can update their consultations" 
ON public.consultations 
FOR UPDATE 
USING (auth.uid() = consultant_id);

CREATE POLICY "Farmers can update their own consultations" 
ON public.consultations 
FOR UPDATE 
USING (auth.uid() = farmer_id);

-- Create experts table to store expert profiles
CREATE TABLE public.experts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  rating DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  image_url TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  available BOOLEAN NOT NULL DEFAULT true,
  price_per_minute DECIMAL(10,2),
  experience TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;

-- Create policies for experts
CREATE POLICY "Experts are viewable by everyone" 
ON public.experts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own expert profile" 
ON public.experts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own expert profile" 
ON public.experts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create spray schedules table
CREATE TABLE public.spray_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  crop_name TEXT NOT NULL,
  spray_date DATE NOT NULL,
  chemical_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  target_pest TEXT,
  weather_conditions TEXT,
  notes TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.spray_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for spray schedules
CREATE POLICY "Users can view their own spray schedules" 
ON public.spray_schedules 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own spray schedules" 
ON public.spray_schedules 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own spray schedules" 
ON public.spray_schedules 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own spray schedules" 
ON public.spray_schedules 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create disease detections table
CREATE TABLE public.disease_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  image_url TEXT NOT NULL,
  detected_disease TEXT,
  confidence DECIMAL(5,2),
  recommendations TEXT,
  crop_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.disease_detections ENABLE ROW LEVEL SECURITY;

-- Create policies for disease detections
CREATE POLICY "Users can view their own disease detections" 
ON public.disease_detections 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own disease detections" 
ON public.disease_detections 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_consultations_updated_at
BEFORE UPDATE ON public.consultations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experts_updated_at
BEFORE UPDATE ON public.experts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_spray_schedules_updated_at
BEFORE UPDATE ON public.spray_schedules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample expert data
INSERT INTO public.experts (user_id, name, specialty, languages, rating, verified, available, price_per_minute, experience) VALUES
  (gen_random_uuid(), 'Dr. Sarah Khan', 'Organic Farming Expert', ARRAY['English', 'Hindi', 'Urdu'], 4.8, true, true, 5.00, '10+ years'),
  (gen_random_uuid(), 'Dr. Rajesh Kumar', 'Pest Control Specialist', ARRAY['Hindi', 'English', 'Kashmiri'], 4.9, true, false, 6.00, '15+ years'),
  (gen_random_uuid(), 'Amina Bibi', 'Soil Health Specialist', ARRAY['Urdu', 'Punjabi'], 4.7, true, true, 4.00, '8+ years'),
  (gen_random_uuid(), 'Dr. Vikram Singh', 'Orchard Management', ARRAY['Hindi', 'English', 'Punjabi'], 4.6, true, true, 7.00, '12+ years'),
  (gen_random_uuid(), 'Mohammad Farooq', 'Fruit Tree Specialist', ARRAY['Kashmiri', 'Urdu', 'English'], 4.9, true, true, 6.00, '20+ years');