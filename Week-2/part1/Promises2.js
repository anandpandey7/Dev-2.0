// Promisifying this asynchronous function
function myOwnSetTimeout(callback, duration){
    setTimeout(callback(), duration);
}

let myPromise = new Promise((resolve, reject) => {
    myOwnSetTimeout(() => {
        let success = true; // Simulating success or failure
        if (success) {
            resolve("Data fetched successfully!");
        } else {
            reject("Error: Failed to fetch data.");
        }
    }, 2000);
});

// Consuming the promise
myPromise
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });
