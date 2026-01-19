type User = {
    id: string;
    username: string;
}

type Users = {
    [key: string] : User;
}

const user = {
    "res@id": {
        id: "res@id",
        username: 'Anand'
    },
    "res@id1": {
        id: "res@id1",
        username: 'jdnfb'
    }
}