import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Delete, Edit} from "@mui/icons-material";
import {Course} from "../../../types/Models";
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
    course: Course;
    onEdit: (course: Course) => void;
    onDelete: (courseCode: number) => void;
}

const CourseCard = ({course, onEdit, onDelete}: Props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: 360, display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: 3, marginRight: 3 }}
              style={!expanded ? {maxHeight: 216} : {}}>
            <CardHeader
                title={course.title}
                subheader={`Code: #${course.code}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {course.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton color={"primary"} onClick={() => onEdit(course)}>
                    <Edit />
                </IconButton>
                <IconButton color={"error"} onClick={() => onDelete(course.code)} >
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
                <CardContent style={{paddingTop: 0}}>
                    <Typography variant="h6">
                        Students
                    </Typography>
                    {course.students.map(student => <Chip label={student} variant="outlined" style={{marginTop: 10, marginRight: 10}}/>)}
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default CourseCard;
