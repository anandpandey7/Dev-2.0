console.log("Hello, World!");
// static vs Dynamic Typing
// Static Typing: Type of variable is known at compile time (e.g., C, Java)
// Dynamic Typing: Type of variable is known at runtime (e.g., Python, JavaScript)

// Example of Dynamic Typing in JavaScript
let dynamicVar = 42; // Initially a number
console.log(`dynamicVar is of type: ${typeof dynamicVar}`); // number
dynamicVar = "Hello, World!"; // Now a string
console.log(`dynamicVar is of type: ${typeof dynamicVar}`); // string

//why `var` (backticks for multi-line comments &
// They allow for embedding expressions directly within the string using the ${expression} syntax.

// 1. Function Scope vs Block Scope

// Using `var` inside a block does not create a new scope
if (true) {
    var functionScopedVar = "I am function scoped";
}
console.log(functionScopedVar); // Accessible here

// Using `let` inside a block creates a new scope
if (true) {
    let blockScopedVar = "I am block scoped";
    console.log(blockScopedVar); // Accessible here
}
// console.log(blockScopedVar); // ReferenceError: blockScopedVar is not defined

// 2. Hoisting Issues
console.log(hoistedVar); // undefined (due to hoisting)
var hoistedVar = "I am hoisted";
// console.log(notHoistedVar); // ReferenceError: Cannot access 'notHoistedVar' before initialization
let notHoistedVar = "I am not hoisted";

// 3. Global Namespace Pollution
var globalVar = "I am a global variable"; // Adds to global scope
let localVar = "I am a local variable"; // Does not add to global scope
console.log(window.globalVar); // Accessible in browser environment
console.log(window.localVar); // undefined in browser environment