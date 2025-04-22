
import React from 'react';
import { ExpertCard } from './ExpertCard';

const mockExperts = [
  {
    id: '1',
    name: 'Dr. Sarah Khan',
    specialty: 'Organic Farming Expert',
    languages: ['English', 'Hindi', 'Urdu'],
    rating: 4.8,
    imageUrl: '',
    verified: true,
    available: true,
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Pest Control Specialist',
    languages: ['Hindi', 'English', 'Kashmiri'],
    rating: 4.9,
    imageUrl: '',
    verified: true,
    available: false,
  },
  // Add more mock experts here
];

export function ExpertsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockExperts.map((expert) => (
        <ExpertCard key={expert.id} expert={expert} />
      ))}
    </div>
  );
}
