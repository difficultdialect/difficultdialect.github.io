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
		else replaceRecurse(r,l);
	}
}

function replaceRecurse(rl,s){
	for(let r of rl){
		const c=s.replace(r.f,r.t);
		console.log(c);
		if(c!==s) replaceRecurse(rl,c);
	}
}
