import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
               {/* <Link to={{pathname: `/task/:${task.title}`,
                state: {task:task}}}><label for="horns"> <button onClick={onTaskClick}>{ task.title }</button> </label></Link>  */}
                {/* <Link to={{pathname: `/task/:${task.title}`}}
                state= {{task:task}}> */}
                <label for="horns"> <button onClick={onTaskClick}>{ task.title }</button> </label>
                {/* </Link>  */}
            </div>
            // <Link  to={{pathname: `/question/:${question.id}`,
            //     state: {question:question.id}}}><button className="main_button_style" onClick={passingQid}> {questionToUse.answered? "View Question": "Answer Question"}</button></Link>
      )
}

export default Task;
