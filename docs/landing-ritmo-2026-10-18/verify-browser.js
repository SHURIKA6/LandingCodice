async (hostPage) => {
  const verificationContext = await hostPage.context().browser().newContext();
  const page = await verificationContext.newPage();
  const root = 'C:/Users/ferna/OneDrive/Área de Trabalho/LandingCodice/';
  const errors = [];
  const results = { matrix: [], interactions: [], fallbacks: [], accessibility: [], studies: [], pageErrors: errors };
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:4321/');
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.decode().catch(() => {}); })); });
    const state = await page.evaluate(() => {
      const rect = e => { const r=e.getBoundingClientRect(); return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}; };
      return {
        width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src),
        missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.getAttribute('href').slice(1))).map(a => a.getAttribute('href')),
        text: document.body.innerText, headline: document.querySelector('h1').textContent,
        headings: document.querySelectorAll('h1').length, sections: document.querySelectorAll('main>section').length,
        robots: document.querySelector('meta[name="robots"]')?.content || '',
        cta: rect(document.querySelector('.hero-offer .button')), offer: rect(document.querySelector('.hero-price')),
        smallTargets: [...document.querySelectorAll('a,button')].filter(e => !e.hidden && e.getBoundingClientRect().width > 0 && (e.getBoundingClientRect().height < 24 || e.getBoundingClientRect().width < 24)).map(e => e.textContent.trim()),
        links: [...document.querySelectorAll('a[href^="https://wa.me"]')].map(a => a.href),
        sticky: getComputedStyle(document.querySelector('.case-media')).position,
      };
    });
    check(state.documentWidth <= width, width + ': horizontal overflow');
    check(!state.broken.length && !state.missingAnchors.length, width + ': image/anchor failure');
    check(state.headings===1 && state.sections===4 && !state.robots.includes('noindex'), width + ': semantics/indexing');
    check(state.headline==='Seu trabalho merece uma presença profissional.', 'Headline changed');
    check(state.text.includes('R$ 1.500') && state.text.includes('antes da publicação') && state.text.includes('por escrito'), 'Offer/terms missing');
    check(!state.smallTargets.length, width + ': small controls ' + state.smallTargets.join(','));
    check(state.cta.top<900 && state.cta.right<=width && state.cta.left>=0, width+': hero action inaccessible');
    check(state.links.every(h => h.includes('text=') && new URL(h).searchParams.get('text').includes('1.500')), 'CTA message mismatch');
    check(state.links.some(h=>new URL(h).pathname==='/556684184488') && state.links.some(h=>new URL(h).pathname==='/5566999356646'), 'Founder numbers changed');
    check(state.sticky===(width>800?'sticky':'static'), width+': case sticky mode');
    await page.locator('.hero-secondary').click();
    const anchor = await page.locator('#work-title').evaluate(e => ({top:e.getBoundingClientRect().top,header:document.querySelector('.site-header').getBoundingClientRect().bottom}));
    check(anchor.top >= anchor.header, width+': anchor obscured by header');
    results.matrix.push({width,documentWidth:state.documentWidth,brokenImages:state.broken.length,missingAnchors:state.missingAnchors.length,ctaTop:state.cta.top,casePosition:state.sticky,anchorVisible:true});
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:root+'docs/landing-ritmo-2026-10-18/width-'+width+'.png'});
  }
  await page.goto('http://localhost:4321/');
  await page.keyboard.press('Tab');
  check(await page.locator('.skip-link').evaluate(e => document.activeElement===e && e.getBoundingClientRect().top>=0 && getComputedStyle(e).outlineStyle!=='none'), 'Skip link keyboard/focus');
  await page.keyboard.press('Enter');
  check(await page.locator('#conteudo').evaluate(e=>document.activeElement===e), 'Skip link target focus');
  await page.locator('.hero-offer .button').focus();
  check(await page.locator('.hero-offer .button').evaluate(e=>getComputedStyle(e).outlineStyle==='solid'), 'CTA focus missing');
  await page.evaluate(()=>scrollTo(0,250));
  await page.waitForFunction(()=>Number(document.querySelector('[data-ritmo-stage]').style.getPropertyValue('--progress'))>0);
  const before = await page.locator('.kinetic-word>span').first().evaluate(e=>getComputedStyle(e).transform);
  await page.locator('[data-ritmo-play]').focus(); await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  const after = await page.locator('.kinetic-word>span').first().evaluate(e=>getComputedStyle(e).transform);
  check(before!==after,'Keyboard replay did not change art');
  await page.evaluate(()=>scrollTo(0,2500));
  await page.waitForFunction(()=>document.querySelector('[data-ritmo-stage]').dataset.active==='false');
  results.interactions.push('Native anchors clear sticky header at all widths; keyboard skip link and CTA focus; scroll/replay and offscreen pause');

  const touchContext=await page.context().browser().newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  const touch=await touchContext.newPage();
  await touch.goto('http://localhost:4321/');
  await touch.locator('.hero-secondary').tap();
  check(new URL(touch.url()).hash==='#trabalho','Touch anchor failed');
  await touch.evaluate(()=>scrollTo(0,0));
  await touch.locator('[data-ritmo-play]').tap();
  await touchContext.route('https://wa.me/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<p>WhatsApp destination intercepted for local verification.</p>'}));
  for (const selector of ['.hero-offer .button','.founder-contact']) {
    const link=touch.locator(selector).first();
    const [popup]=await Promise.all([touch.waitForEvent('popup'),link.tap()]);
    await popup.waitForLoadState('domcontentloaded');
    check(popup.url().startsWith('https://wa.me/5566999356646?text='),'Touch WhatsApp target');
    await popup.close();
  }
  const eduardo=touch.locator('.founder-contact').nth(1);
  const [popup]=await Promise.all([touch.waitForEvent('popup'),eduardo.tap()]);
  await popup.waitForLoadState('domcontentloaded');
  check(popup.url().startsWith('https://wa.me/556684184488?text='),'Eduardo WhatsApp target');
  await popup.close();
  await touchContext.close();
  results.interactions.push('Touch: work anchor, replay, primary and both founder WhatsApp popups; destinations intercepted, no message sent');

  for (const mode of ['no-js','reduced-motion','no-intersection-observer']) {
    const context=await page.context().browser().newContext({viewport:{width:390,height:900},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced-motion'?'reduce':'no-preference'});
    if(mode==='no-intersection-observer') await context.addInitScript(()=>{delete window.IntersectionObserver;});
    const fallback=await context.newPage();
    const fallbackErrors=[]; fallback.on('pageerror',e=>fallbackErrors.push(e.message));
    await fallback.goto('http://localhost:4321/');
    await fallback.evaluate(()=>document.fonts.ready);
    check(await fallback.locator('.hero-offer .button').isVisible(),mode+': CTA unavailable');
    check(await fallback.locator('[data-ritmo-play]').isHidden(),mode+': unavailable animation control exposed');
    check((await fallback.locator('main').innerText()).includes('antes da publicação'),mode+': terms missing');
    if(mode==='reduced-motion') check(await fallback.locator('.kinetic-word>span').first().evaluate(e=>getComputedStyle(e).transform)==='none','Reduced motion transformed art');
    await fallback.locator('.hero-secondary').click();
    check(new URL(fallback.url()).hash==='#trabalho',mode+': static anchor failed');
    check(!fallbackErrors.length,mode+': '+fallbackErrors.join(','));
    results.fallbacks.push({mode,offerVisible:true,staticNavigation:true,pageErrors:fallbackErrors});
    await context.close();
  }
  for (const width of [390,1440]) {
    await page.setViewportSize({width,height:1100}); await page.goto('http://localhost:4321/');
    await page.addScriptTag({path:root+'node_modules/.cache/study/axe.min.js'});
    const axe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passes:r.passes.length};});
    check(!axe.violations.length,'axe violations at '+width+': '+JSON.stringify(axe.violations));
    results.accessibility.push({width,...axe});
  }
  for (const route of ['/estudo/','/estudo/forma/','/estudo/fluxo/','/estudo/ritmo/']) {
    await page.setViewportSize({width:390,height:900}); await page.goto('http://localhost:4321'+route);
    const state=await page.evaluate(()=>({noindex:document.querySelector('meta[name="robots"]')?.content,text:document.body.innerText,width:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length}));
    check(state.noindex.includes('noindex') && state.text.includes('R$ 1.500') && state.text.includes('antes da publicação'),'Study contract regression '+route);
    check(state.width<=390&&!state.broken,'Study render regression '+route);
    results.studies.push({route,noindex:state.noindex,offerPreserved:true,documentWidth:state.width});
  }
  check(!errors.length,'Page errors '+errors.join(','));
  await verificationContext.close();
  return results;
}

