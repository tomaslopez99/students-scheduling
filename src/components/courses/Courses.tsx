import React, {useState} from "react";
import StudentCard from "./components/CourseCard";
import {Course, Student} from "../../types/Models";
import "./Courses.css"
import {Button, Typography} from "@mui/material";
import CourseModal from "./components/CourseModal";
import {filterByValue} from "../../utils/Filter";

interface Props {
    courses: Course[];
    setCourses: Function;
    searchText: string;
    students: Student[];
    setStudents: Function;
}

const Courses = ({courses, setCourses, searchText, students, setStudents}: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editCourse, setEditCourse] = useState<Course | undefined>();

    const onCourseDeleted = (course: Course) => {
        setCourses(courses.filter(currentCourse => currentCourse.code !== course.code));
        setStudents(students.map(student => {
            if (student.courses.includes(course.title)) {
                return {...student, courses: student.courses.filter(currentCourse => currentCourse !== course.title)};
            }
            return student;
        }));
    };

    const onEditCourse = (course: Course) => {
        setEditCourse(course);
        setOpenModal(true);
    };

    const updateStudents = (savedCourse: Course) => {
        // Updating the many-to-many relationship (not the best, but I chose the option of static dummy data handled within the React app)
        let updatedStudents = students;

        savedCourse.students.forEach(studentName => {
            const actualStudent = updatedStudents.find(student => `${student.firstName} ${student.lastName}` === studentName);
            if (actualStudent && !actualStudent.courses.includes(savedCourse.title)) {
                updatedStudents = updatedStudents.map(student => student.id === actualStudent.id ?
                    {...actualStudent, courses: [...actualStudent.courses, savedCourse.title]} :
                    student
                );
            }
        });

        updatedStudents = updatedStudents.map(student => {
            if (student.courses.includes(savedCourse.title) && !savedCourse.students.includes(`${student.firstName} ${student.lastName}`)) {
                return {...student, courses: student.courses.filter(course => course !== savedCourse.title)};
            }
            return student;
        });

        setStudents(updatedStudents);
    }

    const onSavedCourse = (savedCourse: Course) => {
        if (courses.some(course => course.code === savedCourse.code))
            setCourses(courses.map(course => course.code === savedCourse.code ? savedCourse : course));
        else setCourses([...courses, savedCourse]);
        setOpenModal(false);
        setEditCourse(undefined);
        updateStudents(savedCourse);
    };

    return (
        <div className={"courses-container"}>
            <div className={"courses-header"}>
                <Typography variant="h4">Courses</Typography>
                <Button variant={"outlined"} size={"large"} color={"primary"} onClick={() => setOpenModal(true)}>
                    New Course
                </Button>
            </div>
            <div className={"courses-list"}>
                <CourseModal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setEditCourse(undefined);
                    }}
                    course={editCourse} onSave={onSavedCourse}
                    students={students.map(student => `${student.firstName} ${student.lastName}`)}
                />
                {filterByValue(courses, searchText).map(course =>
                    <StudentCard course={course} onEdit={onEditCourse} onDelete={onCourseDeleted}/>
                )}
            </div>
        </div>
    )
}

export default Courses;
