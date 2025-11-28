function promisifiedMyOwnSetTimeout(duration) {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
    return p;
}

const ans = promisifiedMyOwnSetTimeout(3000);
ans.then(() => {
    console.log("Called after 3 seconds");
});
