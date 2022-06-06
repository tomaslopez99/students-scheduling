export type Student = {
    id: number,
    firstName: string,
    lastName: string,
    courses: Course[]
}

export type Course = {
    code: number,
    title: string,
    description: string,
    students: Student[]
}
