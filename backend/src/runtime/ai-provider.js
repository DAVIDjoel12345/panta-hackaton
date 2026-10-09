export function aiProvider(){
  const routed=process.env.OPENROUTER_API_KEY||(process.env.GEMINI_API_KEY?.startsWith('sk-or-v1-')?process.env.GEMINI_API_KEY:'');
  if(routed)return {provider:'Gemini via OpenRouter',key:routed,url:'https://openrouter.ai/api/v1/chat/completions',model:process.env.OPENROUTER_MODEL||'google/gemini-2.5-flash-lite',headers:{'HTTP-Referer':process.env.APP_PUBLIC_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:5173'),'X-Title':'Panta Signal'}};
  return {provider:'Gemini',key:process.env.GEMINI_API_KEY||'',url:'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',model:process.env.AI_MODEL||'gemini-3.1-flash-lite',headers:{}};
}
