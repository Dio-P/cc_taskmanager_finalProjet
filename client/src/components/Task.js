import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RequestContext from "../context/RequestContext";

const Task = ({ task, categories, priorities, updateWholeMainPageStateFromComponent }) => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const task = location.state.task;
    // const categories = location.state.categories;
    // const priorities = location.state.priorities;

    // const [loading, setLoading] = useState(true);
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    // const [editTitle, setEditTitle] = useState(false);
    // const [taskTitle, setTaskTitle] = useState(task.title);
    
    const [taskCompleted, setTaskCompleted] = useState(task.completed);///////////

    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskID, setTaskID] = useState(task.id);
    const [taskCategory, setTaskCategory] = useState(task.category);
    const [taskPriority, setTaskPriority] = useState(task.priority);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [taskDate, setTaskDate] = useState(task.date);
    const [taskTime, setTaskTime] = useState(task.time);
    const [datedTaskType, setDatedTaskType] = useState(task.type);
    const [completedTimeStamp, setCompletedTimeStamp] = useState(null);
    const [taskDuration, setTaskDuration] = useState(task.duration);
    const [taskCollaborators, setTaskCollaborators] = useState(null);

    // const [collaboratorsToDisplay, setCollaboratorsToDisplay] = useState([]);
    // const [searchInput, setSearchInput] = useState("");

    const {get, post, put} = useContext(RequestContext);


    useEffect(() => {
        setTaskCompleted(task.completed);
        
    }, [task]);

    useEffect(() => {
        onClickingDone()
    }, [taskCompleted]);

    const onClickingDone = () => {
        const updatedTask= { }
        updatedTask["title"] = taskTitle;
        updatedTask["category"] = taskCategory;
        updatedTask["priority"] = taskPriority;
        updatedTask["completed"] = taskCompleted;
        updatedTask["completedTimeStamp"] = completedTimeStamp;
        updatedTask["id"] = taskID;


        if(taskDescription){
            updatedTask["description"]=taskDescription;
        }
        if(taskDate){
            updatedTask["date"]=taskDate;
            updatedTask["type"]=datedTaskType;
        }else{
            updatedTask["type"]="SOMEDAY";

        }
        if(taskTime){
            updatedTask["time"]=taskTime;
        }
        if(taskDuration){
            updatedTask["duration"]=taskDuration;
        }
        
        console.log("updatedTask", updatedTask);/////////////
        console.log("task.id", task.id);/////////////
        
        put(`tasks/${task.id}`, updatedTask)
        updateWholeMainPageStateFromComponent(updatedTask)
        // redirect to home page            
    }

    const onCheckboxClick= () => {
        // console.log("inside Complete");
        setTaskCompleted(!taskCompleted)
        if(!completedTimeStamp){
            let timestamp = Date.parse(new Date());
            setCompletedTimeStamp(timestamp);
            // onClickingDone()
        }else{
            setCompletedTimeStamp(null);
            // onClickingDone()
        }
        
    }

    const onTaskClick = (e) => {
        navigate(`/task/:${task.title}`, {
            state: {
                task:task,
                categories:categories,
                priorities: priorities,
            }
        })
    }

    return (
            <div>
                <input type="checkbox" id="task" name="task" checked={taskCompleted} onClick={()=>onCheckboxClick()}/>
                <label htmlFor="task"> <button onClick={onTaskClick}>{ task.title }</button> </label>
            </div>
      )
}

export default Task;
