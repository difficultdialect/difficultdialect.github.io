$(document).ready(function() {
	loadfonts(theme.fonts).then(function() {
			recalculate();
			var savedorder;
			/*try {
				savedorder=JSON.parse(localStorage.getItem('order'));
				var lastentry=savedorder[savedorder.length-1];
				for(i=0;i<slide.length;i++) {
					if(i>lastentry) savedorder.push(i);
				}
				if(lastentry <slide.length) order =savedorder;
			} catch(e) {}*/
			document.body.style.backgroundSize = '0px';
			assign(document.getElementById('outerspace'),'down',subnext);
			assign(document.getElementById('primarykeyboard'),'down',bringinputtofocus);
			assign(document.getElementById('shiftkeyboard'),'down',bringinputtofocus);
			slideover = 1;
			next();
			ready();
			
	var button=document.getElementById('outerspace');
	buttonblink.to(button,2,{ease: Power1.easeInOut, opacity: '1'}).to(button,2,{ease: Power1.easeInOut, opacity: '0'});
		});
});




/*
function saveToFirebase(email) {
    var emailObject = {
        email: email
    };
    firebase.database().ref('subscription-entries').push().set(emailObject)
        .then(function(snapshot) {
            success(); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}
*/
var content={};	// question data
var contentServer;	// question generation based on record and content
var record={skills:[], /* Type: {skillName, proficiency, interval}*/
	   day: dayFromMs(Date.now()), /* day of record */
	   id_token:0, /* Google id token used for login */};	/* To be stored locally and as user data accross sessions */
var recordupdate;	// update record based on Date.now(), record and last response

var theme={kbd:{keyh:1.5/*key aspect ratio*/,h:0.4/*number of unit key heights / 10*/,shiftbackcolor:'#c0c0c0',shiftbackpressedcolor:'#a0a0a0',displaycolor:'#d0d0d0',displayradius:0.25,/*of key width*/fontSize:0.5,/*multiple of key height*/},
	   bgcolor: '#ffffff',textcolor: '#000000',
	   fonts:[{n:'Martel, serif',f:'Martel:400,700:devanagari'},{n:'Montserrat, sans-serif',f:'Montserrat:400,700',t:'āḍḥīḷḹṃṇñṅṛṝṣśṭūertyuiopasdghjklcvbnm.?'}]};
var display={
	w:document.body.offsetWidth, h:document.body.offsetHeight, kbd:{lefts:[], tops:[],},
	populate:function(_theme){},
	recalculate:function(_theme){},
};
var kbdstateproto={
	open:false, backdown:false, keydown:-1, shiftmode:false, shiftedkey:-1,
};
var kbdstate=Object.create(kbdstateproto);

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

var buttonstate=0;
var pressed=-1;
var inputtext='';
var normalshift;
var pressedshift;
var normalback;
var pressedback;
var nimages=0;
var backaction;
var slideover=0;
var hintasked=false;
//assign(document.getElementById('primarykeyboard'),'down',function() {try{if(kbdstate.open) navigator.vibrate(1);}catch(e){}});
//assign(document.getElementById('shiftkeyboard'),'down',function() {try{if(kbdstate.open) navigator.vibrate(1);}catch(e){}});
var slide=[
	{q:'<br>Sign in to contiunue learning Sanskrit. <div id=\"my-signin2\"></div>', d:''},
	{q:'{🏫}छात्राःकुत्रगच्छन्ति?',d:'@शालाम्'},
	{q:'(<br>This is a question-answer based tool for learning Sanskrit. Use the onscreen keyboard provided.)', d:''},
	{q:'[himavan]{🏊🏼‍♂️}देवोनद्यांतरति।',d:''},
	{q:'[sitavyaghrah]{🏊🏼‍♂️}देवःकुत्रतरति?',d:'@नद्याम्'},
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
function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'onsuccess': onSignIn,
      });
    }
function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
	activatebutton();
      }


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
console.log(userstate.order.length);



window.addEventListener('resize', function(event) {

	if (display.w != document.body.offsetWidth || display.h != document.body.offsetHeight) {
		display.w = document.body.offsetWidth;
		display.h = document.body.offsetHeight;
		recalculate();
		if (kbdstate.open) openkeyboard();
	}
});
var buttonblink=new TimelineMax({repeat: -1});


