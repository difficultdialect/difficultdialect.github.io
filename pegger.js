let g;
let p=`
Expression = s:Statements {return s.reduce((r,e)=>{
        return r+(e.output?(\'\\n\'+e.t):(e.application?\'\\n\'+g.parse(s.find((q)=>{if(q.definition) if(q.l==e.l) return true; return false;}).p.parse(e.a)):\'\'));
	},\'\');}
Statements = s:Statement Break ss:Statements {return s.concat(ss);}
	/ Statement
Statement = s:(Definition / Application / Output) {return [s];}
Definition = _ \'In\' Space l:Language Break t:Translations Break _ \'End\' _
	{
    	return {definition:true,l:l,p:peg.generate(t.reduce((r,e)=>r+\'\\'\'+e.f+\'\\' {return \\'\'+e.t+\'\\';} /\',
    		\'Expression = e:(\').slice(0,-1)+\')* {return e.join(\\\'\\\')}\')};
    }
Translations = t:Translation Break ts:Translations {return t.concat(ts);} 
	/ Translation
Translation = _ f:From Space \"=\" Space t:To _ {return [{f:f.replace(/\\\\s/g,\' \').replace(/\\\\i/g,\'\`\'),t:t.replace(/\\\\s/g,\' \').replace(/\\\\i/g,\'\`\')}];}
From = Name
To = Name
Application = _ l:Language Space \"\\\`\" a:Argument \"\\\`\" _
	{return {application:true,l:l,a:a};}
Output = [^\\n\\r\`]* {return {output:true,t:text()};}
Language = Name
Argument = [^\`]* {return text();}
Name = [^ \\n\\t\\r\`]* {return text();}
_ = [ \\t]*
Space = [ \\t]+
Break = [\\n\\r]+
`

let s=`
  ab as

In b
A = a
antah = In
lang = l
anta = End
eq = =
B = b
\\s = \\s
\\r = \\r
\\n = \\n
i = \\i
End


b \`
antah lang
A eq B
anta
lang iAi
\`
`

g=peg.generate(p);
console.log(g.parse(s));