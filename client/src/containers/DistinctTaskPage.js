import { useNavigate, useLocation } from "react-router-dom";

const DistinctTaskPage = () => {
    const location = useLocation();
    const task = location.state.task;
    console.log("location", location);
    console.log("task", task);

    const onClickingTheCheckedButton = () => {
            
    }

    return (
        

        <div>
            <h3>{task.title}</h3>
            
        
            <input type="checkbox" checked={task.completed}/>
             
            
            
        </div>
    )
}

export default DistinctTaskPage;