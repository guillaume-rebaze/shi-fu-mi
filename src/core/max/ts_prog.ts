import { number } from "@effect-ts/core/Equal"

type People = {
    name: string,
    age: number,
}

class JackPerson {
    name: string = "Jack"
    age: number
    constructor(
        age: number
    ) {
        this.age = age
    }
}

const aPerson = new JackPerson(12)
export const randListPerson = (count: number): JackPerson[] => {

    const array = new Array<JackPerson>(count)
    for (let personIndex in array) {
        array[personIndex] = new JackPerson(Math.round(Math.random() * 100))
    }

    // let array: JackPerson[] = []
    // for (let i = 0; i < count; i++) {
    //     array.push(new JackPerson(Math.round(Math.random() * 100)))
    // }

    console.log(array)
    return array
}

const createPerson = (people: People): People => {
    return {
        name: people.name,
        age: people.age,
    }
}

export const a = 1