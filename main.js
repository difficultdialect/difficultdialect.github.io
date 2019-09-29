verbalSanskrit();

async function verbalSanskrit(){
	let scripts={
			jquery:'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
			webfont:'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js',
			twemoji:'https://twemoji.maxcdn.com/v/latest/twemoji.min.js',
			//tweemax:'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js',
			firebase:'https://www.gstatic.com/firebasejs/6.4.0/firebase-app.js',
			auth:'https://www.gstatic.com/firebasejs/6.6.0/firebase-auth.js',
			firestore:'https://www.gstatic.com/firebasejs/6.6.0/firebase-firestore.js',
		};
	let firebaseConfig = {
			apiKey: "AIzaSyBw16ejmj0piA4NXC6c9hJxHz2oqPVzpik",
			authDomain: "verbalsanskrit.web.app",
			databaseURL: "https://verbalsanskrit.firebaseio.com",
			projectId: "verbalsanskrit",
			storageBucket: "",
			messagingSenderId: "656117020216",
			appId: "1:656117020216:web:0d8700169e2261cb6c98cd"
		};
	let status={signIn:null};
	await new Promise((resolve)=>{window.addEventListener('load',resolve);});
	document.body.style.backgroundSize='0px';
	registerSW('/sw.js');
	let firebasePromise=loadScripts(scripts.firebase).then(()=>loadScripts([scripts.auth,scripts.firestore])).then(()=>initFirebase(firebaseConfig,status));
	await Promise.all([loadScripts(scripts.webfont).then(()=>loadFonts(theme.fonts)),
			   loadScripts([scripts.twemoji,scripts.jquery])]);
	try {record=JSON.parse(localStorage.getItem('record'));}catch(e){}
	record={status:{}};
	let m1={},triggerPromise=Promise.resolve();
	processSlides(slide,m1);
	console.log(JSON.stringify(m1));
	initDraw(drawShell);
	let canceller={cancel:()=>{}};
	while(true){
		let n=determineNext(record,slide,m1);
		await loadImages(slide[n].q,canceller);
		await triggerPromise;
		let responsePromise=getResponse(slide[n]);
		loadImages(slide.slice(n,2*n).map((s)=>s.q),canceller);
		response=await responsePromise;
		updateRecord(record,response,slide,n,m1);
		triggerPromise=new Promise((resolve)=>{
			assign(ei('outerspace'),'down',()=>{clearStage().then(resolve);},{once:true});
			document.addEventListener('keydown',(e)=>{if(e.key=='Enter') clearStage().then(resolve);},{once:true});
		});
	}
}

function initFirebase(c,status){
	let i = firebase.initializeApp(c);
	let p = firebase.firestore().enablePersistence();
	return new Promise((resolve)=>{
		firebase.auth().onAuthStateChanged(()=>{
			let u=firebase.auth().currentUser
			if(u) {
				console.log(u.displayName);
				firebase.firestore().collection('users').doc(u.uid).set({name:u.displayName},{merge:true});
				status.signIn=u.isAnonymous?'signed out':'signed in';
			}
			else {
				//firebase.auth().signInAnonymously();
				console.log('Signed out');
				status.signIn='signed out';
			}
			resolve();
		});});
}

function signIn(){
	let u=firebase.auth().currentUser,p=new firebase.auth.GoogleAuthProvider();
	if(!u) firebase.auth().signInWithRedirect(p);
	else if(u.isAnonymous) u.linkWithRedirect(p);
}

function writeToFirestore(s){
	let u=firebase.auth().currentUser;
	//if(u) firebase.firestore().collection('users').doc(u.uid).set(s,{merge: true});
	if(u){
		if(u.isAnonymous) firebase.firestore().collection('users').doc(u.uid).set({a:'apple',b:'bat',c:'cat'},{merge:true});
		else firebase.firestore().collection('users').doc(u.uid).set({b:'boy',c:'cat',d:'dog'},{merge:true});
	}
}

