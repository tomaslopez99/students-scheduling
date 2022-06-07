import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Delete, Edit} from "@mui/icons-material";
import {Student} from "../../../types/Models";
import {Chip} from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface Props {
    student: Student;
    onEdit: (student: Student) => void;
    onDelete: (student: Student) => void;
}

const StudentCard = ({student, onEdit, onDelete}: Props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: 360, display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: 3, marginRight: 3 }}
              style={!expanded ? {maxHeight: 192} : {}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {student.firstName[0] + student.lastName[0]}
                    </Avatar>
                }
                title={`${student.firstName} ${student.lastName}`}
                subheader={`ID: #${student.id}`}
            />
            <CardContent>
                {student.courses.length > 0 ?
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography style={{marginRight: 6}}>
                            Last course:
                        </Typography>
                        <Chip label={student.courses[student.courses?.length - 1]} variant="outlined"/>
                    </div> :
                    <Typography variant="body2" color="text.secondary">
                        The student has no courses.
                    </Typography>
                }
            </CardContent>
            <CardActions disableSpacing>
                <IconButton color={"primary"} onClick={() => onEdit(student)}>
                    <Edit />
                </IconButton>
                <IconButton color={"error"} onClick={() => onDelete(student)} >
                    <Delete />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent style={{marginTop: 0}}>
                    <Typography variant="h6">
                        Courses
                    </Typography>
                    {student.courses.map(course => <Chip label={course} variant="outlined" style={{marginRight: 10, marginTop: 10}}/>)}
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default StudentCard;
