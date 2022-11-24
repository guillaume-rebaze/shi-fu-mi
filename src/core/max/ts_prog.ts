import { number } from "@effect-ts/core/Equal"

interface PeopleState {
    name: string,
    age: number
}

interface People {
    name: string,
    age: number,
    changeName: (newName: string) => PeopleState,
    fun(): void
}

const createPeople = (
    name: string = "Jean",
    age: number = 0,
    changeName: (newName: string) => PeopleState = (newName: string) => { return { name: newName, age: age } },
    fun: () => void = () => { }
): People => {
    return {
        name: name,
        age: age,
        changeName,
        fun
    }
}

const peopleChangeName = (people: People, newName: string): People => {
    people.name = newName
    return people
}

export const people = createPeople()
people.changeName("Jean2")

class PeopleV2 {
    name: string
    age: number
    constructor(
        name: string,
        age: number,
    ) {
        this.name = name
        this.age = age
    }

    changeName(newName:string): PeopleV2{
        this.name = newName
        return this
    }

    changeAge(newAge:number): PeopleV2{
        this.age = newAge
        return this
    }

}

const people2 = new PeopleV2("Jean", 42)
const test = people2.changeName("Jean2").changeAge(23)
