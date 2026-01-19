// type User = {
//     readonly name: string;
//     readonly age: number;
// }

// const user: User = {
//     name: 'Anand',
//     age: 20
// }

// // user.age = 1;  cannot do this

// const user1: Readonly<User> = {
//     name: 'Anand',
//     age: 20
// }


interface Config {
    endPoint: string;
    apiKey: string;
}

const config: Readonly<Config> = {
    endPoint: "https://api.love.com",
    apiKey: "loveyourself"
}

// config.apiKey = "fwevrbqwbr" cannot do this