import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Database {
  public: {
    Tables: {
      consultations: {
        Row: {
          id: string
          farmer_id: string
          consultant_id: string | null
          status: string
          topic: string
          created_at: string
          scheduled_at: string | null
          completed_at: string | null
        }
        Insert: {
          farmer_id: string
          consultant_id?: string | null
          status: string
          topic: string
          scheduled_at?: string | null
        }
        Update: {
          consultant_id?: string | null
          status?: string
          scheduled_at?: string | null
          completed_at?: string | null
        }
      }
      experts: {
        Row: {
          id: string
          user_id: string
          name: string
          available: boolean
          verified: boolean
        }
      }
    }
  }
}

const supabase = createClient<Database>(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, consultationId, expertId, farmerId, topic } = await req.json()

    switch (action) {
      case 'create_consultation':
        return await createConsultation(farmerId, topic)
      
      case 'accept_consultation':
        return await acceptConsultation(consultationId, expertId)
      
      case 'start_call':
        return await startCall(consultationId, expertId)
      
      case 'end_call':
        return await endCall(consultationId, expertId)
      
      case 'get_available_experts':
        return await getAvailableExperts()
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function createConsultation(farmerId: string, topic: string) {
  console.log('Creating consultation for farmer:', farmerId, 'topic:', topic)
  
  const { data, error } = await supabase
    .from('consultations')
    .insert({
      farmer_id: farmerId,
      status: 'pending',
      topic: topic || 'General Consultation'
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating consultation:', error)
    throw new Error('Failed to create consultation')
  }

  // Notify all available experts about new consultation
  await notifyAvailableExperts(data.id, topic)

  console.log('Consultation created successfully:', data.id)
  return new Response(
    JSON.stringify({ success: true, consultation: data }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function acceptConsultation(consultationId: string, expertId: string) {
  console.log('Expert accepting consultation:', expertId, 'consultation:', consultationId)
  
  // Check if consultation is still available
  const { data: consultation, error: fetchError } = await supabase
    .from('consultations')
    .select('*')
    .eq('id', consultationId)
    .eq('status', 'pending')
    .is('consultant_id', null)
    .single()

  if (fetchError || !consultation) {
    throw new Error('Consultation no longer available')
  }

  // Assign expert to consultation
  const { data, error } = await supabase
    .from('consultations')
    .update({
      consultant_id: expertId,
      status: 'scheduled',
      scheduled_at: new Date().toISOString()
    })
    .eq('id', consultationId)
    .eq('status', 'pending')
    .is('consultant_id', null)
    .select()
    .single()

  if (error) {
    console.error('Error accepting consultation:', error)
    throw new Error('Failed to accept consultation')
  }

  console.log('Consultation accepted successfully')
  return new Response(
    JSON.stringify({ success: true, consultation: data }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function startCall(consultationId: string, expertId: string) {
  console.log('Starting call for consultation:', consultationId, 'expert:', expertId)
  
  const { data, error } = await supabase
    .from('consultations')
    .update({
      status: 'in_progress'
    })
    .eq('id', consultationId)
    .eq('consultant_id', expertId)
    .select()
    .single()

  if (error) {
    console.error('Error starting call:', error)
    throw new Error('Failed to start call')
  }

  console.log('Call started successfully')
  return new Response(
    JSON.stringify({ success: true, consultation: data }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function endCall(consultationId: string, expertId: string) {
  console.log('Ending call for consultation:', consultationId, 'expert:', expertId)
  
  const { data, error } = await supabase
    .from('consultations')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString()
    })
    .eq('id', consultationId)
    .eq('consultant_id', expertId)
    .select()
    .single()

  if (error) {
    console.error('Error ending call:', error)
    throw new Error('Failed to end call')
  }

  console.log('Call ended successfully')
  return new Response(
    JSON.stringify({ success: true, consultation: data }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getAvailableExperts() {
  console.log('Fetching available experts')
  
  const { data, error } = await supabase
    .from('experts')
    .select('*')
    .eq('available', true)
    .eq('verified', true)

  if (error) {
    console.error('Error fetching experts:', error)
    throw new Error('Failed to fetch available experts')
  }

  return new Response(
    JSON.stringify({ success: true, experts: data }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function notifyAvailableExperts(consultationId: string, topic: string) {
  // This would typically send push notifications or real-time updates
  // For now, we'll log it as the real-time updates are handled by Supabase subscriptions
  console.log('Notifying experts about new consultation:', consultationId, 'topic:', topic)
}