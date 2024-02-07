export const getRandomArray = (min: number, max: number): null[] => {
    const rand = min + getRandNum(max - min)

    return getArrayOfSize(rand)
}

export const getArrayOfSize = (length: number) => {
    return new Array(length).fill(null)
}

export const getRandNum = (exclusiveMax: number) => {
    return Math.floor(Math.random() * exclusiveMax)
}
