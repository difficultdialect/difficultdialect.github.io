const id=a=>a;
const T=a=>b=>a; //true (return first argument)
const F=a=>id; //false (return second argument)
const N=a=>a(F)(T); //not
const A=a=>a(id)(T(F)); //and
const O=a=>a(F(T))(id); //or

const l=a=>b=>b.includes(a)?b.slice(0,b.indexOf(a)):''; //left of a in b
const r=a=>b=>b.includes(a)?b.slice(b.indexOf(a)+a.length):''; //right of a in b
const j=a=>b=>a+b;

const inc=a=>b=>b.includes(a)?T:F;
const eq=a=>b=>A(inc(a)(b))(inc(b)(a));

const ev=eval;

//const c1=a=>b=>c=>a(b(c)); //compose
//const c2=a=>b=>c1(b)(a); //compose reverse
const w=a=>b=>a(b)(c=>w(a)(c(b))(c))(c=>b); //while(a(b)) apply c to b
const p=a=>b=>c=>c(a)(b); //pair return first for true and second for false
const cT=a=>T; //constant true
const LE=a=>b=>F;
const reduce=a=>b=>c=>w(d=>N(d(T)(LE)))(p(b)(b))(d=>p(d(T)(F))(a(d(F))(d(T)(T))));
const concatReverseMap=a=>b=>c=>w(d=>N(d(T)(LE)))(p(b)(c))(d=>p(d(T)(F))(p(a(d(T)(T)))(d(F))))(F); //spills a(b) into c
const reverseMap=a=>b=>concatReverseMap(a)(b)(cT);
const concatReverse=concatReverseMap(id);
const reverse=a=>reverseMap(id);
const concat=a=>concatReverse(reverse(a));
const map=a=>b=>reverse(reverseMap(a)(b));
const list5=p('a')(p('b')(p('c')(p('d')(cT))));
const printList=a=>w(b=>N(b(F)(LE)))(p('')(a))(b=>p(j(b(T))(b(F)(T)))(b(F)(F)))(T);
console.log(printList(concat(list5)(list5)));
const find=a=>b=>w(c=>A(N(c(LE)))(N(a(c))))(b)(c=>c(F))(T);
const list=(p(p('d')('4'))(p(p('c')('3'))(p(p('b')('2'))(p(p('a')('1'))(cT)))));
const list2=p('a')(p('b')(p('c')(cT)));
const list3=p('1')(p('2')(p('3')(cT)));
//const createFn=a=>b=>c=>b
