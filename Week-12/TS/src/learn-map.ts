// Note this is a Js concept
const users = new Map<string, {name: string, age: number, email: string}>();

users.set("adc", {name: "Unauthorized", age:401, email:"status@code.com" });
users.set("pqr", {name: "Created", age:201, email:"status@code.com" });

console.log(users.get("pqr"));