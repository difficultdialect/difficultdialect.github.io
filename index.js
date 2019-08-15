var E=document.body.offsetWidth;
var openedkb=0;
var pressed=-1;
var pressable=[0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0];
var primarykeyboardinner='';
var inputtext='';
var sliden=4;
var slidei=1;
var letters=['ṃ','ś','e','r','t','y','u','i','o','p','a','s','d','ṭ','g','h','j','k','l','ḍ','ṣ','c','v','b','n','m'];
var sletters=['ṃ','ś','e','ṛ','t','y','ū','ī','o','p','ā','s','d','ṭ','g','ḥ','ñ','ṅ','ḷ','ḍ','ṣ','c','v','b','ṇ','m'];
window.addEventListener('resize', function(event){
  
	if(E!=document.body.offsetWidth)
	{
		E=document.body.offsetWidth;
		redraw();
    if(openedkb==1){openkeyboard();}
	}
});
window.onload=function(){
  WebFont.load({google: {
  families: ['Mukta:400, 700']
},
timeout:5000,
fontactive: function(familyName,fvd){ //This is called once font has been rendered in browser
    // Your business logic goes here
     document.getElementById("slides").innerHTML='<div id=\"q1\" style=\"display: none\">   लिखें - कमलनयनः। kamalanayanaḥ.   <div class=\"inputplace\"></div>   <div class=\"answer\">kamalanayanaḥ</div> </div> <div id=\"q2\" style=\"display: none\">   दशरथनन्दनः। daśarathanandanaḥ.   <div class=\"inputplace\"></div>   <div class=\"answer\">daśarathanandanaḥ.</div> </div> <div id=\"q3\" style=\"display: none\">   रामः। rāmaḥ.   <div class=\"inputplace\"></div>   <div class=\"answer\">rāmaḥ.</div> </div> <div id=\"q4\" style=\"display: none\">   लक्ष्मणः। lakṣmaṇaḥ.   <div class=\"inputplace\"></div>   <div class=\"answer\">lakṣmaṇaḥ</div> </div> <div id=\"q5\" style=\"display: none\">   bāḍham!   <div class=\"answer\">t</div> </div>';
   redraw();
   var cookievalue=parseInt(document.cookie.substring(6));
   if(cookievalue!=='NaN')
   {
     if(cookievalue<=silden)
       {
         slidei=cookievalue;
       }
   }
   subnext();
  },
});

};
function activatebutton(){
  document.getElementById("button1").style.display="inline-block";
	closekeyboard();
	animateCSS('#button1','fadeIn');
}
function subnext(){
  animateCSS('#space','fadeOut',next);
}
function next(){
  inputtext='';
  document.cookie="slide=" + slidei;
  document.getElementById("space").innerHTML=document.getElementById("q"+slidei).innerHTML.replace("class=\"inputplace\"","id=\"inputplace\"").replace("class=\"answer\"","class=\"answer\" id=\"answer\"")+"<div style=\"text-align: center;\"><div style=\"display: none; font-family: 'Mukta', sans-serif; font-size: xx-large; color: #29AB87\" onclick=\"subnext()\" id=\"button1\">❯</div></div>";
  if(document.getElementById("space").innerHTML.includes("inputplace")){
    openkeyboard();
  }
  else{activatebutton();closekeyboard();}
	animateCSS('#space','fadeIn');
  if(slidei<sliden){slidei++;}
}
function back(){
  inputtext=inputtext.slice(0,-1);
  document.getElementById("inputplace").innerHTML=inputtext;
  clearpressed();
}
function clearpressed(){
  if(pressed!==-1){
    document.getElementById(pressed+"key").style.color="black";
    document.getElementById(pressed+"key").innerHTML=letters[pressed];
    pressed=-1;
  }
}
function type(e) {
  var i=parseInt(e.currentTarget.id.slice(-4,-2));
  if(pressed==i){inputtext=inputtext.slice(0,-1);}
  inputtext=inputtext.concat(e.currentTarget.children[0].innerHTML);
  document.getElementById("inputplace").innerHTML=inputtext;
  if(pressable[i] && pressed!==i){
    clearpressed();
    e.currentTarget.children[0].style.color="#ff2400";
    e.currentTarget.children[0].innerHTML=sletters[i];
    pressed=i;
  }
  else clearpressed();
  if(inputtext==document.getElementById("answer").innerHTML){activatebutton();}
}
function types(e) {
  inputtext=inputtext.concat(e.currentTarget.children[0].innerHTML);
  document.getElementById("inputplace").innerHTML=inputtext;
  document.getElementById("shiftkeyboard").style.display="none";
  if(inputtext==document.getElementById("answer").innerHTML){activatebutton();}
}

var w=0;


