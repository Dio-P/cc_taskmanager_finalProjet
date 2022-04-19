import { useEffect, useState } from "react";
import TasksBox from "./TasksBox";

const AllTasksContainer = ({ uncompletedTasks }) => {
    const [doOns, setDoOns] = useState([]);
    const [doBys, setDoBys] = useState([]);
    const [somedays, setSomedays] = useState([]);
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
            <TasksBox tasks={ doOns } title = "Weeks Tasks"/>
            <TasksBox tasks={ doBys } title = "Get it done soon"/>
            <TasksBox tasks={ somedays } title = "Get it done someday"/>
            </div>
            }
            
        </div>
    )
}

export default AllTasksContainer;