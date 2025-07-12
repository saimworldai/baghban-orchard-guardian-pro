import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Plus, CheckCircle, Trash2 } from 'lucide-react';
import { useSpraySchedule } from '@/hooks/useSpraySchedule';
import { format } from 'date-fns';

export function SprayScheduleManager() {
  const {
    schedules,
    isLoading,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    isCreating
  } = useSpraySchedule();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    crop_name: '',
    spray_date: '',
    chemical_name: '',
    dosage: '',
    target_pest: '',
    weather_conditions: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSchedule(formData);
    setFormData({
      crop_name: '',
      spray_date: '',
      chemical_name: '',
      dosage: '',
      target_pest: '',
      weather_conditions: '',
      notes: ''
    });
    setShowForm(false);
  };

  const handleCompleteSchedule = (id: string, completed: boolean) => {
    updateSchedule({ id, updates: { completed: !completed } });
  };

  const handleDeleteSchedule = (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      deleteSchedule(id);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading spray schedules...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Spray Schedule Management</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Spray Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="crop_name">Crop Name</Label>
                  <Input
                    id="crop_name"
                    value={formData.crop_name}
                    onChange={(e) => setFormData({ ...formData, crop_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="spray_date">Spray Date</Label>
                  <Input
                    id="spray_date"
                    type="date"
                    value={formData.spray_date}
                    onChange={(e) => setFormData({ ...formData, spray_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="chemical_name">Chemical Name</Label>
                  <Input
                    id="chemical_name"
                    value={formData.chemical_name}
                    onChange={(e) => setFormData({ ...formData, chemical_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="target_pest">Target Pest</Label>
                  <Input
                    id="target_pest"
                    value={formData.target_pest}
                    onChange={(e) => setFormData({ ...formData, target_pest: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="weather_conditions">Weather Conditions</Label>
                  <Input
                    id="weather_conditions"
                    value={formData.weather_conditions}
                    onChange={(e) => setFormData({ ...formData, weather_conditions: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Schedule'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className={schedule.completed ? 'opacity-75' : ''}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-semibold">{schedule.crop_name}</span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(schedule.spray_date), 'PPP')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>Chemical: {schedule.chemical_name}</div>
                    <div>Dosage: {schedule.dosage}</div>
                    {schedule.target_pest && <div>Target: {schedule.target_pest}</div>}
                  </div>
                  {schedule.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{schedule.notes}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCompleteSchedule(schedule.id, schedule.completed)}
                  >
                    <CheckCircle className={`h-4 w-4 ${schedule.completed ? 'text-green-600' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {schedules.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No spray schedules created yet.</p>
            <Button className="mt-4" onClick={() => setShowForm(true)}>
              Create Your First Schedule
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}