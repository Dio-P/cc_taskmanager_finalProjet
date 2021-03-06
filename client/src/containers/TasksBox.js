import { useEffect, useState } from "react";
import { matchRoutes } from "react-router-dom";
import Task from "../components/Task";

const TasksBox = ({ tasks, tasksComplete, title, categories, priorities, updateWholeMainPageStateFromComponent }) => {
    

    return (
        <div>

           {   
           tasks.map(task => (
              <Task
                key={ task.id }
                task={ task }
                categories={ categories }
                priorities={ priorities }
                updateWholeMainPageStateFromComponent={ updateWholeMainPageStateFromComponent }
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
                updateWholeMainPageStateFromComponent={ updateWholeMainPageStateFromComponent }

              />
           ))
           }    


        </div>
    )
}

export default TasksBox;