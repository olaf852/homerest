(function(){
var $=function(i){return document.getElementById(i)},
track=$('track'),wall=$('wall'),room=$('room'),shade=$('shade'),hero=$('hero'),cue=$('cue'),lw=$('lw'),nav=$('nav'),
AW=577,AH=433,OX=248,OY=146,OW=89,OH=138,cx=(OX+OW/2)/AW,cy=(OY+OH/2)/AH,
reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,
S=1,cur=reduce?1:0,target=cur,raf=0,R='home',auto=false,t0=0,pre='',user=null,mode='in';
function clamp(v){return Math.min(1,Math.max(0,v))}
var lang='en';try{lang=localStorage.getItem('hr_lang')||'en'}catch(x){}
var D={'Luxury Real Estate':'عقارات فاخرة','Elevate your living experience':'ارتقِ بتجربة سكنك','Premium homes tailored to your lifestyle. Explore our exclusive listings and find the perfect space to call home.':'منازل راقية تناسب أسلوب حياتك. تصفّح عقاراتنا الحصرية واعثر على المكان المثالي الذي تسميه بيتك.','Explore now':'استكشف الآن','Scroll to step inside':'مرّر للداخل','HOME':'الرئيسية','SELLING':'البيع','BUYING':'الشراء','ABOUT':'من نحن','SIGN IN':'دخول','Selling':'البيع','Buying':'الشراء','About':'من نحن','Sign in':'تسجيل الدخول','Create account':'إنشاء حساب','Full name':'الاسم الكامل','Email':'البريد الإلكتروني','Password':'كلمة المرور','Show':'إظهار','Hide':'إخفاء','Show password':'إظهار كلمة المرور','Hide password':'إخفاء كلمة المرور','You’re signed in':'تم تسجيل دخولك','Browse homes':'تصفّح المنازل','Sign out':'تسجيل الخروج','Welcome back':'أهلًا بعودتك','Create your account':'أنشئ حسابك','Save homes, follow price changes, and book viewings.':'احفظ المنازل وتابع تغيّر الأسعار واحجز المعاينات.','Sign in to see your saved homes and viewings.':'سجّل الدخول لترى منازلك المحفوظة ومعايناتك.','Enter your name.':'أدخل اسمك.','Enter a valid email address, like name@example.com.':'أدخل بريدًا إلكترونيًا صحيحًا، مثل name@example.com.','Use at least 8 characters.':'استخدم 8 أحرف على الأقل.','Enter your password.':'أدخل كلمة المرور.','Creating account…':'جارٍ إنشاء الحساب…','Signing in…':'جارٍ تسجيل الدخول…','Homes on the market now':'منازل معروضة الآن','A few of the properties our agents are showing this month.':'بعض العقارات التي يعرضها وكلاؤنا هذا الشهر.','See all homes':'عرض كل المنازل','Sell for what your home is worth':'بِع منزلك بقيمته الحقيقية','Tell us about the property and an agent will send you a written valuation, not a sales pitch.':'أخبرنا عن العقار وسيرسل لك أحد وكلائنا تقييمًا مكتوبًا، لا عرضًا ترويجيًا.','Request a valuation':'اطلب تقييمًا','Share the address and a few details. We visit only if you want us to.':'شاركنا العنوان وبعض التفاصيل. لا نزور العقار إلا إذا رغبت بذلك.','We prepare and list':'نجهّز العقار وننشره','Photography, staging advice, and a price we can explain line by line.':'تصوير، ونصائح لتهيئة المنزل، وسعر نشرح لك تفاصيله بندًا بندًا.','Offers and closing':'العروض وإتمام البيع','Your agent handles viewings and negotiation, and stays with you until the keys change hands.':'يتولى وكيلك المعاينات والتفاوض، ويبقى معك حتى تسليم المفاتيح.','Get your valuation':'احصل على تقييمك','Property address':'عنوان العقار','Home type':'نوع المنزل','House':'منزل مستقل','Apartment':'شقة','Townhouse':'تاون هاوس','Request valuation':'اطلب التقييم','Request received. An agent will email you a written valuation within one business day.':'تم استلام طلبك. سيرسل لك أحد الوكلاء تقييمًا مكتوبًا خلال يوم عمل واحد.','Find a home you’ll want to come back to':'اعثر على منزل تودّ العودة إليه','Filter by price and bedrooms, then ask for a viewing on anything that catches your eye.':'صفِّ حسب السعر وعدد غرف النوم، ثم اطلب معاينة لما يلفت نظرك.','Price':'السعر','Any price':'أي سعر','Under $1M':'أقل من 1 مليون دولار','$1M to $2M':'من 1 إلى 2 مليون دولار','Over $2M':'أكثر من 2 مليون دولار','Bedrooms':'غرف النوم','Any':'أي عدد','2 or more':'2 فأكثر','3 or more':'3 فأكثر','4 or more':'4 فأكثر','No homes match those filters. Widen the price range or lower the bedroom count.':'لا توجد منازل تطابق هذه الخيارات. وسّع نطاق السعر أو قلّل عدد غرف النوم.','Reset filters':'إعادة ضبط الفلاتر','A small agency, on purpose':'وكالة صغيرة عن قصد','HomeRest is built on one idea: a sale or purchase goes better when one person knows your whole story. Every client works with a single agent from the first call to the day the keys change hands.':'تقوم HomeRest على فكرة واحدة: البيع أو الشراء ينجح أكثر حين يعرف شخص واحد قصتك كاملة. يعمل كل عميل مع وكيل واحد من أول اتصال حتى يوم تسليم المفاتيح.','Honest pricing':'تسعير صادق','We show the comparable sales behind every number we give you.':'نعرض لك عمليات البيع المماثلة وراء كل رقم نقدّمه.','One agent throughout':'وكيل واحد طوال الرحلة','No hand-offs between teams. The person who meets you is the person who closes with you.':'لا انتقال بين الفرق. من يقابلك هو من يُتمّ الصفقة معك.','Replies within a day':'رد خلال يوم','Questions get a real answer by the next business day, usually sooner.':'تحصل أسئلتك على إجابة حقيقية بحلول يوم العمل التالي، وغالبًا أسرع.','Meet the agents':'تعرّف على الوكلاء','Amara Okafor':'أمارا أوكافور','Daniel Reyes':'دانيال رييس','Priya Nair':'بريا نير','Principal agent, selling':'الوكيلة الرئيسية، قسم البيع','Buyer’s agent':'وكيل المشترين','Luxury and new builds':'العقارات الفاخرة والمشاريع الجديدة','Talk to us':'تحدّث إلينا','Tell us what you’re looking for or what you’d like to sell. An agent will reply within one business day.':'أخبرنا بما تبحث عنه أو ما تودّ بيعه. سيردّ عليك أحد الوكلاء خلال يوم عمل واحد.','Name':'الاسم','Message':'الرسالة','Send message':'إرسال الرسالة','Message sent. An agent will reply within one business day.':'تم إرسال رسالتك. سيردّ عليك أحد الوكلاء خلال يوم عمل واحد.','HomeRest home':'الصفحة الرئيسية لـ HomeRest','Request a viewing':'اطلب معاينة','Illustration of ':'رسم توضيحي لـ ','The Arch House':'بيت القوس','Garden Atrium':'أتريوم الحديقة','Terrace Loft':'لوفت التراس','Sunroom Residence':'مسكن الغرفة المشمسة','Courtyard Villa':'فيلا الفناء','Linen Studio':'ستوديو الكتّان','Hillcrest':'هيلكرست','Maple Park':'ميبل بارك','Old Mill':'أولد ميل','Lakeview':'ليكفيو','Oak Bend':'أوك بند','Market Square':'ماركت سكوير'};
function tr(s){return lang==='ar'&&D[s]||s}
function det(l){return lang==='ar'?l.b+' غرف نوم، '+l.t+' حمامات، '+l.s+' قدم مربع':l.b+' bedrooms, '+l.t+' baths, '+l.s+' sq ft'}
function setTitle(){document.title=R==='home'?'HomeRest – '+tr('Luxury Real Estate'):tr(V[R])+' – HomeRest'}
var SK='#fh,#bg,#cnt,#lh,#ls,#lb,#lu,.err,.ok,#na,#sp,#lg,script,style';
function setLang(){
  var ar=lang==='ar',w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n,p,t;
  document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';
  while(n=w.nextNode()){p=n.parentElement;if(!p||p.closest(SK))continue;t=n.nodeValue.trim();if(!t)continue;if(n._o===undefined)n._o=t;n.nodeValue=tr(n._o)}
  [].forEach.call(document.querySelectorAll('[aria-label]'),function(e){if(e.closest(SK))return;if(e._a===undefined)e._a=e.getAttribute('aria-label');e.setAttribute('aria-label',tr(e._a))});
  $('lg').textContent=ar?'English':'العربية';
  var hid=lp.type==='password';$('sp').textContent=tr(hid?'Show':'Hide');$('sp').setAttribute('aria-label',tr(hid?'Show password':'Hide password'));
  $('fh').innerHTML=L.slice(0,3).map(card).join('');
  showList();navUser();paintLogin();setTitle();
  [].forEach.call(document.querySelectorAll('.ok'),function(o){if(o._k)o.textContent=tr(o._k)});
}
$('lg').onclick=function(){lang=lang==='ar'?'en':'ar';try{localStorage.setItem('hr_lang',lang)}catch(x){}setLang()};

function layout(){
  var vw=innerWidth,vh=innerHeight;
  var W=Math.max(vw,vh*AW/AH)*1.06,H=W*AH/AW;
  wall.style.width=W+'px';wall.style.height=H+'px';
  wall.style.left=(vw/2-W*cx)+'px';wall.style.top=(vh*.52-H*cy)+'px';
  wall.style.transformOrigin=(cx*100)+'% '+(cy*100)+'%';
  S=Math.max(vw/(W*OW/AW),vh/(H*OH/AH))*1.4;
  read();draw(true);
}
function read(){
  if(reduce){target=1;return}
  if(auto)return;
  var max=track.offsetHeight-innerHeight;
  target=max>0?clamp(scrollY/max):1;
}
function draw(now){
  cancelAnimationFrame(raf);
  if(auto&&!reduce)target=clamp((performance.now()-t0)/2400);
  cur+=(target-cur)*(now?1:.12);
  if(Math.abs(target-cur)<.0005)cur=target;
  var z=clamp(cur/.78),e=z*z*(3-2*z);
  wall.style.transform='scale('+Math.exp(Math.log(S)*e)+')';
  room.style.transform='scale('+(1.18-.18*e)+')';
  var t=clamp((cur-.7)/.3),p=R==='login'?lw:hero;
  shade.style.opacity=t;
  p.style.opacity=t;
  if(R==='home')hero.style.transform='translateY('+(-46+(1-t)*6)+'%)';
  p.classList.toggle('on',t>.6);
  cue.style.opacity=1-clamp(cur/.08);
  raf=(cur!==target||(auto&&target<1))?requestAnimationFrame(function(){draw(false)}):0;
}
function navState(){
  var s=R==='home'?scrollY>Math.max(track.offsetHeight-innerHeight,innerHeight*.6)-30:R!=='login';
  nav.className='nav'+(s?' solid':'')+(R==='login'?' dark':'');
}
function kick(){read();navState();if(!raf)raf=requestAnimationFrame(function(){draw(false)})}

/* listings */
var L=[{n:'The Arch House',a:'Hillcrest',p:2450000,b:5,t:4,s:'4,200'},{n:'Garden Atrium',a:'Maple Park',p:1180000,b:3,t:2,s:'2,300'},{n:'Terrace Loft',a:'Old Mill',p:865000,b:2,t:2,s:'1,450'},{n:'Sunroom Residence',a:'Lakeview',p:1720000,b:4,t:3,s:'3,100'},{n:'Courtyard Villa',a:'Oak Bend',p:3200000,b:6,t:5,s:'5,600'},{n:'Linen Studio',a:'Market Square',p:540000,b:1,t:1,s:'780'}];
function art(i,n){
  var c=['#F5E1C8','#EBD2AE','#E2D8C8','#F2CF93','#D6C8B2','#EED9BC'][i%6],h=['#BAAD9C','#8F8573','#A79B88','#6F665A','#B09A7C','#9B8D76'][i%6],w=44+(i%3)*14;
  return '<svg viewBox="0 0 320 190" role="img" aria-label="'+tr('Illustration of ')+n+'"><rect width="320" height="190" fill="'+c+'"/><circle cx="'+(250-i*12)+'" cy="52" r="24" fill="#F5A634"/><path d="M36 190V104l124-62 124 62v86z" fill="'+h+'"/><path d="M'+(160-w/2)+' 190v-46a'+(w/2)+' '+(w/2)+' 0 0 1 '+w+' 0v46z" fill="#111"/><circle cx="79" cy="129" r="17" fill="'+c+'"/><circle cx="241" cy="129" r="17" fill="'+c+'"/></svg>';
}
function card(l,i){return '<article class="home">'+art(i,tr(l.n))+'<div class="in"><h3>'+tr(l.n)+'</h3><p class="mut">'+tr(l.a)+'</p><p class="price">$'+l.p.toLocaleString('en-US')+'</p><p class="mut">'+det(l)+'</p><button class="btn alt" type="button" data-i="'+i+'">'+tr('Request a viewing')+'</button></div></article>'}
var pf=$('pf'),bf=$('bf');
function showList(){
  var p=pf.value,b=+bf.value,r=L.filter(function(l){return l.b>=b&&(p==='any'||(p==='1'?l.p<1e6:p==='2'?l.p>=1e6&&l.p<2e6:l.p>=2e6))});
  $('bg').innerHTML=r.map(function(l){return card(l,L.indexOf(l))}).join('');
  $('cnt').textContent=lang==='ar'?'عرض '+r.length+' من '+L.length+' منازل':'Showing '+r.length+' of '+L.length+' homes';
  $('em').hidden=r.length>0;
}
pf.onchange=bf.onchange=showList;
$('rs').onclick=function(){pf.value='any';bf.value='0';showList()};
$('fh').innerHTML=L.slice(0,3).map(card).join('');
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-i]');if(!b)return;
  var l=L[b.dataset.i];pre=lang==='ar'?'أرغب في ترتيب معاينة لـ '+tr(l.n)+' في '+tr(l.a)+'.':'I’d like to arrange a viewing of '+l.n+' in '+l.a+'.';location.hash='#/about';
});

