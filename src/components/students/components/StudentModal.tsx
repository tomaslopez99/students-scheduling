import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Student} from "../../../types/Models";
import {TextField} from "@mui/material";
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

interface Props {
    open: boolean;
    onClose: () => void;
    student?: Student;
    onSave: (newStudent: Student) => void;
}

const StudentModal = ({open, onClose, student, onSave}: Props) => {
    const [firstName, setFirstName] = useState<string>(student?.firstName || "");
    const [lastName, setLastName] = useState<string>(student?.lastName || "");

    useEffect(() => {
        if (student) {
            setFirstName(student.firstName);
            setLastName(student.lastName);
        }
        else {
            setFirstName("");
            setLastName("")
        }
    }, [student])

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
                    <TextField style={{marginTop: 16}} label="First Name" variant="outlined" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <TextField style={{marginTop: 16}} label="Last Name" variant="outlined" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div style={{float: "right", marginTop: 16}}>
                    <Button variant="outlined" color="error" style={{marginRight: 12}} onClick={onClose}>Cancel</Button>
                    <Button variant={"outlined"} color={"primary"} onClick={() => onSave({id: student?.id || Math.floor(100000 + Math.random() * 900000), firstName, lastName, courses: student?.courses || []})}>Save</Button>
                </div>
            </Box>
        </Modal>
    );
}

export default StudentModal;
