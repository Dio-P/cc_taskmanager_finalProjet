import { useEffect, useState } from "react";
import Task from "../components/Task";

const TasksBox = ({ tasks, title }) => {
    

    return (
        <div>
            <h3>{title}</h3>

           {   
           tasks.map(task => (
              <Task task={task}/>
           ))
    
           }  
        </div>
    )
}

export default TasksBox;