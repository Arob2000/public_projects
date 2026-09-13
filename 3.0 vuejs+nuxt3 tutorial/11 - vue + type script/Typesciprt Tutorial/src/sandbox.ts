const character = 'mario';

console.log(character);

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
  console.log(input);
});
const circ=(diameter: number)=>{
  return diameter*Math.PI;
}

console.log(circ(30));

//arays
let names = ['mario', 'yoshi', 'luigi'];

names.push('toad');
// names.push(3);
// names[0] = 3;
let numbers = [10, 20, 30, 40];
numbers.push(25);

// numbers.push('luigi');
// numbers[1] = 'luigi';

let mixed =['ken', 4,'test',8,7];
mixed.push('tests');
mixed.push(10);
mixed[0]=3;

//objects

let ninja = {
  name: 'mario',
  belt: 'black',
  age: 30
};

ninja.age = 40;
ninja.name = 'ryu';

// ninja.age = '30';
// ninja.skills = ['fighting', 'sneaking'];

// ninja = {
//   name: 'yoshi',
//   age: 20,
//   belt: 'orange'
//  skills:['h','e']
// };

//eplicit types 
let tCharacter: string;
let tAge: number;

let isLoggedIn: boolean;

// tAge='hgf';
tAge=30;
// tCharacter=30;
tCharacter='mario';
//isLoggedIn=25;
isLoggedIn=true;

//arrays
let ninjas: string[] = [];
// ninjas =[10,32];
ninjas.push('mario');

//union types
let tMixed: (string|number|boolean)[] = [];
tMixed.push('hello');
tMixed.push(20);
tMixed.push(true);
console.log(tMixed);

let uid: string|number;
uid ='123';
uid=123;
//objects
let ninjaOne: object;
ninjaOne = {name:'yoshi', age:30};

let ninjaTwo: {
  name: string,
  age: number,
  beltColour: string
};

ninjaTwo = {name:'mario', age:20, beltColour:'black'};

//any type

let age:any = 25;
age = true;
console.log(age);
age='hello';
console.log(age);
age={name:'luigi'}
console.log(age);

let aMixed: any[] = [];
aMixed.push(5);
aMixed.push('mario');

let ninjaMixed:{name:any , age: any};
ninjaMixed = {name:'yoshi', age:25};
console.log(ninjaMixed);
ninjaMixed = {name:25, age:'yoshi'};
console.log(ninjaMixed);

//functions
let greet: Function;
// greet='hello';
greet = () => {
  console.log('hello world');
}
const add= (a:number, b:number,c?: number|string) :void=>{
  console.log(a+b);
  console.log(c);
}
//  or const add= (a:number, b:number,c: number|string = 10) =>{
//   console.log(a+b);
//   console.log(c);
// }

add(5,10);
const minus = (a:number, b:number) :number =>{
  return a+b;
}
let result = minus(10,7);
// result ='hel';

//type alias

// const logDetails =(uid:string | number, item: string)=>{
//   console.log(`${item} has a uid of ${uid}`);
// }
// const greetT = (user:{name:string, uid:string|number})=>{
//   console.log(`${user.name} says hello`);
// }
// let greetAgain= (user:{name:string, uid:string|number}) => {
//   console.log(`${user.name} says hello`);

// };

type stringOrNum = string|number;
type objWithName = {name:string, uid:stringOrNum};

const logDetails =(uid:stringOrNum, item: string)=>{
  console.log(`${item} has a uid of ${uid}`);
}
const greetT = (user:objWithName)=>{
  console.log(`${user.name} says hello`);
}

let greetAgain= (user:objWithName) => {
  console.log(`${user.name} says hello`);

};

