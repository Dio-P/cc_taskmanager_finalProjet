import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DistinctTaskPage = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskCategory, setTaskCategory] = useState(null);
    const [taskPriority, setTaskPriority] = useState(null);

    const [hasDescription, setHasDescription] = useState(false);
    const [taskDescription, setTaskDescription] = useState(null);
    const [hasDate, setHasDate] = useState(false);
    const [taskDate, setTaskDate] = useState(null);
    const [hasTime, setHasTime] = useState(false);
    const [taskTime, setTaskTime] = useState(null);
    const [timedTaskType, setTimedTaskType] = useState(null);

    const [hasDuration, setHasDuration] = useState(false);
    const [taskDuration, setTaskDuration] = useState(null);
    const [hasCollaborators, setHasCollaborators] = useState(false);
    const [taskCollaborators, setTaskCollaborators] = useState(null);

    

    const location = useLocation();
    const task = location.state.task;
    const categories = location.state.categories;
    const priorities = location.state.priorities;
    console.log("location", location);
    console.log("task", task);

    const onClickingTheCheckedButton = () => {
            
    }

    return (
        

        <div>
            <h3>{task.title}</h3>
            <input type="checkbox" checked={task.completed}/>
             <div className="distinctTaskFieldBox">
                <p>{ task.type }</p>

                {task.date?
                <p>{ task.date }</p>
                :
                null
                }

                {task.time?
                <p>{ task.time }</p>
                :
                null
                }
             </div>

             <div>
                 <h4>Collaborators</h4>
             </div>

             <div>
                 <h4>Category</h4>
                 <p>{ task.category.title }</p>
             </div>

             <div>
                 <h4>Priority</h4>
                 <p>{ task.priority }</p>
             </div>

             <div>
                 <p>{ task.description }</p>
             </div>
        </div>
    )
}

export default DistinctTaskPage;