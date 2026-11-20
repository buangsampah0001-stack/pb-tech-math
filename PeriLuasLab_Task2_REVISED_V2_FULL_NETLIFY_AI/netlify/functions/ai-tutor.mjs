/**
 * PeriLuas Lab: optional server-side Gemini free-tier AI tutoring endpoint.
 * No student names, arbitrary chat history or long text are accepted.
 * Put GEMINI_API_KEY in Netlify Environment Variables (Functions scope), NEVER in HTML.
 * Function URL: POST /.netlify/functions/ai-tutor
 */
const allowedTopics = {
  boundary: 'confusing perimeter with area',
  samep: 'incorrectly assuming equal perimeters always imply equal areas',
  samea: 'incorrectly assuming equal areas always imply equal perimeters',
  units: 'confusing length units with square units',
};
const rateWindow = new Map();
const json = (obj,status=200,extra={}) => new Response(JSON.stringify(obj),{
  status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}
});
const apiKey = () => (typeof Netlify !== 'undefined' && Netlify.env?.get?.('GEMINI_API_KEY')) || process.env.GEMINI_API_KEY;

export function validate(body){
  if(!body || typeof body !== 'object' || Array.isArray(body))return null;
  const {topic,level,p,q}=body;
  if(typeof topic!=='string' || !Object.prototype.hasOwnProperty.call(allowedTopics,topic))return null;
  if(!Number.isInteger(level) || level<1 || level>3)return null;
  if(!Number.isInteger(p)||p<1||p>12||!Number.isInteger(q)||q<1||q>12)return null;
  return {topic,level,p,q};
}
function allowRequest(ip){
  const now=Date.now();
  if(rateWindow.size>3000){for(const [key,v] of rateWindow)if(now-v.since>60000)rateWindow.delete(key);}
  const record=rateWindow.get(ip);
  if(!record||now-record.since>=60000){rateWindow.set(ip,{since:now,count:1});return true}
  record.count++;return record.count<=8;
}
export default async function handler(req){
 if(req.method!=='POST')return json({error:'Use POST to request a mathematics hint.'},405,{Allow:'POST'});
 const reqUrl=new URL(req.url);
 const origin=req.headers.get('origin');
 if(origin&&origin!==reqUrl.origin)return json({error:'Cross-site requests are not permitted.'},403);
 const len=Number(req.headers.get('content-length'));
 if(Number.isFinite(len)&&len>1200)return json({error:'Request too large.'},413);
 let body;
 try{const raw=await req.text();if(raw.length>1200)return json({error:'Request too large.'},413);body=JSON.parse(raw)}catch(e){return json({error:'Please send a valid JSON request.'},400)}
 const clean=validate(body);
 if(!clean)return json({error:'Choose one mathematics topic, support level 1–3, and valid dimensions 1–12.'},400);
 const ip=(req.headers.get('x-nf-client-connection-ip')||req.headers.get('x-forwarded-for')||'anonymous').slice(0,80);
 if(!allowRequest(ip))return json({error:'Too many AI requests. Try the offline hints or return later.'},429);
 const key=apiKey();
 if(!key)return json({error:'The AI Tutor has not been configured. Add GEMINI_API_KEY to Netlify environment variables, redeploy, then try again.'},503);
 const model=(process.env.GEMINI_MODEL||'gemini-2.5-flash-lite');
 if(!/^[a-zA-Z0-9._-]+$/.test(model))return json({error:'Invalid AI model configuration.'},503);
 const {topic,level,p,q}=clean;
 const perimeter=2*(p+q),area=p*q;
 const strategy={
  1:'Ask ONE guiding question; do not give the numerical solution or explicit formula result.',
  2:'Give ONE clear visual/manipulative hint involving perimeter boundary or unit-square grid; do not give the final numerical answer.',
  3:'Provide ONE short worked example with the correct perimeter and area, followed by a reflection question.',
 }[level];
 const system=`You are a careful English-language Year 4 KSSR mathematics tutor (ages 10–11). TOPIC: square and rectangle PERIMETER vs AREA only. Give differentiated scaffolding. Do not act as a general chatbot. No personal information. Always distinguish length units from square units. Do not invent educational sources or claim to have observed a real pupil. Keep to 35–90 words. Do not directly solve a Level 1 or Level 2 prompt. Include a simple student action. Plain text only. Correct maths is critical. Avoid unrelated topics or Markdown tables.`;
 const user=`Misconception: ${allowedTopics[topic]}. Selected rectangle: length ${p} units, width ${q} units. Verified perimeter P=2(${p}+${q})=${perimeter} length units. Verified area A=${p}×${q}=${area} square units. Support level ${level}: ${strategy}. For equal-perimeter counterexamples use 2×8 (P=20,A=16) and 5×5 (P=20,A=25). For equal-area counterexamples use 3×8 (P=22,A=24) and 4×6 (P=20,A=24). Give an age-appropriate explanation for this chosen misconception, without asking for a name or other identifying information.`;
 let res;
 try{
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
  try{
   res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{
    method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},
    body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:user}]}],generationConfig:{temperature:0.25,maxOutputTokens:300,responseMimeType:'text/plain'}}),
    signal:controller.signal,
   });
  }finally{clearTimeout(timeout)}
 }catch(e){return json({error:'The external AI service is unavailable right now. Use the offline hints.'},503)}
 if(res.status===429)return json({error:'The AI free-tier quota or rate limit has been reached. Use the offline hints and try again later.'},429);
 if(res.status===401||res.status===403)return json({error:'The AI API key or project permissions need checking in Google AI Studio.'},503);
 if(!res.ok)return json({error:'The AI service could not complete this request. Verify the model and free-tier availability.'},503);
 let payload;
 try{payload=await res.json()}catch(e){return json({error:'Unexpected AI service response.'},503)}
 const result=(payload.candidates?.[0]?.content?.parts||[]).map(x=>x.text||'').join('\n').trim().slice(0,900);
 if(!result)return json({error:'AI did not return a usable hint. Please use the offline support.'},503);
 return json({hint:result,model,level,notice:'AI-generated explanation. Verify calculations against the dynamic model.'});
}
