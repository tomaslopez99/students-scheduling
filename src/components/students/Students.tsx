import React, {useState} from "react";
import StudentCard from "./components/StudentCard";
import {Student} from "../../types/Models";
import "./Students.css"
import StudentModal from "./components/StudentModal";
import {Button, Typography} from "@mui/material";
import {filterByValue} from "../../utils/Filter";

interface Props {
    students: Student[];
    setStudents: Function;
    searchText: string;
}

const Students = ({students, setStudents, searchText}: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editStudent, setEditStudent] = useState<Student | undefined>();


    const onStudentDeleted = (studentId: number) => {
        setStudents(students.filter(student => student.id !== studentId));
    };

    const onEditStudent = (student: Student) => {
        setEditStudent(student);
        setOpenModal(true);
    };

    const onSavedStudent = (savedStudent: Student) => {
        if (students.some(student => student.id === savedStudent.id))
            setStudents(students.map(student => student.id === savedStudent.id ? savedStudent : student));
        else setStudents([...students, savedStudent]);
        setOpenModal(false);
        setEditStudent(undefined);
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
                />
                {filterByValue(students, searchText).map(student =>
                    <StudentCard student={student} onEdit={onEditStudent} onDelete={onStudentDeleted}/>
                )}
            </div>
        </div>
    )
}

export default Students;
