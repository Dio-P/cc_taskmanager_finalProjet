import { useEffect, useState } from "react";
import TasksBox from "./TasksBox";

const AllTasksContainer = ({ uncompletedTasksToDisplay, completedTasksToDisplay, categories, priorities, updateWholeMainPageStateFromComponent }) => {
    const [loading, setLoading] = useState(true);

    const [doOnsOpen, setDoOnsOpen] = useState(false);
    const [doBysOpen, setDoBysOpen] = useState(false);
    const [somedaysOpen, setSomedaysOpen] = useState(false);

    const [doOns, setDoOns] = useState([]);
    const [doBys, setDoBys] = useState([]);
    const [somedays, setSomedays] = useState([]);
    const [doOnsCompl, setDoOnsCompl] = useState([]);
    const [doBysCompl, setDoBysCompl] = useState([]);
    const [somedaysCompl, setSomedaysCompl] = useState([]);
    

    useEffect(() => {
        const doOnsHelper = [];
        const doBysHelper = [];
        const somedaysHelper = [];

        // deviding the tasks by type and setting it in states
        // if(uncompletedTasks){
            for(let task of uncompletedTasksToDisplay){
                // console.log("task", task);/////////////
                if(task.type==="DO_ON"){
                    doOnsHelper.push(task)

                }if(task.type==="DO_BY"){
                    doBysHelper.push(task)

                }if(task.type==="SOMEDAY"){
                    somedaysHelper.push(task)

                }
            }
            setDoOns(doOnsHelper);
                setDoBys(doBysHelper);
                setSomedays(somedaysHelper);
        // }
    }, [uncompletedTasksToDisplay]);

    useEffect(() => {
        const doOnsHelper = [];
        const doBysHelper = [];
        const somedaysHelper = [];

        // deviding the tasks by type and setting it in states
        // if(uncompletedTasks){
            for(let task of completedTasksToDisplay){
                // console.log("task", task);/////////////
                if(task.type==="DO_ON"){
                    addPriorityNumeralHelper(task);
                    doOnsHelper.push(task);

                }if(task.type==="DO_BY"){
                    addPriorityNumeralHelper(task);
                    doBysHelper.push(task)

                }if(task.type==="SOMEDAY"){
                    addPriorityNumeralHelper(task);
                    somedaysHelper.push(task)

                }
            }
            setDoOnsCompl(doOnsHelper.sort((a,b)=> a.priorityNumeral -b.priorityNumeral));
            setDoBysCompl(doBysHelper.sort((a,b)=> a.priorityNumeral -b.priorityNumeral));
            setSomedaysCompl(somedaysHelper.sort((a,b)=> a.priorityNumeral -b.priorityNumeral));
        // }
    }, [completedTasksToDisplay]);

    useEffect(() => {
        if(doOns&& doBys&& somedays){
            setLoading(false);
        }
        
    }, [doOns, doBys, somedays]);

    const addPriorityNumeralHelper = (task) => {
        if(task.priority==="LOW"){
            task.priorityNumeral = 3
        }if(task.priority==="MEDIUM"){
            task.priorityNumeral = 2
        }if(task.priority==="HIGH"){
            task.priorityNumeral = 1
        }
    }

    return (
        <div>
            {(loading)? 
            <p>Loading</p>
            :
            <div>
                
                <>
                    <button onClick={()=> setDoOnsOpen(!doOnsOpen) }>
                        <h3> 
                            Weeks Tasks 
                        </h3>
                    </button>
                    {doOnsOpen?
                        <TasksBox 
                            tasks={ doOns } 
                            tasksComplete={ doOnsCompl }
                            categories={ categories }
                            priorities={ priorities }
                            updateWholeMainPageStateFromComponent={ updateWholeMainPageStateFromComponent }
                        />
                    :
                        null
                    }  
                </>
                <>
                    <button onClick={()=> setDoBysOpen(!doBysOpen) }>
                        <h3> 
                            Get it done soon 
                        </h3>
                    </button>
                    {doBysOpen?
                        <TasksBox 
                            tasks={ doBys } 
                            tasksComplete={ doBysCompl }
                            categories={ categories }
                            priorities={ priorities }
                            updateWholeMainPageStateFromComponent={ updateWholeMainPageStateFromComponent }
                        />
                    :
                        null
                    }  
                </>
                <>
                    <button onClick={()=> setSomedaysOpen(!somedaysOpen) }>
                        <h3> 
                            Get it done someday
                        </h3>
                    </button>
                    {somedaysOpen?
                        <TasksBox 
                        tasks={ somedays } 
                        tasksComplete={ somedaysCompl }
                        categories={ categories }
                        priorities={ priorities }
                        updateWholeMainPageStateFromComponent={ updateWholeMainPageStateFromComponent }
                    />
                    :
                        null
                    }  
                </>
                
            </div>
            }
            
        </div>
    )
}

export default AllTasksContainer;
