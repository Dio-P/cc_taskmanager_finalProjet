import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";

const AddNewTaskPage = () => {
    // const [taskToBeEdited, setTaskToBeEdited] = useState(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskCategory, setTaskCategory] = useState("General");
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
    

    const setValueFromDropDown = (choosenOption, field) => {
        if(field==="category"){
            setTaskCategory(choosenOption);
        }if(field==="priority"){
            setTaskPriority(choosenOption);
        }
        
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

                <label htmlFor="taskTitle">Task Category</label>
                <DropDownMenu options={ categories } setValueFromDropDown={(choosenOption, categories)=> setValueFromDropDown(choosenOption, "category")} />

                <label htmlFor="taskTitle">Task Priority</label>
                <DropDownMenu options={ priorities } setValueFromDropDown={(choosenOption, categories)=> setValueFromDropDown(choosenOption, "priority")} />

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