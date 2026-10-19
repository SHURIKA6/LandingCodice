async (host) => {
  const root='C:/Users/ferna/OneDrive/Área de Trabalho/LandingCodice/';
  const report={matrix:[],interaction:[],fallbacks:[],accessibility:[],studies:[],pageErrors:[],consoleErrors:[]};
  const check=(ok,message)=>{if(!ok)throw new Error(message);};
  const context=await host.context().browser().newContext();
  const page=await context.newPage();
  page.on('pageerror',e=>report.pageErrors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text());});
  const ready=async p=>{await p.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});};
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:1000});
    await page.goto('http://localhost:4321/'); await ready(page);
    await page.waitForFunction(()=>document.documentElement.dataset.scrollEngine==='lenis');
    const state=await page.evaluate(()=>({
      viewport:innerWidth,document:document.documentElement.scrollWidth,
      broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),
      anchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href')),
      priceTop:document.querySelector('.hero-price').getBoundingClientRect().top,
      cta:document.querySelector('.hero-offer .button').getBoundingClientRect().toJSON(),
      h1:document.querySelectorAll('h1').length,sections:document.querySelectorAll('main>section').length,
      text:document.body.innerText,robots:document.querySelector('meta[name=robots]').content,
      small:[...document.querySelectorAll('a,button,summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.width<24||r.height<24);}).map(e=>e.textContent.trim()),
    }));
    check(state.document<=width, width+': overflow');
    check(!state.broken.length&&!state.anchors.length,width+': image/anchor');
    check(state.h1===1&&state.sections===4&&!state.robots.includes('noindex'),width+': semantics/indexability');
    check(state.text.includes('R$ 1.500')&&state.text.includes('antes da publicação')&&state.text.includes('por escrito'),width+': offer');
    check(state.cta.left>=0&&state.cta.right<=width&&state.cta.top<1000,width+': CTA framing');
    check(!state.small.length,width+': small controls '+state.small.join(','));
    await page.mouse.move(0,0);
    await page.screenshot({path:root+'docs/next-lando-2026-10-19/width-'+width+'.png'});
    if(width===1440)await page.screenshot({path:root+'docs/next-lando-2026-10-19/desktop-full.png',fullPage:true});
    if(width===390)await page.screenshot({path:root+'docs/next-lando-2026-10-19/mobile-full.png',fullPage:true});
    await page.locator('.scroll-link').click();
    await page.waitForFunction(()=>{const r=document.getElementById('trabalho').getBoundingClientRect();return r.top>=70&&r.top<170;});
    const anchorTop=await page.locator('#trabalho').evaluate(e=>e.getBoundingClientRect().top);
    report.matrix.push({width,documentWidth:state.document,brokenImages:0,missingAnchors:0,priceTop:state.priceTop,ctaTop:state.cta.top,anchorTop,scrollEngine:'lenis'});
  }
  await page.goto('http://localhost:4321/');await ready(page);
  await page.keyboard.press('Tab');
  check(await page.locator('.skip-link').evaluate(e=>document.activeElement===e&&e.getBoundingClientRect().top>=0),'Keyboard skip');
  await page.keyboard.press('Enter');
  check(await page.locator('#conteudo').evaluate(e=>document.activeElement===e),'Skip target focus');
  await page.locator('.header-cta').focus();
  check(await page.locator('.header-cta').evaluate(e=>getComputedStyle(e).outlineStyle==='solid'),'CTA outline');
  await page.locator('.nav-menu summary').focus();await page.keyboard.press('Enter');
  check(await page.locator('.nav-menu').getAttribute('open')!==null,'Keyboard menu open');
  await page.keyboard.press('Escape');
  check(await page.locator('.nav-menu').getAttribute('open')===null,'Escape menu close');
  check(await page.locator('.nav-menu summary').evaluate(e=>document.activeElement===e),'Escape focus return');
  await page.locator('.nav-menu summary').click();await page.locator('.nav-menu a[href="#pacote"]').click();
  check(await page.locator('.nav-menu').getAttribute('open')===null,'Menu anchor close');
  await page.locator('.view-buttons button').nth(1).focus();await page.keyboard.press('Enter');
  await page.waitForFunction(()=>document.querySelector('.project-screen img:last-child').getAttribute('src').includes('catalog'));
  check(await page.locator('.view-buttons [aria-pressed="true"]').count()===1,'Project selected state');
  check((await page.locator('.project-controls>p').innerText()).includes('Filtros'),'Project status');
  await page.setViewportSize({width:390,height:1000});await page.locator('.project-stage').scrollIntoViewIfNeeded();await ready(page);
  
  await page.locator('.view-buttons button').first().focus();await page.keyboard.press('Space');
  check(await page.locator('.view-buttons button').first().getAttribute('aria-pressed')==='true','Project Space state');
  await page.goto('http://localhost:4321/');await ready(page);
  const before=await page.locator('.hero-object-inner').evaluate(e=>getComputedStyle(e).transform);
  await page.locator('.replay-button').focus();await page.keyboard.press('Enter');await page.waitForTimeout(250);
  check(before!==await page.locator('.hero-object-inner').evaluate(e=>getComputedStyle(e).transform),'Keyboard replay');
  await page.locator('.nav-menu summary').click();await page.screenshot({path:root+'docs/next-lando-2026-10-19/menu-mobile.png'});await page.keyboard.press('Escape');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.documentElement.dataset.scrollEngine==='native');
  await page.locator('.replay-button').waitFor({state:'hidden'});check(await page.locator('.replay-button').count()===0,'Live reduced replay');
  check(await page.locator('.hero-object').evaluate(e=>getComputedStyle(e).transform)==='none','Live reduced transform');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>document.documentElement.dataset.scrollEngine==='lenis');
  report.interaction.push('Keyboard skip/focus; menu Enter/Escape/focus return/anchor close; project Enter/Space and single selected state; replay; live reduced-motion/native scroll/restore');
  const touchCtx=await host.context().browser().newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  const touch=await touchCtx.newPage();await touch.goto('http://localhost:4321/');await ready(touch);
  await touch.locator('.nav-menu summary').tap();await touch.locator('.nav-menu a[href="#trabalho"]').tap();
  check(await touch.locator('.nav-menu').getAttribute('open')===null,'Touch menu');
  await touch.locator('.view-buttons button').nth(1).tap();
  check(await touch.locator('.view-buttons button').nth(1).getAttribute('aria-pressed')==='true','Touch project selection');
  await touchCtx.route('https://wa.me/**',r=>r.fulfill({status:200,contentType:'text/html',body:'WhatsApp intercepted locally, no message sent.'}));
  for(const [selector,index,phone] of [['.hero-offer .button',0,'5566999356646'],['.founder-contact',0,'5566999356646'],['.founder-contact',1,'556684184488']]){
    const link=touch.locator(selector).nth(index);const [popup]=await Promise.all([touch.waitForEvent('popup'),link.tap()]);await popup.waitForLoadState('domcontentloaded');
    check(new URL(popup.url()).pathname==='/'+phone&&new URL(popup.url()).searchParams.get('text').includes('1.500'),'WhatsApp destination');await popup.close();
  }
  await touchCtx.close();report.interaction.push('Touch menu, project selection, primary and both founder WhatsApps; destinations intercepted, no message sent');
  for(const mode of ['no-js','reduced-motion']){
    const ctx=await host.context().browser().newContext({viewport:{width:390,height:1000},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced-motion'?'reduce':'no-preference'});
    const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:4321/');await ready(p);
    check(await p.locator('.hero-offer .button').isVisible(),mode+': CTA');
    check((await p.locator('body').innerText()).includes('antes da publicação'),mode+': terms');
    if(mode==='no-js')check(await p.locator('.view-buttons').isHidden(),'No-JS dead controls');
    else {await p.waitForFunction(()=>document.documentElement.dataset.scrollEngine==='native');check(await p.locator('.hero-object').evaluate(e=>getComputedStyle(e).transform)==='none','Static reduced art');}
    await p.locator('.nav-menu summary').click();check(await p.locator('.nav-menu a[href="#trabalho"]').isVisible(),mode+': native menu');
    check(!errors.length,mode+': page errors');report.fallbacks.push({mode,offer:true,terms:true,menu:true,errors});await ctx.close();
  }
  for(const width of [390,1440]){
    await page.setViewportSize({width,height:1000});await page.goto('http://localhost:4321/');await ready(page);await page.addScriptTag({path:root+'node_modules/.cache/study/axe.min.js'});
    const axe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passes:r.passes.length};});
    check(!axe.violations.length,'Axe '+width+': '+JSON.stringify(axe.violations));report.accessibility.push({width,...axe});
  }
  for(const path of ['/estudo/','/estudo/forma/','/estudo/fluxo/','/estudo/ritmo/']){
    const response=await page.goto('http://localhost:4321'+path);await ready(page);
    const state=await page.evaluate(()=>({noindex:document.querySelector('meta[name=robots]').content,text:document.body.innerText,broken:[...document.images].filter(i=>!i.naturalWidth).length,width:document.documentElement.scrollWidth}));
    check(response.status()===200&&response.headers()['x-robots-tag'].includes('noindex')&&state.noindex.includes('noindex'),'Study route '+path);
    check(state.text.includes('R$ 1.500')&&state.text.includes('antes da publicação')&&!state.broken,'Study integrity '+path);
    report.studies.push({path,status:response.status(),noindex:state.noindex,header:response.headers()['x-robots-tag'],brokenImages:state.broken});
  }
  check(!report.pageErrors.length,'Page errors: '+report.pageErrors.join(','));check(!report.consoleErrors.length,'Console errors: '+report.consoleErrors.join(','));await context.close();return report;
}


