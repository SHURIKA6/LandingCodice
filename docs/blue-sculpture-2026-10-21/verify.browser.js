async page => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const base = new URL(page.url()).origin;
  const browser = page.context().browser();
  const directory = path.resolve('docs/blue-sculpture-2026-10-21/captures');
  await fs.mkdir(directory, {recursive:true});
  const baseline = JSON.parse(await fs.readFile('docs/blue-sculpture-2026-10-21/intro-baseline.json','utf8'));
  const results = [];
  const assert = (ok,message,data) => { if (!ok) throw new Error(`${message}: ${JSON.stringify(data)}`); };
  for (const viewport of [{width:320,height:568},{width:390,height:844},{width:768,height:1024},{width:844,height:390},{width:1024,height:768},{width:1280,height:740},{width:1366,height:768},{width:1440,height:1000},{width:1920,height:1080}]) {
    const context = await browser.newContext({viewport,isMobile:viewport.width<1024,hasTouch:viewport.width<1024});
    const p = await context.newPage();
    const errors=[];
    p.on('pageerror',error=>errors.push(error.message));
    try {
      await p.goto(base,{waitUntil:'networkidle'});
      await p.waitForFunction(()=>Boolean(document.documentElement.dataset.scrollEngine));
      await p.locator('.hero-sculpture img').evaluate(image=>image.decode());
      await p.waitForTimeout(950);
      const state = await p.evaluate(()=>{
        const rect=selector=>document.querySelector(selector).getBoundingClientRect().toJSON();
        const image=document.querySelector('.hero-sculpture img');
        return {viewport:{width:innerWidth,height:innerHeight},clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,
          art:rect('.hero-sculpture'),heading:rect('.hero-heading'),description:rect('.hero-description'),intro:rect('.hero-intro'),
          image:{naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight,alt:image.getAttribute('alt'),ariaHidden:!!image.closest('[aria-hidden=true]')},
          mode:document.querySelector('.people-hero').dataset.motionMode,names:[...document.querySelectorAll('.person-name')].map(node=>node.getAttribute('aria-label'))};
      });
      assert(state.scrollWidth<=state.clientWidth+1,'Horizontal overflow',state);
      assert(state.image.naturalWidth===800&&state.image.alt===''&&state.image.ariaHidden,'Decorative asset contract failed',state);
      assert(state.names.join('|')==='Fernando Riad|Eduardo Gobatto|Victor Rafael','People changed',state);
      if(viewport.width>=1024){
        assert(state.art.left>=state.heading.right-1&&state.art.right<=state.description.left+1,'Sculpture overlaps text',state);
        assert(state.art.width>=127&&state.art.width<=177,'Desktop sculpture size',state);
        const old=baseline.find(item=>item.width===viewport.width);
        assert(state.intro.height<=old.height+1,'Desktop introduction increased in height',{old,current:state});
      }else{
        assert(Math.abs(state.art.left+state.art.width/2-state.clientWidth/2)<=1,'Mobile sculpture not centered',state);
        assert(state.art.bottom<=state.heading.top+1,'Mobile sculpture overlaps title',state);
        assert(Math.abs(state.art.width-(viewport.height<=700?112:160))<=1,'Mobile sculpture size',state);
      }
      await p.screenshot({path:path.join(directory,`opening-${viewport.width}x${viewport.height}.png`)});
      assert(errors.length===0,'Runtime error',errors);
      results.push({scenario:`layout-${viewport.width}x${viewport.height}`,pass:true,...state});
    }finally{await context.close();}
  }
  for (const options of [{reducedMotion:'reduce'},{javaScriptEnabled:false}]){
    const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,...options});
    const p=await context.newPage();
    try{
      await p.goto(base,{waitUntil:'networkidle'});
      const state=await p.locator('.hero-sculpture').evaluate(node=>({visible:node.getBoundingClientRect().width>0,image:node.querySelector('img').naturalWidth,
        entry:getComputedStyle(node.querySelector('.hero-sculpture-entry')).animationName,transform:getComputedStyle(node.querySelector('.hero-sculpture-parallax')).transform,
        canvas:document.querySelectorAll('canvas').length}));
      assert(state.visible&&state.image===800&&state.entry==='none'&&state.transform==='none'&&state.canvas===0,'Static fallback changed',state);
      results.push({scenario:options.javaScriptEnabled===false?'no-js':'reduced-motion',pass:true,...state});
    }finally{await context.close();}
  }
  await fs.writeFile('docs/blue-sculpture-2026-10-21/layout-results.json',JSON.stringify(results,null,2));
  return {passed:results.length,results};
}
