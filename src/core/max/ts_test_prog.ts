interface ABC {
    firstName: string
    lastName: string
}


const createABC = (
    _firstName: string = "Jack",
    _lastName: string = "Dan",
): ABC => {
    return {
        firstName: _firstName,
        lastName: _lastName,
    }
}

export const ABCrenameFirstName = (abc:ABC, newFirstName:string):ABC => {
    return {
        firstName: newFirstName,
        lastName: abc.lastName,
    }
}

export const myABC_2: ABC = createABC()

const myABC: ABC = {
    firstName: "Jack",
    lastName: "Dynamo",
}