//function signature
  let greetT2: (a:string, b:string) => void;
  greetT2 = (name:string, greeting:string) =>{
    console.log(`${name} says ${greeting}`);
  }
  //example 2
  let calc: (a:number, b:number, c:string) => number;
  calc = (numOne:number, numTwo:number, action:string) =>{
    if(action === 'add'){
      return numOne + numTwo;
    }else{
      return numOne - numTwo;
    }
  }
  //example 3
  let logDetails2: (obj:{name:string, age:number}) => void;
  type person = {name:string, age:number}
  logDetails2 = (ninja: person) =>{
    console.log(`${ninja.name} is ${ninja.age} years old`);
  }

  //type casting
  // const anchor = document.querySelector('a');
  // if(anchor)
  // console.log(anchor.href);
  // const anchor = document.querySelector('a')!; // to suppress the null warning if we are sure it will not be null
  // console.log(anchor.href);
  // const form = document.querySelector('form')!;
  // console.log(form.action);
  const form = document.querySelector('.new-item-form') as HTMLFormElement; // here we did type casting as HTMLForm ELement and we use as we need to make sure the element is present in the dom
  // console.log(form.children);
  const type= document.querySelector('#type') as HTMLSelectElement;
  const toFrom= document.querySelector('#tofrom') as HTMLInputElement;
  const details= document.querySelector('#details') as HTMLInputElement;
  const amount= document.querySelector('#amount') as HTMLInputElement;
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(
      type.value,
      toFrom.value,
      details.value,
      amount.valueAsNumber
    );
  })

  //classes
  class invoice{
    client:string;
    details:string;
    amount:number;
    constructor(c:string, d:string, a:number){
      this.client = c;
      this.details = d;
      this.amount = a;
    }
    format(){
      return `${this.client} owes ${this.amount} for ${this.details}`;
    }
  }
  const invOne = new invoice('mario','work on the mario website',250);
  const invTwo = new invoice('lui','work on the lui website',400);

  console.log(invOne,invTwo);

  let invoices: invoice[] =[];
  invoices.push(invOne);
  invoices.push(invTwo);

  console.log(invOne,invTwo);

  invOne.client='yoshi';
  invTwo.amount=400;

  console.log(invOne,invTwo);

  console.log(invoices);

//access modifiers 
  class invoice2{
    readonly client:string; // wecan acess it but not change it
    private details:string; // we can only acess th eprive using get methods outside the class
    public amount:number; //you can access or change
    constructor(c:string, d:string, a:number){
      this.client = c;
      this.details = d;
      this.amount = a;
    }
    format(){
      // this.client='rfgfd';
      return `${this.client} owes ${this.amount} for ${this.details}`;
    }
  }
  const invOne2 = new invoice2('mario','work on the mario website',250);
  const invTwo2 = new invoice2('lui','work on the lui website',400);

  console.log(invOne2,invTwo2);

  let invoices2: invoice2[] =[];
  invoices2.push(invOne2);
  invoices2.push(invTwo2);

 invoices2.forEach(inv => {
    // inv.client='sadsa';
    console.log(inv.client,inv.amount,inv.format);
 });

 //using shorthand
 class invoice3{
  constructor( 
    readonly client:string,
    private details:string,
    public amount:number,){
    }
    format(){
      return `${this.client} owes ${this.amount} for ${this.details}`;
    }
 }
//modules
//see app.ts  invoice.ts index.html

//interfaces
interface isPerson{
  name:string;
  age:number;
  speak(a:string):void;
  spend(a:number):number;
}
const me:isPerson={
  name:'mario',
  age:30,
  speak(text:string):void{
    console.log(text);
  },
  spend(amount:number):number{
    console.log('I spent',amount);
    return amount;
  },
  // skills:[],
}
const greetPerson = (person:isPerson)=>{
  console.log('hello',person.name);
}
console.log(me);
// greetPerson('hello');
greetPerson(me);
//interface with classes 
//check app.ts payment and classes and interfaces

//generics
const addUID =<T extends object>(obj:T)=>{ // allows only objects
  let uid = Math.floor(Math.random()*100);
  return {...obj,uid};
}
const addUID2 =<T extends {name: string}>(obj:T)=>{ // allows only objects with name properity with string type
  let uid = Math.floor(Math.random()*100);
  return {...obj,uid};
}
let docThree = addUID({name:'yoshi', age: 40});
// let docFour = addUID('hello');

console.log(docThree.name);

//using interfaces with generics
interface Resource<T>{
  uid:number;
  resourceName:string;
  data: T;
}
//decorators