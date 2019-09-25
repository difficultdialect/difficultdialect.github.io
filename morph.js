function tag(s1,s2,t){
	let change=false;
	for(let i=0;i<s1.length;i++){
		let m=true,l=s1.length-1,r=0,f=i;
		for(let j=0;j<s2.length;j++){
			if(f+j>=s1.length){
				m=false;break;
			}
 			let n=false;
			for(let k=0;k<s1[f+j].length;k++){
				//for(let o=0;o<s2[j].length;o++)
				let o=0;
				if(s1[f+j][k].s==s2[j][o].s){
					n=true;
					l=Math.min(l,f+j-s1[f+j][k].l);
					r=Math.max(r,f+j+s1[f+j][k].r);console.log(`i: ${i}, j: ${j}, r:${r}, s:${s2[j][o].s}`);
					//break;
				}
			}
			if(!n) m=false;
      			else f=r-j;
		}
		if(m){
			for(let j=l;j<=r;j++){
				let p={s:t,l:j-l,r:r-j};
				if(!s1[j].some((e)=>areEqualShallow(e,p))){
					s1[j].push({s:t,l:j-l,r:r-j});
					change=true;		
				}
			}
		}
	}
	return change;
}

function convert(s){
	let a=[];
	for(let i=0;i<s.length;i++){
		let c=s.charAt(i);
		if(c!=='[') a.push([{s:c,l:0,r:0}]);
		else{
			let n=[];i++;
			for(;i<s.length;i++){
				c=s.charAt(i);
				if(c!==']') n.push(c);
				else break;
			}
			a.push([{s:n.join(''),l:0,r:0}]);
		}
	}
	return a;
}

function format(s){
	let s2=[];
	for(let i=0;i<s.length;i++){
		let n=s[i][0].s;
		if(n.length>1) s2.push(`<span style=\'color:#888888\'>[${n}]</span>`);
		else{
			s2.push(n);
			for(let k=0;k<s[i].length;k++){
				let c=s[i][k].s;
				if(c.charAt(0)=='#'){
					s2[i]=`<span style=\'color:${c}\'>${s[i][0].s}</span>`;
					break;
				}
			}
		}
	}
	return s2.join('');
}

function tagRecurse(s,r){
	let c=true;
	while(c){
		c=false;
		for(let u of r){
			c=c||tag(s,u.f,u.w);
		}
	}
}

function generateRule(s){
	const c=':';
	let r=s.includes(c)?{f:convert(s.slice(0,s.indexOf(c))),w:s.slice(s.indexOf(c)+1)}:null;
	return r;
}

function areEqualShallow(a, b) {
    for(var key in a) {
        if(a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}

let s=['True is a boolean. False is also. False&False. False&True. True&False. True&True. False|False. True|False. False|True. True|True.','True','[bool]','True+False','False','[bool]|False']
	.map((e)=>convert(e));
let r=[' :s','[s][s]:s','True:1','False:0','[0]:bool','[1]:bool',
	'',
	'[0]&[bool]:0','[bool]&[0]:0','[1]&[1]:1',
	'[1]|[bool]:1','[bool]|[1]:1','[0]|[0]:0',
	'[0]:#ff0000','[1]:#0000ff']
	.map((e)=>generateRule(e));

tagRecurse(s[0],r);
console.log(JSON.stringify(s[0]));
document.getElementById('o').innerHTML=format(s[0]);
