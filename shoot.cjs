const pp=require('puppeteer-core');
(async()=>{const b=await pp.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
for(const [n,r] of [['home',''],['chatbot','chatbot-demo'],['clinic','clinic'],['restaurant','restaurant']])
for(const [d,w,h,m] of [['desktop',1440,900,false],['mobile',390,844,true]]){
const p=await b.newPage();await p.setViewport({width:w,height:h,isMobile:m,deviceScaleFactor:m?2:1});
await p.goto('http://localhost:4173/#/'+r,{waitUntil:'networkidle0'});await new Promise(x=>setTimeout(x,1500));
const H=await p.evaluate(()=>document.body.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>window.scrollTo(0,y),y);await new Promise(x=>setTimeout(x,120))}
await p.evaluate(()=>window.scrollTo(0,0));await new Promise(x=>setTimeout(x,1200));
if(n==='chatbot'){await p.click('button.fixed');await new Promise(x=>setTimeout(x,500));for(const c of ['Fees','Admission']){await p.evaluate(c=>[...document.querySelectorAll('button')].find(b=>b.textContent===c).click(),c);await new Promise(x=>setTimeout(x,900))}
 await p.type('input[placeholder^="Type"]','Rahul');await p.keyboard.press('Enter');await new Promise(x=>setTimeout(x,900))}
if(n==='restaurant'){await p.evaluate(()=>[...document.querySelectorAll('button')].filter(b=>b.textContent==='Add').slice(0,2).forEach(b=>b.click()));await new Promise(x=>setTimeout(x,800))}
await p.screenshot({path:`shots/${n}-${d}.png`,fullPage:!m || n==='home'});
if(!m) await p.screenshot({path:`shots/${n}-desktop-fold.png`});await p.close()}
await b.close()})();
