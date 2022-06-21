import React from "react";
import CreateProjectBTN from "./createProject";
import CreateTaskBTN from "./createTask";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname

    const createBTN = () => {
        if(path === '/') return <CreateProjectBTN/> 
        return <CreateTaskBTN/>
    }

 return (
     <nav style={{display:"flex",justifyContent:"space-between",backgroundColor:"#eeeeee",color:"#1f1f1f"}}>
       <img className="navbar-brand" style={{width :"40px",marginLeft:"5px"}}  onClick={()=>navigate("/")}
         src="https://wealthdepot.com.au/cms/wp-content/uploads/2021/02/Jan-pic-3.jpg"></img>  
       <div style={{display:"flex",justifyContent:"space-between",width:"53%"}}>  
            {createBTN()}
            <button className="btn btn-primary" style={{margin:"5px"}}>Login</button>
       </div>
     </nav>
 );
}
export default Navbar