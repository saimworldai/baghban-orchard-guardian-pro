
export const mockSprayTasks = [
  {
    id: '1',
    pesticide: 'fungicide',
    diseaseTarget: 'Apple Scab',
    scheduledDate: '2025-04-23T06:00:00Z',
    dose: '2.5g/L',
    completed: false,
    completedDate: null,
    priority: 'high',
    notes: 'Focus on upper canopy',
    weatherRisk: 'Rain forecast in afternoon',
    reminder: '1d',
    offlineSync: false
  },
  {
    id: '2',
    pesticide: 'insecticide',
    diseaseTarget: 'Codling Moth',
    scheduledDate: '2025-04-24T07:00:00Z',
    dose: '1.5ml/L',
    completed: true,
    completedDate: '2025-04-24T07:30:00Z',
    priority: 'medium',
    notes: 'Complete coverage required',
    weatherRisk: '',
    reminder: '12h',
    offlineSync: true
  }
] as const;

export type SprayTask = typeof mockSprayTasks[number];
