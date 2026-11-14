// ---- Edit these ----
const SITE={name:'M. Djedir',about:'I’m M. Djedir, a third-year student of translation and interpreting with a passion for web and game development. I created The Booth as a practical, welcoming study space where students can learn, revise and prepare for their exams. I hope you enjoy using it as much as I enjoyed building it.',
socials:[['Facebook','https://web.facebook.com/djedir.mou'],['GitHub','https://github.com/lazyDev99']],
formKey:'b8316e96-9b45-4299-a33f-2c77107a2e20'};
// --------------------
const ICON={
Facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>',
Instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="7" r="1.1" fill="currentColor"/></svg>',
GitHub:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>'};
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LN={ar:'Arabic',fr:'French',en:'English'},VL={ar:'ar-SA',fr:'fr-FR',en:'en-US'};
const voiceLocale=l=>P&&P.key.startsWith('int-en-ar/')?'en-GB':VL[l];
const CAT={translation:{n:'Translation',d:'Source texts, your own versions, and notes on every choice.'},interpretation:{n:'Interpretation',d:'Listen, shadow, and build your memory span.'},writing:{n:'Writing',d:'Techniques, models, and exercises for writing well.'}};
const GL={translation:'A⇄ع',writing:'Aa¶',interpretation:'<svg viewBox="0 0 80 40"><g fill="currentColor"><rect x="2" y="14" width="6" height="12" rx="3"/><rect x="14" y="8" width="6" height="24" rx="3"/><rect x="26" y="2" width="6" height="36" rx="3"/><rect x="38" y="6" width="6" height="28" rx="3"/><rect x="50" y="12" width="6" height="16" rx="3"/><rect x="62" y="4" width="6" height="32" rx="3"/><rect x="74" y="15" width="6" height="10" rx="3"/></g></svg>'};
const store={get(){try{return JSON.parse(localStorage.getItem('done')||'[]')}catch(e){return[]}},set(v){try{localStorage.setItem('done',JSON.stringify(v))}catch(e){}}};
const j=u=>window.BOOTH_DATA&&BOOTH_DATA[u]?Promise.resolve(BOOTH_DATA[u]):fetch(u).then(r=>{if(!r.ok)throw 0;return r.json()});
const L=p=>`href="#/${p}"`;
const rtl=l=>l==='ar'?' dir="rtl" lang="ar"':` lang="${l}"`;
const pl=(n,w)=>`${n} ${w}${n===1?'':'s'}`;
const find=id=>mods.find(m=>m.id===id);
const dt=s=>{const p=s.split(' ');return `<span class="tile">${esc(p[0])}<b>${esc(p[1]||'')}</b>${esc(p[2]||'')}</span>`};
const go=`<span class="go" aria-hidden="true">›</span>`;
let mods=[],P=null,pd=0,TM=0,KB=null,GT=0,FB_FROM='#/';

async function route(){
  stop();P=null;app.onclick=null;app.onkeydown=null;clearInterval(TM);KB=null;GT++;document.documentElement.style.setProperty('--hh',$('.top').offsetHeight+'px');scrollTo(0,0);const h=location.hash.slice(2).split('/');if(h[0]!=='feedback')FB_FROM=location.hash||'#/';
  try{
    if(!mods.length){const ix=await j('content/modules.json');mods=await Promise.all(ix.map(i=>j(`content/${i}.json`)))}
    const key=h[0]==='about'||h[0]==='play'||h[0]==='feedback'?h[0]:h[0]==='c'?'c/'+h[1]:(h[0]==='m'||h[0]==='l')?'c/'+(find(h[1])||{}).cat:'';
    document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',(a.dataset.go??a.getAttribute('href').slice(2))===key));const on=$('nav a.on'),nv=$('nav');if(on)nv.scrollTo({left:on.offsetLeft-(nv.clientWidth-on.offsetWidth)/2});
    app.dataset.page=h[0];({c:()=>cat(h[1]),m:()=>mpage(h[1]),l:()=>lesson(h[1],h[2]),about,play,feedback}[h[0]]||home)();
    const dp={c:1,about:1,play:1,feedback:1,m:2,l:3}[h[0]]||0;app.className='';void app.offsetWidth;app.className=dp>=pd?'gf':'gb';pd=dp;const h1=$('#app h1');document.title=(h1?h1.textContent+' | ':'')+'The Booth';
  }catch(e){app.innerHTML='<h1>404</h1><p class="lede">This page got lost in translation.</p><a class="back" href="#/">‹ Home</a>'}
}
function home(){
  const blk=c=>{const x=mods.filter(m=>m.cat===c),n=x.reduce((s,m)=>s+m.lessons.length,0);
    return `<a class="big ${c}" ${L('c/'+c)}><span class="glyph" aria-hidden="true">${GL[c]}</span><span class="bt">${CAT[c].n}</span><span class="bd">${CAT[c].d}</span><span class="bn">${pl(x.length,'module')}, ${pl(n,'lesson')}</span>${go}</a>`};
  const n=POOL().length;
  app.innerHTML=`<h1>L3 translation and interpretation</h1><p class="lede">Course texts and exercises, organised by module.</p><div class="bigs b3">${blk('translation')+blk('interpretation')+blk('writing')}</div><div class="sec">Extras</div><div class="bigs"><a class="xbig" ${L('play')}><span class="hearts" aria-hidden="true">♥♥♥</span><span class="tag">Game</span><span class="bt">Learn by Playing</span><span class="bd">A quiz built from your own lesson terms. No clock, three lives.</span><span class="bn">${pl(n,'term')} to play with</span>${go}</a></div>`;
}
const code=m=>m.from?m.from.toUpperCase()+' → '+m.to.toUpperCase():LN[m.lang];
function cat(c){
  const x=mods.filter(m=>m.cat===c);if(!CAT[c])throw 0;
  app.innerHTML=`<div class="${c}"><a class="back" ${L('')}>‹ Home</a><h1 class="ch">${CAT[c].n}</h1><p class="lede">${CAT[c].d}</p>`+
  (x.map(m=>`<a class="mod" ${L('m/'+m.id)}><span class="chip">${code(m)}</span><span class="rt"><span class="mt">${esc(m.title)}</span>${m.prof?`<span class="pf">${esc(m.prof)}</span>`:''}<span class="sub">${pl(m.lessons.length,'lesson')}</span></span>${go}</a>`).join('')||'<p class="lede">No modules yet.</p>')+`</div>`;
}
function mpage(id){
  const m=find(id),d=store.get();
  app.innerHTML=`<div class="${m.cat}"><div class="hero"><span class="glyph" aria-hidden="true">${GL[m.cat]}</span><a class="back" ${L('c/'+m.cat)}>‹ ${CAT[m.cat].n}</a><span class="pill">${code(m)}</span><h1>${esc(m.title)}</h1>${m.prof?`<p class="pf">${esc(m.prof)}</p>`:''}<p>${pl(m.lessons.length,'lesson')}</p></div><h2>Lessons</h2>`+(m.lessons.length?'':'<p class="empty">No lessons yet. The first one will appear here after the first class.</p>')+
  m.lessons.map(l=>`<a class="row" ${L(`l/${m.id}/${l.id}`)}>${dt(l.date)}<span class="rt"><span class="rtitle">${esc(l.title)}</span>${d.includes(m.id+'/'+l.id)?'<span class="sub">Done ✓</span>':''}</span>${go}</a>`).join('')+`</div>`;
}

function feedback(){
  const T=['Suggestion','Bug','Other'];
  app.innerHTML=`<div class="fb"><a class="back" href="${esc(FB_FROM)}">‹ Back</a><h1>Feedback</h1><p class="lede">Found a bug, spotted a mistake, or have an idea? Tell me here and it comes straight to me. Messages are anonymous unless you choose to add your name.</p>
  <form id="fbf" class="fbcard" novalidate>
  <div><span class="fbh" id="fbth">What is it about?</span><div class="fbt" role="radiogroup" aria-labelledby="fbth">${T.map((t,i)=>`<label class="fbo"><input type="radio" name="type" value="${t}"${i?'':' checked'}><span>${t}</span></label>`).join('')}</div></div>
  <div><label class="fbh" for="fbm">Your message</label><textarea id="fbm" class="att" maxlength="2000" dir="auto" placeholder="English, français or العربية. Any is fine."></textarea></div>
  <div><label class="fbc"><input type="checkbox" id="fba"><span class="sw"></span><span>Add my name and contact</span></label><div id="fbid" class="fbid" hidden><div><label class="fbh" for="fbn">Your name</label><input id="fbn" class="fin" maxlength="60" autocomplete="name"></div><div><label class="fbh" for="fbe">Email or WhatsApp <span class="sub">(only if you want a reply)</span></label><input id="fbe" class="fin" maxlength="100" autocomplete="off" placeholder="Email, WhatsApp, social handle"></div></div></div>
  <input type="checkbox" id="fbb" tabindex="-1" autocomplete="off" aria-hidden="true" style="display:none">
  <p class="fbn">The page you were on is sent with your message. For bugs, your browser type is sent too.</p>
  <button class="btn pri fbs" id="fbs" type="submit">Send</button>
  <p class="note" id="fbx" aria-live="polite" hidden></p></form></div>`;
  const f=$('#fbf'),m=$('#fbm'),x=$('#fbx'),b=$('#fbs'),show=t=>{x.hidden=false;x.textContent=t};
  $('#fba').onchange=e=>{const on=e.target.checked;$('#fbid').hidden=!on;if(!on){$('#fbn').value='';$('#fbe').value=''}};
  const done=demo=>{$('.fb').innerHTML='<h1>Thank you</h1><p class="lede">Your message is on its way to me. I read every one.</p>'+(demo?'<p class="note">Test mode: nothing was actually sent. Add your access key in app.js to go live.</p>':'')+'<p><button class="btn pri" id="fbg">Back home</button> <button class="btn" id="fbm2">Send another</button></p>';$('#fbg').onclick=()=>{location.hash='#/'};$('#fbm2').onclick=()=>route()};
  f.onsubmit=async e=>{
    e.preventDefault();x.hidden=true;
    const msg=m.value.trim();
    if(msg.length<5){show('Please write a little more.');m.focus();return}
    if($('#fbb').checked){done();return}
    const K=SITE.formKey,demo=!K||K.startsWith('PASTE');
    const type=f.elements.type.value,anon=!$('#fba').checked,name=anon?'':$('#fbn').value.trim(),contact=anon?'':$('#fbe').value.trim();
    const body={access_key:K,subject:'The Booth: '+type,from_name:'The Booth',type,name:anon?'Anonymous':(name||'Not given'),contact:contact||'None',message:msg,page:FB_FROM};
    if(/^\S+@\S+\.\S+$/.test(contact))body.email=contact;
    if(type==='Bug')body.browser=navigator.userAgent;
    b.disabled=true;b.textContent='Sending…';
    if(demo){console.log('Feedback (test mode):',body);setTimeout(()=>done(true),700);return}
    try{
      const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});
      const d=await r.json();if(!d.success)throw new Error(d.message||'Rejected');done();
    }catch(err){show('Could not send ('+(err.message||'error')+'). Check your connection and try again.');b.disabled=false;b.textContent='Send'}
  };
}
function about(){app.innerHTML=`<div class="about-page"><h1>About</h1><p class="txt">${esc(SITE.about)}</p></div>`}

