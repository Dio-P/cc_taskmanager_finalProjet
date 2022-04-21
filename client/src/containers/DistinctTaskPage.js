import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";


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
    

    const setCategoryFromDropDown = (choosenOption) => {
        setTaskCategory(choosenOption);
   
    
    }

    const setPriorityFromDropDown = (choosenOption) => {
            setTaskPriority(choosenOption);
        
    }

    const onClickingTheCheckedButton = () => {
            
    }

    return (
        

        <div>
            {loading?
            <h3>Loading</h3>
            :


            <div>
                
                <div>
                    <label>Task Title</label>
                    <h3>{taskTitle}</h3>
                    {!editTitle?
                        <button onClick={()=>setEditTitle(true)}>Edit</button>
                    :
                        <>
                            <input type="text" name="taskTitle" id="taskTitle" value={taskTitle} onChange={e=> setTaskTitle(e.target.value)} required/>
                            <button onClick={()=>setEditTitle(false)}>Done</button>
                        </>
                    }  
                </div>
                
                <div>
                    <label>Completed</label>
                    <input type="checkbox" onClick={()=>setTaskCompleted(!taskCompleted)} checked={taskCompleted}/>
                </div>
            

                <div>
                    <label>Category</label>
                    <p>{ taskCategory }</p>
                    {!editCategory?
                        <button onClick={()=>setEditCategory(true)}>Edit</button>
                    :
                        <>
                            <DropDownMenu options={ categories } setValueFromDropDown={(choosenOption)=> setCategoryFromDropDown(choosenOption)}/>
                            <button onClick={()=>setEditCategory(false)}>Done</button>
                        </>

                    }
                </div>

                <div>
                    <label>Priority</label>
                    <p>{ taskPriority }</p>
                    {!editPriority?
                        <button onClick={()=>setEditPriority(true)}>Edit</button>
                    :
                        <>
                            <DropDownMenu options={ priorities } setValueFromDropDown={(choosenOption)=> setPriorityFromDropDown(choosenOption)}/>
                            <button onClick={()=>setEditPriority(false)}>Done</button>
                        </>

                    }
                </div>

                <div>
                    <label> Description </label>
                    <p>{ taskDescription }</p>
                    {!editDescription?
                        <button onClick={()=>setEditDescription(true)}>Edit</button>
                    :
                        <>
                            <input type="text" name="taskDescription" id="taskDescription" value={taskDescription} onChange={e=> setTaskDescription(e.target.value)}/>
                            <button onClick={()=>setEditDescription(false)}>Done</button>
                        </>
                    }
                </div>

                {taskDate?
                <div>

                    <div>
                        <label> Date </label>
                        <p>{ taskDate }</p>
                        {!editDate?
                            <button onClick={()=>setEditDate(true)}>Edit</button>
                        :
                            <>
                                <input type="date" name="taskDate" id="taskDate" value={taskDate} onChange={e=> setTaskDate(e.target.value)}/>
                                <button onClick={()=>setEditDate(false)}>Done</button>
                            </>
                        }
                    </div>

                    <div>
                        <label> Type </label>
                        <label htmlFor="taskDate">Do On</label>
                        <input 
                            type="radio" 
                            name="timedTaskType" 
                            id="do_on" 
                            value="DO_ON" 
                            checked={datedTaskType==="DO_ON"?true:false} 
                            onChange={e=> setDatedTaskType(e.target.value)}
                        />
                        <label htmlFor="taskDate">Do By</label>
                        <input 
                            type="radio" 
                            name="timedTaskType" 
                            id="do_on" 
                            value="DO_BY" 
                            checked={datedTaskType==="DO_BY"?true:false} 
                            onChange={e=> setDatedTaskType(e.target.value)}
                        />
                    </div>

                </div>
                            :
                            null  
                }

                    

                {taskTime?
                <div>
                    <label htmlFor="taskDate">Task Time</label>
                    <p>{ taskTime }</p>
                    {!editTime?
                        <button onClick={()=> setEditTime(true)}>Edit</button>   
                    :
                        <>
                            <input type="time" name="taskDate" id="taskDate" value={taskTime} onChange={e=> setTaskTime(e.target.value)}/>
                            <button onClick={()=> setEditTime(false)}>Edit</button>
                        </>
                    }    
                </div>
                :
                    null
                }

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