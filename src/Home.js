
import { useNavigate } from "react-router-dom";
import "./Home.css"
import stuImage from "./student.png";
import worImage from "./worker.png";
export default function Home(){

    const navigate=useNavigate();

    let handleStudent=()=>{
        navigate("/login");
    }
    let handleWorker=()=>{
        navigate("/loginworker");
    }
    return(
        <div className="body">
            <h1>Welcome!</h1>
            <div className="container">
                <div className="box">
                    <div className="icon">
                        <img src={stuImage} alt="Student img" onClick={handleStudent} className="Stu_img"/>
                        
                    </div>
                    <b>Student</b>
                </div>
                <div className="box">
                    <div className="icon">
                        <img src={worImage} alt="Worker img" onClick={handleWorker} className="Wor_img"/>
                    </div>
                    <b>Worker</b>
                </div>
            </div>
        </div>
    );
}