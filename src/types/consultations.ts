
export interface FarmerProfile {
  email: string;
  profiles?: {
    full_name: string | null;
  } | null;
}

export interface Consultation {
  id: string;
  farmer_id: string;
  consultant_id: string | null;
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  topic: string;
  created_at: string;
  scheduled_for: string | null;
  notes: string | null;
  farmer: FarmerProfile;
}
