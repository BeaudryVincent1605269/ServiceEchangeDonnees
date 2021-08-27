const theName = 'Vincent';
let age = 25;

console.log(theName);

age++;
console.log(age);


const test = 1 + true;
const test2 = 1 + false;
const test3 = '9' + false;


console.log(test);
console.log(test2);
console.log(test3);
console.log(('b'+'a'+ +'a'+'a'));

function displayUser(name, age) {
//console.log('Je m\'appel ' + name + ' et j\'ai ' + age + ' ans')
console.log(`Bonjour mon nom est ${name}, j'ai ${age} ans`);
}

displayUser('Cotineau' ,11);

// Collection tableau, Liste

const fruits = ['Kiwi','Banane', 'fraise', 'Pamplemousse', 'Mangue'];

console.log(fruits);

for(let fruit of fruits) {
    console.log(fruit);
}

fruits.forEach(f => console.log(f));

const sum = (a,b) => a+b;

const result = sum(2,5);
console.log(result);

const someFruits = fruits.filter(f => f.length > 5 );
console.log(someFruits);

const numbers = [10,20,30,40];
const MULTIPLIER = 3;

const products = numbers.map(n => n* MULTIPLIER);
console.log(products);

/*const test = numbers.map(n => n* MULTIPLIER).filter(n => n > 75).map(n => n + 9);
console.log(test);*/

numbers.push(50);
console.log(numbers);

const avenger = {
    alterEgo:'Peter Parker',
    hero:'SpiderMan',
    movies:[{title:'Tony Hawk'},{title:'Tony Hawk The Return'},{title:'Ultimate Tony hawk against the police'}]
}

console.log(avenger.alterEgo);
console.log(avenger.movies);
avenger.movies.forEach(m => console.log(m.title));

if(1 == '1') {
    
}

