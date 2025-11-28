const fs = require('fs');
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// This code reads the contents of a file named 'a.txt' 
// using UTF-8 encoding and logs the content to the console. 
// If there is an error during the file reading process, it throws an error.

// What is UTF-8?
// UTF-8 is a variable-width character encoding used for electronic communication. 
// It can represent every character in the Unicode character set and is backward-compatible with ASCII.

// What is fs in Node.js?
// 'fs' stands for 'file system'. It is a built-in module in Node.js that provides 
// an API for interacting with the file system, allowing you to read, write, 
// and manipulate files and directories.

// What is callback in Node.js?
// A callback is a function passed as an argument to another function, 
// which is then invoked inside the outer function to complete some kind of routine or action. 
// Callbacks are commonly used for asynchronous operations in Node.js.

// What is err in Node.js?
// 'err' is a common convention for naming the first parameter of a callback function 
// that handles errors. If an error occurs during an asynchronous operation, 
// this parameter will contain the error object; otherwise, it will be null or undefined.

// What is data in Node.js?
// 'data' typically refers to the second parameter of a callback function 
// that contains the result of an asynchronous operation, such as reading a file. 
// In this context, it holds the contents of the file that was read.

// Types of file encoding in Node.js:
// 1. UTF-8: A variable-width character encoding that can represent every character in the Unicode character set.
// 2. ASCII: A 7-bit character encoding standard for electronic communication, representing text in computers.

// Types of Callbacks in js:
// 1. Synchronous Callbacks: Executed immediately during the execution of the function.
// 2. Asynchronous Callbacks: Executed after the completion of an asynchronous operation, such as file reading or network requests.

