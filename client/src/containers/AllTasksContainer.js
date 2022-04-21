import { useEffect, useState } from "react";
import TasksBox from "./TasksBox";

const AllTasksContainer = ({ uncompletedTasks, completedTasks, categories, priorities }) => {
    const [doOns, setDoOns] = useState([]);
    const [doBys, setDoBys] = useState([]);
    const [somedays, setSomedays] = useState([]);
    const [doOnsCompl, setDoOnsCompl] = useState([]);
    const [doBysCompl, setDoBysCompl] = useState([]);
    const [somedaysCompl, setSomedaysCompl] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const doOnsHelper = [];
        const doBysHelper = [];
        const somedaysHelper = [];

        // deviding the tasks by type and setting it in states
        // if(uncompletedTasks){
            for(let task of uncompletedTasks){
                console.log("task", task);
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
    }, [uncompletedTasks]);

    useEffect(() => {
        const doOnsHelper = [];
        const doBysHelper = [];
        const somedaysHelper = [];

        // deviding the tasks by type and setting it in states
        // if(uncompletedTasks){
            for(let task of completedTasks){
                console.log("task", task);
                if(task.type==="DO_ON"){
                    doOnsHelper.push(task)

                }if(task.type==="DO_BY"){
                    doBysHelper.push(task)

                }if(task.type==="SOMEDAY"){
                    somedaysHelper.push(task)

                }
            }
            setDoOnsCompl(doOnsHelper);
            setDoBysCompl(doBysHelper);
            setSomedaysCompl(somedaysHelper);
        // }
    }, [completedTasks]);

    useEffect(() => {
        if(doOns&& doBys&& somedays){
            setLoading(false);
        }
        
    }, [doOns, doBys, somedays]);


    return (
        <div>
            
            controlers 
            {(loading)? 
            <p>Loading</p>
            :
            <div>
            <TasksBox 
                tasks={ doOns } 
                tasksComplete={ doOnsCompl }
                categories={ categories }
                priorities={ priorities } 
                title = "Weeks Tasks"
            />

            <TasksBox 
                tasks={ doBys } 
                tasksComplete={ doBysCompl }
                categories={ categories }
                priorities={ priorities }
                title = "Get it done soon"
            />

            <TasksBox 
                tasks={ somedays } 
                tasksComplete={ somedaysCompl }
                categories={ categories }
                priorities={ priorities }
                title = "Get it done someday"
            />

            </div>
            }
            
        </div>
    )
}

export default AllTasksContainer;
