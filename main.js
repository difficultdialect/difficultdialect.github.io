$(document).ready(function() {
	loadexternal(theme).then(function() {
			console.log('fontactive');
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
			library.procedural.assign(document.getElementById('outerspace'),'down',subnext);
			window.addEventListener('scroll',function(){scrolled=true;console.log('scrolling');});
			library.procedural.assign(document.getElementById('primarykeyboard'),'down',bringinputtofocus);
			library.procedural.assign(document.getElementById('shiftkeyboard'),'down',bringinputtofocus);
			slideover = 1;
			next();
			ready();
			
	var button=document.getElementById('outerspace');
	buttonblink.to(button,2,{ease: Power1.easeInOut, opacity: '1'}).to(button,2,{ease: Power1.easeInOut, opacity: '0'});
		});
});

function loadexternal(_theme) {
	let fontpromises=[]
	for(let font of _theme.fonts) { 
		fontpromises.push(new Promise(function(resolve,reject) {
			WebFont.load({google:{families: [font]},fontactive: resolve});}));
	}
	return Promise.all(fontpromises);
}








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

var content;	// question generation
var theme={kbd:{keyh:1.5,h:0.4},bgcolor: '#ffffff',textcolor: '#000000',fonts:['Martel:400, 700']};
var display={w:document.body.offsetWidth, h:document.body.offsetHeight};
var userstate={status:[],prof:[],int:[],reached:0/*inferrable from status*/,order:[]};
var design={
	letters:['ṃ', 'ś', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'ṭ', 'g', 'h', 'j', 'k', 'l', 'ḍ', 'ṣ', 'c', 'v', 'b', 'n', 'm'],
	sletters:['ṃ', 'ś', 'e', 'ṛ', 't', 'y', 'ū', 'ī', 'o', 'p', 'ā', 's', 'd', 'ṭ', 'g', 'ḥ', 'ñ', 'ṅ', 'ḷ', 'ḍ', 'ṣ', 'c', 'v', 'b', 'ṇ', 'm'],
	pressable:[0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
};

var kbdstate=0;
var buttonstate=0;
var pressed=-1;
var inputtext='';
var normalshift;
var pressedshift;
var normalback;
var pressedback;
var nimages=0;
var nmoji=0;
var q="";
var backaction;
var scrolled=true;
var slideover=0;
var hintasked=false;
//assign(document.getElementById('primarykeyboard'),'down',function() {try{if(kbdstate==1) navigator.vibrate(1);}catch(e){}});
//assign(document.getElementById('shiftkeyboard'),'down',function() {try{if(kbdstate==1) navigator.vibrate(1);}catch(e){}});
var slide=[
	{q:'<br>Sign in to contiunue learning Sanskrit. <div id=\"my-signin2\"></div>', a:''},
	//{q:'{🚶🏽🚶🏻🚶🏿‍♀️}छात्राःशालांगच्छन्ति।<br>chātrāḥśālāṃgacchanti.{📖📖📖}छात्राःशालायांपठन्ति।<br>chātrāḥśālāyāṃpaṭhanti.{🚶🏽🚶🏻🚶🏿‍♀️}छात्राःशालांगच्छन्ति।<br>chātrāḥśālāṃgacchanti.{📖📖📖}छात्राःशालायांपठन्ति।<br>chātrāḥśālāyāṃpaṭhanti.',a:'@ab',ad:'ab'},
	//{q:'{🚶🏾‍♂️}देवःशालांगच्छति।<br>devaḥśālāṃgacchati.{😴}देवःशालायांशेते।<br>devaḥśālāyāṃśete.',a:''},
	{q:'<br>This is a question-answer based tool for learning Sanskrit. Use the onscreen keyboard provided.', a:''},
	{q:'{🏊🏼‍♂️}देवोनद्यांतरति।<br>devonadyāṃtarati.',a:''},
	{q:'{🏊🏼‍♂️}देवःकुत्रतरति?<br>devaḥkutratarati?',a:'@nadyām',ad:'नद्याम्'},
	{q:'{🏊🏼‍♂️}देवोनद्यांकिंकरोति?<br>devonadyāṃkiṃkaroti?',a:'@tarati',ad:'तरति'},
	{q:'{🚶🏽🚶🏻🚶🏿‍♀️}छात्राःशालांगच्छन्ति।<br>chātrāḥśālāṃgacchanti.{📖📖📖}छात्राःशालायांपठन्ति।<br>chātrāḥśālāyāṃpaṭhanti.',a:''},
	{q:'{🏫}छात्राःकुत्रगच्छन्ति?<br>chātrāḥkutragacchanti?',a:'@śālām',ad:'शालाम्'},
	{q:'{📖📖📖}छात्राःशालायांकिंकुर्वन्ति?<br>chātrāḥśālāyāṃkiṃkurvanti?',a:'@paṭhanti',ad:'पठन्ति'},
	{q:'{🏫}छात्राःकुत्रपठन्ति?<br>chātrāḥkutrapaṭhanti?',a:'@śālāyām',ad:'शालायाम्'},
	{q:'{🧍🏻🧍🏽🧍🏿‍♀️}केशालायांपठन्ति?<br>keśālāyāṃpaṭhanti?',a:'@chātrāḥ',ad:'छात्राः'},
	{q:'{🚶🏾‍♂️}देवःशालांगच्छति।<br>devaḥśālāṃgacchati.{😴}देवःशालायांशेते।<br>devaḥśālāyāṃśete.',a:''},
	{q:'{😴}देवःशालायांकिंकरोति?<br>devaḥśālāyāṃkiṃkaroti?',a:'@śete',ad:'शेते'},
	{q:'{🛌🏾🛌🏻🛌🏿}लोकारात्रौशेरते।<br>lokārātrauśerate.',a:''},
	{q:'{🛌🏾🛌🏻🛌🏿}लोकारात्रौकिंकुर्वन्ति?<br>lokārātraukiṃkuranti?',a:'@śerate',ad:'शेरते'},
	{q:'{🛌🏾🛌🏻🛌🏿}लोकाःकदाशेरते?<br>lokāḥkadāśerate?',a:'@rātrau',ad:'रात्रौ'},
	{q:'{🎮}देवोरात्रौक्रीडति।<br>devorātraukrīḍati.',a:''},
	{q:'{🎮}देवोरात्रौकिंकरोति?<br>devorātraukiṃkaroti?',a:'@krīḍati',ad:'क्रीडति'},
	{q:'{🏡}देवोगृहेवसति।<br>devogṛhevasati.',a:''},
	{q:'{🏡}देवःकुत्रवसति?<br>devaḥkutravasati?',a:'@gṛhe',ad:'गृहे'},
	{q:'{🛕}देवश्चैत्यंगच्छति।<br>devaścaityaṃgacchati.{🐒}चैत्येकपिर्वसति।<br>caityekapirvasati.',a:''},
	{q:'{🐒}कश्चैत्येवसति?<br>kaścaityevasati?',a:'@kapiḥ',ad:'कपिः'},
	{q:'{🛕}कपिःकुत्रवसति?<br>kapiḥkutravasati?',a:'@caitye',ad:'चैत्ये'},
	{q:'{🐒}देवःकपिमुपगच्छति।<br>devaḥkapimupagacchati.{🍌}देवःकपयेकदलीफलंददाति।<br>devaḥkapayekadalīphalaṃdadāti.',a:''},
	{q:'{🍌}देवःकपयेकिंददाति?<br>devaḥkapayekiṃdadāti?',a:'@kadalīphalam',ad:'कदलीफलम्'},
	{q:'{🐒}देवःकस्मैकदलीफलंददाति?<br>devaḥkasmaikadalīphalaṃdadāti?',a:'@kapaye',ad:'कपये'},
	{q:'{✋}कपिर्देवायचपेटिकांददाति।<br>kapirdevāyacapeṭikāṃdadāti.',a:''},
	{q:'{✋}कपिर्देवायकिंददाति?<br>kapirdevāyakiṃdadāti?',a:'@capeṭikām',ad:'चपेटिकाम्'},
	{q:'{🐒}कोदेवायचपेटिकांददाति?<br>kodevāyacapeṭikāṃdadāti?',a:'@kapiḥ',ad:'कपिः'},
	{q:'{🧍🏾}कपिःकस्मैचपेटिकांददाति?<br>kapiḥkasmaicapeṭikāṃdadāti?',a:'@devāya',ad:'देवाय'},
	{q:'{⛹🏾‍♂️}देवःकन्दुकेनक्रीडति।<br>devaḥkandukenakrīḍati.',a:''},
	{q:'{🏀}देवःकेनक्रीडति?<br>devaḥkenakrīḍati?',a:'@kandukena',ad:'कन्दुकेन'},
	{q:'{⛹🏾‍♂️}देवःकन्दुकेनकिंकरोति?<br>devaḥkandukenakiṃkaroti?',a:'@krīḍati',ad:'क्रीडति'},];
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
var skills;


for(let i=0;i<slide.length;i++){
	userstate.order.push(i);
	if(slide[i].a.charAt(0)=='@'){
		slide[i].a=slide[i].a.substr(1);
		userstate.status.push(0);
	}
	else userstate.status.push(1);
	userstate.prof.push(-1);
	userstate.int.push(2);
}
var lefts=[];
var tops=[];

window.addEventListener('resize', function(event) {

	if (display.w != document.body.offsetWidth || display.h != document.body.offsetHeight) {
		display.w = document.body.offsetWidth;
		display.h = document.body.offsetHeight;
		recalculate();
		if (kbdstate == 1) openkeyboard();
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
		$('#hint').html(slide[userstate.order[0]].ad);
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
var hintbutton = '<p class=\'hintbuttonbuffer cursor\' style=\'animation-duration: 4s; -webkit-animation-duration: 4s;\' id=\'hintbuttonbuffer\'>REVEAL</div>';
function showhint() {
	TweenMax.to($('#hintbutton'),0.5,{opacity:'0', onComplete: function() {$('#hintbutton').hide(); $('#hint').show(); TweenMax.to($('#hint'),0.5,{opacity: '1'});}});/*
	$('.hintbutton').fadeOut(500,function(){$('.hint').fadeIn(500)});*/
	hintasked=true;
}
function next() {
	nimages = 0;
	
	console.log('next');
	q = '';
	var oq = slide[userstate.order[1]].q;
	var lastput = 0;
	var hasimage = 0;
	var images = [];
	let i=0;
	for (i = 0; i < oq.length; i++) {
		if (oq.charAt(i) == '[') {
			q = q + oq.substring(lastput, i);
			lastput = i + 1;
			while (i < oq.length && oq.charAt(i) !== ']') {
				i++;
			}
			let imagename = oq.substring(lastput, i);
			images.push(imagename);
			nimages++;
			hasimage = 1;
			lastput = i + 1;
			var sizes = [144, 240, 360, 480, 720, 1080];
			q = q + '<img src=\'images/' + imagename + '-360.jpeg\' sizes=\'100vw\' id=\'image' + imagename + 'buffer\' srcset=\'';
			for (let j = 0; j < sizes.length; j++) {
				q = q + 'images/' + imagename + '-' + sizes[j] + '.jpeg ' + sizes[j] + 'w';
				if (j < sizes.length - 1) {
					q = q + ', ';
				}
			}
			q = q + '\'>'
			console.log('initiated');
		}
	}
	q = q + oq.substring(lastput, i);
	q=q.replace(/\{/g,'<div class=\'emojiplace\'>').replace(/\}/g,'</div>');
	q=twemoji.parse(q,{folder:'svg',ext:'.svg'});
	q=q+hintbutton;
	if (slide[userstate.order[1]].a !== ''){
		q=q+'<p class=\'hintbuffer\' id=\'hintbuffer\'>ENTER '+slide[userstate.order[1]].ad+' '+slide[userstate.order[1]].a+'</div>';
		q=q+inputdeclaration;
	}
	//q=q+buttondeclaration;
	$('#spacebuffer').html(q);
	nmoji=$('#spacebuffer').find('img').length;
	nimages=nmoji;
	console.log('nmoji:'+nmoji);
	if (hasimage == 0) ready();
	$('#spacebuffer').find('img').on('load',function() {
		nimages--;ready();
	});
	/*for (i = 0; i < images.length; i++) {
		$('#image' + images[i] + 'buffer').on('load', function() {
			console.log('loaded');
			nimages--;
			ready();
		});
	}*/
}

function showspace() {
	console.log('showing');
	slideover = 0;
	$('#space').html($('#spacebuffer').html().replace(/buffer/g, ''));
	if(slide[userstate.order[1]].a!=='' && userstate.status[userstate.order[1]]>0){
		$('.hint').hide();
		$('.hint').css('opacity','0');
		$('.hintbutton').show();
		library.procedural.assign(document.getElementById('hintbutton'),'down',showhint);
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
	if(scrolled) {
		scrolled=false;
		document.getElementById('outerspace').scrollIntoView({
			block: 'end',
			behavior: 'smooth'
		});
	}
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
	if (pressed !== -1) {
		$('#' + pressed + 'key').removeClass('pressed');
		$('#' + pressed + 'key').html(design.letters[pressed]);
		pressed = -1;
	}
}

function showdisplay(e) {
	document.getElementById('displaysq').style.left=lefts[parseInt(e.currentTarget.id.slice(-4, -2))]+'px';
	document.getElementById('displaysq').style.top=(tops[parseInt(e.currentTarget.id.slice(-4, -2))]-0*display.w * theme.kbd.keyh / 10.0) + 'px';
	$('#displaykey').html(e.currentTarget.children[0].innerHTML);
	$('#displaysq').show();
}
function showsdisplay(e) {
	document.getElementById('sdisplaysq').style.left=lefts[parseInt(e.currentTarget.id.slice(-4, -2))]+'px';
	document.getElementById('sdisplaysq').style.top=(tops[parseInt(e.currentTarget.id.slice(-4, -2))]-0*display.w * theme.kbd.keyh / 10.0) + 'px';
	$('#sdisplaykey').html(e.currentTarget.children[0].innerHTML);
	$('#sdisplaysq').show();
}
function hidedisplay() {$('#displaysq').hide();}
function hidesdisplay() {$('#sdisplaysq').hide();}

function type(e) {
	if(kbdstate==1){
	var i = parseInt(e.currentTarget.id.slice(-4, -2));
	if (pressed == i) {
		inputtext = inputtext.slice(0, -1);
	}
	inputtext = inputtext.concat(e.currentTarget.children[0].innerHTML);
	$('#input').html(inputtext);
	if(inputtext=='nivartanam') {
		localStorage.setItem('order','');
		document.location.reload(true);
	}
	if (design.pressable[i] && pressed !== i) {
		clearpressed();
		e.currentTarget.children[0].classList.add('pressed');
		e.currentTarget.children[0].innerHTML = design.sletters[i];
		pressed = i;
	} else clearpressed();
	if (inputtext == slide[userstate.order[0]].a) {
		activatebutton();
	}
	}
	hidedisplay();
	try{clearInterval(backaction);}catch(e){}
    $('#backsq').html(normalback);    
}

function types(e) {
	if(kbdstate==1){
	inputtext = inputtext.concat(e.currentTarget.children[0].innerHTML);
	$('#input').html(inputtext);
	$('#shiftkeyboard').hide();
	if (inputtext == slide[userstate.order[0]].a) {
		activatebutton();
	}
	}
	hidesdisplay();
	try{clearInterval(backaction);}catch(e){}
     $('#backsq').html(normalback);    
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
	
	normalshift='<svg height=\'' + theme.kbd.keyh * display.w / 10.0 + 'px\' width=\'' + display.w / 10.0 + 'px\'><polygon points=\'' +
		0.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
		0.4 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
		0.4 * display.w / 10.0 + ',' + (theme.kbd.keyh * 0.5 + 0.1) * display.w / 10.0 + ' ' +
	        0.2 * display.w / 10.0 + ',' + (theme.kbd.keyh * 0.5 + 0.1) * display.w / 10.0 + ' ' +
	        0.5 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1) + 0.2) * display.w / 10.0 + ' ' +
	        0.8 * display.w / 10.0 + ',' + (theme.kbd.keyh * 0.5 + 0.1) * display.w / 10.0 + ' ' +
	        0.6 * display.w / 10.0 + ',' + (theme.kbd.keyh * 0.5 + 0.1) * display.w / 10.0 + ' ' +
	        0.6 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        0.0 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
		'\' style=\'fill:#c0c0c0\'/><polygon points=\'' +
	        0.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1) - 0.2) * display.w / 10.0 + ' ' +
	        0.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1) - 0.2) * display.w / 10.0 + ' ' +
	        '\' style=\'fill:#c0c0c0\'/></svg>';
	pressedshift=normalshift.replace('#c0c0c0','#a0a0a0').replace('#c0c0c0','#a0a0a0');
	normalback='<svg height=\'' + theme.kbd.keyh * display.w / 10.0 + 'px\' width=\'' + 1.0 * display.w / 10.0 + 'px\'><polygon points=\'' +
		1.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1) - 0.2) * display.w / 10.0 + ' ' +
	        0.4 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1) - 0.2) * display.w / 10.0 + ' ' +
	        0.2 * display.w / 10.0 + ',' + (theme.kbd.keyh * 0.5) * display.w / 10.0 + ' ' +
	        0.4 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1) + 0.2) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1) + 0.2) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        0.0 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        0.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
		'\' style=\'fill:#c0c0c0\'/><polygon points=\'' +
	        0.8 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (theme.kbd.keyh - 0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        1.0 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
	        0.8 * display.w / 10.0 + ',' + (0.5 * (theme.kbd.keyh-1)) * display.w / 10.0 + ' ' +
		'\' style=\'fill:#c0c0c0\'/></svg>';
	pressedback=normalback.replace('#c0c0c0','#a0a0a0').replace('#c0c0c0','#a0a0a0');
	var shiftkeydeclaration = '<div class=\'keys\' style=\'width: ' + 3.0 * 0.5 * display.w / 10.0 + 'px; top: ' + theme.kbd.keyh * display.w / 5.0 + 'px; padding: 0;\' id=\'shiftsq\'>'+normalshift+'</div>';
	var sshiftkeydeclaration = '<div class=\'keys\' style=\'width: ' + 3.0 * 0.5 * display.w / 10.0 + 'px; top: ' + theme.kbd.keyh * display.w / 5.0 + 'px; padding: 0;\' id=\'sshiftsq\'>'+pressedshift+'</div>';
	var backkeydeclaration = '<div class=\'keys\' style=\'width: ' + 3.0 * 0.5 * display.w / 10.0 + 'px; right:0; top: ' + theme.kbd.keyh * display.w / 5.0 + 'px; padding: 0;\' id=\'backsq\'>'+normalback+'</div>';
	var sbackkeydeclaration = '<div class=\'keys\' style=\'width: ' + 3.0 * 0.5 * display.w / 10.0 + 'px; right:0; top: ' + theme.kbd.keyh * display.w / 5.0 + 'px; padding: 0;\' id=\'sbacksq\'>'+pressedback+'</div>';

	for (let i = 0; i < design.letters.length; i++) {
		keysdeclaration = keysdeclaration + '<div class=\'keys\' id=\'' + i + 'sq\'><div class=\'text\' id=\'' + i + 'key\'>' + design.letters[i] + '</div></div>';
		skeysdeclaration = skeysdeclaration + '<div class=\'keys\' id=\'s' + i + 'sq\'><div class=\'text\' id=\'s' + i + 'key\'>' + design.sletters[i] + '</div></div>';
	}
	var displaykey = '<div class=\'keys\' id=\'displaysq\'><div class=\'text\' id=\'displaykey\'></div></div>';
	var sdisplaykey = '<div class=\'keys\' id=\'sdisplaysq\'><div class=\'text\' id=\'sdisplaykey\'></div></div>';
	  
	  
	skeysdeclaration = skeysdeclaration + sshiftkeydeclaration + sbackkeydeclaration + sdisplaykey+bar;
	keysdeclaration = keysdeclaration + shiftkeydeclaration + backkeydeclaration + displaykey+bar;

	$('#primarykeyboard').html(keysdeclaration);
	$('#shiftkeyboard').html(skeysdeclaration);
	
	for (let i = 0; i < design.letters.length; i++) {
		if (design.sletters[i] !== design.letters[i]) {
			$('#s' + i + 'key').addClass('pressed');
		}
	}
	library.procedural.assign(document.getElementById('shiftsq'),'down',function() {$('#shiftkeyboard').show();clearpressed();});
	library.procedural.assign(document.getElementById('sshiftsq'),'down',function() {$('#shiftkeyboard').hide();});
		
	library.procedural.assign(document.getElementById('backsq'),'down',function(){$('#backsq').html(pressedback);    try{clearInterval(backaction);}catch(e){}     backaction=setInterval(back,150);});
	library.procedural.assign(document.getElementById('backsq'),'up',function(){$('#backsq').html(normalback);back();try{clearInterval(backaction);}catch(e){}});
	library.procedural.assign(document.getElementById('sbacksq'),'down',function(){$('#shiftkeyboard').hide();});
	lefts=[];
	tops=[];
	for (let i = 0; i < design.letters.length; i++) {
		
		var csq = document.getElementById(i + 'sq');
		var cssq = document.getElementById('s' + i + 'sq');
		var ck = document.getElementById(i + 'key');
		var csk = document.getElementById('s' + i + 'key');
		if (i < 10) {
			lefts.push(i * display.w / 10.0);
			tops.push(0);
		} else if (i < 19) {
			lefts.push((i - 9.5) * display.w / 10.0);
			tops.push(display.w * theme.kbd.keyh / 10.0);
		} else {
			lefts.push((i - 17.5) * display.w / 10.0);
			tops.push(display.w * theme.kbd.keyh / 5.0);
		}
		csq.style.left = lefts[i] + 'px';
		csq.style.top = tops[i] + 'px';
		cssq.style.left = lefts[i] + 'px';
		cssq.style.top = tops[i] + 'px';
		if (i == 10) {
			csq.style.left = '0px';
			csq.style.paddingLeft = 0.5 * display.w / 10.0 + 'px';
			csq.style.width = 1.0 * display.w / 10.0 + 'px';
			cssq.style.left = '0px';
			cssq.style.paddingLeft = 0.5 * display.w / 10.0 + 'px';
			cssq.style.width = 1.0 * display.w / 10.0 + 'px';
		} else if (i == 18) {
			csq.style.width = 2.0 * display.w / 10.0 + 'px';
			cssq.style.width = 2.0 * display.w / 10.0 + 'px';
		}
		library.procedural.assign(csq,'up',type);
		library.procedural.assign(csq,'down',showdisplay);
		library.procedural.assign(cssq,'up',types);
		library.procedural.assign(cssq,'down',showsdisplay);
                csq.style.paddingTop = display.w * theme.kbd.keyh / 10.0 + 'px';
                cssq.style.paddingTop = display.w * theme.kbd.keyh / 10.0 + 'px';
	}
	$('.keys .text').css('bottom', '0px');
	$('.keys .text').css('line-height', display.w * theme.kbd.keyh / 10.0 + 'px');
	$('.keys .text').css('width', display.w / 10.0 + 'px');
	$('.keys .text').css('font-size', 0.4*theme.kbd.keyh*display.w / 10.0 + 'px');
	$('#displaysq').css('padding-top', Math.floor(display.w * theme.kbd.keyh / 10.0) + 'px');
	$('#sdisplaysq').css('padding-top', Math.floor(display.w * theme.kbd.keyh / 10.0) + 'px');
	$('#displaykey').height(2.3*display.w*theme.kbd.keyh/10.0);
	$('#sdisplaykey').height(2.3*display.w*theme.kbd.keyh/10.0);
	$('#displaykey').css('border-radius',display.w/40);
	$('#sdisplaykey').css('border-radius',display.w/40);
	var shadow='0px 0px ' + display.w/40 + 'px 0px #c0c0c0';
	$('#displaykey').css('box-shadow',shadow);
	$('#sdisplaykey').css('box-shadow',shadow);
}