var theme={kbd:{keyh:1.5/*key aspect ratio*/,h:0.4/*number of unit key heights / 10*/,shiftbackcolor:'#c0c0c0',shiftbackpressedcolor:'#a0a0a0',displaycolor:'#d0d0d0',displayradius:0.25,/*of key width*/fontSize:0.5,/*multiple of key height*/displayheight:2.3,displayshadow:'#b0b0b0'},
	   bgcolor: '#ffffff',textcolor: '#000000',
	   fonts:[{n:'Martel, serif',f:'Martel:400,700:devanagari'},{n:'Montserrat, sans-serif',f:'Montserrat:400,700',t:'āḍḥīḷḹṃṇñṅṛṝṣśṭūertyuiopasdghjklcvbnm.?'}]};
var display={
	w:document.body.offsetWidth, h:document.body.offsetHeight, kbd:{lefts:[], tops:[],},
	populate:function(_theme){},
	redrawShell:function(_theme){},
};
var kbdproto={
	open:false, backdown:false, keydown:-1, shiftmode:false, shiftedkey:-1, text:'', match:'',matchFunction:()=>{},
	edit:function(b,k,s,sk){this.backdown=b;this.keydown=k,this.shiftmode=s,this.shiftedkey=sk;updateKeyboardLook(this);},
	onMatch:function(m,f){this.match=m;this.matchFunction=f;},
};
var kbd=Object.create(kbdproto);
const reloadTimeout=1000;
var design={
	letters:'ṃśertyuiopasdṭghjklḍṣcvbnm'+
			'   ṛ  ūī  ā    ḥñṅḷ     ṇ ',
	qwert:	'qwertyuiopasdfghjklzxcvbnm'+
			'QWERTYUIOPASDFGHJKLZXCVBNM',
	pressable:[0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
	shiftdrawing:[ [0,5, 2,5, 2,3, 1,3, 2.5,1, 4,3, 3,3, 3,5, 5,5, 5,0, 0,0],
		[0,5, 5,5, 5,4, 0,4] ],
	backdrawing:[ [5,5, 5,4, 2,4, 1,2.5, 2,1, 5,1, 5,0, 0,0, 0,5],
		[5,5, 5,0, 4,0, 4,5] ],
};
var ei=document.getElementById.bind(document);
var ec=document.getElementsByClassName.bind(document);
var m={promise:[],q:[]};
var backaction;
const shiftDown=()=>{if(!kbd.shiftmode) kbd.edit(false,-1,true,-1);else kbd.edit(false,-1,false,-1);};
const backDown=()=>{kbd.edit(true,-1,false,-1);try{clearInterval(backaction);}catch(e){} backaction=setInterval(back,150);};
const backUp=()=>{kbd.edit(false,-1,false,-1);back();try{clearInterval(backaction);}catch(e){}};
var slide=[
	//{q:'<br>Sign in to contiunue learning Sanskrit. <div id=\"my-signin2\"></div>', d:''},
	//{q:'(<br>This is a question-answer based tool for learning Sanskrit. Use the onscreen keyboard provided.)', d:''},
	{q:'{🏊🏼‍♂️}देवोनद्यांतरति।'},
	//{q:'{🚧}(Site under construction.)',forever:true},
	{q:'{🏊🏼‍♂️}देवःकुत्रतरति?',d:'नद्याम्'},
	{q:'{🏊🏼‍♂️}देवोनद्यांकिंकरोति?',d:'तरति'},
	{q:'{🏊🏼‍♂️}नद्यांदेवःकिंकरोति?',d:'तरति'},
	{q:'{🚶🏽🚶🏻🚶🏿‍♀️}छात्राःशालांगच्छन्ति।{📖📖📖}छात्राःशालायांपठन्ति।'},
	{q:'{🏫}छात्राःकुत्रगच्छन्ति?',d:'शालाम्'},
	{q:'{📖📖📖}छात्राःशालायांकिंकुर्वन्ति?',d:'पठन्ति'},
	{q:'{🏫}छात्राःकुत्रपठन्ति?',d:'शालायाम्'},
	{q:'{🧍🏻🧍🏽🧍🏿‍♀️}केशालायांपठन्ति?',d:'छात्राः'},
	{q:'{🚶🏾‍♂️}देवःशालांगच्छति।{😴}देवःशालायांशेते।'},
	{q:'{😴}देवःशालायांकिंकरोति?',d:'शेते'},
	//{q:'{🛌🏾🛌🏻🛌🏿}लोकारात्रौशेरते।'},
	{q:'{🛌🏾🛌🏻🛌🏿}लोकारात्रौकिंकुर्वन्ति?',d:'शेरते'},
	{q:'{🛌🏾🛌🏻🛌🏿}लोकाःकदाशेरते?',d:'रात्रौ'},
	//{q:'{🎮}देवोरात्रौक्रीडति।'},
	{q:'{🎮}देवोरात्रौकिंकरोति?',d:'क्रीडति'},
	//{q:'{🏡}देवोगृहेवसति।'},
	{q:'{🏡}देवःकुत्रवसति?',d:'गृहे'},
	//{q:'{🛕}देवश्चैत्यंगच्छति।{🐒}चैत्येकपिर्वसति।'},
	{q:'{🐒}कश्चैत्येवसति?',d:'कपिः'},
	{q:'{🛕}कपिःकुत्रवसति?',d:'चैत्ये'},
	//{q:'{🐒}देवःकपिमुपगच्छति।{🍌}देवःकपयेकदलीफलंददाति।'},
	{q:'{🍌}देवःकपयेकिंददाति?',d:'कदलीफलम्'},
	{q:'{🐒}देवःकस्मैकदलीफलंददाति?',d:'कपये'},
	//{q:'{✋}कपिर्देवायचपेटिकांददाति।'},
	{q:'{✋}कपिर्देवायकिंददाति?',d:'चपेटिकाम्'},
	{q:'{🐒}कोदेवायचपेटिकांददाति?',d:'कपिः'},
	{q:'{🧍🏾}कपिःकस्मैचपेटिकांददाति?',d:'देवाय'},
	//{q:'{⛹🏾‍♂️}देवःकन्दुकेनक्रीडति।'},
	{q:'{🏀}देवःकेनक्रीडति?',d:'कन्दुकेन'},
	{q:'{⛹🏾‍♂️}देवःकन्दुकेनकिंकरोति?',d:'क्रीडति'},];

function processSlides(sl,m){
	m.skillList=[];
	for(let i=0;i<sl.length;i++){
		let s=sl[i];
		s.d=s.d||'';
		s.a=dToIAST(s.d);
		s.l=s.l||s.d?[s.d]:[s.q];
		s.r=s.r||[];
		s.q=parseQ(s.q);
		for(let l of s.l){
			let sk1=m.skillList.find((sk)=>sk.skill==l);
			if(sk1) sk1.slides.unshift(i);
			else m.skillList.push({skill:l,slides:[i]});
		}
	}
}
function determineNext(r,slide,m){
	const n=m.skillList.find((s)=>r.status[s.skill]?r.status[s.skill].prof<0:true)
		.slides.find((sl)=>slide[sl].r.every((rq)=>r.status[rq]));
	console.log('next number: '+n);
	console.log('next skill: '+JSON.stringify(m.skillList.find((s)=>r.status[s.skill]?r.status[s.skill].prof<0:true)));
	return n;
}
function updateRecord(r,response,slide,n,m){
	if(response) slide[n].l.forEach((l)=>{if(r.status[l]) increaseStatus(r.status[l]); else r.status[l]={interval: 4, prof: 2};});
	else decreaseStatus(r.status[minMap(slide[n].l,(sk)=>r.status[sk].prof)]);
	for(let st in r.status) if(slide[m.skillList.find((sk)=>sk.skill==st).slides[0]].d) r.status[st].prof--;
}

function decreaseStatus(sk){
	Object.assign(sk,{interval:Math.max(sk.interval/2,2)});
	Object.assign(sk,{prof:sk.interval-2});
}
function increaseStatus(sk){
	Object.assign(sk,{interval:sk.interval*2});
	Object.assign(sk,{prof:sk.interval-2});	
}

function initDraw(f){
	f();
	document.addEventListener('keydown',(e)=>{
		let k=e.key;
		if(design.qwert.includes(k)){
			let i=design.qwert.indexOf(k);
			if(design.letters[i]==' ') i=i-design.letters.length/2;
			showDisplay(i);
		}
		else if(k=='Backspace') backDown();
	});
	document.addEventListener('keyup',(e)=>{
		console.log('keyup');
		let k=e.key;
		if(design.qwert.includes(k)){
			let i=design.qwert.indexOf(k);
			if(design.letters[i]==' ') i=i-design.letters.length/2;
			type(i);
		}
		else if(k=='Backspace') backUp();
	});
	window.addEventListener('resize',function(){
		let w=document.body.offsetWidth,h=document.body.offsetHeight;
		if(display.w!=w||display.h!=h){display.w=w;display.h=h;f();}
	});
}
function activatebutton() {
	closekeyboard();
	$('#inputplace').html('<div id= \'correct\'>'+kbd.text+'</div>');
	fadeIn('outerspace',0.5);
	if($('#hint').css('display')=='none') {
		//showhint();
	}
}
		
function clearStage() {
	return Promise.all([fadeOut('outerspace',0.5),fadeOut('space',0.5),ei('correct')?fadeOut('correct',0.1).then(()=>transit('inputplace',{'width':'0px'},0.4)):Promise.resolve()]);
}

var inputalt = '<span class=\'nonselectable cursor\' style=\'color: #808080\'>.</span>';
var inputdeclaration = '<div style=\'text-align: center; padding:0\'><div id=\'inputplacebuffer\' style=\'margin:0\'><div style=\'display: inline\' id=\'inputbuffer\'></div>' + inputalt + '</div></div>';
var hintbutton = '<div class=\'hintbuttonbuffer cursor\' style=\'display:none\' id=\'hintbuttonbuffer\'>Reveal</div>';
function showhint() {
	fadeOut('hintbutton',2).then(()=>{hide('hintbutton');ei('hint').style.opacity=0; fadeIn('hint',5);});
	//$('.hintbutton').fadeOut(500,()=>{$('.hint').fadeIn(500)});
}

function imageLoader(s){

}

function parseQ(oq) {
	let transliteral = s => s?s+`<br><span style=\'font-family:${theme.fonts[1].n}\'>${dToIAST(s)}</span>`:'';
	let q = [],lastput = 0,i=0;
	for (i = 0; i < oq.length; i++) {
		let c=oq.charAt(i),cm={'[':']','{':'}','(':')'};
		let cc=cm[c];
		if(cc){
			q.push(transliteral(oq.substring(lastput, i)));
			lastput=i+1;
			while(i<oq.length&&oq.charAt(i)!==cc){i++;}
			if (c=='[') {
				let image = oq.substring(lastput, i),sizes = [144, 240, 360, 480, 720, 1080];
				q.push(`<img src=\'images/${image}-360.jpeg\' sizes=\'100vw\' srcset=\'`);
				for (let j in sizes) {
					q.push(`images/${image}-${sizes[j]}.jpeg ${sizes[j]}w`);
					if (j < sizes.length - 1) q.push(',');
				}
				q.push('\'>');
			}
			else q.push(c+oq.substring(lastput,i+1));
			lastput=i+1;
		}
	}
	q.push(transliteral(oq.substring(lastput, i)));
	return twemoji.parse(q.join('').replace(/\{/g,'<div class=\'emojiplace\'>').replace(/\}/g,'</div>')
		.replace(/\(/g,`<span style=\'font-family:${theme.fonts[0].n}\'>`).replace(/\)/g,'</span>'),{folder:'svg',ext:'.svg'})
		+hintbutton+`<div class=\'hintbuffer\' id=\'hintbuffer\'>Enter <span id=\'hintdevenagaribuffer\'></span> <span id=\'hintIASTbuffer\' style=\'font-family:${theme.fonts[1].n}\'></span>`+'</div>'+inputdeclaration;
}

async function loadImages(qs,canceller){
	qs=Array.isArray(qs)?qs:[qs];
	canceller.cancel();
	for(let q of qs) await new Promise(function f(resolve,reject){
		canceller.cancel=reject;
		let sp=$('#spacebuffer');
		sp.html(q);
		let imgs=sp.find('img');
		let ni=imgs.length;
		if(!ni){resolve();}
		imgs.on('load',()=>{if(!--ni) resolve();});
		imgs.on('error',()=>{
			sp.html('');
			setTimeout(()=>{f(resolve);},reloadTimeout);
		});
	});
}
	
function getResponse(s) {
	console.log('getting response');
	console.log('showing with answer '+s.a);
	$('#space').html(s.q.replace(/buffer[0-9]*/g, ''));
	ei('hintdevenagari').innerHTML=s.d;
	ei('hintIAST').innerHTML=s.a;
	if(!s.a) hide('hint');
	else {
		hide('hint');
		show('hintbutton','block');
		assign(ei('hintbutton'),'down',showhint);
	}
	inputtext = '';
	hintasked=false;
	let responsePromise;
	hide('inputplace');
	if (!s.a) {
		$('#space').css('padding-bottom','1em');
		responsePromise=fadeIn('space',0.5).then(()=>{if(!s.f){activatebutton();return true;} else return new Promise(()=>{});});
		closekeyboard();
	} else {
		console.log('answerable');
		$('#space').css('padding-bottom',0);
		fadeIn('space',0.5);
		show('inputplace');
		transit('inputplace',{'width':$('#space').width()+'px'},0.5);
		//TODO: reset inputplace width on window resize
		responsePromise=new Promise((resolve)=>{
			openkeyboard().onMatch(s.a,()=>{activatebutton();resolve(true);});
		});
	}
	$('#space .emojiplace').each(()=>{
		var ew=$(this).width();
		var em=($('body').width()-ew)/2;
		var nml=$(this).find('img').length;
		$(this).find('img').css('max-width',(Math.floor(ew/nml)-Math.ceil(0.8*em))+'px');
	});
	drawShell();
	ei('space').scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});
	return responsePromise;
}

