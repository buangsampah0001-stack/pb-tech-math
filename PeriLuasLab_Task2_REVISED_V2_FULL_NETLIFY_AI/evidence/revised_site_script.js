
(()=>{'use strict';
const $=id=>document.getElementById(id), $$=sel=>Array.from(document.querySelectorAll(sel));
const state={p:6,q:4,obs:[],m1:new Map(),m2:new Map(),garden:null,checks:new Set(),diag:{},answers:{},ggbApi:null,ggbPending:false};
const P=(p,q)=>2*(p+q), A=(p,q)=>p*q;
function feedback(id,ok,html){const n=$(id);n.innerHTML=html;n.className='feedback show '+(ok===true?'good':ok===false?'bad':'');}
function progress(){const n=state.checks.size;$('progressText').textContent=`${n}/4 checks`;$('progressBar').style.width=`${n/4*100}%`}
function pass(n){state.checks.add(n);progress()}
function goto(page){$$('.page').forEach(n=>n.classList.toggle('active',n.id===page));$$('.nav button').forEach(n=>n.classList.toggle('active',n.dataset.page===page));window.scrollTo({top:0,behavior:'smooth'});if(page==='explore')draw()}
$$('[data-page]').forEach(n=>n.addEventListener('click',()=>goto(n.dataset.page)));$$('[data-goto]').forEach(n=>n.addEventListener('click',()=>goto(n.dataset.goto)));
function draw(){const {p,q}=state;let s='';const ns='http://www.w3.org/2000/svg',ox=75,oy=317,cell=23;let grid='';for(let x=0;x<=12;x++)grid+=`<line x1="${ox+x*cell}" y1="${oy-12*cell}" x2="${ox+x*cell}" y2="${oy}" stroke="#d5e2e9" stroke-width="1"/>`;for(let y=0;y<=12;y++)grid+=`<line x1="${ox}" y1="${oy-y*cell}" x2="${ox+12*cell}" y2="${oy-y*cell}" stroke="#d5e2e9" stroke-width="1"/>`;s+=`<rect x="45" y="19" width="345" height="325" rx="10" fill="#ffffff"/>${$('toggleGrid').checked?grid:''}`;s+=`<rect x="${ox}" y="${oy-q*cell}" width="${p*cell}" height="${q*cell}" fill="#82d2a1" fill-opacity="0.4" stroke="${$('toggleBoundary').checked?'#2466cc':'#286f6b'}" stroke-width="${$('toggleBoundary').checked?5:2}" rx="1"/>`;if($('toggleGrid').checked){for(let x=1;x<p;x++)s+=`<line x1="${ox+x*cell}" y1="${oy-q*cell}" x2="${ox+x*cell}" y2="${oy}" stroke="#36a177" stroke-opacity=".65"/>`;for(let y=1;y<q;y++)s+=`<line x1="${ox}" y1="${oy-y*cell}" x2="${ox+p*cell}" y2="${oy-y*cell}" stroke="#36a177" stroke-opacity=".65"/>`};s+=`<text x="${ox+p*cell/2}" y="${oy+23}" font-size="17" font-weight="800" text-anchor="middle" fill="#2563eb">Length ${p}</text><text transform="translate(${ox-19},${oy-q*cell/2}) rotate(-90)" text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="800" fill="#2563eb">Width ${q}</text><rect x="415" y="65" width="172" height="85" rx="14" fill="#e8f1ff"/><text x="429" y="89" font-size="13" fill="#527293">PERIMETER</text><text x="429" y="131" font-size="33" font-weight="900" fill="#154b9b">${P(p,q)}</text><rect x="415" y="172" width="172" height="85" rx="14" fill="#e7f7ed"/><text x="429" y="196" font-size="13" fill="#4e816b">AREA</text><text x="429" y="239" font-size="33" font-weight="900" fill="#1c7753">${A(p,q)}</text>`;$('shapeCanvas').innerHTML=s;$('lenLabel').textContent=p+' units';$('widLabel').textContent=q+' units';$('lenRange').value=p;$('widRange').value=q;$('perimValue').textContent=P(p,q);$('areaValue').textContent=A(p,q);$('formulaText').innerHTML=$('toggleFormula').checked?`P = 2(${p} + ${q}) = ${P(p,q)} units<br>A = ${p} × ${q} = ${A(p,q)} square units`:'Formulas hidden. Use the checkbox to reveal them.';if(state.ggbApi){try{state.ggbApi.setValue('p',p);state.ggbApi.setValue('q',q)}catch(e){console.warn('GeoGebra sync issue',e)}}}
function dims(p,q){state.p=+p;state.q=+q;draw()}
$('lenRange').addEventListener('input',e=>dims(e.target.value,state.q));$('widRange').addEventListener('input',e=>dims(state.p,e.target.value));['toggleGrid','toggleBoundary','toggleFormula'].forEach(id=>$(id).addEventListener('change',draw));$('resetDims').addEventListener('click',()=>dims(6,4));
$('saveObservation').addEventListener('click',()=>{if(!state.obs.some(x=>x.p===state.p&&x.q===state.q))state.obs.push({p:state.p,q:state.q});renderObs()});function renderObs(){$('obsBody').innerHTML=state.obs.length?state.obs.map(x=>`<tr><td>${x.p}</td><td>${x.q}</td><td>${P(x.p,x.q)}</td><td>${A(x.p,x.q)}</td></tr>`).join(''):'<tr><td colspan="4" class="muted">No shapes recorded yet.</td></tr>'} $('clearObs').addEventListener('click',()=>{state.obs=[];renderObs()});
$('checkPrediction').addEventListener('click',()=>{const v=$('prediction').value;feedback('predictionFeedback',v==='both',!v?'Choose an idea before checking.':v==='both'?'Correct! If length increases while width stays fixed, both the boundary length and the number of unit squares grow.':'Try moving only the Length slider by one step. Compare the two numbers before and after.')});
$$('[data-diag]').forEach(n=>n.addEventListener('click',()=>{let q=+n.dataset.diag,v=+n.dataset.val;$$(`[data-diag="${q}"]`).forEach(b=>b.classList.toggle('selected',b===n));state.diag[q]=v;const correct=q===1?20:24;let msg;if(v===correct)msg=q===1?'Correct: 6 + 4 + 6 + 4 = 20 metres of fence.':'Correct: 6 rows/columns by 4 gives 24 square tiles.';else msg=q===1?(v===10?'You added two sides, but the fence goes around all four sides.':'24 describes the area, not the distance around the garden.'):(v===20?'20 is the perimeter. For tiles, count the unit squares inside.':'Try counting 6 × 4 unit squares.');feedback('diag'+q+'Feedback',v===correct,msg);if(state.diag[1]!=null&&state.diag[2]!=null)pass(1)}));
$('checkCp2').addEventListener('click',()=>{const p=Number($('cp2P').value),a=Number($('cp2A').value),filled=$('cp2P').value!==''&&$('cp2A').value!=='';if(!filled)return feedback('cp2Feedback',null,'Enter both measurements first.');if(p===20&&a===21){pass(2);feedback('cp2Feedback',true,'Correct! Perimeter = 2(7 + 3) = 20 units. Area = 7 × 3 = 21 square units.')}else feedback('cp2Feedback',false,`Check the boundary and the tiles separately. ${p!==20?'For perimeter, include all four sides. ':''}${a!==21?'For area, count square units by multiplying length and width.':''}`)});
function missionPreview(n,p,q){const id=n===1?'m1Preview':'m2Preview';const x=28,y=145,c=10;let t=`<rect x="0" y="0" width="320" height="165" rx="11" fill="#f5faff"/><rect x="${x}" y="${y-q*c}" width="${p*c}" height="${q*c}" fill="#bcebd2" stroke="#236ed0" stroke-width="3"/>`;for(let i=1;i<p;i++)t+=`<line x1="${x+i*c}" y1="${y-q*c}" x2="${x+i*c}" y2="${y}" stroke="#58b08a"/>`;for(let j=1;j<q;j++)t+=`<line x1="${x}" y1="${y-j*c}" x2="${x+p*c}" y2="${y-j*c}" stroke="#58b08a"/>`;t+=`<text x="175" y="44" font-size="15" font-weight="700" fill="#16314e">${p} × ${q}</text><text x="175" y="78" font-size="14" fill="#205c91">P = ${P(p,q)} units</text><text x="175" y="106" font-size="14" fill="#1b7956">A = ${A(p,q)} sq units</text>`;$(id).innerHTML=t;}
function addMission(n,p,q){missionPreview(n,p,q);let map=n===1?state.m1:state.m2;map.set(`${p},${q}`,{p,q});dims(p,q);const body=$(n===1?'m1Body':'m2Body');body.innerHTML=[...map.values()].map(x=>`<tr><td>${x.p} × ${x.q}</td><td>${P(x.p,x.q)}</td><td>${A(x.p,x.q)}</td></tr>`).join('');}
$$('#m1Btns button').forEach(b=>b.addEventListener('click',()=>addMission(1,+b.dataset.p,+b.dataset.q)));$$('#m2Btns button').forEach(b=>b.addEventListener('click',()=>addMission(2,+b.dataset.p,+b.dataset.q)));
$('checkM1').addEventListener('click',()=>{if(state.m1.size<2)return feedback('m1Feedback',null,'Record at least two different rectangles first.');if($('m1Claim').value==='no')feedback('m1Feedback',true,'Exactly. 2 × 8 has area 16 but 5 × 5 has area 25, even though each perimeter is 20. This is a counterexample.');else feedback('m1Feedback',false,'Examine your recorded area values. Are they all identical? Use the data to challenge the claim.');});
$('checkM2').addEventListener('click',()=>{if(state.m2.size<2)return feedback('m2Feedback',null,'Record at least two different rectangles first.');if($('m2Claim').value==='no')feedback('m2Feedback',true,'Correct. 3 × 8 and 4 × 6 both cover 24 square units, but their perimeters are 22 and 20.');else feedback('m2Feedback',false,'Check the perimeter column for your different designs. Is it always the same?')});
$$('#cp3Btns button').forEach(b=>b.addEventListener('click',()=>{const v=+b.dataset.answer;$$('#cp3Btns button').forEach(x=>x.classList.toggle('selected',x===b));if(v===5){pass(3);feedback('cp3Feedback',true,'Correct! A 5 × 5 square encloses 25 square units with perimeter 20. All listed dimensions have the same perimeter.')}else feedback('cp3Feedback',false,`A ${v} × ${10-v} rectangle covers ${v*(10-v)} square units. Compare it with the other possible designs.`)}));
const hints={boundary:["Follow the complete outline with your finger. What is being measured?","Try highlighting the blue boundary. The green square units represent something different.","For a 6 by 4 rectangle, perimeter = 6 + 4 + 6 + 4 = 20 length units. Area = 6 × 4 = 24 square units."],samep:["If two gardens use the same fence, must the inside be equally large?","Compare 2 × 8 with 5 × 5. Both perimeters are 20. How many square tiles does each cover?","P(2,8) = 20, A(2,8) = 16. P(5,5) = 20, A(5,5) = 25. The claim is false."],samea:["Can rearranging the same number of square tiles change the boundary length?","Compare 3 × 8 and 4 × 6. Both have area 24. Measure their outlines.","A(3,8)=24 and A(4,6)=24, but P(3,8)=22 while P(4,6)=20."],units:["Does your answer describe a length or a surface?","Think of a fence measured in metres and tiles measured in square metres.","A rectangle 6 m by 4 m needs 20 m of fence, while its surface covers 24 m². Metres and square metres are not interchangeable."]};
$$('[data-hint]').forEach(b=>b.addEventListener('click',()=>{$('hintOutput').innerHTML='<strong>Support level '+b.dataset.hint+':</strong> '+hints[$('hintTopic').value][+b.dataset.hint-1]}));$('hintTopic').addEventListener('change',()=>{$('hintOutput').textContent='Choose a level of support when you need it.'});
let aiBusy=false;
$('askAI').addEventListener('click',async()=>{
 const out=$('aiTutorOutput');const btn=$('askAI');
 if(aiBusy)return;
 if(!$('aiConsent').checked){out.textContent='Please review and tick the consent box first. Otherwise use the offline hint buttons above.';return;}
 if(!['http:','https:'].includes(location.protocol)){out.textContent='Live AI requires the deployed Netlify URL. Local files cannot access Netlify Functions. Use the pre-written hint buttons here.';return;}
 aiBusy=true;btn.disabled=true;btn.textContent='Generating a learning hint…';
 out.textContent='Consulting Gemini through the secure Netlify server…';
 try {
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),16000);
  let resp;
  try { resp=await fetch('/.netlify/functions/ai-tutor',{
    method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',
    body:JSON.stringify({topic:$('hintTopic').value,level:Number($('aiLevel').value),p:state.p,q:state.q}),
    signal:controller.signal});
  } finally {clearTimeout(timer)}
  let payload;try{payload=await resp.json()}catch(e){throw new Error('The AI backend is not deployed. Publish through Netlify Git integration or CLI, not as a static-only upload.');}
  if(!resp.ok)throw new Error(payload.error||'AI is temporarily unavailable.');
  if(typeof payload.hint!=='string'||!payload.hint.trim())throw new Error('The AI did not provide a usable hint.');
  out.textContent=payload.hint+'\n\nAI-generated suggestion. Check the mathematics before relying on it.';
  out.style.whiteSpace='pre-wrap';
 }catch(err){out.textContent=(err.name==='AbortError'?'The AI request timed out.':err.message)+' Use the offline hints above instead.';}
 finally{aiBusy=false;btn.disabled=false;btn.textContent='✨ Ask live AI Tutor';}
});

