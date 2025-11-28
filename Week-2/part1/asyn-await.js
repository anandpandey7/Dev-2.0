// Asynchronous function using async/await
async function fetchData() {
    try {
        await promisifiedMyOwnSetTimeout(2000);
        console.log("Called after 2 seconds");
    } catch (error) {
        console.error(error);
    }
}

function promisifiedMyOwnSetTimeout(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

fetchData();

// This code defines an asynchronous function fetchData that waits for the
// completion of a promise returned by promisifiedMyOwnSetTimeout. 
// It logs the result if the promise is resolved or logs an error if the promise is rejected.   
// The function is then called to demonstrate its functionality.

// What is async/await in JavaScript?
// Async/await is a syntactic feature in JavaScript that allows you to write asynchronous code 
// in a more synchronous and readable manner. It is built on top of Promises and provides a way 
// to handle asynchronous operations without the need for chaining .then() calls.

// How does async/await work?
// 1. The async keyword is used to declare a function as asynchronous. 
//    This means that the function will always return a Promise.
// 2. The await keyword is used inside an async function to pause the execution
//    until the Promise is resolved or rejected. It can only be used within
//    async functions.