function bringinputtofocus() {
	ei('outerspace').scrollIntoView({
		block: 'end',
		behavior: 'smooth'
	});
}
function back() {
	kbd.text = kbd.text.slice(0, -1);
	ei('input').innerHTML=kbd.text;
	if(!kbd.text) {try{clearInterval(backaction);}catch(e){}}
}

function showDisplay(i) {
	kbd.edit(false,i,kbd.shiftmode,i==kbd.shiftedkey?i:-1);
}
function type(i) {
	if(kbd.open){
		let ip=i+design.letters.length/2;
		if (kbd.shiftedkey == i) kbd.text = kbd.text.slice(0, -1);
		kbd.text = kbd.text.concat(design.letters[i]);
		//f(kbd.text);
		$('#input').html(kbd.text);
				if(kbd.text=='nivartanam') {localStorage.setItem('order','');document.location.reload(true);}
				if(kbd.text=='antargamanam') {signIn();}
		if(kbd.text == kbd.match) {kbd.matchFunction();}
		kbd.edit(false,-1,false,(design.pressable[i] && kbd.shiftedkey !== ip)?ip:-1);
	}
	try{clearInterval(backaction);}catch(e){}
}


function drawKeyboard(a,kbd/*kbd theme*/,kbw){
	let e=[],l=[],t=[],w=kbw/10,kh=kbd.keyh,f=kbd.fontSize,c=a.length/2;
	for(let i=0;i<2*c;i++){
		let p=i%c;
		l.push(p<10 ? p*w : p<19 ? (p-9.5)*w : (p-17.5)*w);
		t.push(p<10 ? 0 : p<19 ? kh*w : 2*kh*w);
		e.push(a.charAt(i)!==' '?`<div class=\'lsq${i<c?'':' twostate'}\' id=\'${i}sq\' style=\'background-color:inherit; position:absolute; top:${t[i]}px; ${p==10?'right:'+8.5*w:'left:'+l[i]}px; width:${p==10||p==18?'20':'10'}%; padding-top:${kh*w}px\'; display:\'${i<c?'block':'none'}\'\'><div style=\'position:absolute; bottom:0; line-height:${kh*w}px; width: ${w}px; font-size: ${Math.floor(f*kh*w)}px; text-align:center; ${i<c?'':' font-weight:bold;'} ${p==10?'right:0':''}\'>${a.charAt(i)}</div></div>`:'');
	}
	display.kbd.lefts=l;display.kbd.tops=t;
	for(s of [0,1,2,3]){
		let p=s%2?'pressed':'',k=s<2?'shift':'back';
		d=drawkey(w,kh,design[k+'drawing'],kbd['shiftback'+p+'color']);
		display[p+k]=d;
		if(!(s%2)) e.push(`<div style=\'position:absolute; width:${1.5*w}px; height:${kh*w}px; top:${2*kh*w}px; ${s>1?'right:0;':''} text-align:center;\' id=\'${k}\''>${d}</div>`);
	}
	e.push(`<div id=\'displaysq\' style=\'position:absolute;width:10%;padding-top:${kh*w}px;\'><div id=\'displaytext\' style=\'position:absolute; bottom:0; line-height:${kh*w}px; width:${w}px; font-size: ${Math.floor(f*kh*w)}px; font-weight:bold; text-align:center;background-color:${kbd.displaycolor}; height:${kbd.displayheight*w*kh}px;border-radius:${w/4}px;box-shadow:0 0 ${w/4}px 0 ${kbd.displayshadow}\'></div></div>`);
	return e.join('');
}
function updateKeyboardLook(kbs/*keyboard state*/){
	let s=kbs.shiftmode,k=kbs.keydown,d=display,ds=ei('displaysq').style,sk=kbs.shiftedkey;
	ei('back').innerHTML=d[(kbs.backdown?'pressed':'')+'back'];
	ei('shift').innerHTML=d[(s?'pressed':'')+'shift'];
	ds.display=k>-1?'block':'none';
	if(k>-1){
		ds.top=d.kbd.tops[k]+'px';
		ds.left=d.kbd.lefts[k]+'px';
		ei('displaytext').innerHTML=design.letters[k];
	}
	let se=sk>-1?ei(sk+'sq'):null;
	for(e of ec('twostate')) {e.style.display=s?'block':'none';}
	if(se) se.style.display='block';
}
function drawkey(w,h,ps,c){ /*width, keyheight, color, used by drawKeyboard*/
	let polys=[];
	for(let p of ps){
		polys.push('<polygon points=\'');
		for(let i=0;i<p.length;i+=2){polys.push(p[i]*w/5+','+((h-1)*w/2+p[i+1]*w/5)+' ');}
		polys.push(`\' style=\'fill:${c}\'/>`);
	}
	return `<svg height=\'${h*w}px\' width=\'${w}px\'>${polys.join('')}</svg>`;
}
function drawShell() {
	let t=theme,w=display.w,keys = '';
	let bar='<div style=\'position: absolute;background-color: #e5e5e5; width:100%; height:'+t.kbd.keyh*(t.kbd.h-0.3)*w+'px; top: '+t.kbd.keyh*0.3*w+'px\'><div style=\'position: absolute;background-color: #d8d8d8; width:100%; height:'+t.kbd.keyh*(t.kbd.h-0.3)*w/2+'px; top: '+t.kbd.keyh*(t.kbd.h-0.3)*w/2+'px\'></div></div>';
	ei('outerspace').style.height=w * t.kbd.keyh * t.kbd.h + 'px';
	ei('outerspace').innerHTML='<div style=\'position: absolute; width:100%; height:'+w * t.kbd.keyh * t.kbd.h+'px\'><span id=\'continue\' style=\'font-weight:bold; text-align: center; font-size: x-small; width: 100%; position: absolute; bottom: '+ w*t.kbd.keyh * t.kbd.h/2+'px; left: 0; color:#a0a0a0\'>TOUCH TO CONTINUE</span>'+/*bar+*/'</div>';
	hide('outerspace');
	if($('#space').outerHeight()<$(body).height()-w*t.kbd.keyh*t.kbd.h){
		$('#outerspace').css('bottom','0');
		$('#outerspace').css('position','fixed');
		$('#outerspace').css('bottom','0');
		console.log('Outerspace at bottom');
	}
	else {
		$('#outerspace').css('position','static');
		console.log('Outerspace attached to space');
	}
	show('outerspace');
	keys=drawKeyboard(design.letters,t.kbd,w) + bar;
	ei('primarykeyboard').innerHTML=keys;
	updateKeyboardLook(kbd);
	assign(ei('shift'),'down',shiftDown);
	assign(ei('back'),'down',backDown);
	assign(ei('back'),'up',backUp);
	for(let i=0;i<design.letters.length;i++) if(design.letters[i]!==' '){
		let e=ei(i+'sq');
		assign(e,'up',()=>type(i));
		assign(e,'down',()=>showDisplay(i));
	}
	if (kbd.open) openkeyboard(kbd.text);
	assign(ei('primarykeyboard'),'down',bringinputtofocus);
}

