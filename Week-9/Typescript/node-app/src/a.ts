const x: number = 1;
console.log(x);

function greet( firstName : string ){
    console.log("Hello" + firstName);
}

function sum( a: number, b: number): number {
    return a+b;
}

greet("Raju");
const value = sum(1,3);
console.log(value);

function main(fn: () => void) {
  fn();
}

function sayHello() {
  console.log("Hello!");
}

main(sayHello);
