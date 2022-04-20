import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';




const TasksBoxMainMenuBar = ({ categories, priorities }) => {
    const [newTask, setNewTask] = useState()

    const navigate = useNavigate();

    const addTask = () => {
        navigate("/task/createNewTask", {
            state:{
                categories: categories,
                priorities: priorities
            }
        });
        
    }

    const {
        logout
      } = useAuth0();

    return (
        <div className="taskBoxMainMenuBar">
            <p>Categories</p>
            <p>Targets</p>
            <button className="addNewTaskButton" onClick={addTask}>+</button>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>

        </div>

    )
}

export default TasksBoxMainMenuBar;