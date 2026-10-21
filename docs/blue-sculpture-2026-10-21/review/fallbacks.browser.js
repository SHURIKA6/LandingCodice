async page => {
 const browser=page.context().browser(),base=new URL(page.url()).origin,results=[];
 const assert=(v,m,d)=>{if(!v)throw new Error(m+': '+JSON.stringify(d));};
 for(const kind of ['no-js','text-200','hidden']) {
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,javaScriptEnabled:kind!=='no-js',reducedMotion:'no-preference'});
  const p=await context.newPage();
  try {
   await p.goto(base,{waitUntil:kind==='hidden'?'domcontentloaded':'networkidle'});
   if(kind==='no-js') {
    const state=await p.evaluate(()=>({mode:document.querySelector('.people-hero').dataset.motionMode,image:document.querySelector('.hero-sculpture img').naturalWidth,visible:document.querySelector('.hero-sculpture').getBoundingClientRect().height,names:[...document.querySelectorAll('.person-name')].map(n=>n.getAttribute('aria-label')),canvases:document.querySelectorAll('canvas').length}));
    assert(state.mode==='static'&&state.image===800&&state.visible===160&&state.names.length===3&&state.canvases===0,'SSR/noJS lost image or content',state);
    results.push({kind,state});
   } else if(kind==='text-200') {
    await p.waitForFunction(()=>document.querySelector('.people-hero').dataset.motionMode==='mobile-story');
    await p.addStyleTag({content:'html{-webkit-text-size-adjust:200%;text-size-adjust:200%}'});
    await p.waitForTimeout(500);
    const state=await p.evaluate(()=>({mode:document.querySelector('.people-hero').dataset.motionMode,large:document.documentElement.hasAttribute('data-large-text'),client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,sculpture:document.querySelector('.hero-sculpture').getBoundingClientRect().toJSON(),heading:document.querySelector('.hero-heading').getBoundingClientRect().toJSON(),grid:getComputedStyle(document.querySelector('.hero-intro')).gridTemplateColumns}));
    assert(state.large&&state.mode==='mobile-flow'&&state.client+1>=state.scroll&&state.sculpture.width===112&&state.sculpture.bottom<=state.heading.top+1,'Enlarged text failed reflow',state);
    results.push({kind,state});
   } else {
    await p.waitForFunction(()=>document.querySelector('.hero-sculpture-entry').getAnimations().some(a=>a.playState==='running'));
    const before=await p.locator('.hero-sculpture-entry').evaluate(n=>n.getAnimations().length);
    await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
    await p.waitForTimeout(50);
    const hidden=await p.locator('.hero-sculpture').evaluate(n=>n.getAnimations({subtree:true}).filter(a=>a.playState==='running'||a.pending).length);
    await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
    await p.waitForTimeout(100);
    const restored=await p.locator('.hero-sculpture').evaluate(n=>n.getAnimations({subtree:true}).filter(a=>a.playState==='running'||a.pending).length);
    assert(before>0&&hidden===0&&restored===0,'Hidden CSS entry was not cancelled', {before,hidden,restored});
    results.push({kind,before,hidden,restored,method:'document.hidden getter override + visibilitychange, not physical app suspension'});
   }
  } finally {await context.close();}
 }
 return {passed:results.length,results};
}
