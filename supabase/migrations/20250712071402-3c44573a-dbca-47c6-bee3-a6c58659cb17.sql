-- Create storage bucket for disease images
INSERT INTO storage.buckets (id, name, public) VALUES ('disease-images', 'disease-images', true);

-- Create storage policies for disease images
CREATE POLICY "Disease images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'disease-images');

CREATE POLICY "Users can upload disease images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'disease-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their disease images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'disease-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their disease images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'disease-images' AND auth.uid()::text = (storage.foldername(name))[1]);