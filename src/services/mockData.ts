
export const mockSprayTasks = [
  {
    id: '1',
    pesticide: 'Fungicide (Mancozeb)',
    diseaseTarget: 'Apple Scab',
    scheduledDate: '2025-04-23T08:00:00',
    dose: '2g/L',
    completed: false,
    completedDate: null,
    priority: 'high',
    notes: 'Apply as preventative measure before rain',
    weatherRisk: 'Rain forecasted - reschedule recommended'
  },
  {
    id: '2',
    pesticide: 'Insecticide (Imidacloprid)',
    diseaseTarget: 'Aphids',
    scheduledDate: '2025-04-25T07:30:00',
    dose: '1.5ml/L',
    completed: false,
    completedDate: null,
    priority: 'medium',
    notes: 'Focus on young trees particularly'
  },
  {
    id: '3',
    pesticide: 'Fungicide (Copper Oxychloride)',
    diseaseTarget: 'Fire Blight',
    scheduledDate: '2025-04-20T06:00:00',
    dose: '3g/L',
    completed: true,
    completedDate: '2025-04-20T06:45:00',
    priority: 'high',
    notes: 'Applied to all blocks except north side'
  },
  {
    id: '4',
    pesticide: 'Bio-pesticide (Neem Oil)',
    diseaseTarget: 'Multiple Pests',
    scheduledDate: '2025-04-28T16:00:00',
    dose: '5ml/L',
    completed: false,
    completedDate: null,
    priority: 'low',
    notes: 'Organic application for export certified blocks'
  },
  {
    id: '5',
    pesticide: 'Fungicide (Difenoconazole)',
    diseaseTarget: 'Powdery Mildew',
    scheduledDate: '2025-05-02T07:00:00',
    dose: '1ml/L',
    completed: false,
    completedDate: null,
    priority: 'medium',
    notes: 'Use protective equipment, 21 day PHI'
  }
];

export const mockDiseaseRisks = [
  {
    diseaseId: 'apple_scab',
    name: 'Apple Scab',
    currentRisk: 'high',
    forecast: [
      { date: '2025-04-22', risk: 'high' },
      { date: '2025-04-23', risk: 'high' },
      { date: '2025-04-24', risk: 'medium' },
      { date: '2025-04-25', risk: 'medium' },
      { date: '2025-04-26', risk: 'low' }
    ],
    recommendedTreatment: 'Mancozeb or Captan fungicide before next rain event'
  },
  {
    diseaseId: 'fire_blight',
    name: 'Fire Blight',
    currentRisk: 'medium',
    forecast: [
      { date: '2025-04-22', risk: 'medium' },
      { date: '2025-04-23', risk: 'medium' },
      { date: '2025-04-24', risk: 'medium' },
      { date: '2025-04-25', risk: 'high' },
      { date: '2025-04-26', risk: 'high' }
    ],
    recommendedTreatment: 'Streptomycin during bloom if conditions persist'
  },
  {
    diseaseId: 'cedar_apple_rust',
    name: 'Cedar Apple Rust',
    currentRisk: 'low',
    forecast: [
      { date: '2025-04-22', risk: 'low' },
      { date: '2025-04-23', risk: 'low' },
      { date: '2025-04-24', risk: 'low' },
      { date: '2025-04-25', risk: 'medium' },
      { date: '2025-04-26', risk: 'medium' }
    ],
    recommendedTreatment: 'Monitor for orange spots, treat with myclobutanil if detected'
  },
  {
    diseaseId: 'codling_moth',
    name: 'Codling Moth',
    currentRisk: 'medium',
    forecast: [
      { date: '2025-04-22', risk: 'low' },
      { date: '2025-04-23', risk: 'medium' },
      { date: '2025-04-24', risk: 'medium' },
      { date: '2025-04-25', risk: 'high' },
      { date: '2025-04-26', risk: 'high' }
    ],
    recommendedTreatment: 'Install pheromone traps, apply insecticide at peak flight'
  }
];
