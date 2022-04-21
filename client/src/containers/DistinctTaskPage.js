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

    const [editTitle, setEditTitle] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    
    const [taskCompleted, setTaskCompleted] = useState(task.completed);///////////

    const [editCategory, setEditCategory] = useState(false);
    const [taskCategory, setTaskCategory] = useState(task.category.title);
    const [editPriority, setEditPriority] = useState(false);
    const [taskPriority, setTaskPriority] = useState(task.priority);
    

    const [editDescription, setEditDescription] = useState(false);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [editDate, setEditDate] = useState(false);
    const [taskDate, setTaskDate] = useState(task.date);
    const [editTime, setEditTime] = useState(false);
    const [taskTime, setTaskTime] = useState(task.time);
    const [editdatedTaskType, setEditdatedTaskType] = useState(false);
    const [datedTaskType, setDatedTaskType] = useState(task.type);
    
    

    const [editDuration, setEditDuration] = useState(false);
    const [taskDuration, setTaskDuration] = useState(task.duration);
    const [editCollaborators, setEditCollaborators] = useState(false);
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
                <div>
                    {taskDate?
                        <p>{ taskDate }</p>
                        :
                        null
                        }
                </div>

                <div className="distinctTaskFieldBox">
                    <p>{ datedTaskType }</p>
                </div>
             </div>

             <div>
                {taskTime?
                    <p>{ taskTime }</p>
                    :
                    null
                    }
             </div>

             <div>
                 <p>{taskDuration}</p>
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