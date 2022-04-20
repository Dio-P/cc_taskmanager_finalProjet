import { useNavigate } from "react-router-dom";

const Task = ({ task }) => {
    const navigate = useNavigate();

    const onTaskClick = (e) => {
        console.log("a task has been clicked");
        navigate(`/task/:${task.title}`, {
            state: {task}
        })
    }

    return (
            <div>
                <input type="checkbox" id="horns" name="horns"/>
                <label for="horns"> <button onClick={onTaskClick}>{ task.title }</button> </label>
            </div>
      )
}

export default Task;
