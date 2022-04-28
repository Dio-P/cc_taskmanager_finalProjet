import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DropDownMenuCategory from "../components/DropDownMenuCategory";
import DropDownMenuPriority from "../components/DropDownMenuPriority";
import RequestContext from "../context/RequestContext";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar";
import { FaBars } from "react-icons/fa";

const DistinctTaskPage = ({ categories, priorities, users, updateWholeMainPageTasksFromComponent }) => {
    const location = useLocation();
    const task = location.state.task;
    const navigate = useNavigate();
    // const categories = location.state.categories;
    // const priorities = location.state.priorities;

    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [editTitle, setEditTitle] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskID, setTaskID] = useState(task.id);
    
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

    const [collaboratorsToDisplay, setCollaboratorsToDisplay] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const {get, post, put} = useContext(RequestContext);
    
    useEffect(() => {
        setLoading(false)
        
    }, [taskTitle, taskCompleted, taskCategory, taskPriority]);

    // useEffect(() => {
    //     setTaskID(task)
    // }, [task]);

    useEffect(() => {
        let collaboratorsToDisplay = users.filter((user) => {
          return user.firstName.toLowerCase().match(searchInput);
        });
        setCollaboratorsToDisplay(collaboratorsToDisplay);
      }, [searchInput]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value.toLowerCase());
      };

    const onClickingACollaborator = (collaborator,e) => {
        e.preventDefault();
        setTaskCollaborators([...taskCollaborators, collaborator]);
    
      };
    
    const removeCollaborator = (colaboratorID) => {
    const newCollaborators = taskCollaborators.filter(
        (category) => category.id !== colaboratorID
    );
    setTaskCollaborators(newCollaborators);
    };
    
    const setCategoryFromDropDown = (choosenOption) => {
        setTaskCategory(choosenOption);
    }

    const setPriorityFromDropDown = (choosenOption) => {
            setTaskPriority(choosenOption);
    }

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    const onClickingComplete = () => {
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

    const onClickingDone = () => {
        const updatedTask= { }
        updatedTask["title"] = taskTitle;
        updatedTask["id"] = taskID;
        updatedTask["category"] = taskCategory;
        updatedTask["priority"] = taskPriority;
        updatedTask["completed"]=taskCompleted;
        updatedTask["completedTimeStamp"]=completedTimeStamp;

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
        
        put(`tasks/${task.id}`, updatedTask)
        updateWholeMainPageTasksFromComponent(updatedTask);       
    }

    return (
        

        <div>
            {loading?
            <h3>Loading</h3>
            :

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
                <p className='cat-header'>{taskTitle}</p>
                <div className="distinct-task">
                <div className='flex flex-box justify-center m-1'>
                    <label className='basis-1/2 font-semibold text-lg'>Title</label>
                    <h3 className='basis-1/1 text-md italic'>{taskTitle}</h3>
                    {!editTitle?
                        <button className='btn' onClick={()=>setEditTitle(true)}>Edit</button>
                    :
                        <>
                            <input type="text" name="taskTitle" id="taskTitle" value={taskTitle} onChange={e=> setTaskTitle(e.target.value)} required/>
                            <button className='btn' onClick={()=>{
                                setEditTitle(false)
                                onClickingDone()
                                }}>Done</button>
                        </>
                    }  
                </div>
                
                <div className='flex flex-box justify-left m-1'>
                    <label className='font-semibold text-lg'>Completed</label>
                    <input className='checkbox-task' type="checkbox" onClick={()=>{onClickingComplete()}} checked={taskCompleted}/>
                </div>
            

                <div className='flex flex-box justify-center m-1'>
                    <label className='basis-1/3 font-semibold text-lg'>Category</label>
                    <p className='basis-1/3 text-md italic'>{ taskCategory.title }</p>
                    {!editCategory?
                        <button className="btn" onClick={()=>setEditCategory(true)}>Edit</button>
                    :
                        <>
                            <DropDownMenuCategory options={ categories } setValueFromDropDown={(choosenOption)=> setCategoryFromDropDown(choosenOption)}/>
                            <button className="btn" onClick={()=>{
                                setEditCategory(false)
                                onClickingDone()
                                }}>Done</button>
                        </>

                    }
                </div>

                
                <div className='flex flex-box justify-center m-1'>
                    <label className='basis-1/3 font-semibold text-lg'>Priority</label>
                    <p className='basis-1/3 text-md italic'>{ taskPriority }</p>
                    {!editPriority?
                        <button className='btn' onClick={()=>setEditPriority(true)}>Edit</button>
                    :
                        <>
                            <DropDownMenuPriority options={ priorities } setValueFromDropDown={(choosenOption)=> setPriorityFromDropDown(choosenOption)}/>
                            <button className='btn' onClick={()=>{
                                setEditPriority(false)
                                onClickingDone()
                                }}>Done</button>
                        </>

                    }
                </div>

                
                {taskDescription?
                <div>
                    <label className='basis-1/3 font-semibold text-lg'> Description </label>
                    <p className='basis-1/3 text-sm italic'>{ taskDescription }</p>
                    {!editDescription?
                        <button className="btn" onClick={()=>setEditDescription(true)}>Edit</button>
                    :
                        <>
                            <input type="text" name="taskDescription" id="taskDescription" value={taskDescription} onChange={e=> setTaskDescription(e.target.value)}/>
                            <button className="btn" onClick={()=>{
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

                    <div className='flex flex-box justify-center m-1'>
                        <label className='basis-1/3 font-semibold text-lg'> Date </label>
                        <p className='basis-1/3 text-md -ml-4 italic'>{ taskDate }</p>
                        {!editDate?
                            <button className="btn" onClick={()=>setEditDate(true)}>Edit</button>
                        :
                            <>
                                <input type="date" name="taskDate" id="taskDate" value={taskDate} onChange={e=> setTaskDate(e.target.value)}/>
                                <button className="btn" onClick={()=>{
                                setEditDate(false)
                                onClickingDone()
                                }}>Done</button>
                            </>
                        }
                    </div>

                    <div className='flex flex-box justify-center m-1'>
                        <label className='basis-1/3 font-semibold text-lg'> Type </label>
                        <label className="text-sm ml-3" htmlFor="taskDate">Do On</label>
                        <input className='basis-1/3 -ml-4'
                            type="radio" 
                            name="timedTaskType" 
                            id="do_on" 
                            value="DO_ON" 
                            checked={datedTaskType==="DO_ON"?true:false} 
                            onChange={e=> setDatedTaskType(e.target.value)}
                        />
                        <label className="text-sm ml-3" htmlFor="taskDate">Do By</label>
                        <input className='basis-1/3 -ml-4'
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
                <div className='flex flex-box justify-center m-1'>
                    <label className='basis-1/3 font-semibold text-lg' htmlFor="taskDate">Time</label>
                    <p className='basis-1/3 text-md -ml-4 italic'>{ taskTime }</p>
                    {!editTime?
                        <button className="btn" onClick={()=> setEditTime(true)}>Edit</button>   
                    :
                        <>
                            <input type="time" name="taskDate" id="taskDate" value={taskTime} onChange={e=> setTaskTime(e.target.value)}/>
                            <button className="btn" onClick={()=>{
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
                <div className='flex flex-box justify-center m-1'>
                    <label className='basis-1/3 font-semibold text-lg' htmlFor="taskDuration">Duration</label>
                    <p className='basis-1/3 text-md -ml-4 italic'>{ taskDuration }</p>
                    {!editDuration?
                        <button className="btn" onClick={()=> setEditDuration(true)}>Edit</button>
                    :
                        <>
                            <input type="text" name="taskDuration" id="taskDuration" placeholder="in minutes" value={taskDuration} onChange={e=> setTaskDuration(e.target.value)}/>
                            <button className="btn" onClick={()=>{
                                setEditDuration(false)
                                onClickingDone()
                                }}>Done</button>
                        </>
                    }
                </div>
                :
                    null
                } 
                


                {taskCollaborators? (   
                <div className='flex flex-box justify-center m-1'>
                    <label className='basis-1/3 font-semibold text-lg'> Collaborators </label>
                    {taskCollaborators.length > 0 &&
                        Object.values(taskCollaborators).map((collaborator) => (
                        <div>
                            <p>{ collaborator.firstName } { collaborator.lastName }</p>
                            <button key={collaborator.id} onClick={() => removeCollaborator(collaborator.id)}>
                            X
                            </button>
                        </div>
                        ))}

                    {!editCollaborators? ( 
                        <button className="btn" onClick={()=> setEditCollaborators(true)}>Edit</button>
                    ) : ( 
                        <>
                    <input
                    type="text"
                    placeholder="Add Collaborators"
                    onChange={handleChange}
                    value={searchInput}
                    />
                        {searchInput.length > 0 
                            && 
                        <SearchBar
                            onClickingAnOption={ (users, e)=> onClickingACollaborator(users, e) }
                            optionsToDisplay={ collaboratorsToDisplay }
                        />
                    }
                    <button className="btn" onClick={()=>{
                        setEditCollaborators(false)
                        onClickingDone()
                        }}>Done</button>
                    </>
                    )}
                </div>
                ) : (
                    null
                )}
                </div>
            </div>
            }

            <div>
                <button className='create-task-btn' onClick={()=>navigate("/")}>Back to Tasks</button>
            </div>
            

        </div>
        
    )
}

export default DistinctTaskPage;