function redraw()
{
  if(openedkb==0){document.getElementById("space").style.height=window.innerHeight;}
  var keysdeclaration='';
var skeysdeclaration='';
  w=document.getElementById("primarykeyboard").clientWidth;
  
var shiftkeydeclaration='<div class=\"keys\" style=\"width: ' + 3.0*0.5*w/10.0 + 'px; top: ' + 1.3*w/5.0 + 'px; padding: 0;\" id=\"shiftsq\"><svg height=\"' + 1.3*w/10.0 + 'px\" width=\"' + w/10.0 + 'px\"><circle cx=\"' + 0.5*w/10.0 + 'px\" cy=\"' + 0.5*1.3*w/10.0 + 'px\" r=\"' + 0.5*w/10.0 + 'px\" fill=\"#B2BEB5\"></svg></div>';
var sshiftkeydeclaration='<div class=\"keys\" style=\"width: ' + 3.0*0.5*w/10.0 + 'px; top: ' + 1.3*w/5.0 + 'px; padding: 0;\" id=\"sshiftsq\"><svg height=\"' + 1.3*w/10.0 + 'px\" width=\"' + w/10.0 + 'px\"><circle cx=\"' + 0.5*w/10.0 + 'px\" cy=\"' + 0.5*1.3*w/10.0 + 'px\" r=\"' + 0.5*w/10.0 + 'px\" fill=\"#B2BEB5\"></svg></div>';
var backkeydeclaration='<div class=\"keys\" style=\"width: ' + 3.0*0.5*w/10.0 + 'px; right:0; top: ' + 1.3*w/5.0 + 'px; padding: 0;\" id=\"backsq\"><svg height=\"' + 1.3*w/10.0 + 'px\" width=\"' + w/10.0 + 'px\"><circle cx=\"' + 0.5*w/10.0 + 'px\" cy=\"' + 0.5*1.3*w/10.0 + 'px\" r=\"' + 0.5*w/10.0 + 'px\" fill=\"#B2BEB5\"></svg></div>';
var sbackkeydeclaration='<div class=\"keys\" style=\"width: ' + 3.0*0.5*w/10.0 + 'px; right:0; top: ' + 1.3*w/5.0 + 'px; padding: 0;\" id=\"sbacksq\"><svg height=\"' + 1.3*w/10.0 + 'px\" width=\"' + w/10.0 + 'px\"><circle cx=\"' + 0.5*w/10.0 + 'px\" cy=\"' + 0.5*1.3*w/10.0 + 'px\" r=\"' + 0.5*w/10.0 + 'px\" fill=\"#B2BEB5\"></svg></div>';

for(i=0;i<letters.length;i++){
  keysdeclaration=keysdeclaration+"<div class=\"keys\" id=\""+ i + "sq\"><div class=\"text\" id=\""+i+"key\">"+letters[i]+"</div></div>";
  skeysdeclaration=skeysdeclaration+"<div class=\"keys\" id=\"s"+ i + "sq\"><div class=\"text\" id=\"s"+i+"key\">"+sletters[i]+"</div></div>";
}
skeysdeclaration=skeysdeclaration.replace("s16key\"","s16key\" style=\"color: dimgray\"").replace("s17key\"","s17key\" style=\"color: dimgray\"").replace("s24key\"","s24key\" style=\"color: dimgray\"");
skeysdeclaration=skeysdeclaration+sshiftkeydeclaration+sbackkeydeclaration;
keysdeclaration=keysdeclaration+shiftkeydeclaration+backkeydeclaration;

document.getElementById("primarykeyboard").innerHTML=keysdeclaration;
document.getElementById("shiftkeyboard").innerHTML=skeysdeclaration;
document.getElementById("shiftsq").addEventListener("click",function() {document.getElementById("shiftkeyboard").style.display="inline";clearpressed();});
document.getElementById("sshiftsq").addEventListener("click",function() {document.getElementById("shiftkeyboard").style.display="none";});
document.getElementById("backsq").addEventListener("click",back);
document.getElementById("sbacksq").addEventListener("click",function() {document.getElementById("shiftkeyboard").style.display="none";});


for(i=0;i<letters.length;i++){
  var csq=document.getElementById(i+"sq");
  var cssq=document.getElementById("s"+i+"sq");
  var ck=document.getElementById(i+"key");
  var csk=document.getElementById("s"+i+"key");
  if(i<10){
    csq.style.left=i*w/10.0+"px";
    cssq.style.left=i*w/10.0+"px";
  }
  else if(i<19){
    csq.style.left=(i-9.5)*w/10.0+"px";
    csq.style.top=w*1.3/10.0+"px";
    cssq.style.left=(i-9.5)*w/10.0+"px";
    cssq.style.top=w*1.3/10.0+"px";
  }
  else{
    csq.style.left=(i-17.5)*w/10.0+"px";
    csq.style.top=w*1.3/5.0+"px";
    cssq.style.left=(i-17.5)*w/10.0+"px";
    cssq.style.top=w*1.3/5.0+"px";
  }
  ck.style.bottom=0.0+"px";
  ck.style.lineHeight=Math.floor(w*1.3/10.0)+"px";
  ck.style.width=Math.floor(w/10.0)+"px";
  ck.style.fontSize=Math.floor(w/15.0)+"px";
  csq.addEventListener("click",type);
  
  csk.style.bottom=0.0+"px";
  csk.style.lineHeight=Math.floor(w*1.3/10.0)+"px";
  csk.style.width=Math.floor(w/10.0)+"px";
  csk.style.fontSize=Math.floor(w/15.0)+"px";
  cssq.addEventListener("click",types);
}
}
function openkeyboard() {
  document.getElementById("primarykeyboard").style.height = w*1.3*0.3+"px";
  document.getElementById("shiftkeyboard").style.height = w*1.3*0.3+"px";
  /*document.getElementById("space").style.height=window.innerHeight - w*1.3*0.3+"px";*/
  openedkb=1;
}

/* Set the width of the side navigation to 0 */
function closekeyboard() {
  document.getElementById("primarykeyboard").style.height = "0";
  document.getElementById("shiftkeyboard").style.height="0";
  /*document.getElementById("space").style.height=window.innerHeight;*/
  openedkb=0;
}
function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName,'faster')

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName,'faster')
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}
