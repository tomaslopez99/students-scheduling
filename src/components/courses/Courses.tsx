import React, {useState} from "react";
import StudentCard from "./components/CourseCard";
import {Course} from "../../types/Models";
import "./Courses.css"
import {Button, Typography} from "@mui/material";
import CourseModal from "./components/CourseModal";
import {filterByValue} from "../../utils/Filter";

interface Props {
    courses: Course[];
    setCourses: Function;
    searchText: string;
}

const Courses = ({courses, setCourses, searchText}: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editCourse, setEditCourse] = useState<Course | undefined>();

    const onStudentDeleted = (courseCode: number) => {
        setCourses(courses.filter(course => course.code !== courseCode));
    };

    const onEditCourse = (course: Course) => {
        setEditCourse(course);
        setOpenModal(true);
    };

    const onSavedCourse = (savedCourse: Course) => {
        if (courses.some(course => course.code === savedCourse.code))
            setCourses(courses.map(course => course.code === savedCourse.code ? savedCourse : course));
        else setCourses([...courses, savedCourse]);
        setOpenModal(false);
        setEditCourse(undefined);
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
                />
                {filterByValue(courses, searchText).map(course =>
                    <StudentCard course={course} onEdit={onEditCourse} onDelete={onStudentDeleted}/>
                )}
            </div>
        </div>
    )
}

export default Courses;
