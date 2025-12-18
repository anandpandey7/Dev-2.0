// type Input = number | string;

// function firstEl(arr: Input[]){
//     return arr[0];
// }

// const value = firstEl(["Ab","Bc"]);
// console.log(value.toUpperCase()); -> gives error

function identity <T>(arg: T){
    return arg;
}

let Output1= identity<number>(100);
let Output2= identity<string>("Hello ji");
console.log(Output1);
console.log(Output2);