function openkeyboard(txt) {
	let t=theme;
	kbd.text=txt?txt:'';
	kbd.edit(false,-1,false,-1);
	transit('primarykeyboard',{'height':display.w * t.kbd.keyh * t.kbd.h +'px'},0.2).then(()=>{kbd.open=true;});
	return kbd;
}

function closekeyboard() {
	let k=kbd;
	k.open=false;
	k.edit(false,-1,false,-1);
	return transit('primarykeyboard',{'height':'0px'},0.2);
}

function dToIAST(d) {
	d=d.replace(/ल्ँ/g,'l̐');
	let s=[],vd='क,ख,ग,घ,ङ,च,छ,ज,झ,ञ,ट,ठ,ड,ढ,ण,त,थ,द,ध,न,प,फ,ब,भ,म,य,र,ल,व,श,ष,स,ह'.split(',');
	let vi='k,kh,g,gh,ṅ,c,ch,j,jh,ñ,ṭ,ṭh,ḍ,ḍh,ṇ,t,th,d,dh,n,p,ph,b,bh,m,y,r,l,v,ś,ṣ,s,h'.split(',');
	let ar='्,ा,ि,ी,ु,ू,ृ,ॄ,ॢ,ॣ,े,ै,ो,ौ'.split(',');
	let sd='अ,आ,इ,ई,उ,ऊ,ऋ,ॠ,ऌ,ॡ,ए,ऐ,ओ,औ,ं,ः,।'.split(',');
	let si='a,ā,i,ī,u,ū,ṛ,ṝ,ḷ,ḹ,e,ai,o,au,ṃ,ḥ,.'.split(',');
	let vmap=keyValue(vd,vi),amap=keyValue(ar.slice(1),si.slice(1)),smap=keyValue(sd,si);
	let l=d.length,c2=d.charAt(0);
	let c=c2;
	for(let i=0;i<l;i++){
		c=c2;c2=d.charAt(i<l-1?i+1:i);
		s.push(vd.includes(c)?(!ar.includes(c2)?vmap[c]+'a':vmap[c]):ar.includes(c)?(amap[c]||''):sd.includes(c)?smap[c]:c);
	}
	return s.join('');
}

