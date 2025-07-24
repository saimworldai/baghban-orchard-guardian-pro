import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { useUserRole } from '@/hooks/useUserRole';
import { toast } from '@/components/ui/sonner';
import { Phone, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LiveCallNotifications() {
  const { user } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const [pendingCalls, setPendingCalls] = useState<any[]>([]);
  const [activeCalls, setActiveCalls] = useState<any[]>([]);

  useEffect(() => {
    if (!user || (role !== 'consultant' && role !== 'admin')) return;

    // Fetch initial pending calls
    const fetchPendingCalls = async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select(`
          *,
          farmer:farmer_id(email)
        `)
        .eq('status', 'pending')
        .is('consultant_id', null)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPendingCalls(data);
      }
    };

    // Fetch active calls for this consultant
    const fetchActiveCalls = async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select(`
          *,
          farmer:farmer_id(email)
        `)
        .eq('consultant_id', user.id)
        .in('status', ['scheduled', 'in_progress'])
        .order('created_at', { ascending: false });

      if (!error && data) {
        setActiveCalls(data);
      }
    };

    fetchPendingCalls();
    fetchActiveCalls();

    // Set up real-time subscriptions
    const channel = supabase
      .channel('live-calls')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'consultations'
        },
        (payload) => {
          if (payload.new.status === 'pending' && !payload.new.consultant_id) {
            setPendingCalls(prev => [payload.new, ...prev]);
            toast.success('🔔 New call request!', {
              description: 'A farmer needs expert consultation',
              action: {
                label: 'View',
                onClick: () => navigate('/expert-consultation')
              }
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'consultations'
        },
        (payload) => {
          // Remove from pending if accepted by someone
          if (payload.new.consultant_id) {
            setPendingCalls(prev => prev.filter(call => call.id !== payload.new.id));
          }
          
          // Add to active calls if accepted by this user
          if (payload.new.consultant_id === user.id && 
              ['scheduled', 'in_progress'].includes(payload.new.status)) {
            setActiveCalls(prev => {
              const exists = prev.find(call => call.id === payload.new.id);
              if (exists) {
                return prev.map(call => call.id === payload.new.id ? payload.new : call);
              }
              return [payload.new, ...prev];
            });
          }
          
          // Remove from active if completed
          if (payload.new.status === 'completed') {
            setActiveCalls(prev => prev.filter(call => call.id !== payload.new.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, role, navigate]);

  const handleAcceptCall = async (consultationId: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ 
          status: 'scheduled',
          consultant_id: user?.id,
          scheduled_at: new Date().toISOString()
        })
        .eq('id', consultationId)
        .is('consultant_id', null);
        
      if (error) throw error;
      toast.success('Call accepted! Redirecting to call...');
      navigate(`/expert-consultation/call/${consultationId}`);
    } catch (error) {
      console.error('Error accepting call:', error);
      toast.error('Failed to accept call');
    }
  };

  const handleJoinCall = (consultationId: string) => {
    navigate(`/expert-consultation/call/${consultationId}`);
  };

  if (role !== 'consultant' && role !== 'admin') return null;

  return (
    <div className="space-y-4">
      {/* Pending Calls - High Priority */}
      {pendingCalls.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <Bell className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <strong>{pendingCalls.length} incoming call{pendingCalls.length > 1 ? 's' : ''}</strong>
                <p className="text-sm text-gray-600">Farmers waiting for expert consultation</p>
              </div>
              <Button onClick={() => navigate('/expert-consultation')} size="sm">
                View All ({pendingCalls.length})
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Active Calls for this Expert */}
      {activeCalls.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Your Active Consultations</h3>
          {activeCalls.map((call) => (
            <Card key={call.id} className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <User className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium">{call.topic}</p>
                      <p className="text-sm text-gray-600">
                        {call.farmer?.email || 'Unknown farmer'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Status: {call.status === 'in_progress' ? 'Live Now' : 'Scheduled'}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleJoinCall(call.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    {call.status === 'in_progress' ? 'Rejoin' : 'Start Call'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}