function activatebutton() {
	closekeyboard();
	$('#inputplace').html('<div id= \'correct\'>'+inputtext+'</div>');
	buttonstate=1;
	TweenMax.to($('#outerspace'),0.5,{opacity: '1'});
	//$('#button1').show();
	
	buttonblink.seek(0);
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
		$('#shiftkeyboard').hide();
		clearpressed();
		localStorage.setItem('order',JSON.stringify(userstate.order));
		TweenMax.to($('#outerspace'),0.5,{opacity: '0', onComplete: function(){}});
		TweenMax.to($('#space'),0.5,{opacity: '0', onComplete: function() {slideover=1; ready();}});
		TweenMax.to($('#correct'),0.1,{opacity: '0', onComplete: function() {TweenMax.to($('#inputplace'),0.4,{width: '0px'});}});
	}
}

function ready() {
	console.log('ready, slideover:' + slideover + ', nimages:' + nimages);
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
	TweenMax.to($('#hintbutton'),0.5,{opacity:'0', onComplete: function() {$('#hintbutton').hide(); $('#hint').show(); TweenMax.to($('#hint'),0.5,{opacity: '1'});}});/*
	$('.hintbutton').fadeOut(500,function(){$('.hint').fadeIn(500)});*/
	hintasked=true;
}
/*
function prepareSlide(index,prepared){
	if(prepared.list.includes(index)) return Promise.resolve();
	else 
}*/
function next() {
	nimages = 0;
	let transliteral = s => s?s+`<br><span style=\'font-family:${theme.fonts[1].n}\'>${dToIAST(s)}</span>`:'';
	console.log('next');
	let q = [];
	let oq = slide[userstate.order[1]].q;
	let lastput = 0;
	let i=0;
	for (i = 0; i < oq.length; i++) {
		let c=oq.charAt(i);
		let cm={'[':']','{':'}','(':')'};
		let cc=cm[c];
		if(cc){
			q.push(transliteral(oq.substring(lastput, i)));
			lastput=i+1;
			while(i<oq.length&&oq.charAt(i)!==cc){i++;}
			if (c=='[') {
				let image = oq.substring(lastput, i);
				let sizes = [144, 240, 360, 480, 720, 1080];
				q.push(`<img src=\'images/${image}-360.jpeg\' sizes=\'100vw\' srcset=\'`);
				for (let j in sizes) {
					q.push(`images/${image}-${sizes[j]}.jpeg ${sizes[j]}w`);
					if (j < sizes.length - 1) q.push(',');
				}
				q.push('\'>');
			}
			else q.push(c+oq.substring(lastput,i+1));
			console.log(q);
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
	console.log('nimages:'+nimages);
	ready();
	$('#spacebuffer').find('img').on('load',function() {
		nimages--;ready();
	});
}

function showspace() {
	console.log('showing');
	slideover = 0;
	$('#space').html($('#spacebuffer').html().replace(/buffer/g, ''));
	if(slide[userstate.order[1]].a!=='' && userstate.status[userstate.order[1]]>0){
		$('.hint').hide();
		$('.hint').css('opacity','0');
		$('.hintbutton').show();
		assign(document.getElementById('hintbutton'),'down',showhint);
	}
	inputtext = '';
	hintasked=false;
	if(userstate.order[1]==0) { renderButton(); TweenMax.to($('#space'),0.5,{opacity: '1'});
		closekeyboard ();}
	else if (slide[userstate.order[1]].a == '') {
		$('#space').css('padding-bottom','1em');
		TweenMax.to($('#space'),0.5,{opacity: '1', onComplete: activatebutton});
		closekeyboard();
	} else {
		$('#space').css('padding-bottom',0);
		TweenMax.to($('#space'),0.5,{opacity: '1'});
		TweenMax.to($('#inputplace'),0.5, {width: '100%'});
		openkeyboard();
	}
	$('#space .emojiplace').each(function(){
		var ew=$(this).width();
		var em=($('body').width()-ew)/2;
		console.log('em: '+em+' w: '+ew);
		var nml=$(this).find('img').length;
		$(this).find('img').css('max-width',(Math.floor(ew/nml)-Math.ceil(0.8*em))+'px');
	});
	recalculate();
	document.getElementById('space').scrollIntoView({
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
	document.getElementById('outerspace').scrollIntoView({
		block: 'end',
		behavior: 'smooth'
	});
}
function back() {
	inputtext = inputtext.slice(0, -1);
	if (inputtext == '') {
		$('#input').html('');
               $('#backsq').html(normalback);
                  try{clearInterval(backaction);}catch(e){}
	} else {
		$('#input').html(inputtext);
	}
	clearpressed();
}

function clearpressed() {
	for(e of document.getElementsByClassName('twostate')) {e.style.display='none';}
	kbdstate.shiftedkey=-1;
}
function pressAll() {
	for(e of document.getElementsByClassName('twostate')) {e.style.display='block';}
}

function showdisplay(e) {
	ds=document.getElementById('displaysq');
	ds.style.left=display.kbd.lefts[parseInt(e.currentTarget.id.slice(-4, -2))]+'px';
	ds.style.top=(display.kbd.tops[parseInt(e.currentTarget.id.slice(-4, -2))]-0*display.w * theme.kbd.keyh / 10.0) + 'px';
	document.getElementById('displaytext').innerHTML=e.currentTarget.children[0].innerHTML;
	ds.style.display='block';
}
function hidedisplay() {document.getElementById('displaysq').style.display='none';}
function type(e) {
	if(kbdstate.open){
		let c=design.letters.length/2;
		let i = parseInt(e.currentTarget.id.slice(-4, -2));
		if (kbdstate.shiftedkey == i) {
			inputtext = inputtext.slice(0, -1);
		}
		inputtext = inputtext.concat(e.currentTarget.children[0].innerHTML);
		$('#input').html(inputtext);
		if(inputtext=='nivartanam') {
			localStorage.setItem('order','');
			document.location.reload(true);
		}
		if (design.pressable[i] && kbdstate.shiftedkey !== i+c) {
			clearpressed();
			document.getElementById((i+c)+'sq').style.display='block';
			kbdstate.shiftedkey = i+c;
		} else clearpressed();
		if (inputtext == slide[userstate.order[0]].a) {
			activatebutton();
		}
		kbdstate.shiftmode=false;
	}
	hidedisplay();
	try{clearInterval(backaction);}catch(e){}
    $('#backsq').html(normalback);    
}


function drawKeyboard(a,kbd/*kbd theme*/,kbw){
	let e=[],l=[],t=[],w=kbw/10,kh=kbd.keyh,f=kbd.fontSize,c=a.length/2;
	for(let i=0;i<2*c;i++){
		let p=i%c;
		l.push(p<10 ? p*w : p<19 ? (p-9.5)*w : (p-17.5)*w);
		t.push(p<10 ? 0 : p<19 ? kh*w : 2*kh*w);
		e.push(a.charAt(i)!==' '?`<div class=\'lsq${i<c?'':' twostate'}\' id=\'${i}sq\' style=\'position:absolute; top:${t[i]}px; ${p==10?'right:'+8.5*w:'left:'+l[i]}px; width:${p==10||p==18?'20':'10'}%; padding-top:${kh*w}px\'; display:\'${i<c?'block':'block'}\'\'><div style=\'position:absolute; bottom:0; line-height:${kh*w}px; width: ${w}px; font-size: ${Math.floor(f*kh*w)}px; text-align:center; ${i<c?'':' font-weight:bold;'} ${p==10?'right:0':''}\'>${a.charAt(i)}</div></div>`:'');
	}
	display.kbd.lefts=l;display.kbd.tops=t;
	for(s of [0,1,2,3]){
		let p=s%2?'pressed':'',k=s<2?'shift':'back';
		d=drawkey(w,kh,design[k+'drawing'],kbd['shiftback'+p+'color']);
		display[p+k]=d;
		if(!(s%2)) e.push(`<div style=\'position:absolute; width:${1.5*w}px; height:${kh*w}px; top:${2*kh*w}px; ${s>1?'right:0;':''} text-align:center;\' id=\'${k}\''>${d}</div>`);
	}	
	e.push(`<div id=\'displaysq\' style=\'position:absolute;width:10%;padding-top:${kh*w}px;\'><div id=\'displaytext\' style=\'position:absolute; bottom:0; line-height:${kh*w}px; width:${w}px; font-size: ${Math.floor(f*kh*w)}px; font-weight:bold; text-align:center;background-color:${kbd.displaycolor}\'></div></div>`);
	return e.join('');
}
/*open:false, backdown:false, keydown:-1, shiftmode:false, shiftedkey:-1,*/
function updateKeyboardLook(kbs/*keyboard state*/){
	let s=kbs.shiftmode,k=kbs.keydown,d=display,ds=document.getElementById('displaysq').style,sk=kbs.shiftedkey;
	document.getElementById('back').innerHTML=d[(kbs.backdown||s?'pressed':'')+'back'];
	ds.display=k>-1?'block':'none';
	if(k>-1){
		ds.top=d.kbd.tops[k]+'px';
		ds.left=d.kbd.lefts[k]+'px';
		document.getElementById('displaytext').innerHTML=design.letters[k];
	}
	if(s) document.getElementsByClassName('twostate').style.display='block';
	else if (sk>-1) document.getElementById(sk+'sq').style.display='block';
	else document.getElementsByClassName('twostate').style.display='none';
}
function drawkey(w,h,ps,c){ /*width, keyheight, color*/
	let polys=[];
	for(let p of ps){
		polys.push('<polygon points=\'');
		for(let i=0;i<p.length;i+=2){polys.push(p[i]*w/5+','+((h-1)*w/2+p[i+1]*w/5)+' ');}
		polys.push(`\' style=\'fill:${c}\'/>`);
	}
	return `<svg height=\'${h*w}px\' width=\'${w}px\'>${polys.join('')}</svg>`;
}
function recalculate() {
	var keysdeclaration = '';
	var skeysdeclaration = '';
	
	var bar='<div style=\'position: absolute;background-color: #e5e5e5; width:100%; height:'+theme.kbd.keyh*(theme.kbd.h-0.3)*display.w+'px; top: '+theme.kbd.keyh*0.3*display.w+'px\'><div style=\'position: absolute;background-color: #d8d8d8; width:100%; height:'+theme.kbd.keyh*(theme.kbd.h-0.3)*display.w/2+'px; top: '+theme.kbd.keyh*(theme.kbd.h-0.3)*display.w/2+'px\'></div></div>';
	
	$('#outerspace').height(display.w * theme.kbd.keyh * theme.kbd.h + 'px');
	$('#outerspace').html('<div style=\'position: absolute; width:100%; height:'+display.w * theme.kbd.keyh * theme.kbd.h+'px\'><span id=\'continue\' style=\'font-weight:bold; text-align: center; font-size: x-small; width: 100%; position: absolute; bottom: '+display.w * theme.kbd.keyh * theme.kbd.h/2+'px; left: 0; color:#a0a0a0\'>TOUCH TO CONTINUE</span>'+/*bar+*/'</div>');
	$('#outerspace').hide();
	if($('#space').height()<$(body).height()-display.w*theme.kbd.keyh*theme.kbd.h) $('#outerspace').css('position','fixed');
	else $('#outerspace').css('position','static');
	$('#outerspace').show();

	keysdeclaration=drawKeyboard(design.letters,theme.kbd,display.w);
	  
	keysdeclaration = keysdeclaration + bar;

	$('#primarykeyboard').html(keysdeclaration);
	
	assign(document.getElementById('shift'),'down',function() {
		if(!kbdstate.shiftmode) {pressAll();kbdstate.shiftmode=true;}
		else {clearpressed();kbdstate.shiftmode=false;}});
	assign(document.getElementById('back'),'down',function(){$('#back').html(pressedback);try{clearInterval(backaction);}catch(e){}     backaction=setInterval(back,150);});
	assign(document.getElementById('back'),'up',function(){$('#back').html(normalback);back();try{clearInterval(backaction);}catch(e){}});
	for(let lsq of document.getElementsByClassName('lsq')) {assign(lsq,'up',type);assign(lsq,'down',showdisplay);}
	
	$('#displaytext').height(2.3*display.w*theme.kbd.keyh/10.0);
	$('#displaytext').css('border-radius',display.w/40);
	var shadow='0px 0px ' + display.w/40 + 'px 0px #c0c0c0';
	$('#displaytext').css('box-shadow',shadow);
}

function openkeyboard() {
	$('#primarykeyboard').show();
	$('#primarykeyboard').height(display.w * theme.kbd.keyh * theme.kbd.h);
	kbdstate.open=true;
}

function closekeyboard() {
	$('#primarykeyboard').height(0);
	setTimeout(function() {
			$('#primarykeyboard').hide();
		},
		200);
	kbdstate.open=Object.create(kbdstateproto);
}

function dToIAST(d) {
	d=d.replace(/ल्ँ/g,'l̐');
	let s=[],vd=['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'];
	let vi=['k','kh','g','gh','ṅ','c','ch','j','jh','ñ','ṭ','ṭh','ḍh','ḍh','ṇ','t','th','d','dh','n','p','ph','b','bh','m','y','r','l','v','ś','ṣ','s','h'];
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

function loadfonts(fonts) {
	let fp=[];
	for(let font of fonts) { 
		fp.push(new Promise(function(resolve,reject) {
			WebFont.load({google:font.t?{families: [font.f],text:font.t}:{families: [font.f]},fontactive: resolve});}));
	}
	return Promise.all(fp);
}
function assign(e,et,c)/*element, eventtype, callback*/{
	let p='pointer',t='touch',m='mouse',d='down',u='up',v='move';
	let efs=window.PointerEvent?(et==d?[p+d]:et==u?[p+u,p+'cancel']:et==v?[p+v]:[]):et==d?[t+'start',m+d]:et==u?[t+'end',m+u,t+'cancel']:et==v?[t+v,m+v]:[];
	efs.forEach(function(ef){e.addEventListener(ef,c)});
}

function dayFromMs(_ms){return _ms/1000/60/60/24;}