function keyValue(a1,a2){
	let m={};
	for(let i in a1) m[a1[i]]=a2[i];
	return m;
}

function loadFonts(fonts) {
	let fp=[];
	for(let o of fonts)
		fp.push(new Promise(function f(resolve){
			WebFont.load({google:{families:[o.f],text:o.t},active:()=>{console.log('active '+o.f);resolve();},fontinactive:()=>{setTimeout(()=>{f(resolve);},reloadTimeout);}});
			resolve();
		}));
	return Promise.all(fp);
}
function assign(e,et,c,o)/*element, eventtype, callback*/{
	let p='pointer',t='touch',m='mouse',d='down',u='up',v='move';
	let efs=window.PointerEvent?(et==d?[p+d]:et==u?[p+u,p+'cancel']:et==v?[p+v]:[]):et==d?[t+'start',m+d]:et==u?[t+'end',m+u,t+'cancel']:et==v?[t+v,m+v]:[];
	efs.forEach(function(ef){e.addEventListener(ef,c,o);});
}
function dayFromMs(_ms){return _ms/1000/60/60/24;}
function hide(id){ei(id).style.display='none';}
function show(id,d){ei(id).style.display=d||'inline-block';fadeIn(id,0);}
function oneTimeTransitionPromise(e){
	return new Promise((resolve)=>{e.addEventListener('transitionend',(evt)=>{evt.stopPropagation();e.style.transition='';resolve();console.log('transitioned');},{once:true});});
}
function transit(id,pv,t){ /*element id, property-value pairs, time in seconds*/
	let e=ei(id),tr=[];
	for(let p in pv) tr.push(p+' '+t+'s');
	e.style.transition=tr.join();
	if (Object.keys(pv).every((p)=>$('#'+id).css(p)==pv[p])) return Promise.resolve();
	for(let p in pv) $('#'+id).css(p,pv[p]);
	return oneTimeTransitionPromise(e);
}
function fadeIn(id,t,d){
	let e=ei(id);
	if(e.style.display=='none'){
		e.style.display=d||'block';
		e.style.opacity=0;
		console.log('showing before fade in');
	}
	if(e.style.opacity==1) return Promise.resolve();
	console.log('transiting from opacity '+e.style.opacity);
	e.style.transition=`opacity ${t}s`;
	e.style.opacity=1;
	return oneTimeTransitionPromise(e);
}
function fadeOut(id,t){
	let e=ei(id);
	if(e.style.opacity==0) return Promise.resolve();
	e.style.transition=`opacity ${t}s`;
	e.style.opacity=0;
	return oneTimeTransitionPromise(e);
}
function loadScripts(s){
	return Promise.all((Array.isArray(s)?s:[s]).map((src)=>new Promise(function f(resolve){
		let sc=document.createElement('script');
		sc.src=src;
		sc.onload=resolve;
		sc.onerror=()=>{document.head.removeChild(sc);setTimeout(()=>{f(resolve);},reloadTimeout)};
		document.head.appendChild(sc);
	})));
}

