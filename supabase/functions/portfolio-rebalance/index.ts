
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { currentAllocation, marketConditions, riskProfile } = await req.json();

    const prompt = `As an AI investment advisor, analyze and recommend portfolio rebalancing based on:
    Current Allocation: ${JSON.stringify(currentAllocation)}
    Market Conditions: ${marketConditions}
    Risk Profile: ${riskProfile}
    
    Provide specific recommendations for portfolio rebalancing including:
    1. Target allocation changes
    2. Expected impact on returns and risk
    3. Reasoning behind each recommendation`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI investment advisor specialized in portfolio rebalancing.'
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    console.log('AI Response:', data);

    return new Response(JSON.stringify({
      recommendations: data.choices[0].message.content,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in portfolio-rebalance function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
