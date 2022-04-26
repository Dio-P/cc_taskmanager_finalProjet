import { useEffect, useState } from "react";
import { matchRoutes } from "react-router-dom";
import Task from "../components/Task";

const TasksBox = ({ tasks, tasksComplete, title, categories, priorities }) => {
    

    return (
        <div>
            <h3>{title}</h3>

           {   
           tasks.map(task => (
              <Task
                key={ task.id }
                task={ task }
                categories={ categories }
                priorities={ priorities }
              />
           ))
           }  

            {   
           tasksComplete.map(task => (
              <Task
                key={ task.id }
                task={ task }
                categories={ categories }
                priorities={ priorities }
              />
           ))
           }    


        </div>
    )
}

export default TasksBox;