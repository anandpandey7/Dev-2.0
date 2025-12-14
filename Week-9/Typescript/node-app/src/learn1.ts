interface User {
    firstName: string,
    lastName: string,
    age: number
}

function isLegial(user :{
    firstName: string,
    lastName: string,
    age: number
}) : boolean{
    if(user.age>18){
        return true;
    }
    else return false;
}

function greet(user : User) {
    console.log("Hello " + user.firstName);
}

isLegial({
    firstName: "Anand",
    lastName: "Raj",
    age: 20,
})

greet({
    firstName: "Anand",
    lastName: "Raj",
    age: 20,
})