function openkeyboard() {
	$('#primarykeyboard').show();
	$('#shiftkeyboard').hide();
	$('#primarykeyboard').height(display.w * theme.kbd.keyh * theme.kbd.h);
	$('#shiftkeyboard').height(display.w * theme.kbd.keyh * theme.kbd.h);
	kbdstate = 1;
}

function closekeyboard() {
	$('#primarykeyboard').height(0);
	$('#shiftkeyboard').height(0);
	setTimeout(function() {
			$('#primarykeyboard').hide();
			$('#shiftkeyboard').hide();
		},
		200);
	kbdstate = 0;
}


var library={
	procedural:{
		assign:function(element,eventtype,callback){
			if(window.PointerEvent) {
				if(eventtype=='down') element.addEventListener('pointerdown',callback);
				else if(eventtype=='up') {
					element.addEventListener('pointerup',callback);
					element.addEventListener('pointercancel',callback);
				}
				else if(eventtype=='move') {
					element.addEventListener('pointermove',callback);
				}
				else throw 'invalid event-type'
			}
			else {
				if(eventtype=='down') {
					element.addEventListener('touchstart',callback);
					element.addEventListener('mousedown',callback);
				}
				else if(eventtype=='up') {
					element.addEventListener('touchend',callback);
					element.addEventListener('mouseup',callback);
					element.addEventListener('touchcancel',callback);
				}
				else if(eventtype=='move') {
					element.addEventListener('touchmove',callback);
					element.addEventListener('mousemove',callback);
				}
				else throw 'invalid event-type'
			}
		}
	}
};









