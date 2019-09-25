s=['','','',[['','',''],'bool',[]]];
s=['true&false'];
s={t:'s',d:['t','r','u','e','&','f','a','l','s','e']};
s=['t','r','u','e',[['&'],'AND'],'f','a','l','s','e'];
s=[[['t','r','u','e'],'bool','True'],[['&'],'AND'],'f','a','l','s','e'];

s=[[{s:'t',l:0,r:0},{s:'bool',l:0,r:3}],['r','bool'],[],[],[]];

function parse(s){
	s={t:'s',d:s.split('\n').map((e)=>arraiefy(e))};
	let d=[];
	recurse(s,d);
}

function recurse(s,d){
	for(c of s){
		if(c.includes(':')){
			const i=c.indexOf(':');
			d.push({k:c.slice(0,i),d:c.slice(i+1)});
		}
	}
	for(c of s){
		for(e of d){
			
		}
	}
}

function tag(s1,s2,t){
	for(let i=0;i<s1.length;i++){
		let m=true,l=0,r=0;
		for(let j=0;j<s2.length,i+j<s1.length;j++){
			let n=false,
			for(let k=0;k<s1[i+j].length;k++){
				for(let l=0;l<s2[j].length;l++)
					if(s1[i+j][k].s==s2[j][l].s){
						n=true;
						l=Math.min(l,i+j-s1[i+j][k].l);
						r=Math.max(r,i+j+s1[i+j][k].r);
					}
			}
			if(!n) m=false;
		}
		if(m){
			for(let j=l;j<=r;j++){
				s1[j].push({s:t,l:j-l,r:r-j});
			}
		}
	}
}

function arraiefy(s){
	let a=[];
	for(let i=0;i<s.length;i++) a.push(s.charAt(i));
	return a;
}

function parse(s){
	let r=[],d=[];
	for(let l of s){
		if(l.includes('=')){
			const i=l.indexOf('=');
			r.push({f:l.slice(0,i),t:l.slice(i+1)});
		}
		else if(l.includes(':')){
			const i=l.indexOf(':');
			d.push({f:l.slice(0,i),t:l.slice(i+1)});
		}
	}
	for(let di of d){
		
	}
}

function replaceRecurse(rl,s){
	for(let r of rl){
		const c=s.replace(r.f,r.t);
		console.log(c);
		if(c!==s) replaceRecurse(rl,c);
	}
}
