import { Link } from "react-router-dom";

const Task = ({ task }) => {

    const onTaskClick = () => {
        console.log("a task has been clicked");
    }

    return (
            <div>
                <input type="checkbox" id="horns" name="horns"/>
               <Link to={{pathname: `/task/:${task.title}`,
                state: {task:task.title}}}><label for="horns"> <button onClick={onTaskClick}>{ task.title }</button> </label></Link> 
            </div>
            // <Link  to={{pathname: `/question/:${question.id}`,
            //     state: {question:question.id}}}><button className="main_button_style" onClick={passingQid}> {questionToUse.answered? "View Question": "Answer Question"}</button></Link>
      )
}

export default Task;
