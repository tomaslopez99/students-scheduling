import {Course, Student} from "../types/Models";

export const StudentsData: Student[] = [
  {
    id: 234255,
    firstName: "Rick",
    lastName: "Novak",
    courses: []
  },
  {
    id: 345874,
    firstName: "Susan",
    lastName: "Connor",
    courses: []
  },
  {
    id: 324923,
    firstName: "Margaret",
    lastName: "Adelman",
    courses: []
  }
];

export const CoursesData: Course[] = [
  {
    code: 1,
    title: "Mathematics",
    description: "Learn the basics of Mathematics",
    students: []
  }
];
