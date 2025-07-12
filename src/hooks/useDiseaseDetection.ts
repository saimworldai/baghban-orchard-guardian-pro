import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { enhancedToast } from '@/components/ui/enhanced-toast';

interface DiseaseDetection {
  id: string;
  image_url: string;
  detected_disease?: string;
  confidence?: number;
  recommendations?: string;
  crop_type?: string;
  created_at: string;
}

export function useDiseaseDetection() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: detections = [], isLoading } = useQuery({
    queryKey: ['disease_detections'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('disease_detections')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as DiseaseDetection[];
    },
    enabled: !!user,
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!user) throw new Error('User not authenticated');
      
      const fileName = `${user.id}/${Date.now()}_${file.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('disease-images')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('disease-images')
        .getPublicUrl(uploadData.path);
      
      return publicUrl;
    },
    onError: (error) => {
      enhancedToast.error('Failed to upload image');
      console.error('Error uploading image:', error);
    },
  });

  const analyzeImageMutation = useMutation({
    mutationFn: async ({ imageUrl, cropType }: { imageUrl: string; cropType?: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      // Mock analysis - in real app, this would call an AI service
      const mockDiseases = [
        { name: 'Late Blight', confidence: 85, recommendations: 'Apply copper-based fungicide immediately. Remove affected leaves.' },
        { name: 'Powdery Mildew', confidence: 78, recommendations: 'Increase air circulation and apply sulfur-based fungicide.' },
        { name: 'Leaf Spot', confidence: 92, recommendations: 'Remove infected leaves and apply preventive fungicide spray.' }
      ];
      
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      
      const { data, error } = await supabase
        .from('disease_detections')
        .insert({
          user_id: user.id,
          image_url: imageUrl,
          detected_disease: randomDisease.name,
          confidence: randomDisease.confidence,
          recommendations: randomDisease.recommendations,
          crop_type: cropType
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disease_detections'] });
      enhancedToast.success('Disease analysis completed');
      setSelectedImage(null);
      setPreviewUrl(null);
    },
    onError: (error) => {
      enhancedToast.error('Failed to analyze image');
      console.error('Error analyzing image:', error);
    },
  });

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const analyzeImage = async (cropType?: string) => {
    if (!selectedImage) return;
    
    try {
      const imageUrl = await uploadImageMutation.mutateAsync(selectedImage);
      await analyzeImageMutation.mutateAsync({ imageUrl, cropType });
    } catch (error) {
      console.error('Error in image analysis process:', error);
    }
  };

  return {
    detections,
    isLoading,
    selectedImage,
    previewUrl,
    handleImageSelect,
    analyzeImage,
    isUploading: uploadImageMutation.isPending,
    isAnalyzing: analyzeImageMutation.isPending,
  };
}