let age: number = 5;
const name: string = "Mathias"
const isValid: boolean = true;
let idk: any = 4;

idk = '125';
idk = true;

const ids: number[] = [1, 2, 3, 4, 5]
const booleans: boolean[] = [true, false, true, false];
const names: string[] = ["Mathias", "Patricia"]

// Tupla
const person: [number, string] = [1, 'sla']

// Lista de tuplas

const people: [number, string][] = [
    [1, 'Math'],
    [2, 'Bela'],
    [3, 'Pedro']
]

// Intersection
const productId: string | number | boolean = false;

// Enum
enum Direction {
    Up = 1,
    Down = 2,
    Left = "Esquerda",
}

const direction = Direction.Left;
const productName: any = "Boné"

let itemId = <string>productName;
    
console.log(direction)

