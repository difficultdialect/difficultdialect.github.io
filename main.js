verbalSanskrit();

async function verbalSanskrit(){
	let scripts={
			jquery:'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
			webfont:'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
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
	loadScripts([scripts.firebase,scripts.auth,scripts.firestore]).then(()=>initializeFirebase(firebaseConfig,status));
	await Promise.all([loadScripts(scripts.webfont).then(()=>{loadFonts(theme.fonts);}),
			   loadScripts([scripts.twemoji,scripts.jquery])]);
	starthere();
	try {record=JSON.parse(localStorage.getItem('record'));}catch(e){}
	while(false){
		
	}
}

function initializeFirebase(c,status){
	let i = firebase.initializeApp(c);
	let p = firebase.firestore().enablePersistence();
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
	});
	return {init:i, persistence:p};
}

function signIn(){
	let u=firebase.auth().currentUser;
	if(!u){
		let p = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(p);
	}
	else if(u.isAnonymous){
		let p = new firebase.auth.GoogleAuthProvider();
		u.linkWithRedirect(p);
	}
}

function writeToFirestore(s){
	let u=firebase.auth().currentUser;
	//if(u) firebase.firestore().collection('users').doc(u.uid).set(s,{merge: true});
	if(u){
		if(u.isAnonymous) firebase.firestore().collection('users').doc(u.uid).set({a:'apple',b:'bat',c:'cat'},{merge:true});
		else firebase.firestore().collection('users').doc(u.uid).set({b:'boy',c:'cat',d:'dog'},{merge:true});
	}
}

function starthere(){
	
			redrawShell();
			assign(ei('outerspace'),'down',subnext);
			assign(ei('primarykeyboard'),'down',bringinputtofocus);
			slideover = 1;
			next();
			ready();	
}



var content={};	// question data
var contentServer;	// question generation based on record and content
var record={skills:[], /* Type: {skillName, proficiency, interval}*/
	   day: dayFromMs(Date.now()), /* day of record */
	   id_token:0, /* Google id token used for login */};	/* To be stored locally and as user data accross sessions */
var recordupdate;	// update record based on Date.now(), record and last response

var theme={kbd:{keyh:1.5/*key aspect ratio*/,h:0.4/*number of unit key heights / 10*/,shiftbackcolor:'#c0c0c0',shiftbackpressedcolor:'#a0a0a0',displaycolor:'#d0d0d0',displayradius:0.25,/*of key width*/fontSize:0.5,/*multiple of key height*/displayheight:2.3,displayshadow:'#c0c0c0'},
	   bgcolor: '#ffffff',textcolor: '#000000',
	   fonts:[{n:'Martel, serif',f:'Martel:400,700:devanagari'},{n:'Montserrat, sans-serif',f:'Montserrat:400,700',t:'āḍḥīḷḹṃṇñṅṛṝṣśṭūertyuiopasdghjklcvbnm.?'}]};
var display={
	w:document.body.offsetWidth, h:document.body.offsetHeight, kbd:{lefts:[], tops:[],},
	populate:function(_theme){},
	redrawShell:function(_theme){},
};
var kbdproto={
	open:false, backdown:false, keydown:-1, shiftmode:false, shiftedkey:-1, text:'',
	edit:function(b,k,s,sk){this.backdown=b;this.keydown=k,this.shiftmode=s,this.shiftedkey=sk;updateKeyboardLook(this);}
};
var kbd=Object.create(kbdproto);

