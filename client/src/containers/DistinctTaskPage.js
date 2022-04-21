import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DistinctTaskPage = () => {
    const location = useLocation();
    const task = location.state.task;
    const categories = location.state.categories;
    const priorities = location.state.priorities;
    console.log("location", location);
    console.log("task", task);

    const [loading, setLoading] = useState(true);

    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskCompleted, setTaskCompleted] = useState(task.completed);

    const [taskCategory, setTaskCategory] = useState(task.category.title);
    const [taskPriority, setTaskPriority] = useState(task.priority);

    const [hasDescription, setHasDescription] = useState(false);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [hasDate, setHasDate] = useState(false);
    const [taskDate, setTaskDate] = useState(task.date);
    const [hasTime, setHasTime] = useState(false);
    const [taskTime, setTaskTime] = useState(null);
    const [timedTaskType, setTimedTaskType] = useState(null);

    const [hasDuration, setHasDuration] = useState(false);
    const [taskDuration, setTaskDuration] = useState(null);
    const [hasCollaborators, setHasCollaborators] = useState(false);
    const [taskCollaborators, setTaskCollaborators] = useState(null);

    
    useEffect(() => {
        setLoading(false)
        
    }, [taskTitle, taskCompleted, taskCategory, taskPriority]);
    

    const onClickingTheCheckedButton = () => {
            
    }

    return (
        

        <div>
            {loading?
            <h3>Loading</h3>
            :
            <div>
            <h3>{taskTitle}</h3>
            <input type="checkbox" checked={taskCompleted}/>

            <div>
                 <h4>Category</h4>
                 <p>{ taskCategory }</p>
             </div>

             <div>
                 <h4>Priority</h4>
                 <p>{ taskPriority }</p>
             </div>

             <div>
                 <p>{ taskDescription }</p>
             </div>

             <div>
                {taskDate?
                    <p>{ taskDate }</p>
                    :
                    null
                    }
             </div>

             <div className="distinctTaskFieldBox">
                <p>{ task.type }</p>

                

                {task.time?
                <p>{ task.time }</p>
                :
                null
                }
             </div>

             <div>
                 <h4>Collaborators</h4>
             </div>
        </div>
        }
                     
        </div>
    )
}

export default DistinctTaskPage;