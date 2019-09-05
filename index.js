/* Web Font Loader v1.6.26 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.m=b||a;this.c=this.m.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function z(a){if("string"===typeof a.f)return a.f;var b=a.m.location.protocol;"about:"==b&&(b=a.a.location.protocol);return"https:"==b?"https:":"http:"}function ea(a){return a.m.location.hostname||a.a.location.hostname}
function A(a,b,c){function d(){k&&e&&f&&(k(g),k=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,k=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function B(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function C(){this.a=0;this.c=null}function D(a){a.a++;return function(){a.a--;E(a)}}function F(a,b){a.c=b;E(a)}function E(a){0==a.a&&a.c&&(a.c(),a.c=null)};function G(a){this.a=a||"-"}G.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function H(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return I(a)+" "+(a.f+"00")+" 300px "+J(a.c)}function J(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function K(a){return a.a+a.f}function I(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.m.document.documentElement;this.h=b;this.a=new G("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);L(a,"loading")}function M(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}L(a,"inactive")}function L(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,K(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function N(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function O(a){u(a.c,"body",a.a)}function P(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+J(a.c)+";"+("font-style:"+I(a)+";font-weight:"+(a.f+"00")+";")};function Q(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}Q.prototype.start=function(){var a=this.c.m.document,b=this,c=q(),d=new Promise(function(d,e){function k(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(k,25)},function(){e()})}k()}),e=new Promise(function(a,d){setTimeout(d,b.f)});Promise.race([e,d]).then(function(){b.g(b.a)},function(){b.j(b.a)})};function R(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.o=this.j=this.h=this.g=null;this.g=new N(this.c,this.s);this.h=new N(this.c,this.s);this.j=new N(this.c,this.s);this.o=new N(this.c,this.s);a=new H(this.a.c+",serif",K(this.a));a=P(a);this.g.a.style.cssText=a;a=new H(this.a.c+",sans-serif",K(this.a));a=P(a);this.h.a.style.cssText=a;a=new H("serif",K(this.a));a=P(a);this.j.a.style.cssText=a;a=new H("sans-serif",K(this.a));a=
P(a);this.o.a.style.cssText=a;O(this.g);O(this.h);O(this.j);O(this.o)}var S={D:"serif",C:"sans-serif"},T=null;function U(){if(null===T){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return T}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.o.a.offsetWidth;this.A=q();la(this)};
function ma(a,b,c){for(var d in S)if(S.hasOwnProperty(d)&&b===a.f[S[d]]&&c===a.f[S[d]])return!0;return!1}function la(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=U()&&ma(a,b,c));d?q()-a.A>=a.w?U()&&ma(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):na(a):V(a,a.v)}function na(a){setTimeout(p(function(){la(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.o=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,K(a).toString(),"active")],[b.a.c("wf",a.c,K(a).toString(),"loading"),b.a.c("wf",a.c,K(a).toString(),"inactive")]);L(b,"fontactive",a);this.o=!0;oa(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,K(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,K(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,K(a).toString(),"inactive"));w(b.f,d,e)}L(b,"fontinactive",a);oa(this)};function oa(a){0==--a.f&&a.j&&(a.o?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),L(a,"active")):M(a.a))};function pa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}pa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;qa(this,new ha(this.c,a),a)};
function ra(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,k=d||null||{};if(0===c.length&&f)M(b.a);else{b.f+=c.length;f&&(b.j=f);var h,m=[];for(h=0;h<c.length;h++){var l=c[h],n=k[l.c],r=b.a,x=l;r.g&&w(r.f,[r.a.c("wf",x.c,K(x).toString(),"loading")]);L(r,"fontloading",x);r=null;null===X&&(X=window.FontFace?(x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))?42<parseInt(x[1],10):!0:!1);X?r=new Q(p(b.g,b),p(b.h,b),b.c,l,b.s,n):r=new R(p(b.g,b),p(b.h,b),b.c,l,b.s,a,
n);m.push(r)}for(h=0;h<m.length;h++)m[h].start()}},0)}function qa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){ra(a,f,b,d,c)})};function sa(a,b){this.c=a;this.a=b}function ta(a,b,c){var d=z(a.c);a=(a.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return d+"//"+a+"/"+b+".js"+(c?"?v="+c:"")}
sa.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var m=0;m<c.length;m++){var l=c[m].fontfamily;void 0!=c[m].fontStyle&&void 0!=c[m].fontWeight?(h=c[m].fontStyle+c[m].fontWeight,e.push(new H(l,h))):e.push(new H(l))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.m;B(this.c,ta(c,d,e),function(e){e?a([]):(f["__MonotypeConfiguration__"+d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+
d}else a([])};function ua(a,b){this.c=a;this.a=b}ua.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new C;b=0;for(c=d.length;b<c;b++)A(this.c,d[b],D(g));var k=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),m=0;m<h.length;m+=1)k.push(new H(d[0],h[m]));else k.push(new H(d[0]));F(g,function(){a(k,f)})};function va(a,b,c){a?this.c=a:this.c=b+wa;this.a=[];this.f=[];this.g=c||""}var wa="//fonts.googleapis.com/css";function xa(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function ya(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function za(a){this.f=a;this.a=[];this.c={}}
var Aa={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Ba={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ca={i:"i",italic:"i",n:"n",normal:"n"},
Da=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Ea(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var k=d[1];g=[];if(k)for(var k=k.split(","),h=k.length,m=0;m<h;m++){var l;l=k[m];if(l.match(/^[\w-]+$/)){var n=Da.exec(l.toLowerCase());if(null==n)l="";else{l=n[2];l=null==l||""==l?"n":Ca[l];n=n[1];if(null==n||""==n)n="4";else var r=Ba[n],n=r?r:isNaN(n)?"4":n.substr(0,1);l=[l,n].join("")}}else l="";l&&g.push(l)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=Aa[d[0]])&&(a.c[e]=d))}a.c[e]||(d=Aa[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new H(e,f[d]))}};function Fa(a,b){this.c=a;this.a=b}var Ga={Arimo:!0,Cousine:!0,Tinos:!0};Fa.prototype.load=function(a){var b=new C,c=this.c,d=new va(this.a.api,z(c),this.a.text),e=this.a.families;xa(d,e);var f=new za(e);Ea(f);A(c,ya(d),D(b));F(b,function(){a(f.a,f.c,Ga)})};function Ha(a,b){this.c=a;this.a=b}Ha.prototype.load=function(a){var b=this.a.id,c=this.c.m;b?B(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],k=b[f+1],h=0;h<k.length;h++)e.push(new H(g,k[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(m){}a(e)}},2E3):a([])};function Ia(a,b){this.c=a;this.f=b;this.a=[]}Ia.prototype.load=function(a){var b=this.f.id,c=this.c.m,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,k=c.fonts.length;g<k;++g){var h=c.fonts[g];d.a.push(new H(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},B(this.c,z(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new pa(window);Y.a.c.custom=function(a,b){return new ua(b,a)};Y.a.c.fontdeck=function(a,b){return new Ia(b,a)};Y.a.c.monotype=function(a,b){return new sa(b,a)};Y.a.c.typekit=function(a,b){return new Ha(b,a)};Y.a.c.google=function(a,b){return new Fa(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());





function assign(element,event,callback) {
	if(window.PointerEvent) {
		if(event=='down') element.addEventListener('pointerdown',callback);
		else if(event=='up') {
			element.addEventListener('pointerup',callback);
			element.addEventListener('pointercancel',callback);
		}
		else if(event=='move') {
			element.addEventListener('pointermove',callback);
		}
		else throw 'invalid event'
	}
	else {
		if(event=='down') {
			element.addEventListener('touchstart',callback);
			element.addEventListener('mousedown',callback);
		}
		else if(event=='up') {
			element.addEventListener('touchend',callback);
			element.addEventListener('mouseup',callback);
			element.addEventListener('touchcancel',callback);
		}
		else if(event=='move') {
			element.addEventListener('touchmove',callback);
			element.addEventListener('mousemove',callback);
		}
		else throw 'invalid event'
	}
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



var E=document.body.offsetWidth;
var kbdstate=0;
var buttonstate=0;
var pressed=-1;
var pressable=[0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0];
var inputtext='';
var normalshift;
var pressedshift;
var normalback;
var pressedback;
var nimages=0;
var nmoji=0;
var q="";
var backaction;
var slideover=0;
var hintasked=false;
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
var slide=[
	{q:'<br>Sign in to contiunue learning Sanskrit. <div id=\"my-signin2\"></div>', a:''},
	{q:'<br>This is a question-answer based tool for learning Sanskrit. Use the onscreen keyboard provided.<br><br>Tap the arrow to continue.', a:''},
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
	{q:'{⛹🏾‍♂️}देवःकन्दुकेनकिंकरोति?<br>devaḥkandukenakiṃkaroti?',a:'@krīḍati',ad:'क्रीडति'},
];
var state=[];
var prof=[];
var int=[];
var order=[];
var reached=0;

for(i=0;i<slide.length;i++){
	order.push(i);
	if(slide[i].a.charAt(0)=='@'){
		slide[i].a=slide[i].a.substr(1);
		state.push(0);
	}
	else state.push(1);
	prof.push(-1);
	int.push(2);
}
var letters = ['ṃ', 'ś', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'ṭ', 'g', 'h', 'j', 'k', 'l', 'ḍ', 'ṣ', 'c', 'v', 'b', 'n', 'm'];
var sletters = ['ṃ', 'ś', 'e', 'ṛ', 't', 'y', 'ū', 'ī', 'o', 'p', 'ā', 's', 'd', 'ṭ', 'g', 'ḥ', 'ñ', 'ṅ', 'ḷ', 'ḍ', 'ṣ', 'c', 'v', 'b', 'ṇ', 'm'];
var lefts=[];
var tops=[];

window.addEventListener('resize', function(event) {

	if (E != document.body.offsetWidth) {
		E = document.body.offsetWidth;
		redrawkeyboard();
		if (kbdstate == 1) openkeyboard();
	}
});

$(document).ready(function() {
	WebFont.load({
		google: {
			families: ['Martel:400,700']
		},
		fontactive: function(familyName, fvd) {
			console.log('fontactive');
			redrawkeyboard();
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
			slideover = 1;
			next();
			ready();
		},
	});
});

function activatebutton() {
	closekeyboard();
	buttonstate=1;
	$('#button1').fadeIn(500);
	assign(document.getElementById('button1'),'down',subnext);
	state[order[0]]=2;
	if(hintasked) int[order[0]]=int[order[0]]/2;
	else int[order[0]]=int[order[0]]*2;
	if(int[order[0]]<1) int[order[0]]=1;
	prof[order[0]]=int[order[0]]-2;
}

function subnext() {
	if(buttonstate==1) {
		buttonstate=0;
		$('#shiftkeyboard').hide();
		clearpressed();
		localStorage.setItem('order',JSON.stringify(order));
		$('#space').fadeOut(500).promise().done(function() {slideover=1; ready();});
	}
}

function ready() {
	console.log('ready, slideover:' + slideover + ', nimages:' + nimages);
	if (slideover == 1 && nimages < 1) {
		showspace();
		next();
	}
}

var buttondeclaration = '<div style=\'text-align: center;\'><div style=\'display: none; font-size: xx-large;\' class=\'nonselectable clickable\' id=\'button1buffer\'>❯</div></div>';
var inputalt = '<span class=\'nonselectable\' style=\'color: #808080\'>—</span>';
var inputdeclaration = '<div id=\'inputplacebuffer\'>' + inputalt + '</div>';
var hintbutton = '<p class=\'hintbuttonbuffer\' id=\'hintbuttonbuffer\'>REVEAL</div>';
function showhint() {
	$('.hintbutton').fadeOut(500,function(){$('.hint').fadeIn(500)});
	hintasked=true;
}
function next() {
	nimages = 0;
	
	console.log('next');
	q = '';
	var oq = slide[order[1]].q;
	var lastput = 0;
	var hasimage = 0;
	var images = [];
	for (i = 0; i < oq.length; i++) {
		if (oq.charAt(i) == '[') {
			q = q + oq.substring(lastput, i);
			lastput = i + 1;
			while (i < oq.length && oq.charAt(i) !== ']') {
				i++;
			}
			imagename = oq.substring(lastput, i);
			images.push(imagename);
			nimages++;
			hasimage = 1;
			lastput = i + 1;
			var sizes = [144, 240, 360, 480, 720, 1080];
			q = q + '<img src=\'images/' + imagename + '-360.jpeg\' sizes=\'100vw\' id=\'image' + imagename + 'buffer\' srcset=\'';
			for (j = 0; j < sizes.length; j++) {
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
	if (slide[order[1]].a !== ''){
		q=q+'<p class=\'hintbuffer\'>ENTER: '+slide[order[1]].a+' ('+slide[order[1]].ad+')</div>';
		q=q+inputdeclaration;
	}
	q=q+buttondeclaration;
	$('#spacebuffer').html(q);
	nmoji=$('#spacebuffer').find('img').length;
	nimages=nmoji;
	console.log('nmoji:'+nmoji);
	/*
	var emojiplaces=document.getElementsByClassName('emojiplacebuffer');
	for (i=0;i<emojiplaces.length;i++) {
		while(emojiplaces[i].offsetHeight>2*parseInt(window.getComputedStyle(emojiplaces[i], null).getPropertyValue('line-height'))
	}*/
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
	if(slide[order[1]].a!=='' && state[order[1]]>0){
		$('.hint').hide();
		$('.hintbutton').show();
		assign(document.getElementById('hintbutton'),'down',showhint);
	}
	inputtext = '';
	hintasked=false;
	if(order[1]==0) { renderButton(); $('#space').fadeIn(500);
		closekeyboard ();}
	else if (slide[order[1]].a == '') {
		$('#space').fadeIn(500, activatebutton);
		closekeyboard();
	} else {
		$('#space').fadeIn(500);
		openkeyboard();
	}
	$('#space .emojiplace').each(function(){
		var w=$(this).width();
		var em=($('body').width()-w)/2;
		console.log('em: '+em+' w: '+w);
		var nml=$(this).find('img').length;
		$(this).find('img').css('max-width',(Math.floor(w/nml)-Math.ceil(0.8*em))+'px');
	});
	order.shift();
	var c=order.shift();
	var toput=-1;
	for(i=2; i<=reached; i++) {
		prof[i]--;
		var smallest=0;
		if(slide[c].a!=='' && slide[i].a!=='' && prof[i]<0 && (toput<0 || int[i]<smallest)) {
			smallest=int[i];
			toput=i;
		}
	}
	if(toput>-1){
		order.unshift(toput);
		prof[toput]=4;
	}
	order.unshift(c);
	if(c>reached) reached=c;
	if(order.length < 2) order.push(order[0]);
}

