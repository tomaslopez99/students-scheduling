import React, {useState} from 'react';
import Navbar, {Page} from "./components/navbar/Navbar";
import Students from "./components/students/Students";
import Courses from "./components/courses/Courses";
import {Course, Student} from "./types/Models";
import {CoursesData, StudentsData} from "./resources/Data";

function App() {
    const [activePage, setActivePage] = useState<Page>(Page.Students);
    const [searchText, setSearchText] = useState<string>("");
    const [students, setStudents] = useState<Student[]>(StudentsData);
    const [courses, setCourses] = useState<Course[]>(CoursesData);

    return (
        <div>
            <Navbar onPageSelected={(page) => {
                setActivePage(page);
            }} onSearch={setSearchText} search={searchText} />
            {activePage === Page.Students && <Students searchText={searchText} students={students} setStudents={setStudents}/>}
            {activePage === Page.Courses && <Courses searchText={searchText} courses={courses} setCourses={setCourses}/>}
        </div>
    );
}

export default App;
