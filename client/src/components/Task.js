import { useNavigate } from "react-router-dom";

const Task = ({ task, categories, priorities }) => {
    const navigate = useNavigate();

    const onTaskClick = (e) => {
        console.log("a task has been clicked");
        navigate(`/task/:${task.title}`, {
            state: {
                task:task,
                categories:categories,
                priorities: priorities,
            }
        })
    }

    return (
            <div>
                <input type="checkbox" id="task" name="task"/>
                <label htmlFor="task"> <button onClick={onTaskClick}>{ task.title }</button> </label>
            </div>
      )
}

export default Task;
