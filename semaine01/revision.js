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