var userstate={status:[],prof:[],int:[],reached:0/*inferrable from status*/,order:[]};	/*  */
var design={
	letters:	'ṃśertyuiopasdṭghjklḍṣcvbnm'+
			'   ṛ  ūī  ā    ḥñṅḷ     ṇ ',
	pressable:[0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
	shiftdrawing:[ [0,5, 2,5, 2,3, 1,3, 2.5,1, 4,3, 3,3, 3,5, 5,5, 5,0, 0,0],
		[0,5, 5,5, 5,4, 0,4] ],
	backdrawing:[ [5,5, 5,4, 2,4, 1,2.5, 2,1, 5,1, 5,0, 0,0, 0,5],
		[5,5, 5,0, 4,0, 4,5] ],
};
var ei=document.getElementById.bind(document);
var ec=document.getElementsByClassName.bind(document);
var buttonstate=0;
var inputtext='';
var nimages=0;
var backaction;
var slideover=0;
var hintasked=false;
//assign(ei('primarykeyboard'),'down',()=> {try{if(kbd.open) navigator.vibrate(1);}catch(e){}});
var slide=[
	{q:'<br>Sign in to contiunue learning Sanskrit. <div id=\"my-signin2\"></div>', d:''},
	{q:'(<br>This is a question-answer based tool for learning Sanskrit. Use the onscreen keyboard provided.)', d:''},
	{q:'{🏊🏼‍♂️}देवोनद्यांतरति।',d:''},
	{q:'{🏊🏼‍♂️}देवःकुत्रतरति?',d:'@नद्याम्'},
	{q:'{🏊🏼‍♂️}देवोनद्यांकिंकरोति?',d:'@तरति'},
	{q:'{🚶🏽🚶🏻🚶🏿‍♀️}छात्राःशालांगच्छन्ति।{📖📖📖}छात्राःशालायांपठन्ति।',d:''},
	{q:'{🏫}छात्राःकुत्रगच्छन्ति?',d:'@शालाम्'},
	{q:'{📖📖📖}छात्राःशालायांकिंकुर्वन्ति?',d:'@पठन्ति'},
	{q:'{🏫}छात्राःकुत्रपठन्ति?',d:'@शालायाम्'},
	{q:'{🧍🏻🧍🏽🧍🏿‍♀️}केशालायांपठन्ति?',d:'@छात्राः'},
	{q:'{🚶🏾‍♂️}देवःशालांगच्छति।{😴}देवःशालायांशेते।',d:''},
	{q:'{😴}देवःशालायांकिंकरोति?',d:'@शेते'},
	{q:'{🛌🏾🛌🏻🛌🏿}लोकारात्रौशेरते।',d:''},
	{q:'{🛌🏾🛌🏻🛌🏿}लोकारात्रौकिंकुर्वन्ति?',d:'@शेरते'},
	{q:'{🛌🏾🛌🏻🛌🏿}लोकाःकदाशेरते?',d:'@रात्रौ'},
	{q:'{🎮}देवोरात्रौक्रीडति।',d:''},
	{q:'{🎮}देवोरात्रौकिंकरोति?',d:'@क्रीडति'},
	{q:'{🏡}देवोगृहेवसति।',d:''},
	{q:'{🏡}देवःकुत्रवसति?',d:'@गृहे'},
	{q:'{🛕}देवश्चैत्यंगच्छति।{🐒}चैत्येकपिर्वसति।',d:''},
	{q:'{🐒}कश्चैत्येवसति?',d:'@कपिः'},
	{q:'{🛕}कपिःकुत्रवसति?',d:'@चैत्ये'},
	{q:'{🐒}देवःकपिमुपगच्छति।{🍌}देवःकपयेकदलीफलंददाति।',d:''},
	{q:'{🍌}देवःकपयेकिंददाति?',d:'@कदलीफलम्'},
	{q:'{🐒}देवःकस्मैकदलीफलंददाति?',d:'@कपये'},
	{q:'{✋}कपिर्देवायचपेटिकांददाति।',d:''},
	{q:'{✋}कपिर्देवायकिंददाति?',d:'@चपेटिकाम्'},
	{q:'{🐒}कोदेवायचपेटिकांददाति?',d:'@कपिः'},
	{q:'{🧍🏾}कपिःकस्मैचपेटिकांददाति?',d:'@देवाय'},
	{q:'{⛹🏾‍♂️}देवःकन्दुकेनक्रीडति।',d:''},
	{q:'{🏀}देवःकेनक्रीडति?',d:'@कन्दुकेन'},
	{q:'{⛹🏾‍♂️}देवःकन्दुकेनकिंकरोति?',d:'@क्रीडति'},];


for(let i=0;i<slide.length;i++){
	userstate.order.push(i);
	slide[i].a=dToIAST(slide[i].d);
	if(slide[i].a.charAt(0)=='@'){
		slide[i].a=slide[i].a.substr(1);
		slide[i].d=slide[i].d.substr(1);
		userstate.status.push(0);
	}
	else userstate.status.push(1);
	userstate.prof.push(-1);
	userstate.int.push(2);
}



window.addEventListener('resize', function(event) {

	if (display.w != document.body.offsetWidth || display.h != document.body.offsetHeight) {
		display.w = document.body.offsetWidth;
		display.h = document.body.offsetHeight;
		redrawShell();
		if (kbd.open) openkeyboard();
	}
});
//var buttonblink=new TimelineMax({repeat: -1});


function activatebutton() {
	closekeyboard();
	$('#inputplace').html('<div id= \'correct\'>'+kbd.text+'</div>');
	buttonstate=1;
	//TweenMax.to($('#outerspace'),0.5,{opacity: '1'});
	fadeIn('outerspace',0.5);
	//$('#button1').show();
	
	//buttonblink.seek(0);
	userstate.status[userstate.order[0]] = 2;
	if(hintasked) userstate.int[userstate.order[0]] = userstate.int[userstate.order[0]] / 2;
	else userstate.int[userstate.order[0]] = userstate.int[userstate.order[0]] * 2;
	if(userstate.int[userstate.order[0]]<1) userstate.int[userstate.order[0]] = 1;
	userstate.prof[userstate.order[0]] = userstate.int[userstate.order[0]]-2;
	if($('#hint').css('display')=='none') {
		$('#hint').html(slide[userstate.order[0]].d);
		showhint();
	}
}

function subnext() {
	if(buttonstate==1) {
		buttonstate=0;
		localStorage.setItem('order',JSON.stringify(userstate.order));
		writeToFirestore({'b':'a'});
		//TweenMax.to($('#outerspace'),0.5,{opacity: '0', onComplete: ()=>{}});
		//TweenMax.to($('#space'),0.5,{opacity: '0', onComplete: ()=> {slideover=1; ready();}});
		//TweenMax.to($('#correct'),0.1,{opacity: '0', onComplete: ()=> {TweenMax.to($('#inputplace'),0.4,{width: '0px'});}});
		Promise.all([fadeOut('outerspace',0.5),fadeOut('space',0.5),ei('correct')?fadeOut('correct',0.1).then(()=>{return transit('inputplace',{'width':'0px'},0.4);}):Promise.resolve()])
			.then(()=>{slideover=1; ready();});
	}
}

function ready() {
	if (slideover == 1 && nimages < 1) {
		showspace();
		next();
	}
}

/*var buttondeclaration = '<div style=\'text-align: center;\'><div style=\'opacity: 0; display: none; font-size: xx-large;\' class=\'nonselectable clickable\' id=\'button1buffer\'>❯</div></div>';*/
var inputalt = '<span class=\'nonselectable cursor\' style=\'color: #808080\'>.</span>';
var inputdeclaration = '<div style=\'text-align: center; padding:0\'><div id=\'inputplacebuffer\' style=\'margin:0\'><div style=\'display: inline\' id=\'inputbuffer\'></div>' + inputalt + '</div></div>';
var hintbutton = '<p class=\'hintbuttonbuffer cursor\' style=\'animation-duration: 4s; -webkit-animation-duration: 4s;\' id=\'hintbuttonbuffer\'>Reveal</div>';
function showhint() {
	//TweenMax.to($('#hintbutton'),0.5,{opacity:'0', onComplete: ()=> {$('#hintbutton').hide(); $('#hint').show(); TweenMax.to($('#hint'),0.5,{opacity: '1'});}});/*
	//fadeOut('hintbutton',2).then(()=>{hide('hintbutton');fadeIn('hint',2);});
	$('.hintbutton').fadeOut(500,()=>{$('.hint').fadeIn(500)});
	hintasked=true;
}
/*
function prepareSlide(index,prepared){
	if(prepared.list.includes(index)) return Promise.resolve();
	else 
}*/
function loadSlide(s,n,m){
	if(m.queued.includes(n)) return m.promises['s'+n];
	
}

function next() {
	nimages = 0;
	let transliteral = s => s?s+`<br><span style=\'font-family:${theme.fonts[1].n}\'>${dToIAST(s)}</span>`:'';
	let q = [],oq = slide[userstate.order[1]].q,lastput = 0,i=0;
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
	q=q.join('');
	q=q.replace(/\{/g,'<div class=\'emojiplace\'>').replace(/\}/g,'</div>')
		.replace(/\(/g,`<span style=\'font-family:${theme.fonts[0].n}\'>`).replace(/\)/g,'</span>');
	q=twemoji.parse(q,{folder:'svg',ext:'.svg'});
	q=q+hintbutton;
	if (slide[userstate.order[1]].a !== ''){
		q=q+'<p class=\'hintbuffer\' id=\'hintbuffer\'>Enter '+slide[userstate.order[1]].d+' '+`<span style=\'font-family:${theme.fonts[1].n}\'>${slide[userstate.order[1]].a}</span>`+'</div>';
		q=q+inputdeclaration;
	}
	$('#spacebuffer').html(q);
	nimages=$('#spacebuffer').find('img').length;
	ready();
	$('#spacebuffer').find('img').on('load',()=> {
		nimages--;ready();
	});
}

function showspace() {
	slideover = 0;
	$('#space').html($('#spacebuffer').html().replace(/buffer[0-9]*/g, ''));
	if(slide[userstate.order[1]].a!=='' && userstate.status[userstate.order[1]]>0){
		$('.hint').hide();
		$('.hint').css('opacity','0');
		$('.hintbutton').show();
		assign(ei('hintbutton'),'down',showhint);
	}
	inputtext = '';
	hintasked=false;
	if(userstate.order[1]==0) { renderButton(); //TweenMax.to($('#space'),0.5,{opacity: '1'});
		fadeIn('space',0.5);
		closekeyboard ();}
	else if (slide[userstate.order[1]].a == '') {
		$('#space').css('padding-bottom','1em');
		//TweenMax.to($('#space'),0.5,{opacity: '1', onComplete: activatebutton});
		fadeIn('space',0.5).then(activatebutton);
		closekeyboard();
	} else {
		$('#space').css('padding-bottom',0);
		//TweenMax.to($('#space'),0.5,{opacity: '1'});
		fadeIn('space',0.5);
		//TweenMax.to($('#inputplace'),0.5, {width: '100%'});
		transit('inputplace',{'width':$('#space').width()+'px'},0.5);
		openkeyboard();
	}
	$('#space .emojiplace').each(()=>{
		var ew=$(this).width();
		var em=($('body').width()-ew)/2;
		var nml=$(this).find('img').length;
		$(this).find('img').css('max-width',(Math.floor(ew/nml)-Math.ceil(0.8*em))+'px');
	});
	redrawShell();
	ei('space').scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});
	userstate.order.shift();
	var c=userstate.order.shift();
	var toput=-1;
	for(let i=2; i<=userstate.reached; i++) {
		userstate.prof[i]--;
		var smallest=0;
		if(slide[c].a!=='' && slide[i].a!=='' && userstate.prof[i]<0 && (toput<0 || userstate.int[i]<smallest)) {
			smallest=userstate.int[i];
			toput=i;
		}
	}
	if(toput>-1){
		userstate.order.unshift(toput);
		userstate.prof[toput]=4;
	}
	userstate.order.unshift(c);
	if(c>userstate.reached) userstate.reached=c;
	if(userstate.order.length < 2) userstate.order.push(userstate.order[0]);
}


