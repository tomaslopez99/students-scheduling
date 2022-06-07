import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Student} from "../../../types/Models";
import {
    Checkbox, FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const newStudent: Student = {
    id: Math.floor(100000 + Math.random() * 900000),
    firstName: "",
    lastName: "",
    courses: []
}

interface Props {
    open: boolean;
    onClose: () => void;
    student?: Student;
    onSave: (newStudent: Student) => void;
    courses: string[]
}

const StudentModal = ({open, onClose, student, onSave, courses}: Props) => {
    const [updatedStudent, setUpdatedStudent] = useState<Student>(newStudent);

    useEffect(() => {
        if (student) setUpdatedStudent(student);
    }, [student])

    const handleChange = (event: SelectChangeEvent<typeof updatedStudent.courses>) => {
        const {
            target: { value },
        } = event;
        const updatedCourses = typeof value === 'string' ? value.split(',') : value;
        setUpdatedStudent({...updatedStudent, courses: updatedCourses})
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {student ? "Edit student" : "Create student"}
                </Typography>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <TextField style={{marginTop: 16}} label="First Name" variant="outlined" value={updatedStudent.firstName}
                               onChange={e => setUpdatedStudent({...updatedStudent, firstName: e.target.value})}
                    />
                    <TextField style={{marginTop: 16}} label="Last Name" variant="outlined" value={updatedStudent.lastName}
                               onChange={e => setUpdatedStudent({...updatedStudent, lastName: e.target.value})}
                    />
                    <FormControl style={{marginTop: 16}}>
                        <InputLabel id="demo-multiple-checkbox-label">Courses</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={updatedStudent.courses}
                            onChange={handleChange}
                            input={<OutlinedInput label="Courses" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {courses.map((course) => (
                                <MenuItem key={course} value={course}>
                                    <Checkbox checked={updatedStudent.courses.indexOf(course) > -1} />
                                    <ListItemText primary={course} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{float: "right", marginTop: 16}}>
                    <Button variant="outlined" color="error" style={{marginRight: 12}} onClick={onClose}>Cancel</Button>
                    <Button variant={"outlined"} color={"primary"}
                            onClick={() => {
                                onSave(updatedStudent);
                                setUpdatedStudent(newStudent);
                            }}
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default StudentModal;
