interface User {
    id: number;
    name: string;
    age: string;
    email: string;
    password: string;
}

type UpdateProps = Pick<User, 'name' | 'age' | 'email'>;

type UpdatePropsOptional = Partial<UpdateProps>;

const UpdateUser = (user: UpdatePropsOptional) =>{
    // console.log(`Name: ${user.name}, Email: ${user.email}`);
};