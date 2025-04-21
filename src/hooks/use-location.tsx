
import { create } from 'zustand';

type Location = {
  lat: number;
  lon: number;
  name: string;
} | null;

type LocationState = {
  location: Location;
  setLocation: (location: Location) => void;
};

export const useLocationState = create<LocationState>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
}));