function back() {
	inputtext = inputtext.slice(0, -1);
	if (inputtext == '') {
		$('#inputplace').html(inputalt);
               $('#backsq').html(normalback);
                  try{clearInterval(backaction);}catch(e){}
	} else {
		$('#inputplace').html(inputtext);
	}
	document.getElementById('outerspace').scrollIntoView({
		block: 'end',
		behavior: 'smooth'
	});
	clearpressed();
}

function clearpressed() {
	if (pressed !== -1) {
		$('#' + pressed + 'key').removeClass('pressed');
		$('#' + pressed + 'key').html(letters[pressed]);
		pressed = -1;
	}
}

function showdisplay(e) {
	document.getElementById('displaysq').style.left=lefts[parseInt(e.currentTarget.id.slice(-4, -2))]+'px';
	document.getElementById('displaysq').style.top=(tops[parseInt(e.currentTarget.id.slice(-4, -2))]-w * 1.3 / 10.0) + 'px';
	$('#displaykey').html(e.currentTarget.children[0].innerHTML);
	$('#displaysq').show();
}
function showsdisplay(e) {
	document.getElementById('sdisplaysq').style.left=lefts[parseInt(e.currentTarget.id.slice(-4, -2))]+'px';
	document.getElementById('sdisplaysq').style.top=(tops[parseInt(e.currentTarget.id.slice(-4, -2))]-w * 1.3 / 10.0) + 'px';
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
	$('#inputplace').html(inputtext);
	if(inputtext=='nivartanam') {
		localStorage.setItem('order','');
		document.location.reload(true);
	}
	document.getElementById('outerspace').scrollIntoView({
		block: 'end',
		behavior: 'smooth'
	});
	if (pressable[i] && pressed !== i) {
		clearpressed();
		e.currentTarget.children[0].classList.add('pressed');
		e.currentTarget.children[0].innerHTML = sletters[i];
		pressed = i;
	} else clearpressed();
	if (inputtext == slide[order[0]].a) {
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
	$('#inputplace').html(inputtext);
	document.getElementById('outerspace').scrollIntoView({
		block: 'end',
		behavior: 'smooth'
	});
	$('#shiftkeyboard').hide();
	if (inputtext == slide[order[0]].a) {
		activatebutton();
	}
	}
	hidesdisplay();
	try{clearInterval(backaction);}catch(e){}
     $('#backsq').html(normalback);    
}
var w = 0;


