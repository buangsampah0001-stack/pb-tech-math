from playwright.sync_api import sync_playwright
from pathlib import Path
from bs4 import BeautifulSoup
from zipfile import ZipFile
root=Path('/mnt/data/PeriLuasLab_Task2_REVISED');html=(root/'index.html').read_text();r=[]
def check(n,ok,detail=''):
 r.append((n,'PASS' if ok else 'FAIL',str(detail)));print(f'{r[-1][1]} | {n} | {detail}')
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);p=b.new_page(viewport={'width':1536,'height':980});errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 p.set_content(html,wait_until='load')
 p.locator('[data-page="explore"]').click();p.locator('#lenRange').fill('12');p.locator('#widRange').fill('12');p.wait_for_timeout(100)
 label=p.locator('#shapeCanvas text').filter(has_text='Width 12');print('width label markup',label.evaluate('(e)=>e.outerHTML'))
 shape_pos=p.locator('#shapeSvg').bounding_box();label_pos=label.bounding_box();card_pos=p.locator('#shapeSvg rect').nth(2).bounding_box()
 check('Width 12 label visible in SVG region',label_pos is not None and label_pos['x']>=shape_pos['x'] and label_pos['x']+label_pos['width']<=shape_pos['x']+shape_pos['width'],str(label_pos))
 check('Width label avoids right-side numeric cards',label_pos['x']+label_pos['width'] < (shape_pos['x']+shape_pos['width']*.63),f'label right={label_pos["x"]+label_pos["width"]:.0f}')
 check('12 × 12 correct',p.locator('#perimValue').inner_text()=='48' and p.locator('#areaValue').inner_text()=='144')
 p.screenshot(path=str(root/'evidence/width_label_fixed_12x12.png'),full_page=True)
 p.locator('[data-page="discover"]').click();check('Live AI interface exists',p.locator('#askAI').count()==1 and p.locator('#aiConsent').count()==1)
 p.locator('#askAI').click();check('Consent gate enforced','tick the consent' in p.locator('#aiTutorOutput').inner_text())
 p.locator('#aiConsent').check();p.locator('#askAI').click();check('Local file/preview shows backend limitations','Netlify' in p.locator('#aiTutorOutput').inner_text() or 'deployed' in p.locator('#aiTutorOutput').inner_text())
 # test the real click-to-API logic with a mocked fetch and a test-only simulated hosted protocol
 test_html=html.replace("if(!['http:','https:'].includes(location.protocol))", "if(false)")
 q=b.new_page(viewport={'width':1240,'height':920});q.on('pageerror',lambda e:errors.append(str(e)))
 q.set_content(test_html,wait_until='load')
 q.evaluate("""()=>{window.fetch=async (url,opts)=>{window.__lastAIPayload=JSON.parse(opts.body);return {ok:true,json:async()=>({hint:'Observe the four outer edges first. Can you trace the entire boundary?',level:1})}}}""")
 q.locator('[data-page="discover"]').click();q.locator('#aiConsent').check();q.locator('#askAI').click();q.wait_for_timeout(350)
 check('Mock live model reply displayed','Observe the four outer edges first' in q.locator('#aiTutorOutput').inner_text(),q.locator('#aiTutorOutput').inner_text()[:140])
 body=q.evaluate('window.__lastAIPayload')
 check('Real query sends only allowed keys',set(body)=={'topic','level','p','q'} and body['p']==6 and body['q']==4,body)
 check('No JavaScript errors',len(errors)==0,errors)
 for w in [390,768,1280]:
  m=b.new_page(viewport={'width':w,'height':900});m.set_content(html);m.locator('[data-page="explore"]').click();check(f'No full-page horizontal overflow at {w}',m.evaluate('document.documentElement.scrollWidth')<=w)
  m.close()
 b.close()
(root/'evidence/revision_test_results.txt').write_text('\n'.join(f'{a}: {bb} {c}' for a,bb,c in r)+'\n\nReal Gemini and user-owned Netlify deployment: NOT VERIFIED.\n',encoding='utf-8')
print('Pass count',sum(z[1]=='PASS' for z in r),'/',len(r))
