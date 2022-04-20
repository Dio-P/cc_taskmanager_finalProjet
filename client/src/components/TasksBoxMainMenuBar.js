import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="taskBoxMainMenuBar">
            <p>Categories</p>
            <p>Targets</p>
            <button className="addNewTaskButton" onClick={addTask}>+</button>
        </div>

    )
}

export default TasksBoxMainMenuBar;