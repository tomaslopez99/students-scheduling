import {Course, Student} from "../types/Models";

export const StudentsData: Student[] = [
  {
    id: 234255,
    firstName: "Rick",
    lastName: "Novak",
    courses: ["Computer Systems Security", "Mathematics"]
  },
  {
    id: 345874,
    firstName: "Susan",
    lastName: "Connor",
    courses: ["Object Oriented Programming"]
  },
  {
    id: 324923,
    firstName: "Margaret",
    lastName: "Adelman",
    courses: []
  },
  {
    id: 432439,
    firstName: "Ronald",
    lastName: "Barr",
    courses: ["Computer Systems Security", "Machine Learning", "Object Oriented Programming"]
  },
  {
    id: 987543,
    firstName: "Roger",
    lastName: "Lum",
    courses: ["Machine Learning"]
  }
];

export const CoursesData: Course[] = [
  {
    code: 845343,
    title: "Computer Systems Security",
    description: "Learn the basics of Computer Security.",
    students: ["Rick Novak", "Ronald Barr"]
  },
  {
    code: 504349,
    title: "Machine Learning",
    description: "Learn the basics Machine Learning.",
    students: ["Rick Novak", "Ronald Barr", "Roger Lum"]
  },
  {
    code: 124832,
    title: "Object Oriented Programming",
    description: "Learn the basics of Object Oriented Programming using Java.",
    students: ["Susan Connor", "Ronald Barr"]
  },
  {
    code: 432987,
    title: "Mathematics",
    description: "Learn the basics of Mathematics.",
    students: ["Rick Novak"]
  },
  {
    code: 732493,
    title: "Creating Dynamic Websites",
    description: "Create your first dynamic website using the latest frameworks.",
    students: []
  }
];
