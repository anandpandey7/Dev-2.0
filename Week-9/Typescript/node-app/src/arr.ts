function maxValue(arr: number[]): number {
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }

    let max: number = arr[0]!;  // Add non-null assertion operator
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i]!;  // Add non-null assertion operator
        if (current > max) {
            max = current;
        }
    }
    return max;
}

console.log(maxValue([1, 2, 3]));  // Output: 3
console.log(maxValue([-1, -5, -3]));  // Output: -1

// "noUncheckedIndexedAccess": true,