function bringinputtofocus() {
	ei('outerspace').scrollIntoView({
		block: 'end',
		behavior: 'smooth'
	});
}
function back() {
	inputtext = inputtext.slice(0, -1);
	if (inputtext == '') {
		$('#input').html('');
                  try{clearInterval(backaction);}catch(e){}
	} else {
		$('#input').html(inputtext);
	}
}

function showdisplay(e) {
	let i=parseInt(e.currentTarget.id.slice(-4, -2));
	kbd.edit(false,i,kbd.shiftmode,i==kbd.shiftedkey?i:-1);
}
function hidedisplay() {kbd.edit(false,-1,false,kbd.shiftedkey);}
function type(e) {
	if(kbd.open){
		let i = parseInt(e.currentTarget.id.slice(-4, -2));
		let ip=i+design.letters.length/2;
		if (kbd.shiftedkey == i) kbd.text = kbd.text.slice(0, -1);
		kbd.text = kbd.text.concat(e.currentTarget.children[0].innerHTML);
		//f(kbd.text);
		$('#input').html(kbd.text);
				if(kbd.text=='nivartanam') {localStorage.setItem('order','');document.location.reload(true);}
				if(kbd.text=='antargamanam') {signIn();}
		if (kbd.text == slide[userstate.order[0]].a) activatebutton();
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
function redrawShell() {
	let t=theme,w=display.w,keys = '';
	let bar='<div style=\'position: absolute;background-color: #e5e5e5; width:100%; height:'+t.kbd.keyh*(t.kbd.h-0.3)*w+'px; top: '+t.kbd.keyh*0.3*w+'px\'><div style=\'position: absolute;background-color: #d8d8d8; width:100%; height:'+t.kbd.keyh*(t.kbd.h-0.3)*w/2+'px; top: '+t.kbd.keyh*(t.kbd.h-0.3)*w/2+'px\'></div></div>';
	ei('outerspace').style.height=w * t.kbd.keyh * t.kbd.h + 'px';
	ei('outerspace').innerHTML='<div style=\'position: absolute; width:100%; height:'+w * t.kbd.keyh * t.kbd.h+'px\'><span id=\'continue\' style=\'font-weight:bold; text-align: center; font-size: x-small; width: 100%; position: absolute; bottom: '+ w*t.kbd.keyh * t.kbd.h/2+'px; left: 0; color:#a0a0a0\'>TOUCH TO CONTINUE</span>'+/*bar+*/'</div>';
	hide('outerspace');
	if($('#space').height()<$(body).height()-w*t.kbd.keyh*t.kbd.h) $('#outerspace').css('position','fixed');
	else $('#outerspace').css('position','static');
	show('outerspace');

	keys=drawKeyboard(design.letters,t.kbd,w) + bar;
	ei('primarykeyboard').innerHTML=keys;
	updateKeyboardLook(kbd);
	
	assign(ei('shift'),'down',()=> {
		if(!kbd.shiftmode) kbd.edit(false,-1,true,-1);
		else kbd.edit(false,-1,false,-1);});
	assign(ei('back'),'down',()=>{kbd.edit(true,-1,false,-1);try{clearInterval(backaction);}catch(e){}     backaction=setInterval(back,150);});
	assign(ei('back'),'up',()=>{kbd.edit(false,-1,false,-1);back();try{clearInterval(backaction);}catch(e){}});
	for(let lsq of ec('lsq')) {assign(lsq,'up',type);assign(lsq,'down',showdisplay);}
}

function openkeyboard(txt) { /*display, theme*/
	let t=theme;
	kbd.text=txt?txt:'';
	kbd.open=true;
	kbd.edit(false,-1,false,-1);
	return transit('primarykeyboard',{'height':display.w * t.kbd.keyh * t.kbd.h +'px'},0.2);
}

function closekeyboard() {
	let k=kbd;
	k.open=false;
	k.edit(false,-1,false,-1);
	return transit('primarykeyboard',{'height':'0px'},0.2);
}

function dToIAST(d) {
	d=d.replace(/ल्ँ/g,'l̐');
	let s=[],vd=['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'];
	let vi=['k','kh','g','gh','ṅ','c','ch','j','jh','ñ','ṭ','ṭh','ḍ','ḍh','ṇ','t','th','d','dh','n','p','ph','b','bh','m','y','r','l','v','ś','ṣ','s','h'];
	let ar=['्','ा','ि','ी','ु','ू','ृ','ॄ','ॢ','ॣ','े','ै','ो','ौ'];
	let sd=['अ','आ','इ','ई','उ','ऊ','ऋ','ॠ','ऌ','ॡ','ए','ऐ','ओ','औ','ं','ः','।'];
	let si=['a','ā','i','ī','u','ū','ṛ','ṝ','ḷ','ḹ','e','ai','o','au','ṃ','ḥ','.'];
	let vmap={},amap={},smap={};
	for(let i in vd){vmap[vd[i]]=vi[i];}
	for(let i=1;i<ar.length;i++){amap[ar[i]]=si[i];}
	for(let i in sd){smap[sd[i]]=si[i];}
	let l=d.length,c2=d.charAt(0);
	let c=c2;
	for(let i=0;i<l;i++){
		c=c2;c2=d.charAt(i<l-1?i+1:i);
		s.push(vd.includes(c)?(!ar.includes(c2)?vmap[c]+'a':vmap[c]):ar.includes(c)?amap[c]:sd.includes(c)?smap[c]:c);
	}
	return s.join('');
}

function loadFonts(fonts) {
	let fp=[];
	for(let font of fonts) { 
		fp.push(new Promise(function(resolve,reject) {
			WebFont.load({google:font.t?{families: [font.f],text:font.t}:{families: [font.f]},fontactive: resolve,inactive: reject});}));
	}
	return Promise.all(fp);
}
function assign(e,et,c)/*element, eventtype, callback*/{
	let p='pointer',t='touch',m='mouse',d='down',u='up',v='move';
	let efs=window.PointerEvent?(et==d?[p+d]:et==u?[p+u,p+'cancel']:et==v?[p+v]:[]):et==d?[t+'start',m+d]:et==u?[t+'end',m+u,t+'cancel']:et==v?[t+v,m+v]:[];
	efs.forEach(function(ef){e.addEventListener(ef,c)});
}
function dayFromMs(_ms){return _ms/1000/60/60/24;}

function hide(id){ei(id).style.display='none';}
function show(id,d){ei(id).style.display=d||'inline-block';}

function transit1(id,p,v,t){ /*element property value time*/
	let e=ei(id);
	e.style.transition=p+' '+t+'s';
	$('#'+id).css(p,v);
	return new Promise((resolve)=>{e.addEventListener('transitionend',(evt)=>{evt.stopPropagation();e.style.transition='';resolve();},{once:true});});
}

function transit(id,pv,t){ /*element id, property-value pairs, time in seconds*/
	let e=ei(id),tr=[];
	for(let p in pv) tr.push(p+' '+t+'s');
	e.style.transition=tr.join();
	for(let p in pv) $('#'+id).css(p,pv[p]);
	return new Promise((resolve)=>{e.addEventListener('transitionend',(evt)=>{evt.stopPropagation();e.style.transition='';resolve();},{once:true});});
}

function fadeIn(id,t,d){
	let e=ei(id),ed=e.style.display;
	e.style.display=ed=='none'?(d||'block'):ed;
	e.style.transition=`opacity ${t}s`;
	e.style.opacity='1';
	return new Promise((resolve)=>{e.addEventListener('transitionend',(evt)=>{evt.stopPropagation();e.style.transition='';resolve();},{once:true});});
}
function fadeOut(id,t){
	let e=ei(id);
	e.style.transition=`opacity ${t}s`;
	e.style.opacity='0';
	return new Promise((resolve)=>{e.addEventListener('transitionend',(evt)=>{evt.stopPropagation();e.style.transition='';resolve();},{once:true});});
}
function loadScripts(s){
	s=Array.isArray(s)?s:[s];
	let p=[];
	for(let src of s){
		let sc=document.createElement('script');
		sc.src=src;
		p.push(new Promise(function(resolve,reject){sc.onload=resolve;sc.onerror=reject;}));
		document.head.append(sc);
	}
	return Promise.all(p);
}
function registerSW(f){
	// Check that service workers are supported
	//if ('serviceWorker' in navigator) navigator.serviceWorker.register(f);
}
