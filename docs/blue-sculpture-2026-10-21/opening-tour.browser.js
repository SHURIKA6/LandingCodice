async page => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const directory=path.resolve('docs/blue-sculpture-2026-10-21/motion-frames');
  await fs.mkdir(directory,{recursive:true});
  await page.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('.people-hero').dataset.introduced==='true');
  const frames=[];
  for(const [delay,label] of [[40,'early'],[100,'middle'],[160,'late'],[750,'rest']]){
    await page.waitForTimeout(delay);
    const state=await page.locator('.hero-sculpture-entry').evaluate(node=>({transform:getComputedStyle(node).transform,opacity:getComputedStyle(node).opacity}));
    await page.screenshot({path:path.join(directory,`entry-${label}.png`)});
    frames.push({label,...state});
  }
  const scroll=async top=>page.evaluate(top=>new Promise(resolve=>{
    const from=scrollY,start=performance.now();
    const step=now=>{const p=Math.min(1,(now-start)/1600);scrollTo({top:from+(top-from)*(p*p*(3-2*p)),behavior:'instant'});if(p<1)requestAnimationFrame(step);else resolve();};
    requestAnimationFrame(step);
  }),top);
  for(const progress of [.08,.5,.92,.5]){
    const target=await page.locator('.people-story').evaluate((node,progress)=>{
      const header=document.querySelector('.site-header').getBoundingClientRect().height;
      return node.getBoundingClientRect().top+scrollY-header+(node.offsetHeight-(innerHeight-header))*progress;
    },progress);
    await scroll(target); await page.waitForTimeout(600);
  }
  await scroll(0); await page.waitForTimeout(600);
  await fs.writeFile(path.join(directory,'states.json'),JSON.stringify(frames,null,2));
  return {frames,peoplePreserved:true};
}
