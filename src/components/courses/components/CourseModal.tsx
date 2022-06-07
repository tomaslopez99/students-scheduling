import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Course} from "../../../types/Models";
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

const newCourse = {
    code: Math.floor(100000 + Math.random() * 900000),
    title: "",
    description: "",
    students: []
}

interface Props {
    open: boolean;
    onClose: () => void;
    course?: Course;
    onSave: (newCourse: Course) => void;
    students: string[];
}

const CourseModal = ({open, onClose, course, onSave, students}: Props) => {
    const [updatedCourse, setUpdatedCourse] = useState<Course>(newCourse);

    useEffect(() => {
        if (course) setUpdatedCourse(course);
    }, [course])

    const handleChange = (event: SelectChangeEvent<typeof updatedCourse.students>) => {
        const {
            target: { value },
        } = event;
        const updatedStudents = typeof value === 'string' ? value.split(',') : value;
        setUpdatedCourse({...updatedCourse, students: updatedStudents})
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
                    {course ? "Edit course" : "Create course"}
                </Typography>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <TextField style={{marginTop: 16}} label="Title" variant="outlined" value={updatedCourse.title}
                               onChange={e => setUpdatedCourse({...updatedCourse, title: e.target.value})}
                    />
                    <TextField style={{marginTop: 16}} label="Description" multiline variant="outlined"
                               value={updatedCourse.description} onChange={e => setUpdatedCourse({...updatedCourse, description: e.target.value})}
                    />
                    <FormControl style={{marginTop: 16}}>
                        <InputLabel id="demo-multiple-checkbox-label">Students</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={updatedCourse.students}
                            onChange={handleChange}
                            input={<OutlinedInput label="Students" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {students.map((student) => (
                                <MenuItem key={student} value={student}>
                                    <Checkbox checked={updatedCourse.students.indexOf(student) > -1} />
                                    <ListItemText primary={student} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{float: "right", marginTop: 16}}>
                    <Button variant="outlined" color="error" style={{marginRight: 12}} onClick={onClose}>Cancel</Button>
                    <Button variant={"outlined"} color={"primary"}
                            onClick={() => {
                                onSave(updatedCourse);
                                setUpdatedCourse(newCourse);
                            }}
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default CourseModal;
