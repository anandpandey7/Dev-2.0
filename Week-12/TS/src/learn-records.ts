interface User {
    id: string;
    name: string;
}

type Users = Record<string,User>;
// similar t0 type Users = { [key: string]: User };

const users: Users = {
    'abx123': {id: "abx123", name: "Anand"},
    'abc123': {id: "abc123", name: "Jon"}
}

console.log(users['abc123']);