function minMap(a,f){
	return best(a,(b,c)=>f(c)<f(b));
}
function maxMap(a,f){
	return best(a,(b,c)=>f(c)>f(b));
}

function best(a,f){
	return a.reduce((b,c)=>f(b,c)?c:b);
}

const firstLeft=s=>c=>s.includes(c)?s.slice(0,s.indexOf(c)):'';
const firstRight=s=>c=>s.includes(c)?s.slice(s.indexOf(c)+c.length):'';	
const firstEnclosed=s=>c=>d=>(firstLeft)((firstRight)(s)(c))(d);
const lastLeft=s=>c=>s.includes(c)?s.slice(0,s.lastIndexOf(c)):'';
const lastRight=s=>c=>s.includes(c)?s.slice(s.lastIndexOf(c)+c.length):'';	
const contains=s=>c=>s.includes(c)?boolTrue:boolFalse;
const concat=s=>c=>s+c;
const equals=s=>c=>s==c?boolTrue:boolFalse;
const boolTrue=s=>c=>s;
const boolFalse=s=>c=>c;
const nonEmpty=s=>s?boolTrue:boolFalse;
const identity=s=>s;
const boolAnd=f=>(f)(identity)((boolTrue) (boolFalse));
const convertToLambda=s=>(concat)
const compose=f=>g=>s=>(f)((g)(s));
const composeN=f=>(reduce)(compose)(f);
const concatN=s=>(reduce)(concat)(s);
//const reduce=f=>(reduceMap)(f)(identity);
const apply=f=>s=>(f)(s);
const reduceMap=f=>g=>s=>(nonEmpty)(s)(c=>d=>(reduceMap)(f)(g)((firstRight)(s)('.'))((f)((g)(c))((g)(d))))(g);
const reduce=f=>s=>(nonEmpty)(s)(c=>d=>(reduce)(f)((firstRight)(s)('.'))((f)(c)(d)))(identity);
const Y=f=>(x=>(f)(x)(x))(x=>(f)(x)(x));
const whileLoop=f=>s=>(f)(s)(g=>(whileLoop)(f)((g)(s))(g))(g=>s);
function map(f){
	//return g=>s=>(nonEmpty)(c=>(map)(f))(c=>(g)(s)((f)(c)));
}

function JSFunctionToLambda(s){
	return (whileLoop)(c=>(contains)(c)('function'))(s)(
		c=>(concatN)('.......')
			((firstLeft)(c)('function'))
			('const ')
			((firstEnclosed)(c)('function ')('('))
			('=')
			((firstEnclosed)((firstRight)(c)('function '))('(')(')'))
			('=>')
			((firstEnclosed)(c)('return ')('\n}'))
			((firstRight)(c)('}'))
			);
}

console.log(
	(concat) ((reduceMap)(concat)(s=>(firstRight)(s)(';'))('...')('ad;n')('b;')('c;')('e;')) ((boolAnd) ((nonEmpty)('a')) ((nonEmpty)('b')) ('1')('0'))
	);
console.log((whileLoop)(nonEmpty)('....')(s=>''));
console.log((firstLeft)('asjk;')(';'));


function registerSW(f){
	// Check that service workers are supported
	//if ('serviceWorker' in navigator) navigator.serviceWorker.register(f);
}