function lesson(mid,lid){
  const m=find(mid),l=m.lessons.find(x=>x.id===lid),key=mid+'/'+lid;
  let h=`<div class="${m.cat} lp"><a class="back" ${L('m/'+mid)}>‹ ${esc(m.title)}</a><p class="meta">${esc(l.date)}</p><h1>${esc(l.title)}</h1>`;
  if(m.cat==='translation'){
    const lab=[];let n=0;l.paras.forEach(p=>lab.push(p.lb||(p.h?'Title':p.m?'Date':'¶'+(++n))));
    const bd=(p,i)=>p.h||p.m?'':`<span class="n">${lab[i]}</span>`;
    const sd=x=>x==='ar'?'ka':'kf';
    const kr=k=>`<div class="kr${m.from==='ar'?' rt':''}"><span class="${sd(m.from)}"${rtl(m.from)}>${esc(k[0])}</span><span class="${sd(m.to)} cv" tabindex="0"${rtl(m.to)}>${esc(k[1])}</span></div>`;
    const fh=l.paras.findIndex(p=>p.h),fm=(p,t)=>{t=esc(t);return p.dl?t.replace(/^([^-–]+[-–])/,'<b>$1</b>'):t};
    const src=l.paras.map((p,i)=>p.h?`<h3 class="${i===fh?'sh hd':'sh sb'}"${rtl(m.from)}>${esc(p.src)}</h3>`:`<p class="${p.m?'dl':'txt'}"${rtl(m.from)}>${bd(p,i)}${fm(p,p.src)}</p>`).join('');
    const kg=(t,a)=>`<div class="kg"><div class="kh"><span class="gl">${t}</span><button class="btn mini" data-kp>Show French</button></div>${a.map(kr).join('')}</div>`;
    const kw=l.paras.map((p,i)=>p.kw?kg(lab[i],p.kw,'keyword'):'').join('')+(l.names?kg('Names and institutions',l.names,'name'):'');
    const tr=l.paras.map((p,i)=>p.h?`<h3 class="${i===fh?'sh hd':'sh sb'} cv" tabindex="0"${rtl(m.to)}>${esc(p.tr)}</h3>`:`<p class="${p.m?'dl':'txt'} cv" tabindex="0"${rtl(m.to)}>${bd(p,i)}${fm(p,p.tr)}</p>`).join('');
    const nt=l.paras.map((p,i)=>(p.notes||[]).map(t=>`<p class="note"><b>${lab[i]}</b> ${esc(t)}</p>`).join('')).join('');
    h+=`<p><span class="pill">${LN[m.from]} into ${LN[m.to]}</span> `+(l.info||[]).map(t=>`<span class="pill">${esc(t)}</span>`).join(' ')+`</p><div class="jump">`+
    [['s-t','Text'],...(l.questions?[['s-q','Questions']]:[]),['s-k','Keywords'],['s-r','Translation'],['s-n','Notes']].map(([a,t])=>`<button class="btn" data-j="${a}">${t}</button>`).join('')+`</div>`+
    `<h2 id="s-t">Source text</h2><article class="art">${src}</article>`+(l.questions?`<h2 id="s-q">Questions</h2>`+l.questions.map(g=>`<h3 class="qh">${esc(g.h)}</h3><ol class="qs"${rtl(m.from)}>${g.q.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`).join(''):'')+
    `<h2 id="s-k">Keywords</h2><p class="lede">The French is hidden so you can test yourself. Tap a term, or use Show French for a whole paragraph.</p><button class="btn" id="tm">Show all French</button><div id="kws" class="cvr">${kw}</div>`+
    `<h2 id="s-r">Translation</h2><textarea id="att" class="att" rows="6" placeholder="Try your own version here first. It is saved on this device."></textarea>`+
    (l.draft?`<p><span class="pill">Draft, to be checked against the class version</span></p>`:'')+
    `<button class="btn pri" id="ra">Reveal all</button><article id="tr" class="art cvr">${tr}</article><h2 id="s-n">Notes</h2>${nt||'<p class="lede">No notes yet.</p>'}`;
  }else if(m.cat==='writing'||l.sections){
    const md=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\*(.+?)\*/g,'<i>$1</i>');
    const wb=(b,arabic)=>b.k==='sum'?`<div class="sumbox"><b class="bl">${arabic?'النقاط الأساسية':'Key points'}</b><ul>${b.items.map(x=>`<li>${md(x)}</li>`).join('')}</ul></div>`:
      b.k==='def'?`<dl class="def"><dt>${esc(b.term)}</dt><dd>${md(b.text)}${b.note?`<span class="dn">${md(b.note)}</span>`:''}</dd></dl>`:
      b.k==='ul'||b.k==='ol'?`<${b.k} class="wl">${b.items.map(x=>`<li>${md(x)}</li>`).join('')}</${b.k}>`:
      b.k==='tbl'?`<div class="tw"><table><thead><tr>${b.head.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map((c,i)=>i?`<td>${md(c)}</td>`:`<th scope="row">${md(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`:
      b.k==='tip'?`<p class="tip"><b>${esc(b.label)}</b> ${md(b.text)}</p>`:`<p class="wp">${md(b.text)}</p>`;
    const renderSections=(sections,prefix,arabic)=>sections.map((x,i)=>`<h2 id="${prefix}${i}">${esc(x.h)}</h2>`+x.blocks.map(b=>wb(b,arabic)).join('')).join('');
    const renderQa=(qa,prefix)=>qa?`<h2 id="${prefix}q">Test yourself</h2><p class="lede">Answer out loud first, then open a question to check.</p>`+qa.map(([q,a])=>`<details class="qa"><summary>${md(q)}</summary><p>${md(a)}</p></details>`).join(''):'';
    const arabic=l.sectionsAr&&l.qaAr;
    h+=`<p><span class="pill">${m.from?LN[m.from]+' into '+LN[m.to]:LN[m.lang]}</span> ${(l.info||[]).map(x=>`<span class="pill">${esc(x)}</span>`).join(' ')}</p>`+(l.note?`<p><span class="pill">${esc(l.note)}</span></p>`:'')+
      `${arabic?'<div class="lang-switch" role="group" aria-label="Study language"><span>Study language:</span><button class="btn pri" data-lang="en">English</button><button class="btn" data-lang="ar">العربية <span class="lang-name">Arabic</span></button></div>':''}<div class="jump">${l.sections.map((x,i)=>`<button class="btn" data-j="w${i}">${esc(x.j||x.h)}</button>`).join('')}${l.qa?'<button class="btn" data-j="wq">Test yourself</button>':''}</div>`+
      `<div class="lang-content" data-content="en">${renderSections(l.sections,'w',false)}${renderQa(l.qa,'w')}</div>`+
      (arabic?`<div class="lang-content lang-alt" data-content="ar" dir="rtl">${renderSections(l.sectionsAr,'a',true)}${renderQa(l.qaAr,'a')}</div>`:'');
  }else{
    P={m:{chunks:l.chunks,lang:m.lang},key,k:1,i:-1,rate:1,loop:false,play:false,t:0,tm:l.times,au:l.audio?Object.assign(new Audio(l.audio),{preload:'auto',preservesPitch:true}):null};
    const study=l.study?`<section class="study-guide"><div class="study-head"><span class="pill">Study guide</span><p class="lede">Learn the idea first, then practise recalling it from the symbols.</p></div>${l.study.map(s=>`<div class="study-section"><h2>${esc(s.title)}</h2><div class="study-cards">${s.cards.map(c=>`<article class="study-card"><span class="study-symbol">${esc(c.symbol)}</span><div><h3${rtl(m.lang)}>${esc(c.term)}</h3><p${rtl(m.lang)}><b>Definition:</b> ${esc(c.definition)}</p><p${rtl(m.lang)}><b>Why useful:</b> ${esc(c.use)}</p></div></article>`).join('')}</div></div>`).join('')}</section>`:'';
    h+=study+`<p class="pill">${m.from?LN[m.from]+' into '+LN[m.to]:LN[m.lang]}</p>${l.audio?'<span class="pill">Original recording</span>':''}<p class="lede">Tap any line to start from there.</p><div class="layout"><div id="txt"${rtl(m.lang)}></div><aside class="side">
    <div class="playback-actions"><button class="btn" id="pv" aria-label="Previous chunk">Prev</button><button class="btn pri" id="pp">Play</button><button class="btn" id="nx" aria-label="Next chunk">Next</button></div>
    <button class="btn" id="lp">Repeat chunk: off</button>
    ${P.key.startsWith('int-fr-ar/')?'<button class="btn shadow-toggle" id="shadow" aria-pressed="false">Voice-only shadowing</button><button class="btn shadow-reveal" id="reveal" disabled>Show current paragraph</button>':''}
    <label>Speed <select id="sp"><option>0.7</option><option>0.85</option><option selected>1</option><option>1.2</option></select></label>
    ${!l.audio?'<label>Voice <select id="voice"><option>Loading voices…</option></select></label>':''}
    <label>Chunk size <select id="lv"><option value="1">Short</option><option value="2">Medium</option><option value="3">Long</option></select></label>${l.audio?'<button class="btn" id="sy">Fix timing</button>':''}</aside></div>`+(l.extra&&l.extra.length?`<h2>Text without audio</h2><p class="sub">The recording ends before these lines.</p>`+l.extra.map(c=>`<p class="wp">${esc(c)}</p>`).join(''):'');
  }
  const nx=m.lessons[m.lessons.indexOf(l)+1];
  h+=`<p><button class="btn" id="dn"></button> <span class="sub" id="dm" aria-live="polite"></span></p>`+(nx?`<a class="row" ${L(`l/${mid}/${nx.id}`)}>${dt(nx.date)}<span class="rt"><span class="sub">Next lesson</span><span class="rtitle">${esc(nx.title)}</span></span>${go}</a>`:'')+`</div>`;app.innerHTML=h;
  try{const sv=JSON.parse(localStorage.getItem('tm:'+key));if(P&&sv&&sv.length===l.chunks.length)P.tm=sv}catch(e){}
  const dn=$('#dn'),paint=()=>dn.textContent=store.get().includes(key)?'Done ✓':'Mark as done';paint();
  dn.onclick=()=>{let d=store.get();const on=!d.includes(key);store.set(on?[...d,key]:d.filter(x=>x!==key));paint();$('#dm').textContent=on?rnd(DL):''};
  if(m.cat==='translation')tw(key);
  else if(m.cat==='writing'||l.sections)ww();
  else wire();
}
function ww(){app.onclick=e=>{const lang=e.target.closest('[data-lang]');if(lang){app.querySelectorAll('[data-content]').forEach(x=>x.classList.toggle('lang-alt',x.dataset.content!==lang.dataset.lang));app.querySelectorAll('[data-lang]').forEach(x=>x.classList.toggle('pri',x===lang));return}const g=e.target.closest('[data-j]');if(g){const active=app.querySelector('.lang-content:not(.lang-alt)');const id=(active&&active.dataset.content==='ar'?'a':'w')+g.dataset.j.slice(1);active.querySelector('#'+id).scrollIntoView({behavior:'smooth'})}}}
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sd2=l=>l==='ar'?'ka':'kf',at2=l=>l==='ar'?' dir="rtl" lang="ar"':` lang="${l}"`;
const ls={g(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},s(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const DL=['Une traduction de plus, un faux ami de moins.','Bravo. Le dictionnaire peut se reposer.','Leçon bouclée. L’oreille s’affûte.','Terminé. Pensez à boire de l’eau, en cabine aussi.'];
const MS=['La cabine applaudit.','Mot juste.','Bien vu, l’oreille est bonne.','Le micro est content.'];
const BS=['Faux ami détecté.','Perdu en traduction.','Le micro était resté ouvert…','Coupez, on reprend.'];
const TS=['Silence en cabine.','Trop tard, le signal est tombé.'];
const RK=[[500,'Traducteur juré'],[300,'Interprète de conférence'],[150,'Interprète de liaison'],[50,'Traducteur débutant'],[0,'Stagiaire']];
const POOL=()=>{const o=[];mods.filter(m=>m.cat==='translation').forEach(m=>m.lessons.forEach(l=>l.paras.forEach(p=>(p.kw||[]).forEach(k=>o.push({q:k[0],a:k[1],f:m.from,t:m.to,id:m.id+'|'+k[0]})))));return o};
const newGame=()=>({pool:POOL(),s:0,st:0,lives:3,n:0,miss:[]});
function play(){
  const n=POOL().length,b=ls.g('bp:best',0);
  app.innerHTML=`<h1>Learn by Playing</h1><p class="lede">Pick the right equivalent for each term. Three misses and the session ends. Terms you miss come back more often, and there is no clock.</p>`+(n<8?'<p class="sub">Add a few more lessons to unlock the game.</p>':`<p class="sub">${n} terms from your lessons. Best score: ${b}.</p><p><button class="btn pri" id="go2">Start</button></p>`);
  if(n>=8)$('#go2').onclick=()=>round(newGame());
}
function pick(G){
  const M=ls.g('bp:m',{}),w=G.pool.map(x=>1+3*(M[x.id]||0));let r=Math.random()*w.reduce((a,b)=>a+b,0),i=0;
  while(r>w[i]&&i<w.length-1){r-=w[i];i++}
  const x=G.pool[i];if(x.id===G.last&&G.pool.length>1)return pick(G);G.last=x.id;return x;
}
function round(G){
  clearInterval(TM);const gt=GT,x=pick(G);
  const ds=shuf(G.pool.filter(y=>y.t===x.t&&y.a!==x.a).map(y=>y.a)).filter((a,i,s)=>s.indexOf(a)===i).slice(0,3);
  const opts=shuf([x.a,...ds]),ci=opts.indexOf(x.a);
  app.innerHTML=`<p class="sub">Score ${G.s}, lives ${'♥'.repeat(G.lives)}${'♡'.repeat(3-G.lives)}, streak ${G.st}</p><p class="bq"${at2(x.f)}>${esc(x.q)}</p><div class="bo">${opts.map((o,i)=>`<button class="btn bopt" data-o="${i}"${at2(x.t)}>${esc(o)}</button>`).join('')}</div><p class="note" id="fb" aria-live="polite"></p>`;
  let done=0;
  const end=i=>{
    if(done)return;done=1;KB=null;const ok=i===ci;
    document.querySelectorAll('.bopt').forEach((b,k)=>{b.disabled=true;if(k===ci)b.classList.add('ok');else if(k===i)b.classList.add('no')});
    if(ok){G.st++;G.s+=10+Math.min(G.st,5)*2;$('#fb').textContent=rnd(MS)}
    else{G.lives--;G.st=0;const m=ls.g('bp:m',{});m[x.id]=(m[x.id]||0)+1;ls.s('bp:m',m);if(!G.miss.some(y=>y.id===x.id))G.miss.push(x);$('#fb').textContent=rnd(BS)+' '+x.a}
    const nxt=()=>{if(gt!==GT)return;if(G.lives<1)over(G);else{G.n++;round(G)}};
    if(ok)setTimeout(nxt,900);
    else{$('#fb').insertAdjacentHTML('afterend','<p><button class="btn pri" id="nx2">'+(G.lives<1?'See results':'Next')+'</button></p>');const nb=$('#nx2');nb.onclick=nxt;nb.focus()}
  };
  app.onclick=e=>{const b=e.target.closest('.bopt');if(b)end(+b.dataset.o)};
  KB=e=>{const b=document.querySelectorAll('.bopt')[+e.key-1];if(b&&!b.disabled)b.click()};
}
function over(G){
  KB=null;const b=ls.g('bp:best',0),nb=G.s>b;if(nb)ls.s('bp:best',G.s);const rk=RK.find(x=>G.s>=x[0])[1];
  app.innerHTML=`<h1>Fin de séance</h1><p class="lede">Score ${G.s}${nb&&G.s>0?', a new best':''}. Rank: ${rk}.</p><p><button class="btn pri" id="ag">Play again</button></p>`+(G.miss.length?`<h2>To review</h2>`+G.miss.map(x=>`<div class="kr${x.f==='ar'?' rt':''}"><span class="${sd2(x.f)}"${at2(x.f)}>${esc(x.q)}</span><span class="${sd2(x.t)}"${at2(x.t)}>${esc(x.a)}</span></div>`).join(''):'<p class="lede">No misses. Suspicious.</p>');
  $('#ag').onclick=()=>round(newGame());
}
function tw(key){
  const a=$('#att'),k='att:'+key;try{a.value=localStorage.getItem(k)||''}catch(e){}
  a.oninput=()=>{try{localStorage.setItem(k,a.value)}catch(e){}};
  app.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('cv')){e.preventDefault();e.target.classList.toggle('on')}};
  app.onclick=e=>{const kp=e.target.closest('[data-kp]');if(kp){const xs=[...kp.closest('.kg').querySelectorAll('.cv')],on=xs.some(x=>!x.classList.contains('on'));xs.forEach(x=>x.classList.toggle('on',on));kp.textContent=on?'Hide French':'Show French';return}const c=e.target.closest('.cv');if(c)c.classList.toggle('on');const g=e.target.closest('[data-j]');if(g)document.getElementById(g.dataset.j).scrollIntoView({behavior:'smooth'})};
  $('#tm').onclick=e=>{const k=$('#kws'),h=k.classList.toggle('cvr');if(h){k.querySelectorAll('.cv').forEach(x=>x.classList.remove('on'));k.querySelectorAll('[data-kp]').forEach(x=>x.textContent='Show French')}e.target.textContent=h?'Show all French':'Hide French'};
  $('#ra').onclick=e=>{const x=[...document.querySelectorAll('#tr .cv')],on=x.some(y=>!y.classList.contains('on'));x.forEach(y=>y.classList.toggle('on',on));e.target.textContent=on?'Hide all':'Reveal all'};
}
function draw(){
  const c=P.m.chunks,o=[];for(let i=0;i<c.length;i+=P.k)o.push(c.slice(i,i+P.k).join(' '));P.c=o;if(P.tm)P.ts=o.map((_,x)=>[P.tm[x*P.k][0],P.tm[Math.min(x*P.k+P.k,P.tm.length)-1][1]]);
  $('#txt').innerHTML=o.map((t,i)=>`<p class="txt chunk" data-i="${i}" tabindex="0" role="button">`+t.split(/(\s+)/).map(w=>/\s/.test(w)?w:`<span class="w">${esc(w)}</span>`).join('')+`</p>`).join('');
}
function mark(){
  document.querySelectorAll('.chunk').forEach((e,x)=>e.classList.toggle('on',x===P.i));
  const e=document.querySelector('.chunk.on');e&&e.scrollIntoView({block:'center',behavior:'smooth'});
  const reveal=$('#reveal');
  if(reveal&&e){reveal.disabled=false;reveal.textContent=e.classList.contains('shadow-revealed')?'Hide current paragraph':'Show current paragraph'}
}
function btn(){const b=$('#pp');if(b&&P)b.textContent=P.play?'Pause':'Play'}
function stop(){if(window.speechSynthesis)speechSynthesis.cancel();if(P){P.play=false;P.t++;clearInterval(P.iv);if(P.au)P.au.pause()}btn()}
const isEnglishLesson=()=>P&&P.key.startsWith('int-en-ar/');
const voiceScore=v=>{
  const n=v.name.toLowerCase(),l=v.lang.toLowerCase();
  return (isEnglishLesson()&&l==='en-gb'?100:0)+(n.includes('female')?80:0)+(n.includes('zira')?70:0)+(n.includes('sonia')?55:0)+(n.includes('hazel')?55:0)+(n.includes('susan')?55:0)+(n.includes('libby')?55:0)+(n.includes('natural')?30:0)+(n.includes('neural')?25:0)+(n.includes('premium')?20:0)+(n.includes('enhanced')?15:0)-(n.includes('male')?80:0)-(n.includes('david')?50:0)+(v.default?5:0);
};
const availableVoices=()=>speechSynthesis.getVoices().filter(v=>{
  const n=v.name.toLowerCase(),l=v.lang.toLowerCase();
  if(isEnglishLesson())return l==='en-gb'||(l.startsWith('en-')&&!n.includes('male')&&!n.includes('david'));
  return l.startsWith(P.m.lang);
}).sort((a,b)=>voiceScore(b)-voiceScore(a)||a.name.localeCompare(b.name));
const preferredVoice=l=>{
  const voices=availableVoices(),locale=isEnglishLesson()?'en-gb':VL[l].toLowerCase();
  return voices.find(v=>v.lang.toLowerCase()===locale)||voices[0];
};
function say(i){
  if(window.speechSynthesis)speechSynthesis.cancel();clearInterval(P.iv);P.t++;const t=P.t;
  if(i<0||i>=P.c.length){P.play=false;if(P.au)P.au.pause();return btn()}
  P.i=i;P.play=true;
  const shadowText=$('#txt');
  if(shadowText&&shadowText.classList.contains('shadow-hidden'))shadowText.querySelectorAll('.shadow-revealed').forEach(x=>x.classList.remove('shadow-revealed'));
  mark();
  if(P.au&&P.ts){
    const[a,b]=P.ts[i],au=P.au;au.pause();btn();
    const run=()=>{au.currentTime=a;au.playbackRate=P.rate;au.play();
      P.iv=setInterval(()=>{if(t!==P.t)return clearInterval(P.iv);if(au.currentTime>=b){au.pause();clearInterval(P.iv);if(P.play)say(P.loop?i:i+1)}},40)};
    au.readyState<1?au.addEventListener('loadedmetadata',run,{once:true}):run();return;
  }
  const txt=P.c[i],u=new SpeechSynthesisUtterance(txt),l=P.m.lang;
  const v=P.voice||preferredVoice(l);
  u.lang=voiceLocale(l);if(v)u.voice=v;u.rate=P.rate;
  const st=[];txt.replace(/\S+/g,(w,o)=>st.push(o));
  u.onboundary=e=>{const n=st.findIndex((s,x)=>s<=e.charIndex&&(st[x+1]===undefined||st[x+1]>e.charIndex));
    document.querySelectorAll('.chunk.on .w').forEach((w,x)=>w.classList.toggle('cur',x===n))};
  u.onend=()=>{if(t===P.t&&P.play)say(P.loop?i:i+1)};
  speechSynthesis.speak(u);btn();
}
function wire(){
  if(!window.speechSynthesis){$('#txt').insertAdjacentHTML('beforebegin','<p class="note">This browser has no speech voice. Try Chrome or Safari.</p>')}
  const vs=$('#voice'),voiceKey='voice:'+P.m.lang;
  const loadVoices=()=>{
    if(!vs||!window.speechSynthesis)return;
    const voices=availableVoices();
    vs.innerHTML='';
    voices.forEach(v=>{const o=document.createElement('option');o.value=v.name+'|'+v.lang;o.textContent=v.name+' ('+v.lang+')';vs.appendChild(o)});
    if(!voices.length){const o=document.createElement('option');o.textContent='No '+LN[P.m.lang]+' voice found';vs.appendChild(o);return}
    let saved='';try{saved=localStorage.getItem(voiceKey)||''}catch(e){}
    const chosen=voices.find(v=>v.name+'|'+v.lang===saved)||preferredVoice(P.m.lang);
    P.voice=chosen;vs.value=chosen.name+'|'+chosen.lang;
  };
  draw();
  const tog=()=>P.play?stop():say(Math.max(P.i,0));
  $('#pp').onclick=tog;
  $('#nx').onclick=()=>say(Math.min(P.i+1,P.c.length-1));
  $('#pv').onclick=()=>say(Math.max(P.i-1,0));
  $('#lp').onclick=e=>{P.loop=!P.loop;e.target.textContent='Repeat chunk: '+(P.loop?'on':'off')};
  if($('#shadow'))$('#shadow').onclick=e=>{
    const txt=$('#txt'),hidden=txt.classList.toggle('shadow-hidden');
    e.currentTarget.setAttribute('aria-pressed',String(hidden));
    e.currentTarget.textContent=hidden?'Exit voice-only mode':'Voice-only shadowing';
    if(!hidden){txt.querySelectorAll('.shadow-revealed').forEach(x=>x.classList.remove('shadow-revealed'));$('#reveal').textContent='Show current paragraph'}
  };
  if($('#reveal'))$('#reveal').onclick=e=>{
    const current=$('#txt .chunk.on');if(!current)return;
    const revealed=current.classList.toggle('shadow-revealed');
    e.currentTarget.textContent=revealed?'Hide current paragraph':'Show current paragraph';
  };
  $('#sp').onchange=e=>{P.rate=+e.target.value;if(P.au)P.au.playbackRate=P.rate};
  if(vs)vs.onchange=e=>{P.voice=speechSynthesis.getVoices().find(v=>v.name+'|'+v.lang===e.target.value)||null;try{localStorage.setItem(voiceKey,e.target.value)}catch(err){}};
  $('#lv').onchange=e=>{stop();P.k=+e.target.value;P.i=-1;draw()};
  $('#txt').onclick=e=>{const c=e.target.closest('.chunk');if(c)say(+c.dataset.i)};
  if($('#sy'))$('#sy').onclick=syncMode;
  $('#txt').onkeydown=e=>{if(e.key==='Enter'){const c=e.target.closest('.chunk');if(c)say(+c.dataset.i)}};
  if(window.speechSynthesis){speechSynthesis.onvoiceschanged=loadVoices;loadVoices()}
}
function syncMode(){
  stop();const au=P.au,n=P.m.chunks.length,side=$('.side'),key=P.key,base=P.tm.map(x=>x.slice());let t=[],o=0;P.k=1;P.sy=1;draw();$('#txt').onclick=null;
  const ls=()=>document.querySelectorAll('.chunk'),cur=()=>o+t.length,show=()=>{ls().forEach((e,x)=>e.classList.toggle('on',x===cur()));const e=ls()[cur()];e&&e.scrollIntoView({block:'center',behavior:'smooth'});$('#mk').textContent=cur()<n?`Mark line ${cur()+1} of ${n}`:'Finish and save';$('#sv').disabled=!t.length};
  side.innerHTML='<p class="sub">Press Play. Tap Mark the moment the highlighted line starts. You can save at any point: lines you did not mark keep their old timing.</p><label>Start at line <input id="st" type="number" min="1" max="'+n+'" value="1" style="width:4.5em"></label><button class="btn" id="s2">Play</button><button class="btn pri" id="mk"></button><button class="btn" id="ud">Undo</button><button class="btn" id="sv">Save changes</button><button class="btn" id="cx">Cancel</button>';
  au.pause();au.currentTime=0;show();
  $('#s2').onclick=e=>{if(au.paused){au.play();e.target.textContent='Pause'}else{au.pause();e.target.textContent='Play'}};
  $('#ud').onclick=()=>{t.pop();show()};
  $('#cx').onclick=()=>{au.pause();route()};
  $('#st').onchange=e=>{o=Math.min(n-1,Math.max(0,(+e.target.value||1)-1));t=[];au.currentTime=Math.max(0,base[o][0]-2);show()};
  const save=()=>{
    au.pause();const tm=base.map(x=>x.slice());
    t.forEach((s,k)=>{const i=o+k;tm[i][0]=+s.toFixed(2);const nx=k<t.length-1?t[k+1]-.05:(i<n-1?(base[i][1]>s+.3?base[i][1]:s+3):(au.duration||s+8));tm[i][1]=+nx.toFixed(2)});
    if(o>0&&t.length)tm[o-1][1]=+Math.min(tm[o-1][1],t[0]-.05).toFixed(2);
    try{localStorage.setItem('tm:'+key,JSON.stringify(tm))}catch(e){}
    try{navigator.clipboard.writeText(JSON.stringify({lesson:key,times:tm})).catch(()=>{})}catch(e){}
    route();setTimeout(()=>$('#txt')&&$('#txt').insertAdjacentHTML('beforebegin','<p class="note">New timing saved on this device and copied to the clipboard.</p>'),50);
  };
  $('#sv').onclick=save;
  $('#mk').onclick=()=>{if(cur()<n){t.push(Math.max(0,au.currentTime-.25));show()}else save()};
}
onkeydown=e=>{
  if(KB&&/^[1-4]$/.test(e.key)){KB(e);return}
  if(!P||P.sy||/SELECT|INPUT/.test(e.target.tagName))return;
  if(e.code==='Space'){e.preventDefault();$('#pp').click()}
  else if(e.key==='ArrowRight')$('#nx').click();
  else if(e.key==='ArrowLeft')$('#pv').click();
  else if(e.key==='r')$('#lp').click();
};
$('#soc').innerHTML=SITE.socials.map(([n,u])=>`<a class="soc" href="${esc(u)}" target="_blank" rel="noopener" aria-label="${esc(n)}" title="${esc(n)}">${ICON[n]||esc(n)}</a>`).join('');
addEventListener('hashchange',route);route();
