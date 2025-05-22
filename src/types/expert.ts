
export interface Expert {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  imageUrl: string;
  verified: boolean;
  available: boolean;
  pricePerMinute?: number;
  experience?: string;
}
