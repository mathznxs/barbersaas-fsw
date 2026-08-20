type Order = {
    productId: string | number;
    price: number;
};

type User = {
    firstName: string
    age: number
    email: string
    password?: string
    orders: Order[]
    register(): string
}

const user: User = {
    firstName: "Math",
    age: 18,
    email: "odevmathias@gmail.com",
    orders: [{productId: "123", price: 200}],
    register() {
        return "A";
    },
}

const printLog = (message: string) => {}
printLog(user.password!)

// Unions

type Author = {
    books: string[]
}

const author: Author & User = {
    age: 2,
    books: ['1'],
    email: "odevmathias@gmail.com",
    firstName: "Mathias",
    orders: [],
    register() {
        return "a"
    },
}

// Interfaces

interface UserInterface {
    readonly firstName: string
    email: string
}
const emailUser: UserInterface = {
    email: "math945374081@gmail.com",
    firstName: "Math"
}

interface AuthorInteface {
    books: string[]
}

const newAuthor: UserInterface & AuthorInteface = {
    email: "odevmathias@gmail.com",
    firstName: "Mathias",
    books: []
}

type Grade = number | string
const grade: Grade = 1