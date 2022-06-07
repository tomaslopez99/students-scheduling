import React, {useState} from "react";
import StudentCard from "./components/StudentCard";
import {Course, Student} from "../../types/Models";
import "./Students.css"
import StudentModal from "./components/StudentModal";
import {Button, Typography} from "@mui/material";
import {filterByValue} from "../../utils/Filter";

interface Props {
    students: Student[];
    setStudents: Function;
    searchText: string;
    courses: Course[];
    setCourses: Function;
}

const Students = ({students, setStudents, searchText, courses, setCourses}: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editStudent, setEditStudent] = useState<Student | undefined>();


    const onStudentDeleted = (student: Student) => {
        setStudents(students.filter(currentStudent => currentStudent.id !== student.id));
        setCourses(courses.map(course => {
            const studentName = `${student.firstName} ${student.lastName}`;
            if (course.students.includes(studentName)) {
                return {...course, students: course.students.filter(student => student !== studentName)};
            }
            return course;
        }));
    };

    const onEditStudent = (student: Student) => {
        setEditStudent(student);
        setOpenModal(true);
    };

    const updateCourses = (savedStudent: Student) => {
        // Updating the many-to-many relationship (not the best, but I chose the option of static dummy data handled within the React app)
        let updatedCourses = courses;

        savedStudent.courses.forEach(courseTitle => {
            const actualCourse = updatedCourses.find(course => course.title === courseTitle);
            const studentName = `${savedStudent.firstName} ${savedStudent.lastName}`;
            if (actualCourse && !actualCourse.students.includes(studentName)) {
                updatedCourses = updatedCourses.map(course => course.code === actualCourse.code ?
                    {...actualCourse, students: [...actualCourse.students, studentName]} :
                    course
                );
            }
        });

        updatedCourses = updatedCourses.map(course => {
            const studentName = `${savedStudent.firstName} ${savedStudent.lastName}`;
            if (course.students.includes(studentName) && !savedStudent.courses.includes(course.title)) {
                return {...course, students: course.students.filter(student => student !== studentName)};
            }
            return course;
        });

        setCourses(updatedCourses);
    }

    const onSavedStudent = (savedStudent: Student) => {
        if (students.some(student => student.id === savedStudent.id))
            setStudents(students.map(student => student.id === savedStudent.id ? savedStudent : student));
        else setStudents([...students, savedStudent]);
        setOpenModal(false);
        setEditStudent(undefined);
        updateCourses(savedStudent);
    };

    return (
        <div className={"students-container"}>
            <div className={"students-header"}>
                <Typography variant="h4">Students</Typography>
                <Button variant={"outlined"} size={"large"} color={"primary"} onClick={() => setOpenModal(true)}>
                    New Student
                </Button>
            </div>
            <div className={"students-list"}>
                <StudentModal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setEditStudent(undefined);
                    }}
                    student={editStudent} onSave={onSavedStudent}
                    courses={courses.map(course => course.title)}
                />
                {filterByValue(students, searchText).map(student =>
                    <StudentCard student={student} onEdit={onEditStudent} onDelete={onStudentDeleted}/>
                )}
            </div>
        </div>
    )
}

export default Students;
