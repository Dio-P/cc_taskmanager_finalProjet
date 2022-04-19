import { useEffect, useState } from "react";
import TasksBox from "./TasksBox";

const WholeViewContainer = ({ uncompletedTasks }) => {
    const [doOns, setDoOns] = useState(null)
    const [doBys, setDoBys] = useState(null)
    const [somedays, setSomedays] = useState(null)

    useEffect(() => {
        const doOnsHelper = [];
        const doBysHelper = [];
        const somedaysHelper = [];

        // deviding the tasks by type and setting it in states
        if(uncompletedTasks){
            for(let task of uncompletedTasks){
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
        }
        
    }, []);


    return (
        <div>
            
            controlers 
            { 
            <div>
            <TasksBox doOns={ doOns }/>
            <TasksBox doBys={ doBys }/>
            <TasksBox somedays={ somedays }/>
            </div>
            }
        </div>
    )
}

export default WholeViewContainer;
