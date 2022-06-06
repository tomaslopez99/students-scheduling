export type Student = {
    id: number,
    firstName: string,
    lastName: string,
    courses: string[]
}

export type Course = {
    code: number,
    title: string,
    description: string,
    students: string[]
}
