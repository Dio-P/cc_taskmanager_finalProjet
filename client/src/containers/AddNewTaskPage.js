import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";

const AddNewTaskPage = () => {
    // const [taskToBeEdited, setTaskToBeEdited] = useState(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskCategory, setTaskCategory] = useState(null);
    const [taskPriority, setTaskPriority] = useState(null);

    const [hasDescription, setHasDescription] = useState(false);
    const [taskDescription, setTaskDescription] = useState(null);
    const [hasDate, setHasDate] = useState(false);
    const [taskDate, setTaskDate] = useState(null);
    const [hasTime, setHasTime] = useState(false);
    const [taskTime, setTaskTime] = useState(null);
    const [hasDuration, setHasDuration] = useState(false);
    const [taskDuration, setTaskDuration] = useState(null);
    const [hasCollaborators, setHasCollaborators] = useState(false);
    const [taskCollaborators, setTaskCollaborators] = useState(null);

    const location = useLocation();
    const categories = location.state.categories;
    const priorities = location.state.priorities;

    // let year = Date.prototype.getFullYear()
    // let month = Date.prototype.getMonth()
    // let day = Date.prototype.getDate()
    
    useEffect(() => {
        setHasDescription(false)
        
    }, []);

    const setCategoryFromDropDown = (choosenOption) => {
            setTaskCategory(choosenOption);
       
        
    }

    const setPriorityFromDropDown = (choosenOption) => {
            setTaskPriority(choosenOption);
        
    }
    // const location = useLocation();
    

    // useEffect(() => {
    //     if(location){
    //         const task = location.state.task;
    //         setTaskToBeEdited(task);
    //     }
        
    // }, [location]);
   


    return (
        <div>
            
            <form >
                <label htmlFor="taskTitle">Task Title</label>
                <input type="text" name="taskTitle" id="taskTitle" value={taskTitle} onChange={e=> setTaskTitle(e.target.value)} required/>
                {/* <h3>{taskTitle}</h3> */}

                <label htmlFor="taskCategory">Task Category</label>
                <DropDownMenu options={ categories } setValueFromDropDown={(choosenOption, categories)=> setCategoryFromDropDown(choosenOption)} />

                <label htmlFor="taskPriority">Task Priority</label>
                <DropDownMenu options={ priorities } setValueFromDropDown={(choosenOption, categories)=> setPriorityFromDropDown(choosenOption)} />

                {hasDescription?
                <>
                    <label htmlFor="taskDescription">Task Description</label>
                    <input type="text" name="taskDescription" id="taskDescription" value={taskDescription} onChange={e=> setTaskDescription(e.target.value)}/>
                    <button onClick={()=> setHasDescription(false)}>Remove Description</button>
                </>
                :
                <button onClick={()=> setHasDescription(true)}>Add Description</button>
                }

                {hasDate?
                <>
                    <label htmlFor="taskDate">Task Date</label>
                    <input type="date" name="taskDate" id="taskDate" value={taskDate} onChange={e=> setTaskDate(e.target.value)}/>
                    <button onClick={()=> setHasDate(false)}>Remove Date</button>
                </>
                :
                <button onClick={()=> setHasDate(true)}>Add Date</button>
                }

                {hasTime?
                <>
                    <label htmlFor="taskDate">Task Time</label>
                    <input type="time" name="taskDate" id="taskDate" value={taskTime} onChange={e=> setTaskTime(e.target.value)}/>
                    <button onClick={()=> setHasTime(false)}>Remove Date</button>
                </>
                :
                <button onClick={()=> setHasTime(true)}>Add Time</button>
                }       

                <button type="submit">Create Task </button>
            </form>
            
             {/* <div className="distinctTaskFieldBox">
                <p>{ taskToBeEdited.type }</p>

                {taskToBeEdited.date?
                <p>{ taskToBeEdited.date }</p>
                :
                null
                }

                {taskToBeEdited.time?
                <p>{ taskToBeEdited.time }</p>
                :
                null
                }
             </div>

             <div>
                 <h4>Collaborators</h4>
             </div>

             <div>
                 <h4>Category</h4>
                 <p>{ taskToBeEdited.category }</p>
             </div>

             <div>
                 <h4>Priority</h4>
                 <p>{ taskToBeEdited.priority }</p>
             </div>

             <div>
                 <p>{ taskToBeEdited.description }</p>
             </div> */}
        </div>
    )
    
}

export default AddNewTaskPage;