/* forms */
function done(id,m){var f=$(id);f.addEventListener('submit',function(e){e.preventDefault();var s=f.querySelector('.ok');f.reset();s._k=m;s.textContent=tr(m);s.hidden=false})}
done('sf','Request received. An agent will email you a written valuation within one business day.');
done('cf','Message sent. An agent will reply within one business day.');

/* sign in (front-end demo, no server) */
var lf=$('lf'),ln=$('ln'),le=$('le'),lp=$('lp'),lb=$('lb'),ti=$('ti'),tu=$('tu');
try{user=JSON.parse(localStorage.getItem('hr_user'))}catch(x){}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function fe(id,m){$(id).textContent=m||''}
function navUser(){$('na').textContent=user?user.name.split(' ')[0].toUpperCase():tr('SIGN IN')}
function paintLogin(){
  var up=mode==='up';
  $('lout').hidden=!!user;$('lin').hidden=!user;
  if(user)$('lu').textContent=(lang==='ar'?'تم تسجيل الدخول باسم ':'Signed in as ')+user.name+' ('+user.email+').';
  $('lh').textContent=tr(up?'Create your account':'Welcome back');
  $('ls').textContent=tr(up?'Save homes, follow price changes, and book viewings.':'Sign in to see your saved homes and viewings.');
  $('lnw').hidden=!up;lb.textContent=tr(up?'Create account':'Sign in');
  lp.autocomplete=up?'new-password':'current-password';
  ti.setAttribute('aria-selected',String(!up));tu.setAttribute('aria-selected',String(up));
  fe('ene');fe('eee');fe('epe');
}
ti.onclick=function(){mode='in';paintLogin()};
tu.onclick=function(){mode='up';paintLogin()};
$('sp').onclick=function(){var h=lp.type==='password';lp.type=h?'text':'password';this.textContent=tr(h?'Hide':'Show');this.setAttribute('aria-label',tr(h?'Hide password':'Show password'))};
lf.addEventListener('submit',function(e){
  e.preventDefault();
  var up=mode==='up',em=le.value.trim(),nm=ln.value.trim(),bad=0;
  fe('ene',up&&!nm?(bad=1,tr('Enter your name.')):'');
  fe('eee',/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)?'':(bad=1,tr('Enter a valid email address, like name@example.com.')));
  fe('epe',lp.value.length>=(up?8:1)?'':(bad=1,tr(up?'Use at least 8 characters.':'Enter your password.')));
  var inv=lf.querySelector('.err:not(:empty)');
  if(bad&&inv){inv.parentNode.querySelector('input').focus();return}
  lb.disabled=true;lb.textContent=tr(up?'Creating account…':'Signing in…');
  setTimeout(function(){
    user={name:nm||cap(em.split('@')[0]),email:em};
    try{localStorage.setItem('hr_user',JSON.stringify(user))}catch(x){}
    lb.disabled=false;lf.reset();paintLogin();navUser();
  },800);
});
$('lo').onclick=function(){user=null;try{localStorage.removeItem('hr_user')}catch(x){}paintLogin();navUser()};

/* routing */
var V={home:'Luxury Real Estate',selling:'Selling',buying:'Buying',about:'About',login:'Sign in'};
function route(){
  var h=location.hash.replace(/^#\/?/,'');
  R=Object.prototype.hasOwnProperty.call(V,h)?h:'home';
  document.body.dataset.route=R;
  setTitle();
  [].forEach.call(document.querySelectorAll('[data-v]'),function(e){e.hidden=e.dataset.v.split(' ').indexOf(R)<0});
  [].forEach.call(document.querySelectorAll('[data-r]'),function(a){if(a.dataset.r===R)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  scrollTo(0,0);
  auto=R==='login';
  if(auto){cur=reduce?1:0;target=cur;t0=performance.now()}
  if(R==='home'||auto)layout();
  navState();paintLogin();
  if(R==='about'&&pre){$('cm').value=pre;pre='';setTimeout(function(){$('contact').scrollIntoView({behavior:reduce?'auto':'smooth'})},50)}
}
addEventListener('scroll',kick,{passive:true});
addEventListener('hashchange',route);
addEventListener('resize',function(){if(R==='home'||R==='login')layout();navState()});
navUser();showList();route();setLang();
})();
