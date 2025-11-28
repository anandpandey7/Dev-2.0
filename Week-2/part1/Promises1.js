let myPromise = new Promise((resolve, reject) => {
    // Simulate an asynchronous operation (e.g., fetching data)
    setTimeout(() => {
        let success = true; // Or false to simulate failure
        if (success) {
            resolve("Data fetched successfully!");
        } else {
            reject("Error: Failed to fetch data.");
        }
    }, 2000);
});

// Consuming the promise
// myPromise
//     .then((message) => {
//         console.log(message);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// Chaining promises
myPromise
    .then((message) => {
        console.log(message);
        return "Another success message!";
    })
    .then((newMessage) => {
        console.log(newMessage);
    })
    .catch((error) => {
        console.error(error);
    });

// What is Promise in JavaScript?
// A Promise is an object representing the eventual completion or failure of an asynchronous operation. 
// It allows you to handle asynchronous tasks more effectively by providing methods to handle success and failure cases.

// States of a Promise:
// 1. Pending: The initial state, neither fulfilled nor rejected.
// 2. Fulfilled: The operation completed successfully.
// 3. Rejected: The operation failed.

// Methods of a Promise:
// 1. then(): Used to handle the fulfillment of a promise.
// 2. catch(): Used to handle the rejection of a promise.
// 3. finally(): Used to execute code after the promise is settled, regardless of its outcome.

// Advantages of using Promises:
// 1. Improved readability and maintainability of asynchronous code.
// 2. Avoidance of callback hell by chaining multiple asynchronous operations.
// 3. Better error handling through catch() method.
// 4. Ability to run multiple asynchronous operations in parallel using Promise.all()
// 5. More control over the flow of asynchronous operations.
// 6. Integration with async/await syntax for cleaner asynchronous code.

// Example of Promise.all()
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("First promise resolved"), 1000);
});
let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Second promise resolved"), 2000);
});
let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Third promise resolved"), 3000);
});

// Using Promise.all() to handle multiple promises
Promise.all([promise1, promise2, promise3])
    .then((results) => {
        console.log("All promises resolved:");
        results.forEach((result) => console.log(result));
    })
    .catch((error) => {
        console.error("One or more promises rejected:", error);
    });

// Example of async/await with Promises
async function fetchData() {
    try {
        let result = await myPromise;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
fetchData();


// Promise takes a function (executor) as an argument, which has two parameters: resolve and reject.
// The resolve function is called when the asynchronous operation is successful, 
// while the reject function is called when it fails.

// is promise is constructor ?
// Yes, Promise is a constructor function in JavaScript. 
// You create a new Promise instance using the 'new' keyword followed by 'Promise', 
// and you pass an executor