$$('#gardenOpts button').forEach(b=>b.addEventListener('click',()=>{state.garden={p:+b.dataset.p,q:+b.dataset.q};$$('#gardenOpts button').forEach(x=>x.classList.toggle('selected',x===b));$('gardenP').value=P(state.garden.p,state.garden.q);$('gardenA').value=A(state.garden.p,state.garden.q);dims(state.garden.p,state.garden.q)}));
$('checkGarden').addEventListener('click',()=>{if(!state.garden)return feedback('gardenFeedback',null,'Choose a garden first.');if($('gardenReason').value.trim().length<12)return feedback('gardenFeedback',null,'Explain your choice using at least one mathematical reason.');let ok=state.garden.p===5;feedback('gardenFeedback',ok,ok?'Your design has the largest area among the whole-number options: 25 m² using exactly 20 m of fencing. Now confirm the calculations in Checkpoint 04.':`Your design encloses ${A(state.garden.p,state.garden.q)} m². Compare all whole-number options. Which gives a larger area with the same fencing?`)});
$('checkCp4').addEventListener('click',()=>{if(!state.garden)return feedback('cp4Feedback',null,'Select a garden design first.');let p=Number($('gardenP').value),a=Number($('gardenA').value),filled=$('gardenP').value!==''&&$('gardenA').value!=='';if(!filled)return feedback('cp4Feedback',null,'Enter both calculated values.');if(p===P(state.garden.p,state.garden.q)&&a===A(state.garden.p,state.garden.q)&&state.garden.p===5&&$('gardenReason').value.trim().length>=12){pass(4);feedback('cp4Feedback',true,'Validated: 5 m × 5 m, perimeter 20 m, area 25 m². Your reasoning and calculations have been recorded locally.')}else if(p!==P(state.garden.p,state.garden.q)||a!==A(state.garden.p,state.garden.q))feedback('cp4Feedback',false,'Check your calculations: perimeter adds four sides and area counts square units.');else feedback('cp4Feedback',false,'Your calculations are correct for the chosen garden, but compare options to maximise area and explain your reasoning.')});
const storeKey='periluaslab_reflection_v1';try{let d=JSON.parse(localStorage.getItem(storeKey)||'null');if(d){$('reflection1').value=d.one||'';$('reflection2').value=d.two||''}}catch(e){}
$('saveReflection').addEventListener('click',()=>{if($('reflection1').value.trim().length<10||$('reflection2').value.trim().length<10)return feedback('reflectionFeedback',null,'Write a meaningful explanation in both spaces.');try{localStorage.setItem(storeKey,JSON.stringify({one:$('reflection1').value,two:$('reflection2').value}));feedback('reflectionFeedback',true,'Reflection saved in this browser only. You can export your learning log.')}catch(e){state.tempReflections={one:$('reflection1').value,two:$('reflection2').value};feedback('reflectionFeedback',true,'Browser storage is unavailable. Reflection is held for this tab only. Download your learning log to keep a copy.')}});
function downloadFile(name,mime,content){const blob=content instanceof Blob?content:new Blob([content],{type:mime});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500)};
$('exportLog').addEventListener('click',()=>{const log=`PERILUAS LAB — ANONYMOUS LEARNING LOG\n\nDiagnostic Q1: ${state.diag[1]??'unanswered'}\nDiagnostic Q2: ${state.diag[2]??'unanswered'}\nCheckpoint passed: ${[...state.checks].sort().join(', ')||'none'}\nObservations: ${state.obs.map(x=>`${x.p} × ${x.q}: perimeter ${P(x.p,x.q)}, area ${A(x.p,x.q)}`).join('; ')||'none'}\nMission 1: ${[...state.m1.keys()].join(', ')}\nMission 2: ${[...state.m2.keys()].join(', ')}\nGarden: ${state.garden?`${state.garden.p} × ${state.garden.q}`:'not selected'}\nExplanation: ${$('gardenReason').value}\nReflection 1: ${$('reflection1').value}\nReflection 2: ${$('reflection2').value}\n\nGenerated entirely in this browser. No learner identity collected.\n`;downloadFile('PeriLuasLab_Learning_Log.txt','text/plain;charset=utf-8',log)});
$('clearLog').addEventListener('click',()=>{try{localStorage.removeItem(storeKey)}catch(e){}$('reflection1').value='';$('reflection2').value='';feedback('reflectionFeedback',null,'Saved reflections have been cleared from this browser.')});
// Official GeoGebra HTML5 app API. The offline SVG model is not claimed to be GeoGebra.
function constructGeoGebra(api,fromSavedFile=false){
 state.ggbApi=api;state.ggbPending=false;let failed=[];
 const alreadyThere=fromSavedFile&&typeof api.exists==='function'&&api.exists('p')&&api.exists('q')&&api.exists('garden');
 if(!alreadyThere){
  for(const [cmd,fallback] of [['p = Slider(1,12,1,1,150,false,true,false,false)','p = 6'],['q = Slider(1,12,1,1,150,false,true,false,false)','q = 4']]){
   try{if(api.evalCommand(cmd)===false&&!api.evalCommand(fallback))failed.push(cmd)}catch(e){try{if(!api.evalCommand(fallback))failed.push(cmd)}catch(e2){failed.push(cmd)} }
  }
  for(const cmd of ['G = (0,0)','H = (p,0)','I = (p,q)','J = (0,q)','garden = Polygon(G,H,I,J)','perimeterCalc = 2*(p+q)','areaCalc = p*q']){
   try{if(api.evalCommand(cmd)===false)failed.push(cmd)}catch(e){failed.push(cmd)}
  }
 }
 try{api.setColor('garden',73,173,120);api.setFilling('garden',0.3);api.setLineThickness('garden',5);
   ['G','H','I','J'].forEach(x=>api.setLabelVisible(x,false));api.setLabelVisible('garden',false);
   if(typeof api.setCoordSystem==='function')api.setCoordSystem(-1.5,14,-1.5,14);
 }catch(e){console.warn('GeoGebra cosmetic settings:',e)}
 draw();$('downloadGgb').disabled=failed.length>0;
 if(failed.length)feedback('ggbStatus',false,'GeoGebra loaded but the following commands need correction: '+failed.join('; '));
 else feedback('ggbStatus',true,alreadyThere?'Saved GeoGebra worksheet loaded. The HTML sliders are linked to p and q. You can export a .ggb file.':'GeoGebra model constructed. The HTML sliders are linked to p and q. You can export a .ggb file.');
}
$('loadGgb').addEventListener('click',async()=>{
 if(state.ggbApi){$('ggbWrap').classList.remove('hidden');return}
 if(state.ggbPending){return}
 state.ggbPending=true;$('ggbWrap').classList.remove('hidden');
 feedback('ggbStatus',null,'Loading the official GeoGebra engine. An internet connection is required.');
 async function init(){
  let hasSaved=false;
  try{if(location.protocol.startsWith('http')){const r=await fetch('assets/PeriLuasLab.ggb',{method:'HEAD',cache:'no-store'});hasSaved=r.ok;}}catch(e){}
  try{
   const container=$('ggbElement');const width=Math.max(420,Math.floor(container.getBoundingClientRect().width||860));
   container.style.minHeight='490px';
   const app=new GGBApplet({id:'periluasGeoGebra',appName:'classic',width,height:490,
    ...(hasSaved?{filename:'assets/PeriLuasLab.ggb'}:{}),
    showToolBar:false,showAlgebraInput:false,showAlgebraView:false,showGraphicsView:true,
    showMenuBar:false,showResetIcon:true,enableRightClick:false,showZoomButtons:false,
    showFullscreenButton:true,language:'en',appletOnLoad:api=>constructGeoGebra(api,hasSaved)},true);
   app.inject('ggbElement');
  }catch(e){state.ggbPending=false;feedback('ggbStatus',false,'GeoGebra could not start: '+e.message+'. The built-in maths exploration remains available.')}
 }
 if(typeof GGBApplet!=='undefined')return init();
 const script=document.createElement('script');script.src='https://www.geogebra.org/apps/deployggb.js';
 script.onload=init;script.onerror=()=>{state.ggbPending=false;feedback('ggbStatus',false,'The GeoGebra engine could not be reached. Try an internet-connected published page or use the built-in model.');};
 document.head.appendChild(script);
});
$('downloadGgb').addEventListener('click',()=>{if(!state.ggbApi)return;try{state.ggbApi.getBase64(b64=>{const binary=atob(b64),bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);downloadFile('PeriLuasLab_Dynamic_Construction.ggb','application/octet-stream',new Blob([bytes]))})}catch(e){feedback('ggbStatus',false,'Export could not be completed in this browser: '+e.message)}});
draw();progress();})();
