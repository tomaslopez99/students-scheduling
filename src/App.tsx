import React, {useState} from 'react';
import Navbar, {Page} from "./components/navbar/Navbar";
import Students from "./components/students/Students";
import Courses from "./components/courses/Courses";

function App() {
    const [activePage, setActivePage] = useState<Page>(Page.Students);

    return (
        <div>
            <Navbar onPageSelected={(page) => setActivePage(page)} />
            {activePage === Page.Students && <Students/>}
            {activePage === Page.Courses && <Courses/>}
        </div>
    );
}

export default App;
