import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DropDownMenuCategory from "../components/DropDownMenuCategory";
import DropDownMenuPriority from "../components/DropDownMenuPriority";
import RequestContext from "../context/RequestContext";

const DistinctTaskPage = ({ categories, priorities, users }) => {
    const location = useLocation();
    const task = location.state.task;
    // const categories = location.state.categories;
    // const priorities = location.state.priorities;

    const [loading, setLoading] = useState(true);

    const [editTitle, setEditTitle] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    
    const [taskCompleted, setTaskCompleted] = useState(task.completed);///////////

    const [editCategory, setEditCategory] = useState(false);
    const [taskCategory, setTaskCategory] = useState(task.category);
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
    const [completedTimeStamp, setCompletedTimeStamp] = useState(null);
    
    

    const [editDuration, setEditDuration] = useState(false);
    const [taskDuration, setTaskDuration] = useState(task.duration);
    const [editCollaborators, setEditCollaborators] = useState(false);
    const [taskCollaborators, setTaskCollaborators] = useState(null);
    const {get, post, put} = useContext(RequestContext);
    
    useEffect(() => {
        setLoading(false)
        
    }, [taskTitle, taskCompleted, taskCategory, taskPriority]);

    // useEffect(() => {
    //     onClickingDone()
        
    // }, [completedTimeStamp]);
    
    const setCategoryFromDropDown = (choosenOption) => {
        setTaskCategory(choosenOption);
    }

    const setPriorityFromDropDown = (choosenOption) => {
            setTaskPriority(choosenOption);
    }

    const onClickingComplete = () => {
        console.log("inside Complete");
        setTaskCompleted(!taskCompleted)
        if(!completedTimeStamp){
            let timestamp = Date.parse(new Date());
            setCompletedTimeStamp(timestamp);
        }else{
            setCompletedTimeStamp(null);
        }
    }

    const onClickingDone = () => {
        const updatedTask= { }
        updatedTask["title"] = taskTitle;
        updatedTask["category"] = taskCategory;
        updatedTask["priority"] = taskPriority;
        updatedTask["completed"]=taskCompleted;
        updatedTask["completedTimeStamp"]=completedTimeStamp;

        if(taskDescription){updatedTask["description"]=taskDescription;}
        if(taskDate){
            updatedTask["date"]=taskDate;
            updatedTask["type"]=datedTaskType;
        }else{
            updatedTask["type"]="SOMEDAY";

        }
        if(taskTime){updatedTask["time"]=taskTime;}
        if(taskDuration){updatedTask["duration"]=taskDuration;}
        
        console.log("updatedTask", updatedTask);/////////////
        
        put(`tasks/${task.id}`, updatedTask)
    
        
        // redirect to home page            
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
                            <button onClick={()=>{
                                setEditTitle(false)
                                onClickingDone()
                                }}>Done</button>
                        </>
                    }  
                </div>
                
                <div>
                    <label>Completed</label>
                    <input type="checkbox" onClick={()=>{onClickingComplete()}} checked={taskCompleted}/>
                </div>
            

                <div>
                    <label>Category</label>
                    <p>{ taskCategory.title }</p>
                    {!editCategory?
                        <button onClick={()=>setEditCategory(true)}>Edit</button>
                    :
                        <>
                            <DropDownMenuCategory options={ categories } setValueFromDropDown={(choosenOption)=> setCategoryFromDropDown(choosenOption)}/>
                            <button onClick={()=>{
                                setEditCategory(false)
                                onClickingDone()
                                }}>Done</button>
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
                            <DropDownMenuPriority options={ priorities } setValueFromDropDown={(choosenOption)=> setPriorityFromDropDown(choosenOption)}/>
                            <button onClick={()=>{
                                setEditPriority(false)
                                onClickingDone()
                                }}>Done</button>
                        </>

                    }
                </div>

                
                {taskDescription?
                <div>
                    <label> Description </label>
                    <p>{ taskDescription }</p>
                    {!editDescription?
                        <button onClick={()=>setEditDescription(true)}>Edit</button>
                    :
                        <>
                            <input type="text" name="taskDescription" id="taskDescription" value={taskDescription} onChange={e=> setTaskDescription(e.target.value)}/>
                            <button onClick={()=>{
                                setEditDescription(false)
                                onClickingDone()
                                }}>Done</button>
                        </>
                    }
                </div>
                :
                    null
                }
                

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
                                <button onClick={()=>{
                                setEditDate(false)
                                onClickingDone()
                                }}>Done</button>
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
                            <button onClick={()=>{
                                setEditTime(false)
                                onClickingDone()
                                }}>Done</button>
                        </>
                    }    
                </div>
                :
                    null
                }


                {taskDuration?
                <div>
                    <label htmlFor="taskDuration">Task Duration</label>
                    <p>{ taskDuration }</p>
                    {!editDuration?
                        <button onClick={()=> setEditDuration(true)}>Edit</button>
                    :
                        <>
                            <input type="text" name="taskDuration" id="taskDuration" placeholder="in minutes" value={taskDuration} onChange={e=> setTaskDuration(e.target.value)}/>
                            <button onClick={()=>{
                                setEditDuration(false)
                                onClickingDone()
                                }}>Done</button>
                        </>
                    }
                </div>
                :
                    null
                }  


                <div>
                    <h4>Collaborators</h4>
                </div>
            </div>
            }

        </div>
    )
}

export default DistinctTaskPage;