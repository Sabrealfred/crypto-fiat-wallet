
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Aquí normalmente conectaríamos con un proveedor real de tipos de cambio
    // Por ahora usamos datos simulados
    const mockRates = {
      'USD': 1.0,
      'EUR': 0.92,
      'MXN': 17.05,
      'GBP': 0.79,
      'JPY': 148.50,
      'CAD': 1.35,
      'CHF': 0.87,
      'AUD': 1.52
    };

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Actualizar tipos de cambio en la base de datos
    for (const [code, rate] of Object.entries(mockRates)) {
      await supabase
        .from('currencies')
        .update({ exchange_rate: rate })
        .eq('code', code);
    }

    return new Response(
      JSON.stringify({ success: true, updated: new Date().toISOString() }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
