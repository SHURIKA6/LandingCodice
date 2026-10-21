async page => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const directory = path.resolve('docs/blue-sculpture-2026-10-21/review');
  await fs.mkdir(directory,{recursive:true});
  const browser=page.context().browser(), origin=new URL(page.url()).origin;
  const results=[];
  const assert=(value,message,data)=>{if(!value)throw new Error(message+': '+JSON.stringify(data));};
  for(const [width,height,baseline] of [[1024,768,152.890625],[1280,740,172.46875],[1366,768,180.375],[1440,1000,221.734375],[1920,1080,256.671875],[320,568],[390,844],[768,1024],[844,390]]) {
    const context=await browser.newContext({viewport:{width,height},isMobile:width<1024,hasTouch:width<1024,reducedMotion:'no-preference'});
    const p=await context.newPage();
    try {
      await p.goto(origin,{waitUntil:'networkidle'});
      await p.waitForFunction(()=>document.querySelector('.people-hero').dataset.motionMode!=='static');
      await p.waitForTimeout(1000);
      const state=await p.evaluate(()=>{
        const rect=selector=>document.querySelector(selector).getBoundingClientRect().toJSON();
        const image=document.querySelector('.hero-sculpture img');
        return {width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,intro:rect('.hero-intro'),heading:rect('.hero-heading'),sculpture:rect('.hero-sculpture'),description:rect('.hero-description'),image:{complete:image.complete,naturalWidth:image.naturalWidth,alt:image.getAttribute('alt'),hidden:image.closest('[aria-hidden=true]')!==null},renderer:document.querySelector('.people-hero').dataset.renderer};
      });
      const filename=`opening-${width}x${height}.png`;
      await p.screenshot({path:path.join(directory,filename)});
      assert(state.scrollWidth<=state.width+1,'Overflow',state);
      assert(state.image.complete&&state.image.naturalWidth===800&&state.image.alt===''&&state.image.hidden,'Decorative image contract',state);
      if(width>=1024) {
        assert(state.intro.height<=baseline+1,'Desktop intro height increased',{width,height,baseline,state});
        assert(state.heading.right<=state.sculpture.left+1&&state.sculpture.right<=state.description.left+1,'Desktop columns overlap',state);
      } else assert(state.sculpture.bottom<=state.heading.top+1,'Mobile sculpture overlaps heading',state);
      results.push({width,height,baseline,state,screenshot:filename});
    } finally {await context.close();}
  }
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference'});
  const p=await context.newPage();
  try {
    await p.goto(origin,{waitUntil:'domcontentloaded'});
    await p.waitForFunction(()=>document.querySelector('.people-hero').dataset.motionMode==='mobile-story');
    await p.evaluate(()=>document.querySelector('.hero-skip').focus({preventScroll:true}));
    const focus=await p.locator('.hero-skip').evaluate(node=>({top:node.getBoundingClientRect().top,focus:node===document.activeElement,ancestors:[...(function*(){let n=node;while(n){yield n;n=n.parentElement;}})()].filter(n=>n.getAnimations).map(n=>({class:n.className,transform:getComputedStyle(n).transform,animations:n.getAnimations().filter(a=>a.playState==='running').length}))}));
    await p.emulateMedia({reducedMotion:'reduce'});
    await p.waitForFunction(()=>document.querySelector('.people-hero').dataset.motionMode==='static');
    const reduced=await p.locator('.hero-sculpture').evaluate(node=>({animations:node.getAnimations({subtree:true}).filter(a=>a.playState==='running'||a.pending).length,transforms:[...node.querySelectorAll('*')].filter(n=>getComputedStyle(n).transform!=='none').map(n=>n.className),focused:document.activeElement.className}));
    assert(reduced.animations===0&&reduced.transforms.length===0&&reduced.focused==='hero-skip','Live reduced/focus',reduced);
    results.push({focus,reduced});
  } finally {await context.close();}
  return {passed:results.length,results};
}
