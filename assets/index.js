var inputtext='';
function back(){
  inputtext=inputtext.slice(0,-1);
  document.getElementById("inputplace").innerHTML=inputtext;
}
function type(e) {
  inputtext=inputtext.concat(e.target.innerHTML);
  document.getElementById("inputplace").innerHTML=inputtext;
}
function types(e) {
  inputtext=inputtext.concat(e.target.innerHTML);
  document.getElementById("inputplace").innerHTML=inputtext;
  document.getElementById("shiftkeyboard").style.display="none";
}
var w=document.getElementById("primarykeyboard").clientWidth;
var letters=['ṃ','ḥ','e','r','t','y','u','i','o','p','a','s','d','ṛ','g','h','j','k','l','ś','ṣ','c','v','b','n','m'];
var sletters=['ṃ','ḥ','e','r','ṭ','y','ū','ī','o','p','ā','s','ḍ','ṝ','g','h','ñ','k','l','ś','ṣ','c','v','b','ṇ','ṅ'];
var keysdeclaration='';
var skeysdeclaration='';
var shiftkeydeclaration='<div class=\"keys\" style=\"width: ' + 3.0*0.5*w/10.0 + 'px; top: ' + 1.3*w/5.0 + 'px; padding-top: 0;\" id=\"shiftsq\"><svg height=\"' + 1.3*w/10.0 + 'px\" width=\"' + w/10.0 + 'px\"><circle cx=\"' + 0.5*w/10.0 + 'px\" cy=\"' + 0.5*1.3*w/10.0 + 'px\" r=\"' + 0.5*w/10.0 + 'px\" fill=\"gray\"></svg></div>';
var sshiftkeydeclaration='<div class=\"keys\" style=\"width: ' + 3.0*0.5*w/10.0 + 'px; top: ' + 1.3*w/5.0 + 'px; padding-top: 0;\" id=\"sshiftsq\"><svg height=\"' + 1.3*w/10.0 + 'px\" width=\"' + w/10.0 + 'px\"><circle cx=\"' + 0.5*w/10.0 + 'px\" cy=\"' + 0.5*1.3*w/10.0 + 'px\" r=\"' + 0.5*w/10.0 + 'px\" fill=\"gray\"></svg></div>';
var backkeydeclaration='<div class=\"keys\" style=\"width: ' + 3.0*0.5*w/10.0 + 'px; right:0; top: ' + 1.3*w/5.0 + 'px; padding-top: 0;\" id=\"backsq\"><svg height=\"' + 1.3*w/10.0 + 'px\" width=\"' + w/10.0 + 'px\"><circle cx=\"' + 0.5*w/10.0 + 'px\" cy=\"' + 0.5*1.3*w/10.0 + 'px\" r=\"' + 0.5*w/10.0 + 'px\" fill=\"gray\"></svg></div>';
var sbackkeydeclaration='<div class=\"keys\" style=\"width: ' + 3.0*0.5*w/10.0 + 'px; right:0; top: ' + 1.3*w/5.0 + 'px; padding-top: 0;\" id=\"sbacksq\"><svg height=\"' + 1.3*w/10.0 + 'px\" width=\"' + w/10.0 + 'px\"><circle cx=\"' + 0.5*w/10.0 + 'px\" cy=\"' + 0.5*1.3*w/10.0 + 'px\" r=\"' + 0.5*w/10.0 + 'px\" fill=\"gray\"></svg></div>';

for(i=0;i<letters.length;i++){
  keysdeclaration=keysdeclaration+"<div class=\"keys\" id=\""+ letters[i] + "sq\"><div class=\"text\" id=\""+letters[i]+"key\">"+letters[i]+"</div></div>";
  skeysdeclaration=skeysdeclaration+"<div class=\"keys\" id=\"s"+ sletters[i] + "sq\"><div class=\"text\" id=\"s"+sletters[i]+"key\">"+sletters[i]+"</div></div>";
}
skeysdeclaration=skeysdeclaration+sshiftkeydeclaration+sbackkeydeclaration;
keysdeclaration=keysdeclaration+shiftkeydeclaration+backkeydeclaration;

document.getElementById("primarykeyboard").innerHTML=keysdeclaration;
document.getElementById("shiftkeyboard").innerHTML=skeysdeclaration;
document.getElementById("shiftsq").addEventListener("click",function() {document.getElementById("shiftkeyboard").style.display="inline";});
document.getElementById("sshiftsq").addEventListener("click",function() {document.getElementById("shiftkeyboard").style.display="none";});
document.getElementById("backsq").addEventListener("click",back);
document.getElementById("sbacksq").addEventListener("click",back);
for(i=0;i<letters.length;i++){
  var csq=document.getElementById(letters[i]+"sq");
  var cssq=document.getElementById("s"+sletters[i]+"sq");
  var ck=document.getElementById(letters[i]+"key");
  var csk=document.getElementById("s"+sletters[i]+"key");
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
  ck.style.fontSize=Math.floor(w/17.0)+"px";
  csq.addEventListener("click",type);
  
  csk.style.bottom=0.0+"px";
  csk.style.lineHeight=Math.floor(w*1.3/10.0)+"px";
  csk.style.width=Math.floor(w/10.0)+"px";
  csk.style.fontSize=Math.floor(w/16.0)+"px";
  cssq.addEventListener("click",types);
}

/*document.getElementById("shiftsq").style.left=0.5*w/10.0+"px";;
*/
function openkeyboard() {
  document.getElementById("primarykeyboard").style.height = w*1.3*0.3+"px";
  document.getElementById("shiftkeyboard").style.height = w*1.3*0.3+"px";
}

/* Set the width of the side navigation to 0 */
function closekeyboard() {
  document.getElementById("primarykeyboard").style.height = "0";
  document.getElementById("shiftkeyboard").style.height="0";
}

openkeyboard();
