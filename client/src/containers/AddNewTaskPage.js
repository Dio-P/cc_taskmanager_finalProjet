import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import DropDownMenuCategory from "../components/DropDownMenuCategory";
import DropDownMenuPriority from "../components/DropDownMenuPriority";
import Menu from "../components/Menu";
import { FaBars, FaWrench, FaPlus } from "react-icons/fa";

const AddNewTaskPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskCategory, setTaskCategory] = useState(null);
    const [taskPriority, setTaskPriority] = useState(null);

    const [hasDescription, setHasDescription] = useState(false);
    const [taskDescription, setTaskDescription] = useState(null);
    const [hasDate, setHasDate] = useState(false);
    const [taskDate, setTaskDate] = useState(null);
    const [datedTaskType, setDatedTaskType] = useState(null);
    const [hasTime, setHasTime] = useState(false);
    const [taskTime, setTaskTime] = useState(null);
    const [completedTimeStamp, setCompletedTimeStamp] = useState(null);

    const [hasDuration, setHasDuration] = useState(false);
    const [taskDuration, setTaskDuration] = useState(null);
    const [hasCollaborators, setHasCollaborators] = useState(false);
    const [taskCollaborators, setTaskCollaborators] = useState(null);

    const location = useLocation();
    const categories = location.state.categories;
    const priorities = location.state.priorities;

    const {get, post} = useContext(RequestContext);

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

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    const addNewTask = (e) => {
        e.preventDefault();
        let newTask = {};
        newTask["title"]=taskTitle;
        newTask["category"]= {
            colour: "#800080",
            goal: "NONE",
            goalDuration: 0,
            id: 1,
            title: taskCategory
        }
        newTask["priority"]=taskPriority;
        newTask["completed"]=false;
        newTask["completedTimeStamp"]=completedTimeStamp;

        if(taskDescription){newTask["description"]=taskDescription;}
        if(taskDate){
            newTask["date"]=taskDate;
            newTask["type"]=datedTaskType;
        }else{
            newTask["type"]="SOMEDAY";

        }
        if(taskTime){newTask["time"]=taskTime;}
        if(taskDuration){newTask["duration"]=taskDuration;}
        
        console.log("newTask", newTask);
        console.log("post", post);

       post("tasks", newTask)
    }
   
    return (
        <div>
            {!isMenuOpen?
                <>
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}><FaBars className='m-4' size='2rem'/></button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                />
            }
            <p className='cat-header'>Create A Task</p>
            <FaWrench className='wrench-icon'/>
            <form onSubmit={addNewTask}>
                <label className='font-semibold text-2xl' htmlFor="taskTitle">Task Title</label>
                <input type="text" name="taskTitle" id="taskTitle" value={taskTitle} onChange={e=> setTaskTitle(e.target.value)} required/>
                <br/>
                <label className='font-semibold text-2xl' htmlFor="taskCategory">Task Category</label>
                <DropDownMenuCategory options={ categories } setValueFromDropDown={(choosenOption)=> setCategoryFromDropDown(choosenOption)}/>
                <br/>
                <label className='font-semibold text-2xl' htmlFor="taskPriority">Task Priority</label>
                <DropDownMenuPriority options={ priorities } setValueFromDropDown={(choosenOption)=> setPriorityFromDropDown(choosenOption)}/>

                {hasDescription?
                <>
                    <label htmlFor="taskDescription">Task Description</label>
                    <input className='category-input' type="text" name="taskDescription" id="taskDescription" value={taskDescription} onChange={e=> setTaskDescription(e.target.value)}/>
                    <button className='btn' onClick={()=> setHasDescription(false)}>Remove Description</button>
                </>
                :
                <button className='btn' onClick={()=> setHasDescription(true)}><FaPlus/>Description</button>
                }
                <br/>
                {hasDate?
                <>
                    <label htmlFor="taskDate">Task Date</label>
                    <input type="date" name="taskDate" id="taskDate" value={taskDate} onChange={e=> setTaskDate(e.target.value)}/>
                    <div>
                    <label htmlFor="taskDate">Do On</label>
                    <input type="radio" name="timedTaskType" id="do_on" value="DO_ON" onChange={e=> setDatedTaskType(e.target.value)}/>
                    <label htmlFor="taskDate">Do By</label>
                    <input type="radio" name="timedTaskType" id="do_on" value="DO_BY" onChange={e=> setDatedTaskType(e.target.value)}/>

                    </div>
                    <button className='btn' onClick={()=> setHasDate(false)}>- Remove Date</button>
                </>
                :
                <button className='btn' onClick={()=> setHasDate(true)}><FaPlus/>Date</button>
                }
                <br/>
                {hasTime?
                <>
                    <label htmlFor="taskDate">Task Time</label>
                    <input type="time" name="taskDate" id="taskDate" value={taskTime} onChange={e=> setTaskTime(e.target.value)}/>
                    <button onClick={()=> setHasTime(false)}>- Remove Date</button>
                </>
                :
                <button className='btn' onClick={()=> setHasTime(true)}><FaPlus/>Add Time</button>
                }
                <br/>
                {hasDuration?
                <>
                    <label htmlFor="taskDuration">Task Duration</label>
                    <input type="text" name="taskDuration" id="taskDuration" placeholder="in minutes" value={taskDuration} onChange={e=> setTaskDuration(e.target.value)}/>
                    <button onClick={()=> setHasDuration(false)}>- Remove Duration</button>
                </>
                :
                <button className='btn' onClick={()=> setHasDuration(true)}><FaPlus/>Add Duration</button>
                }  
                <br/>
                <button className='create-btn' type="submit">Create Task </button>
            </form>
        </div>
    )
    
}

export default AddNewTaskPage;