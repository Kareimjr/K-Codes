import { Outlet, useLocation } from "react-router-dom";
import StudentViewHeader from "./header";
import Footer from "./Footer";



function StudentViewCommonLayout() {

    

    const location = useLocation()

    return ( 
        <div>
            {
                !location.pathname.includes('/student/course/progress') ?
                <StudentViewHeader/> : null
            }
            <Outlet/>
            {
                !location.pathname.includes('/student/course/progress') ?
                <Footer/> : null
            }
        </div>
     );
}

export default StudentViewCommonLayout;