function redrawkeyboard() {
	var keysdeclaration = '';
	var skeysdeclaration = '';
	w = document.getElementById('primarykeyboard').clientWidth;
	normalshift='<svg height=\'' + 1.3 * w / 10.0 + 'px\' width=\'' + w / 10.0 + 'px\'><polygon points=\'' +
		0.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
		0.4 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
		0.4 * w / 10.0 + ',' + (1.3 * 0.5 + 0.1) * w / 10.0 + ' ' +
	        0.2 * w / 10.0 + ',' + (1.3 * 0.5 + 0.1) * w / 10.0 + ' ' +
	        0.5 * w / 10.0 + ',' + (0.5 * 0.3 + 0.2) * w / 10.0 + ' ' +
	        0.8 * w / 10.0 + ',' + (1.3 * 0.5 + 0.1) * w / 10.0 + ' ' +
	        0.6 * w / 10.0 + ',' + (1.3 * 0.5 + 0.1) * w / 10.0 + ' ' +
	        0.6 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (0.5 * 0.3) * w / 10.0 + ' ' +
	        0.0 * w / 10.0 + ',' + (0.5 * 0.3) * w / 10.0 + ' ' +
		'\' style=\'fill:#c0c0c0\'/><polygon points=\'' +
	        0.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3 - 0.2) * w / 10.0 + ' ' +
	        0.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3 - 0.2) * w / 10.0 + ' ' +
	        '\' style=\'fill:#c0c0c0\'/></svg>';
	pressedshift=normalshift.replace('#c0c0c0','#a0a0a0').replace('#c0c0c0','#a0a0a0');
	normalback='<svg height=\'' + 1.3 * w / 10.0 + 'px\' width=\'' + 1.0 * w / 10.0 + 'px\'><polygon points=\'' +
		1.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3 - 0.2) * w / 10.0 + ' ' +
	        0.4 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3 - 0.2) * w / 10.0 + ' ' +
	        0.2 * w / 10.0 + ',' + (1.3 * 0.5) * w / 10.0 + ' ' +
	        0.4 * w / 10.0 + ',' + (0.5 * 0.3 + 0.2) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (0.5 * 0.3 + 0.2) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (0.5 * 0.3) * w / 10.0 + ' ' +
	        0.0 * w / 10.0 + ',' + (0.5 * 0.3) * w / 10.0 + ' ' +
	        0.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
		'\' style=\'fill:#c0c0c0\'/><polygon points=\'' +
	        0.8 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (1.3 - 0.5 * 0.3) * w / 10.0 + ' ' +
	        1.0 * w / 10.0 + ',' + (0.5 * 0.3) * w / 10.0 + ' ' +
	        0.8 * w / 10.0 + ',' + (0.5 * 0.3) * w / 10.0 + ' ' +
		'\' style=\'fill:#c0c0c0\'/></svg>';
	pressedback=normalback.replace('#c0c0c0','#a0a0a0').replace('#c0c0c0','#a0a0a0');
	var shiftkeydeclaration = '<div class=\'keys\' style=\'width: ' + 3.0 * 0.5 * w / 10.0 + 'px; top: ' + 1.3 * w / 5.0 + 'px; padding: 0;\' id=\'shiftsq\'>'+normalshift+'</div>';
	var sshiftkeydeclaration = '<div class=\'keys\' style=\'width: ' + 3.0 * 0.5 * w / 10.0 + 'px; top: ' + 1.3 * w / 5.0 + 'px; padding: 0;\' id=\'sshiftsq\'>'+pressedshift+'</div>';
	var backkeydeclaration = '<div class=\'keys\' style=\'width: ' + 3.0 * 0.5 * w / 10.0 + 'px; right:0; top: ' + 1.3 * w / 5.0 + 'px; padding: 0;\' id=\'backsq\'>'+normalback+'</div>';
	var sbackkeydeclaration = '<div class=\'keys\' style=\'width: ' + 3.0 * 0.5 * w / 10.0 + 'px; right:0; top: ' + 1.3 * w / 5.0 + 'px; padding: 0;\' id=\'sbacksq\'>'+pressedback+'</div>';

	for (i = 0; i < letters.length; i++) {
		keysdeclaration = keysdeclaration + '<div class=\'keys\' id=\'' + i + 'sq\'><div class=\'text\' id=\'' + i + 'key\'>' + letters[i] + '</div></div>';
		skeysdeclaration = skeysdeclaration + '<div class=\'keys\' id=\'s' + i + 'sq\'><div class=\'text\' id=\'s' + i + 'key\'>' + sletters[i] + '</div></div>';
	}
	var displaykey = '<div class=\'keys\' id=\'displaysq\'><div class=\'text\' id=\'displaykey\'></div></div>';
	var sdisplaykey = '<div class=\'keys\' id=\'sdisplaysq\'><div class=\'text\' id=\'sdisplaykey\'></div></div>';
	
	skeysdeclaration = skeysdeclaration + sshiftkeydeclaration + sbackkeydeclaration + sdisplaykey;
	keysdeclaration = keysdeclaration + shiftkeydeclaration + backkeydeclaration + displaykey;

	$('#primarykeyboard').html(keysdeclaration);
	$('#shiftkeyboard').html(skeysdeclaration);
	
	for (i = 0; i < letters.length; i++) {
		if (sletters[i] !== letters[i]) {
			$('#s' + i + 'key').addClass('pressed');
		}
	}
	assign(document.getElementById('shiftsq'),'down',function() {$('#shiftkeyboard').show();clearpressed();});
	assign(document.getElementById('sshiftsq'),'down',function() {$('#shiftkeyboard').hide();});
		
	assign(document.getElementById('backsq'),'down',function(){$('#backsq').html(pressedback);    try{clearInterval(backaction);}catch(e){}     backaction=setInterval(back,150);});
	assign(document.getElementById('backsq'),'up',function(){$('#backsq').html(normalback);back();try{clearInterval(backaction);}catch(e){}});
	assign(document.getElementById('sbacksq'),'down',function(){$('#shiftkeyboard').hide();});
	lefts=[];
	tops=[];
	for (i = 0; i < letters.length; i++) {
		
		var csq = document.getElementById(i + 'sq');
		var cssq = document.getElementById('s' + i + 'sq');
		var ck = document.getElementById(i + 'key');
		var csk = document.getElementById('s' + i + 'key');
		if (i < 10) {
			lefts.push(i * w / 10.0);
			tops.push(0);
		} else if (i < 19) {
			lefts.push((i - 9.5) * w / 10.0);
			tops.push(w * 1.3 / 10.0);
		} else {
			lefts.push((i - 17.5) * w / 10.0);
			tops.push(w * 1.3 / 5.0);
		}
		csq.style.left = lefts[i] + 'px';
		csq.style.top = tops[i] + 'px';
		cssq.style.left = lefts[i] + 'px';
		cssq.style.top = tops[i] + 'px';
		if (i == 10) {
			csq.style.left = '0px';
			csq.style.paddingLeft = 0.5 * w / 10.0 + 'px';
			csq.style.width = 1.0 * w / 10.0 + 'px';
			cssq.style.left = '0px';
			cssq.style.paddingLeft = 0.5 * w / 10.0 + 'px';
			cssq.style.width = 1.0 * w / 10.0 + 'px';
		} else if (i == 18) {
			csq.style.width = 2.0 * w / 10.0 + 'px';
			cssq.style.width = 2.0 * w / 10.0 + 'px';
		}
		assign(csq,'up',type);
		assign(csq,'down',showdisplay);
		assign(cssq,'up',types);
		assign(cssq,'down',showsdisplay);
                csq.style.paddingTop = Math.floor(w * 1.3 / 10.0) + 'px';
                cssq.style.paddingTop = Math.floor(w * 1.3 / 10.0) + 'px';
	}
	$('.keys .text').css('bottom', '0px');
	$('.keys .text').css('line-height', w * 1.3 / 10.0 + 'px');
	$('.keys .text').css('width', w / 10.0 + 'px');
	$('.keys .text').css('font-size', w / 15.0 + 'px');
	//$('.keys').css('padding-top', Math.floor(w * 1.3 / 10.0) + 'px');
}

function openkeyboard() {
	$('#primarykeyboard').show();
	$('#shiftkeyboard').hide();
	$('#primarykeyboard').height(w * 1.3 * 0.3);
	$('#shiftkeyboard').height(w * 1.3 * 0.3);
	$('#outerspace').height(w * 1.3 * 0.3);
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
	$('#outerspace').height(0);
	kbdstate = 0;
}
