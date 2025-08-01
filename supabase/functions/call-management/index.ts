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
        Update: {
          status?: string
          scheduled_at?: string | null
          completed_at?: string | null
          notes?: string | null
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
    const { action, consultationId, userId, notes } = await req.json()

    switch (action) {
      case 'join_call':
        return await joinCall(consultationId, userId)
      
      case 'leave_call':
        return await leaveCall(consultationId, userId)
      
      case 'save_notes':
        return await saveNotes(consultationId, userId, notes)
      
      case 'get_call_status':
        return await getCallStatus(consultationId, userId)
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Call management error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function joinCall(consultationId: string, userId: string) {
  console.log('User joining call:', userId, 'consultation:', consultationId)
  
  // Verify user has access to this consultation
  const { data: consultation, error: fetchError } = await supabase
    .from('consultations')
    .select('*')
    .eq('id', consultationId)
    .or(`farmer_id.eq.${userId},consultant_id.eq.${userId}`)
    .single()

  if (fetchError || !consultation) {
    throw new Error('Access denied or consultation not found')
  }

  // Update status to in_progress if it was scheduled
  if (consultation.status === 'scheduled') {
    const { error: updateError } = await supabase
      .from('consultations')
      .update({ status: 'in_progress' })
      .eq('id', consultationId)

    if (updateError) {
      console.error('Error updating consultation status:', updateError)
    }
  }

  console.log('User joined call successfully')
  return new Response(
    JSON.stringify({ 
      success: true, 
      consultation: consultation,
      canJoin: true
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function leaveCall(consultationId: string, userId: string) {
  console.log('User leaving call:', userId, 'consultation:', consultationId)
  
  // Verify user has access to this consultation
  const { data: consultation, error: fetchError } = await supabase
    .from('consultations')
    .select('*')
    .eq('id', consultationId)
    .or(`farmer_id.eq.${userId},consultant_id.eq.${userId}`)
    .single()

  if (fetchError || !consultation) {
    throw new Error('Access denied or consultation not found')
  }

  console.log('User left call successfully')
  return new Response(
    JSON.stringify({ success: true }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function saveNotes(consultationId: string, userId: string, notes: string) {
  console.log('Saving notes for consultation:', consultationId, 'user:', userId)
  
  // Verify user is the consultant for this consultation
  const { data: consultation, error: fetchError } = await supabase
    .from('consultations')
    .select('*')
    .eq('id', consultationId)
    .eq('consultant_id', userId)
    .single()

  if (fetchError || !consultation) {
    throw new Error('Access denied - only consultant can save notes')
  }

  const { data, error } = await supabase
    .from('consultations')
    .update({ notes: notes })
    .eq('id', consultationId)
    .eq('consultant_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error saving notes:', error)
    throw new Error('Failed to save notes')
  }

  console.log('Notes saved successfully')
  return new Response(
    JSON.stringify({ success: true, consultation: data }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getCallStatus(consultationId: string, userId: string) {
  console.log('Getting call status for consultation:', consultationId, 'user:', userId)
  
  const { data: consultation, error } = await supabase
    .from('consultations')
    .select('*')
    .eq('id', consultationId)
    .or(`farmer_id.eq.${userId},consultant_id.eq.${userId}`)
    .single()

  if (error || !consultation) {
    throw new Error('Access denied or consultation not found')
  }

  return new Response(
    JSON.stringify({ 
      success: true, 
      consultation: consultation,
      status: consultation.status
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}