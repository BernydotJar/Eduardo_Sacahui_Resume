/* Meridian independent axe-core WCAG 2 A/AA browser gate. Requires Playwright and @axe-core/playwright. */
const {chromium}=require(process.env.MERIDIAN_PLAYWRIGHT_PACKAGE || 'playwright');
const AxeBuilder=require(process.env.MERIDIAN_AXE_PACKAGE || '@axe-core/playwright').default;
const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../public/recruiting-demo');
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{let f=path.resolve(root,'.'+new URL(req.url,'http://127.0.0.1').pathname);if(!f.startsWith(root+'/')){res.writeHead(403).end();return}fs.readFile(f,(err,b)=>{if(err){res.writeHead(404).end();return}res.writeHead(200,{'content-type':mime[path.extname(f)]||'application/octet-stream'});res.end(b)})});
const routes=[['dashboard','#/'],['candidates','#/candidates'],['jobs','#/jobs'],['automations','#/automations'],['reports','#/reports']];
let checks=0,failed=0;
const results=[];
(async()=>{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({...(process.env.MERIDIAN_CHROMIUM_EXECUTABLE?{executablePath:process.env.MERIDIAN_CHROMIUM_EXECUTABLE}:{}),headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const verify=async(page,theme,viewport,route)=>{
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();
  const problems=result.violations.map(v=>({id:v.id,count:v.nodes.length,example:v.nodes.slice(0,2).map(n=>({target:n.target,contrast:n.any.map(a=>a.data?.contrastRatio)}))}));
  checks++;if(problems.length) failed++;
  results.push({theme,viewport,route,violations:problems});
  console.log((problems.length?'FAIL ':'PASS ')+theme+'/'+viewport+'/'+route+' '+JSON.stringify(problems));
 };
 try{
  for(const theme of ['light','dark'])for(const [viewport,width] of [['desktop',1440],['mobile',390]]){
   const ctx=await browser.newContext({viewport:{width,height:850}});
   await ctx.addInitScript(t=>localStorage.setItem('meridian.theme',t),theme);
   const page=await ctx.newPage();
   page.setDefaultTimeout(16000);
   await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
   await verify(page,theme,viewport,'login');
   await page.getByRole('button',{name:'Sign in',exact:true}).evaluate(e=>e.click());
   await page.locator('#main h1').waitFor();
   const details={};
   for(const [route,hash] of routes){
    await page.evaluate(h=>{location.hash=h},hash);
    await page.waitForFunction(name=>document.documentElement.dataset.meridianRoute===name,route);
    await page.waitForFunction(name=>document.querySelector('#main h1')?.textContent?.trim()===name[0].toUpperCase()+name.slice(1),route);
    await page.waitForTimeout(300);
    await verify(page,theme,viewport,route);
    if(route==='dashboard')details.candidate=await page.locator('a[href*="#/candidates/"]').first().getAttribute('href');
    if(route==='jobs')details.job=await page.locator('a[href*="#/jobs/"]').first().getAttribute('href');
   }
   for(const [route,href] of [['candidate-detail',details.candidate],['job-detail',details.job]]){
    await page.evaluate(h=>location.hash=h.slice(h.indexOf('#')),href);
    await page.waitForFunction(r=>document.documentElement.dataset.meridianRoute===r,route);
    await page.waitForFunction(()=>{const s=document.querySelector('#main')?.innerText?.trim();return s&&s.length>80&&!s.startsWith('Loading')});
    await verify(page,theme,viewport,route);
   }
   await page.goto(base+'/optical-lab.html',{waitUntil:'domcontentloaded'});
   await verify(page,theme,viewport,'optical-lab');
   await ctx.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error('ERROR',e.message);failed++}).finally(()=>{server.close();
 const output=path.resolve(__dirname,'../evidence/meridian/optical-v4-wcag.json');
 fs.mkdirSync(path.dirname(output),{recursive:true});
 fs.writeFileSync(output,JSON.stringify({createdAt:new Date().toISOString(),scans:checks,failed,results},null,2)+'\n');
 console.log('TOTAL',checks,'CHECKS',failed,'FAILED');process.exitCode=failed?1:0;});
